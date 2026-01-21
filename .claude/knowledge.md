# Project Knowledge Base

This file contains learned knowledge about the passport-docs project. Claude should read this at the start of sessions and update it with new discoveries.

---

## Project Overview

Human Passport documentation site. Currently on **Nextra 2.13 / Next.js 13** (Pages Router).

**Target state (migration pending):** Nextra 4 / Next.js 14 (App Router)

- **Package manager**: pnpm (not npm)
- **Content location**: `pages/` directory
- **Navigation config**: `_meta.json` files

---

## Nextra 4 Migration Plan

Migration was attempted but lost due to git issues. Here's the complete plan:

### Structural Changes Required

| Aspect | Current (Nextra 2) | Target (Nextra 4) |
|--------|----------|----------|
| Router | Pages Router | App Router |
| Config | `next.config.js` | `next.config.mjs` (ESM) |
| Theme | `theme.config.tsx` | `app/layout.tsx` |
| Content | `pages/` | `content/` |
| Navigation | `_meta.json` | `_meta.js` (ES modules) |
| Search | FlexSearch | Pagefind |

### Key Gotchas Discovered

1. **Navbar external links**: Must include `type: 'page'` in `_meta.js` or they appear in sidebar
2. **Component imports changed**: `Card` → `Cards.Card`, `Tab` → `Tabs.Tab`
3. **TypeScript**: Requires `"moduleResolution": "bundler"` in tsconfig.json
4. **Search**: Only works after `pnpm build` (Pagefind indexes built HTML)
5. **GTM**: Use `@next/third-parties/google` + `usePathname()` for page tracking

### Files to Create

```
app/
├── layout.tsx              # Theme config, navbar, footer
├── [[...mdxPath]]/
│   └── page.tsx            # Catch-all route for MDX
└── analytics.tsx           # GTM page view tracking (client component)
mdx-components.tsx          # MDX component overrides
```

### Migration Steps

1. Update package.json dependencies
2. Convert next.config.js → next.config.mjs (preserve redirects!)
3. Create app/ directory structure
4. Rename pages/ → content/
5. Convert all _meta.json → _meta.js
6. Fix component imports in MDX files
7. Test all pages and redirects
8. **COMMIT IMMEDIATELY**

---

## Redirects

The site has 85+ redirects in next.config for backward compatibility. These MUST be preserved during migration.

Key redirect patterns:
- `/building-with-passport/passport-api/*` → `/building-with-passport/stamps/passport-api/*`
- `/building-with-passport/passport-embed/*` → `/building-with-passport/embed/*`
- `/overview/why-passport-xyz` → `/overview/why-human-passport`

---

## Individual Verifications (Human ID)

### Working Test Addresses
- `0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7`
- `0x078Ea87Bd0B773DFdF674c3a31B9A785845c4503`

### Working Endpoints
- `https://api.holonym.io/sybil-resistance/{credential-type}/{network}`
- `https://id.human.tech/{verification-type}`
- `https://id.human.tech/{verification-type}?sandbox=true` (testnet)

### Known Issues
- Custom action ID verification URL format is undocumented
- Off-chain proofs feature is deprecated (`hidden: true` in source)

---

## Session Notes

**2026-01-21**: Attempted Nextra 4 migration. All changes completed and verified working on localhost. Lost during git branch confusion - uncommitted changes discarded on branch switch. See `.claude/knowledge/session-learnings.md` for details.
