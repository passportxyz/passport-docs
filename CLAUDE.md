# CLAUDE.md

This file contains guidance for Claude Code when working on this repository.

**Important**: Read `.claude/knowledge.md` for detailed project knowledge and lessons learned.

## Project Overview

This is the Human Passport documentation site built with **Nextra 4** on **Next.js 14** (App Router).

## Key Commands

```bash
pnpm install    # Install dependencies (NOT npm install)
pnpm dev        # Run dev server (usually localhost:3000)
pnpm build      # Production build (required for search to work)
```

## Documentation Structure

- `content/` - All documentation content (NOT `pages/`)
- `content/_meta.ts` - Top-level navigation order (TypeScript, NOT JSON)
- Each folder has a `_meta.ts` to control navigation order within that section
- Files use `.mdx` extension (Markdown + JSX)
- `app/layout.tsx` - Theme configuration (navbar, footer, metadata)
- `app/globals.css` - CSS overrides for Tailwind v4 rotation bug fix

## Patterns to Follow

### Navigation
- Every new folder needs a `_meta.ts` file (TypeScript export default)
- Update parent `_meta.ts` when adding new sections
- Navigation order is determined by key order in `_meta.ts`
- If folder has `index.mdx` redirect, add `index: { display: 'hidden' }` to `_meta.ts`

### Content Style
- Use Nextra components: `import { Callout, Cards, Card, Tabs, Tab } from 'nextra/components'`
- Use `<Cards>` and `<Card>` for link grids
- Use `<Tabs>` and `<Tab>` for tabbed content
- Keep descriptions concise

## Individual Verifications Section

This section documents privacy-preserving identity verification (formerly Zeronym/Human ID).

### Source Documentation
- Original Zeronym docs: https://github.com/passportxyz/human-id-docs
- Live Zeronym docs: https://zeronym-docs.holonym.id/

### Important: Validate Before Migrating

When migrating content from Zeronym docs:

1. **Check for `hidden: true`** in frontmatter - these features may be deprecated
2. **Test all URLs before documenting them** - several domains are outdated:
   - `holonym.io` - redirects, often broken
   - `app.holonym.id` - SSL issues
   - `id.human.tech` - current working domain
3. **Test API endpoints** before documenting - use curl to verify responses
4. **Check npm packages exist** before documenting SDKs

### Working Endpoints (verified)
- `https://api.holonym.io/sybil-resistance/{credential-type}/{network}` - works
- `https://mainnet-rpc.sign.global/api/index/attestations` - works
- `https://id.human.tech/{verification-type}` - works
- `https://id.human.tech/{verification-type}?sandbox=true` - works for testnet

### Known Issues
- Custom action ID verification URL format is undocumented/broken
- Off-chain proofs feature is marked `hidden: true` in source - likely deprecated

### Test Addresses
These addresses have verified Individual Verifications and can be used for API testing:
- `0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7`
- `0x078Ea87Bd0B773DFdF674c3a31B9A785845c4503`

## Validation Workflow

**Always validate BEFORE documenting, not after.**

### For NPM Packages/SDKs
1. Check package exists: `npm show <package-name>`
2. Check last updated: `npm show <package-name> time --json`
3. Verify exports via type definitions: `curl https://unpkg.com/<package>@version/dist/index.d.ts`
4. Document only functions that actually exist in exports

Example for Human ID SDK:
```bash
npm show @holonym-foundation/human-id-sdk
curl -s 'https://unpkg.com/@holonym-foundation/human-id-sdk@0.2.0/dist/index.d.ts' | head -30
```

### For API Endpoints
1. Test with curl before documenting
2. Use real verified addresses for testing
3. Verify response format matches what you document

Example:
```bash
curl -s 'https://api.holonym.io/sybil-resistance/gov-id/optimism?user=0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7&action-id=123456789' | jq .
```

### For Third-Party Integrations (e.g., Snapshot)
1. Check the source code of the integration to verify config format
2. Don't just copy from old docs - verify against actual implementation

Example for Snapshot strategy:
```bash
curl -s 'https://raw.githubusercontent.com/snapshot-labs/snapshot-strategies/master/src/strategies/api/index.ts' | head -40
```

### Working Snapshot Endpoints (verified)
```bash
# Gov ID - returns {"score": [{"address": "...", "score": 1}]}
https://api.holonym.io/snapshot-strategies/sybil-resistance/gov-id?network=10&snapshot=12345678&addresses={addr}&action-id=123456789

# Phone
https://api.holonym.io/snapshot-strategies/sybil-resistance/phone?network=10&snapshot=12345678&addresses={addr}&action-id=123456789
```

## 📚 Mim Knowledge System

@.claude/knowledge/INSTRUCTIONS.md

@.claude/knowledge/KNOWLEDGE_MAP_CLAUDE.md