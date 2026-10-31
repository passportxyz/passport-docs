import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

const SITE = 'https://docs.passport.human.tech'

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  const Wrapper = useMDXComponents().wrapper

  const md = metadata as { title?: unknown; description?: unknown } | undefined
  const title = typeof md?.title === 'string' ? md.title : undefined
  const description = typeof md?.description === 'string' ? md.description : undefined
  const path = (params.mdxPath ?? []).join('/')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title || 'Human Passport Documentation',
    ...(description ? { description } : {}),
    url: path ? `${SITE}/${path}` : SITE,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'Human Passport Developer Docs', url: SITE },
    publisher: { '@type': 'Organization', name: 'human.tech', url: 'https://human.tech' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </>
  )
}
