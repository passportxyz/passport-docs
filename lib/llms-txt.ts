import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const BASE_URL = 'https://docs.passport.xyz'

// Subtrees to completely exclude
const EXCLUDED_SUBTREES = new Set(['passport-api-v1'])

interface NavEntry {
  slug: string
  title: string
  urlPath: string
  description: string
  filePath: string
  children?: NavEntry[]
}

/**
 * Parse a _meta.ts file and return the ordered entries as key-value pairs.
 * _meta.ts files export a default object literal — we regex-extract it
 * and evaluate with new Function(). Safe: these are our own source files,
 * executed only at build time.
 */
function parseMeta(metaPath: string): Record<string, unknown> {
  const src = fs.readFileSync(metaPath, 'utf-8')
  // Match the object literal after `export default`
  const match = src.match(/export\s+default\s+(\{[\s\S]*\})\s*;?\s*$/)
  if (!match) return {}
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return (${match[1]})`)()
  } catch {
    return {}
  }
}

/**
 * Read frontmatter from an MDX file.
 */
function readFrontmatter(filePath: string): { title: string; description: string } {
  const src = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(src)
  return {
    title: (data.title as string) || '',
    description: (data.description as string) || '',
  }
}

/**
 * Check if an MDX file is a redirect page (contains `redirect(` call).
 */
function isRedirectPage(filePath: string): boolean {
  const src = fs.readFileSync(filePath, 'utf-8')
  return /redirect\s*\(/.test(src)
}

/**
 * Recursively build the navigation tree from a content directory,
 * using _meta.ts for ordering and filtering.
 */
function buildTree(dir: string, urlPrefix: string): NavEntry[] {
  const metaPath = path.join(dir, '_meta.ts')
  if (!fs.existsSync(metaPath)) return []

  const meta = parseMeta(metaPath)
  const entries: NavEntry[] = []

  for (const [key, value] of Object.entries(meta)) {
    // Skip separators
    if (key.startsWith('---') || (typeof value === 'object' && value !== null && (value as Record<string, unknown>).type === 'separator')) {
      continue
    }

    // Skip external links
    if (typeof value === 'object' && value !== null && (value as Record<string, unknown>).href) {
      continue
    }

    // Skip hidden entries
    if (typeof value === 'object' && value !== null && (value as Record<string, unknown>).display === 'hidden') {
      continue
    }

    // Skip excluded subtrees
    if (EXCLUDED_SUBTREES.has(key)) {
      continue
    }

    // Determine the title
    const title = typeof value === 'string'
      ? value
      : (typeof value === 'object' && value !== null && (value as Record<string, unknown>).title)
        ? (value as Record<string, unknown>).title as string
        : key

    const entryPath = path.join(dir, key)
    // index entries map to the parent directory URL, not /parent/index
    const urlPath = key === 'index' ? urlPrefix : `${urlPrefix}/${key}`

    // Check if it's a directory with children
    if (fs.existsSync(entryPath) && fs.statSync(entryPath).isDirectory()) {
      const children = buildTree(entryPath, urlPath)

      // Check for a direct MDX file (e.g., data-services.mdx for a non-directory entry)
      // Directories: look for index.mdx or direct content files inside
      const indexMdx = path.join(entryPath, 'index.mdx')
      let description = ''
      let filePath = ''

      if (fs.existsSync(indexMdx) && !isRedirectPage(indexMdx)) {
        const fm = readFrontmatter(indexMdx)
        description = fm.description
        filePath = indexMdx
      }

      if (children.length > 0) {
        entries.push({
          slug: key,
          title,
          urlPath,
          description,
          filePath,
          children,
        })
      }
    } else {
      // It's a file entry — look for the MDX file
      // For 'index' key, look for index.mdx in the current directory
      const mdxPath = path.join(dir, `${key}.mdx`)
      if (!fs.existsSync(mdxPath)) continue

      // Skip redirect pages
      if (isRedirectPage(mdxPath)) continue

      const fm = readFrontmatter(mdxPath)

      entries.push({
        slug: key,
        title: fm.title || title,
        urlPath,
        description: fm.description,
        filePath: mdxPath,
      })
    }
  }

  return entries
}

/**
 * Strip MDX/JSX artifacts from content, leaving clean Markdown.
 */
function stripMdx(content: string): string {
  // Split by code fences to protect code blocks
  const parts = content.split(/(```[\s\S]*?```)/g)

  const cleaned = parts.map((part, i) => {
    // Odd indices are code blocks — leave them alone
    if (i % 2 === 1) return part

    let text = part

    // Remove import statements
    text = text.replace(/^import\s+.*$/gm, '')

    // Remove export statements (like redirect pages)
    text = text.replace(/^export\s+.*$/gm, '')

    // Strip <Callout> tags but keep inner content
    text = text.replace(/<Callout[^>]*>/g, '')
    text = text.replace(/<\/Callout>/g, '')

    // Convert <Cards.Card> to markdown links
    text = text.replace(/<Cards\.Card\s+title="([^"]*)"\s+href="([^"]*)"\s*\/>/g, '- [$1]($2)')
    // Also handle with children or other attribute orders
    text = text.replace(/<Cards\.Card\s+href="([^"]*)"\s+title="([^"]*)"\s*\/>/g, '- [$2]($1)')

    // Strip <Cards> wrapper tags
    text = text.replace(/<\/?Cards>/g, '')

    // Strip <Tabs> and <Tab> tags but keep inner content
    text = text.replace(/<Tabs[^>]*>/g, '')
    text = text.replace(/<\/Tabs>/g, '')
    text = text.replace(/<Tab[^>]*>/g, '')
    text = text.replace(/<\/Tab>/g, '')

    // Strip any remaining self-closing JSX tags
    text = text.replace(/<[A-Z][a-zA-Z.]*\s[^>]*\/>/g, '')

    // Strip any remaining opening/closing JSX component tags (uppercase = component)
    text = text.replace(/<\/?[A-Z][a-zA-Z.]*[^>]*>/g, '')

    return text
  }).join('')

  // Remove frontmatter (already extracted separately)
  const withoutFrontmatter = cleaned.replace(/^---[\s\S]*?---\n*/, '')

  // Collapse excessive blank lines (3+ → 2)
  return withoutFrontmatter.replace(/\n{3,}/g, '\n\n').trim()
}

/**
 * Flatten the tree into a list of sections for output.
 * Each section has a heading path and a list of pages.
 */
interface FlatSection {
  heading: string
  pages: NavEntry[]
}

function flattenTree(
  entries: NavEntry[],
  parentPath: string = '',
): FlatSection[] {
  const sections: FlatSection[] = []

  for (const entry of entries) {
    if (entry.children && entry.children.length > 0) {
      const sectionHeading = parentPath ? `${parentPath} > ${entry.title}` : entry.title

      // Collect leaf pages directly under this section
      const leafPages: NavEntry[] = []
      const subSections: NavEntry[] = []

      for (const child of entry.children) {
        if (child.children && child.children.length > 0) {
          subSections.push(child)
        } else {
          leafPages.push(child)
        }
      }

      if (leafPages.length > 0) {
        sections.push({ heading: sectionHeading, pages: leafPages })
      }

      // Recurse into subsections
      for (const sub of subSections) {
        sections.push(...flattenTree([sub], sectionHeading))
      }
    }
  }

  return sections
}

/**
 * Generate the /llms.txt content — an index of all doc pages.
 */
export function generateLlmsTxt(): string {
  const tree = buildTree(CONTENT_DIR, '')
  const lines: string[] = []

  // Header per llms.txt spec
  lines.push('# Human Passport')
  lines.push('')
  lines.push('> Human Passport is an identity verification application and Sybil resistance protocol. Developers can use Passport products and services to verify unique humanity and protect their communities from Sybils and bad actors.')
  lines.push('')

  const sections = flattenTree(tree)

  // Separate optional pages (changelog, community) from main content
  const mainSections: FlatSection[] = []
  const optionalPages: NavEntry[] = []

  for (const section of sections) {
    const main: NavEntry[] = []
    for (const page of section.pages) {
      const isOptional =
        page.urlPath.includes('/changelog') ||
        page.urlPath.startsWith('/community/')
      if (isOptional) {
        optionalPages.push(page)
      } else {
        main.push(page)
      }
    }
    if (main.length > 0) {
      mainSections.push({ heading: section.heading, pages: main })
    }
  }

  for (const section of mainSections) {
    lines.push(`## ${section.heading}`)
    for (const page of section.pages) {
      const desc = page.description ? `: ${page.description}` : ''
      lines.push(`- [${page.title}](${BASE_URL}${page.urlPath})${desc}`)
    }
    lines.push('')
  }

  if (optionalPages.length > 0) {
    lines.push('## Optional')
    for (const page of optionalPages) {
      const desc = page.description ? `: ${page.description}` : ''
      lines.push(`- [${page.title}](${BASE_URL}${page.urlPath})${desc}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Generate the /llms-full.txt content — full documentation as Markdown.
 */
export function generateLlmsFullTxt(): string {
  const tree = buildTree(CONTENT_DIR, '')
  const lines: string[] = []

  // Header
  lines.push('# Human Passport')
  lines.push('')
  lines.push('> Human Passport is an identity verification application and Sybil resistance protocol. Developers can use Passport products and services to verify unique humanity and protect their communities from Sybils and bad actors.')
  lines.push('')

  const sections = flattenTree(tree)

  for (const section of sections) {
    lines.push(`## ${section.heading}`)
    lines.push('')

    for (const page of section.pages) {
      lines.push(`### ${page.title}`)
      lines.push('')
      lines.push(`URL: ${BASE_URL}${page.urlPath}`)
      lines.push('')

      if (page.filePath && fs.existsSync(page.filePath)) {
        const raw = fs.readFileSync(page.filePath, 'utf-8')
        const stripped = stripMdx(raw)
        if (stripped) {
          lines.push(stripped)
        }
      }

      lines.push('')
      lines.push('---')
      lines.push('')
    }
  }

  return lines.join('\n')
}
