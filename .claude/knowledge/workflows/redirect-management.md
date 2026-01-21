# Redirect Management

## Overview

The site maintains 60+ redirects in `next.config.js` to support legacy URLs.

## Redirect Categories

- **User-facing pages** - Redirecting to support.gitcoin.co
- **Old API paths** - Redirecting to new `/stamps/passport-api/` structure
- **Deprecated SDK paths** - Redirecting to current locations
- **Section reorganizations** - e.g., passport-embed -> embed

## Best Practices

1. When adding new content, check if old URLs need redirects
2. Use `permanent: true` for SEO (301 redirects)
3. Test redirects after deployment

## Related Files

- next.config.js
