# Nextra 4 Migration Complete

**Date completed:** 2026-01-22

## Status

✅ **Migration complete.** Site now runs on Nextra 4 with Next.js 14 App Router.

## What Changed

- `pages/` → `content/` (all MDX files moved)
- `_meta.json` → `_meta.ts` (ES modules)
- `theme.config.tsx` → `app/layout.tsx`
- `next.config.js` → `next.config.mjs`
- Search: FlexSearch → Pagefind

## Deployment Notes

Vercel deployment required cache-busting due to aggressive caching:
- Added `vercel.json` with `cleanUrls`
- Added `.npmrc` for build scripts
- Pinned Node.js to 20+

## Related Files

- app/layout.tsx
- content/_meta.ts
- next.config.mjs
- vercel.json
