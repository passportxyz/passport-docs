# Individual Verifications API Endpoints

## Verified Working Endpoints

### Sybil Resistance API

```
https://api.holonym.io/sybil-resistance/{credential-type}/{network}?user={addr}&action-id={id}
```

**Credential types:** `gov-id`, `phone`
**Networks:** `optimism` (10), etc.

### Snapshot Strategies

```
https://api.holonym.io/snapshot-strategies/sybil-resistance/{gov-id|phone}?network=10&snapshot={block}&addresses={addr}&action-id={id}
```

Returns: `{"score": [{"address": "...", "score": 1}]}`

### Sign Protocol Attestations

```
https://mainnet-rpc.sign.global/api/index/attestations
```

### Verification UI

```
https://id.human.tech/{verification-type}
https://id.human.tech/{verification-type}?sandbox=true  # For testnet
```

## Test Addresses

For API verification testing:
- `0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7`
- `0x078Ea87Bd0B773DFdF674c3a31B9A785845c4503`

## Example Requests

```bash
# Gov ID check
curl -s 'https://api.holonym.io/sybil-resistance/gov-id/optimism?user=0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7&action-id=123456789' | jq .

# Snapshot strategy
curl -s 'https://api.holonym.io/snapshot-strategies/sybil-resistance/gov-id?network=10&snapshot=12345678&addresses=0x8dABc053C7Fda425826d913a58C0DC4C2a0B36d7&action-id=123456789' | jq .
```

## Related Files

- CLAUDE.md
