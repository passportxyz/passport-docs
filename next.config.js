const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
}
)

module.exports = withNextra({
    redirects: () => [
        {
            source: '/get-started/creating-your-passport',
            destination: 'https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/creating-your-passport',
            permanent: true,
            basePath: false
        },
        {
            source: '/overview/creating-your-passport',
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
            destination: '/',
            permanent: true
        },
        {
            source: '/overview/readme',
            destination: '/',
            permanent: true
        },
        {
            source: '/overview/presenting-your-passport',
            destination: '/',
            permanent: true
        },
        {
            source: '/overview/overview',
            destination: '/overview/why-passport-xyz',
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
            source: '/get-started/how-it-works',
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
            destination: '/building-with-passport/passport-api/getting-access',
            permanent: true
        },
        {
            source: '/building-with-passport/quick-start',
            destination: '/building-with-passport/passport-api/quick-start-guide',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides',
            destination: '/building-with-passport/passport-api-v1/tutorials',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides/gating-access-with-passport-scores',
            destination: '/building-with-passport/passport-api-v1/tutorials/gating-access-with-passport-scores',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides/integrating-stamps-and-scorers',
            destination: '/building-with-passport/passport-api-v1/tutorials/integrating-stamps-and-scorers',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides/working-with-stamp-metadata',
            destination: '/building-with-passport/passport-api-v1/tutorials/working-with-stamp-metadata',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides/requiring-a-passport-score-for-airdrop-claim',
            destination: '/building-with-passport/passport-api-v1/tutorials/requiring-a-passport-score-for-airdrop-claim',
            permanent: true
        },
        {
            source: '/building-with-passport/integration-guides/integrating-onchain-stamp-data',
            destination: '/building-with-passport/smart-contracts/integrating-onchain-stamp-data',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/integrating-onchain-stamp-data',
            destination: '/building-with-passport/smart-contracts/integrating-onchain-stamp-data',
            permanent: true
        },
        {
            source: '/building-with-passport/scorer-api/status-and-error-codes',
            destination: '/building-with-passport/passport-api/status-and-error-codes',
            permanent: true
        },
        {
            source: '/building-with-passport/scorer-api/reading-passport-stamps',
            destination: '/building-with-passport/passport-api/data-dictionary',
            permanent: true
        },
        {
            source: '/building-with-passport/scorer-api/endpoint-definition',
            destination: '/building-with-passport/passport-api/api-reference',
            permanent: true
        },
        {
            source: '/building-with-passport/passport-sdk-deprecated',
            destination: '/building-with-passport/introduction',
            permanent: true
        },
        {
            source: '/building-with-passport/passport-sdk-deprecated/getting-started',
            destination: '/building-with-passport/introduction',
            permanent: true
        },
        {
            source: '/building-with-passport/passport-sdk-deprecated/integrating-passport-in-your-dapp',
            destination: '/building-with-passport/introduction',
            permanent: true
        },
        {
            source: '/case-studies/bankless-academy',
            destination: '/use-cases',
            permanent: true
        },
        {
            source: '/building-with-passport',
            destination: '/building-with-passport/introduction',
            permanent: true
        },
        {
            source: '/building-with-passport/getting-access',
            destination: '/building-with-passport/passport-api/getting-access',
            permanent: true
        },
        {
            source: '/building-with-passport/quick-start-guide',
            destination: '/building-with-passport/passport-api/quick-start-guide',
            permanent: true
        },
        {
            source: '/building-with-passport/api-reference',
            destination: '/building-with-passport/passport-api/api-reference',
            permanent: true
        },
        {
            source: '/building-with-passport/major-concepts/data-dictionary',
            destination: '/building-with-passport/passport-api/data-dictionary',
            permanent: true
        },
        {
            source: '/building-with-passport/data-dictionary',
            destination: '/building-with-passport/passport-api/data-dictionary',
            permanent: true
        },
        {
            source: '/building-with-passport/major-concepts/status-and-error-codes',
            destination: '/building-with-passport/passport-api/status-and-error-codes',
            permanent: true
        },
        {
            source: '/building-with-passport/major-concepts/onchain-passports',
            destination: '/building-with-passport/smart-contracts/overview',
            permanent: true
        },
        {
            source: '/building-with-passport/contract-reference',
            destination: '/building-with-passport/smart-contracts/contract-reference',
            permanent: true
        },
        {
            source: '/building-with-passport/attestation-schema',
            destination: '/building-with-passport/smart-contracts/attestation-schema',
            permanent: true
        },
        {
            source: '/building-with-passport/major-concepts/platform-integrator-concepts',
            destination: '/building-with-passport/major-concepts/educating-users',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials',
            destination: '/building-with-passport/passport-api-v1/tutorials',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/client-side-scoring',
            destination: '/building-with-passport/passport-api-v1/tutorials/client-side-scoring',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/gating-access-with-passport-scores',
            destination: '/building-with-passport/passport-api-v1/tutorials/gating-access-with-passport-scores',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/integrating-stamps-and-scores',
            destination: '/building-with-passport/passport-api-v1/tutorials/integrating-stamps-and-scores',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/requiring-a-passport-score-for-airdrop-claim',
            destination: '/building-with-passport/passport-api-v1/tutorials/requiring-a-passport-score-for-airdrop-claim',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/working-with-stamp-metadata',
            destination: '/building-with-passport/passport-api-v1/tutorials/working-with-stamp-metadata',
            permanent: true
        },
        {
            source: '/building-with-passport/tutorials/integrating-onchain-stamp-data',
            destination: '/building-with-passport/smart-contracts/integrating-onchain-stamp-data',
            permanent: true
        },
        {
            source: '/building-with-passport/model-based-detection',
            destination: '/building-with-passport/model-based-detection/overview',
            permanent: true
        },
        {
            source: '/building-with-passport/passport-api',
            destination: '/building-with-passport/passport-api/overview',
            permanent: true
        },
        {
            source: '/building-with-passport/passport-api/tutorials',
            destination: '/building-with-passport/passport-api-v1/tutorials',
            permanent: true
        },
        {
            source: '/building-with-passport/major-concepts/scoring-mechanisms',
            destination: '/building-with-passport/introduction',
            permanent: true
        },
        {
            source: '/building-with-passport/airdrops',
            destination: '/building-with-passport/introduction',
            permanent: true
        }
    ]
})
