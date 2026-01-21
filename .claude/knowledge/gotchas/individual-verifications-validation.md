# Individual Verifications Source Validation

**Date discovered:** 2025-01-20

## Rule

**Must validate before migrating Zeronym docs.**

## Validation Steps

When working with Individual Verifications section (formerly Zeronym/Human ID):

1. **Check for `hidden: true`** in frontmatter - indicates deprecated features
2. **Test all URLs before documenting** - several domains are outdated:
   - `holonym.io` - redirects, often broken
   - `app.holonym.id` - SSL issues
   - `id.human.tech` - **current working domain**
3. **Test API endpoints** with curl before documenting
4. **Verify npm packages exist** before documenting SDKs
5. **Use sandbox mode** for testing: `?sandbox=true`

## Test Addresses

These addresses have verified Individual Verifications and can be used for API testing:

- `0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7`
- `0x078Ea87Bd0B773DFdF674c3a31B9A785845c4503`

## Related Files

- CLAUDE.md
- pages/building-with-passport/individual-verifications/
