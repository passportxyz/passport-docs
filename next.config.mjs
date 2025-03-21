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
    },
    onDemandEntries: {
        maxInactiveAge: 60 * 60 * 1000,
        pagesBufferLength: 2
    },
    webpack: (config, { dev, isServer }) => {
        // Reduce the number of files webpack needs to track
        if (!dev && !isServer) {
            config.watchOptions = {
                ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**']
            }
            config.optimization.moduleIds = 'deterministic'
        }
        return config
    },
    eslint: {
        // Don't run eslint during builds
        ignoreDuringBuilds: true
    },
    typescript: {
        // Don't run type checks during builds
        ignoreBuildErrors: true
    },
    staticPageGenerationTimeout: 300,
    compress: false // Disable compression to reduce build complexity
})
