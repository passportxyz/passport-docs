# Documentation Framework

## Overview

Human Passport documentation site built with **Nextra 4** on **Next.js 14** (App Router). Migration from Nextra 2 completed January 2026.

## Key Files

- `app/layout.tsx` - Theme configuration (navbar, footer, metadata)
- `next.config.mjs` - Nextra wrapper with redirect mappings
- `content/` - All MDX documentation content
- Each folder has a `_meta.ts` for navigation ordering

## Content Structure

```
content/
├── overview/           # Why Human Passport, key terms, changelog
├── building-with-passport/
│   ├── stamps/         # Passport API, smart contracts, major concepts
│   ├── embed/          # Passport Embed component
│   ├── models/         # ML-based sybil detection
│   └── individual-verifications/  # Privacy-preserving KYC
└── community/          # Getting involved, style guide
```

## Nextra 4 Changes from 2.x

| Aspect | Nextra 2.x | Nextra 4.x |
|--------|------------|------------|
| Content location | `pages/` | `content/` |
| Router | Pages Router | App Router |
| Meta files | `_meta.json` | `_meta.ts` |
| Theme config | `theme.config.tsx` | `app/layout.tsx` |
| Search | FlexSearch | Pagefind (Rust) |

## Related Files

- app/layout.tsx
- next.config.mjs
- content/_meta.ts
- mdx-components.tsx
