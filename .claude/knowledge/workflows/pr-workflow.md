# PR Workflow

**Added:** 2026-01-22

## Rule

**Always use PRs for changes - never push directly to main.**

## Why

1. **Vercel preview deployments** - PRs trigger automatic preview builds
2. **Review** - Changes can be reviewed by team members before merging
3. **Rollback** - Easier to revert if issues are found

## Process

1. Create a feature branch from main
2. Make changes and commit
3. Push branch and create PR
4. Wait for Vercel preview deployment
5. Get review if needed
6. Merge PR

## Example

```bash
git checkout -b fix/search-setup
# make changes
git add .
git commit -m "Fix search setup"
git push origin fix/search-setup
gh pr create --title "Fix search setup" --body "Description of changes"
```

## Exceptions (can push directly to main)

- `.claude/` directory (Mim knowledge, agents, scripts)
- `CLAUDE.md` updates
- Internal documentation that doesn't affect the live site
- Urgent hotfixes (discuss with team lead first)
