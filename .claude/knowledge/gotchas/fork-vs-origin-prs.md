# Fork vs Origin PRs

**Date discovered:** 2026-01-22

## Issue

When updating a PR branch, you must push to the correct remote. PRs from forks require pushing to the fork, not the main repo.

## Symptoms

- `git push origin branch-name` succeeds but PR doesn't update
- GitHub API shows old commit SHA
- PR still shows conflicts after "successful" push

## Diagnosis

Check where the PR originates:

```bash
gh pr view {number} --json headRefName,headRepository,headRepositoryOwner
```

If `headRepositoryOwner` differs from the base repo owner, it's from a fork.

## Solution

Add the fork as a remote and push there:

```bash
# Add fork remote
git remote add {username} https://github.com/{username}/{repo}.git

# Push to fork
git push {username} {branch-name} --force
```

## Example

PR #113 was from `calebtuttle/passport-docs`, not `passportxyz/passport-docs`:

```bash
git remote add calebtuttle https://github.com/calebtuttle/passport-docs.git
git push calebtuttle caleb/individual-verifications-docs --force
```

## Related

- GitHub CLI: `gh pr checkout` sets up tracking correctly
- Force push may be needed after rebase
