# Onchain expirations

Passport Stamps do not stay valid forever. There is an expiration date after which a Stamp must be reverified in order to keep it valid. This is true for onchain and offchain Stamps.

## Passport attestations

For Passport attestations, there is a key in the schema called `Expiration Dates`. The value associated with this key is an array of hex-encoded dates, each corresponding to a specific Stamp. There is also an equivalent key, `IssuanceDate` whose values encode the date when a particular Stamp was verified.

New attestations can be issued with updated `IssuanceDate` and `expirationDate` values through the Passport app.

Here's an example of a [Passport attestation](https://optimism.easscan.org/attestation/view/0x6eefab4afe1610e21c8d7e7cd1d4f4d70fd753fc2bfe6b04ad4bd01dec86c81a)

## Score attestations

Onchain scores do not have an explicit expiry date associated with them. If you are an integrator, you could use the attestation transaction time as a proxy for the issuance date if the age of the score is important for your application. As a rule of thumb, we recommend expiring scores 90 days after it was created.

Here's an example of a [score attestation](https://optimism.easscan.org/attestation/view/0x5beb4300ff732dce2bdec86fb97df3a23787c9f1ff90c06bff6bc86dea74aa6c).
