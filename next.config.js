const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    async redirects() {
        return [
            {
                source: '/get-started/creating-your-passport',
                destination: 'https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/creating-your-passport',
                permanent: true,
                basePath: false
            },
            {
                source: '/get-started/collecting-stamps',
                destination: 'https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/what-are-stamps',
                permanent: true,
                basePath: false
            },
            {
                source: '/get-started/presenting-your-passport',
                destination: 'https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/presenting-your-passport',
                permanent: true,
                basePath: false
            },
            {
                source: '/get-started/faq',
                destination: 'https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/common-questions',
                permanent: true,
                basePath: false
            },
            {
                source: '/overview/introducing-gitcoin-passport',
                destination: '/index.html',
                permanent: true
            },
            {
                source: '/overview/readme',
                destination: '/index.html',
                permanent: true
            },
            {
                source: '/overview/presenting-your-passport',
                destination: '/index.html',
                permanent: true
            },
            {
                source: '/overview/overview',
                destination: '/overview/why-gitcoin-passport',
                permanent: true
            },
            {
                source: '/overview/when-to-use-gitcoin-passport',
                destination: '/overview/use-cases',
                permanent: true
            },
            {
                source: '/building-with-passport/major-concepts',
                destination: '/overview/key-terms',
                permanent: true
            },
            {
                source: '/building-with-passport/how-it-works',
                destination: '/building-with-passport/introduction',
                permanent: true
            },
            {
                source: '/building-with-passport/scorer-api',
                destination: '/building-with-passport/introduction',
                permanent: true
            },
            {
                source: '/building-with-passport/scorer-api/api-access',
                destination: '/building-with-passport/getting-access',
                permanent: true
            },
            {
                source: '/building-with-passport/quick-start-guide',
                destination: '/building-with-passport/quick-start',
                permanent: true
            },
            {
                source: '/building-with-passport/integration-guides',
                destination: '/building-with-passport/tutorials',
                permanent: true
            },
            {
                source: '/building-with-passport/integration-guides/gating-access-with-passport-scores',
                destination: '/building-with-passport/tutorials/gating-access-with-passport-scores',
                permanent: true
            },
            {
                source: '/building-with-passport/integration-guides/integrating-stamps-and-scorers',
                destination: '/building-with-passport/tutorials/integrating-stamps-and-scorers',
                permanent: true
            },
            {
                source: '/building-with-passport/integration-guides/working-with-stamp-metadata',
                destination: '/building-with-passport/tutorials/working-with-stamp-metadata',
                permanent: true
            },
            {
                source: '/building-with-passport/integration-guides/requiring-a-passport-score-for-airdrop-claim',
                destination: '/building-with-passport/tutorials/requiring-a-passport-score-for-airdrop-claim',
                permanent: true
            },
            {
                source: '/building-with-passport/scorer-api/status-and-error-codes',
                destination: '/building-with-passport/major-concepts/status-and-error-codes',
                permanent: true
            },
            {
                source: '/building-with-passport/scorer-api/reading-passport-stamps',
                destination: '/building-with-passport/major-concepts/data-dictionary',
                permanent: true
            },
            {
                source: '/building-with-passport/passport-sdk-deprecated/getting-started',
                destination: '/building-with-passport/passport-sdk-deprecated',
                permanent: true
            },
            {
                source: '/building-with-passport/passport-sdk-deprecated/integrating-passport-in-your-dapp',
                destination: '/building-with-passport/passport-sdk-deprecated',
                permanent: true
            },
            {
                source: '/case-studies/bankless-academy',
                destination: '/use-cases',
                permanent: true
            },
        ]
    },
}
)

module.exports = withNextra()

