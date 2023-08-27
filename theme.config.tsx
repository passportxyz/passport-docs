import { DocsThemeConfig } from 'nextra-theme-docs'
import { passportLogo } from './components/logo'
import NextScript from "next/script";

const config: DocsThemeConfig = {
  logo: passportLogo,
  project: {
    link: 'https://passport.gitcoin.co/',
  },
  chat: {
    link: 'https://discord.gg/gitcoin',
  },
  docsRepositoryBase: 'https://github.com/gitcoinco/passport-docs/tree/main',
  footer: {
    text: 'Gitcoin Passport docs',
  },
  faviconGlyph: "public/favicon.png",
};

const CustomHead: React.FC = () => (
  <>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@gitcoinpassport" />
    <meta name="twitter:image" content="https://docs.passport.gitcoin.co/social-card.png" />
    <meta name="og:title" content="Gitcoin Passport"  />
    <meta name="og:description" content="Gitcoin Passport — Sybil Defense. Made Simple."  />
    <meta name="og:image" content="https://docs.passport.gitcoin.co/social-card.png" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EDEYF2MWC5"></script>
    <NextScript>
    {/* Add the Google Analytics script */}
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-EDEYF2MWC5"
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EDEYF2MWC5');
        `,
      }}
    ></script>
  </NextScript>
  </>
);

export default { ...config, head: CustomHead };
