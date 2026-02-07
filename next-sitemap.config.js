/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://docs.passport.xyz",
  generateRobotsTxt: true,
  exclude: [
    // Retired v1 API pages - excluded from search engines and AI crawlers
    '/building-with-passport/stamps/passport-api-v1',
    '/building-with-passport/stamps/passport-api-v1/*',
    // LLM-friendly docs (utility files, not doc pages)
    '/llms.txt',
    '/llms-full.txt',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/building-with-passport/stamps/passport-api-v1'],
      },
    ],
  },
};
