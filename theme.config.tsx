import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Gitcoin Passport</span>,
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
  faviconGlyph: "/public/favicon.svg"

}

export default config
