import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    // Disable all tracing and optimization
    productionBrowserSourceMaps: false,
    optimizeFonts: false,
    swcMinify: false,
    compiler: {
        removeConsole: false
    },
    experimental: {
        // Disable all experimental features
        turbotrace: false,
        optimizeCss: false,
        optimizePackageImports: false,
        serverActions: false,
        webpackBuildWorker: false,
        swcTraceProfiling: false,
        forceSwcTransforms: false,
        esmExternals: false
    },
    // Increase timeouts
    staticPageGenerationTimeout: 1000,
    distDir: '.next',
    cleanDistDir: true,
    generateEtags: false,
    keepAlive: false,
    reactStrictMode: false,
    compress: false,
    poweredByHeader: false,
    generateBuildId: () => 'build'
}

export default withNextra(nextConfig)
