import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    defaultShowCopyCode: true
})

export default withNextra({
    output: 'export',
    images: {
        unoptimized: true
    }
})
