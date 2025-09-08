# Link Checking Setup

This repository includes automated link checking to maintain documentation quality.

## How it works

- **CI Pipeline**: Automated link checking runs on every PR and weekly via GitHub Actions
- **Internal Links**: Checked against the built site to catch 404s
- **External Links**: Checked but non-blocking to avoid false failures from temporary outages

## Configuration Files

- `.github/workflows/link-checker.yml`: GitHub Actions workflow
- `.lycheerc.toml`: Lychee link checker configuration

## Local Testing

To test link checking locally:

1. Build and start the site:
   ```bash
   npm run build
   npm start
   ```

2. Use browser dev tools or manual testing to verify links work correctly

## Maintenance

- Review link checker results in GitHub Actions
- Update exclusion patterns in `.lycheerc.toml` if needed
- Consider updating the workflow schedule as needed
