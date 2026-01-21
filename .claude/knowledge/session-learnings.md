# Session Learnings

Hard-won lessons from Claude Code sessions on this project.

---

## Git Safety (January 2026)

### Lost Migration Incident

A full Nextra 4 migration was lost due to branch confusion and uncommitted changes.

**What went wrong:**
1. Migration changes were made but existed only as uncommitted changes
2. Shell environment broke (working directory was deleted)
3. User switched branches to fix commit issues
4. Branch switch discarded all uncommitted changes
5. Migration work was completely lost

**Prevention rules:**
1. **Commit early and often** - Don't let large changes sit uncommitted
2. **Always run `git status` before switching branches** - Verify no uncommitted changes will be lost
3. **Verify current branch before committing** - Run `git branch --show-current`
4. **Don't delete directories the shell is working in** - This corrupts the shell environment
5. **After major work, immediately commit** - Even as WIP commit that can be amended later

### Safe Commit Workflow

```bash
# Before ANY branch operation:
git status                    # Check for uncommitted changes
git branch --show-current     # Verify you're on the right branch
git stash                     # If needed, save uncommitted work

# After completing work:
git add -A
git status                    # Verify what's being committed
git commit -m "message"
git log --oneline -1          # Verify commit landed
```

---

## Nextra 4 Migration Reference

If redoing the migration, here's the checklist:

### Files to Create
- `app/layout.tsx` - Theme config (navbar, footer, metadata)
- `app/[[...mdxPath]]/page.tsx` - Catch-all MDX route
- `app/analytics.tsx` - GTM page view tracking (client component)
- `mdx-components.tsx` - Component overrides
- `next.config.mjs` - ESM config (preserve redirects!)

### Files to Rename/Convert
- `pages/` → `content/`
- All `_meta.json` → `_meta.js`
- `next.config.js` → `next.config.mjs`

### Dependencies
```json
{
  "next": "^14.2.0",
  "nextra": "^4.2.0",
  "nextra-theme-docs": "^4.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "@next/third-parties": "^14.2.0"
}
```

### Key Gotchas
1. `_meta.js` external links need `type: 'page'` for navbar placement
2. Components: `Card` → `Cards.Card`, `Tab` → `Tabs.Tab`
3. tsconfig.json needs `"moduleResolution": "bundler"`
4. Search only works after `pnpm build` (Pagefind indexes HTML)

---

## Shell Environment

If Claude's shell breaks (all commands return exit code 1):
- Likely cause: Working directory was deleted or moved
- Fix: Restart Claude Code session
- Prevention: Don't delete directories while shell might be using them
