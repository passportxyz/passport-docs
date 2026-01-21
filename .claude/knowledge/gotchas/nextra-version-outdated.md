# Nextra Version Outdated

**Date discovered:** 2025-01-20

## Issue

Current setup uses Nextra 2.13.2 which is significantly outdated. Nextra 4.x (current: 4.6.1) is available.

## Migration Requirements for Nextra 4.x

- Pages Router (`pages/`) must become App Router (`app/` + `content/`)
- `theme.config.tsx` must be converted to Layout component props in `app/layout.tsx`
- `_meta.json` files must become `_meta.js` (ES modules)
- Search engine changes from FlexSearch to Pagefind (Rust-based)
- Requires Next.js 14+

## Impact

- Missing newer Nextra features
- Eventually may need migration for security updates

## Related Files

- package.json
- theme.config.tsx
- next.config.js
