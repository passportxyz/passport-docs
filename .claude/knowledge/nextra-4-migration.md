# Nextra 4 Migration Learnings

## Key Architectural Changes (Nextra 2 → 4)

### Directory Structure
- **Content location**: `pages/` → `content/`
- **App Router required**: Must create `app/` directory with layout and dynamic page
- **Config format**: `next.config.js` (CommonJS) → `next.config.mjs` (ESM)

### Required Files for Nextra 4

```
app/
├── layout.tsx              # Root layout with theme components
└── [[...mdxPath]]/
    └── page.tsx            # Dynamic MDX page renderer

content/                    # MDX content (was pages/)
├── _meta.json
└── ...

mdx-components.tsx          # MDX component configuration
next.config.mjs             # ESM config with nextra()
theme.config.tsx            # Theme settings (simplified)
```

### app/layout.tsx Pattern
```tsx
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={<Navbar logo={...} />}
          pageMap={pageMap}
          docsRepositoryBase="..."
          footer={<Footer />}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
```

### app/[[...mdxPath]]/page.tsx Pattern
```tsx
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

export default async function Page(props) {
  const params = await props.params
  const { default: MDXContent, toc, metadata } = await importPage(params.mdxPath)
  const Wrapper = useMDXComponents().wrapper
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
```

### next.config.mjs Pattern
```js
import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/content'
})

export default withNextra({
  // Next.js config here (redirects, etc.)
})
```

### mdx-components.tsx Pattern
```tsx
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components) {
  return { ...docsComponents, ...components }
}
```

## Breaking Changes to Watch For

### Hooks
- `useRouter` from `next/router` → NOT available in App Router
- `useConfig` from `nextra-theme-docs` → Different API in v4
- Metadata handling moved to `app/layout.tsx` via Next.js metadata export

### Type Exports
- `DocsThemeConfig` type no longer exported from `nextra-theme-docs`
- Use plain object for theme config or infer types

### Component Imports
```tsx
// Nextra 4
import { Callout, Cards, Card, Tabs, Tab } from 'nextra/components'
```

## Migration Checklist

1. [ ] Update dependencies in package.json
   - nextra: ^4.2.0
   - nextra-theme-docs: ^4.2.0
   - next: ^14.2.0

2. [ ] Rename `pages/` → `content/`

3. [ ] Create `app/layout.tsx` with theme setup

4. [ ] Create `app/[[...mdxPath]]/page.tsx` for MDX rendering

5. [ ] Create `mdx-components.tsx` in project root

6. [ ] Convert `next.config.js` → `next.config.mjs` with ESM syntax

7. [ ] Simplify `theme.config.tsx` (remove hooks, move metadata to layout)

8. [ ] Delete old `pages/` directory files

9. [ ] Run `pnpm build` to verify

## Google Analytics / GTM

Old Nextra 2 used `react-gtm-module` in theme.config.tsx. For Nextra 4 with App Router, use `@next/third-parties`:

```tsx
// app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google'

const GTM_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({ children }) {
  return (
    <html>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>{children}</body>
    </html>
  )
}
```

## Common Errors

### "Couldn't find any pages or app directory"
- Nextra 4 requires App Router
- Create `app/` directory with layout.tsx and [[...mdxPath]]/page.tsx

### "next/router is not supported in App Router"
- Remove `useRouter` from `next/router`
- Use `usePathname` from `next/navigation` if needed
- Or handle routing in layout/page components

### "DocsThemeConfig has no exported member"
- Type export changed in v4
- Remove type annotation or use inferred types

### Git timestamp warnings
- Normal for newly created/moved files not yet committed
- Warnings disappear after committing

## Vercel Deployment Issues (CRITICAL)

### CSS Rotation Bug (Tailwind v4)

**Symptom**: Page content renders upside down (180° rotated) on Vercel but works locally.

**Root Cause**: Nextra 4 uses Tailwind CSS v4 which has an overly broad CSS selector:
```css
.x\:ltr\:rotate-180, ... {
  &:where(:dir(ltr),[dir=ltr],[dir=ltr] *) {
    rotate: 180deg;
  }
}
```

The `[dir=ltr] *` matches ALL descendants of `<html dir="ltr">`, rotating everything.

**Fix**: Create `app/globals.css` with overrides:
```css
/* Reset rotation for all elements */
*:where(:dir(ltr), [dir=ltr], [dir=ltr] *) {
  rotate: initial !important;
}

/* Re-apply rotation only where Nextra needs it */
.x\:ltr\:rotate-180:where(:dir(ltr), [dir=ltr], [dir=ltr] *) {
  rotate: 180deg !important;
}

.x\:rtl\:rotate-180:where(:dir(rtl), [dir=rtl], [dir=rtl] *) {
  rotate: 180deg !important;
}
```

Then import in `app/layout.tsx` AFTER the theme CSS:
```tsx
import 'nextra-theme-docs/style.css'
import './globals.css'  // Override must come after
```

### Vercel Cache Issues

**Symptom**: Stale CSS files from previous deployments interfering with new builds.

**Fix**:
1. Vercel Dashboard → Settings → General → Build Cache → Purge Everything
2. Redeploy with "Use existing Build Cache" UNCHECKED

## Navigation/Sidebar Issues

### Duplicate Folder Entries in Sidebar

**Symptom**: Each folder shows a duplicate entry with the folder name that 404s.

**Root Cause**: Folders have `index.mdx` redirect files, but `_meta.ts` doesn't include `index`, so Nextra auto-generates an entry.

**Fix**: Add `index: { display: 'hidden' }` to each `_meta.ts`:
```ts
export default {
  index: { display: 'hidden' },  // Hide the auto-generated index link
  'first-page': 'First Page',
  'second-page': 'Second Page',
}
```

### _meta.ts Pattern for Folders with Redirects

If a folder has `index.mdx` that redirects to the first content page:
```tsx
// content/section/index.mdx
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('./first-page')
}
```

The `_meta.ts` MUST hide it:
```ts
// content/section/_meta.ts
export default {
  index: { display: 'hidden' },
  'first-page': 'First Page',
}
```

## File Format Changes

### _meta files
- Nextra 4 uses `_meta.ts` (TypeScript) not `_meta.json`
- Export default object pattern:
```ts
export default {
  'page-name': 'Display Title',
  folder: 'Folder Title',
  externalLink: {
    title: 'External',
    type: 'page',
    href: 'https://example.com'
  },
  '---': { type: 'separator' },
}
```
