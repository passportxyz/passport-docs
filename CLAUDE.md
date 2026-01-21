# CLAUDE.md

This file contains guidance for Claude Code when working on this repository.

## Project Overview

This is the Human Passport documentation site built with Nextra (Next.js-based documentation framework).

## Key Commands

```bash
pnpm install    # Install dependencies (NOT npm install)
pnpm dev        # Run dev server (usually localhost:3000)
```

## Documentation Structure

- `pages/` - All documentation content
- `pages/_meta.json` - Top-level navigation order
- Each folder can have a `_meta.json` to control navigation order within that section
- Files use `.mdx` extension (Markdown + JSX)

## Patterns to Follow

### Navigation
- Every new folder needs a `_meta.json` file
- Update parent `_meta.json` when adding new sections
- Navigation order is determined by key order in `_meta.json`

### Content Style
- Use Nextra components: `import { Callout } from 'nextra/components'`
- Use `<Cards>` and `<Card>` for link grids
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
