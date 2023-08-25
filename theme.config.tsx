import { DocsThemeConfig } from 'nextra-theme-docs'
import { passportLogo } from './components/logo'

const config: DocsThemeConfig = {
  logo: passportLogo,
  project: {
    link: 'https://passport.gitcoin.co/',
  },
  chat: {
    link: 'https://discord.gg/gitcoin',
  },
  docsRepositoryBase: 'https://github.com/gitcoinco/passport-docs',
  footer: {
    text: 'Gitcoin passport documentation',
  },
  faviconGlyph: "public/favicon.png",
}

export default config
