# Individual Verifications Documentation

**Last updated:** 2026-01-22

## Current State

Individual Verifications docs have been cleaned up based on engineer feedback:

### Removed Features (no longer supported)
- **NEAR** - Chain support removed
- **Verax attestations** - Stopped issuing
- **Off-chain proofs** - Removed from codebase

### Simplified Features
- **Custom Action IDs** - Now points to contact form (only 1 partner used in 3 years)
- **SDK docs** - Lightweight page pointing to GitHub README

### Current Contract Addresses (Optimism)
- Hub: `0x2AA822e264F8cc31A2b9C22f39e5551241e94DfB`
- Sign Protocol: `0x945C44803E92a3495C32be951052a62E45A5D964`

## Validation Rules

When updating Individual Verifications docs:

1. **Test URLs** - Use `id.human.tech` (current domain)
2. **Test API endpoints** with curl before documenting
3. **Verify with engineer** before adding features
4. **Use sandbox mode** for testing: `?sandbox=true`

## Test Addresses

These have verified credentials for API testing:
- `0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7`
- `0x078Ea87Bd0B773DFdF674c3a31B9A785845c4503`

## Related Files

- content/building-with-passport/individual-verifications/
- Contact form for custom action IDs: https://tally.so/r/3X81KL
