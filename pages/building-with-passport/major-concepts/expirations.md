# Expirations

Stamps and scores eventually become invalid. This is a security feature that provides a degree of confidence that the Stamps and scores you query in your application are still valid. 

Without some mechanism for Stamp expiry, a Stamp issued once would remain valid forever, even if the evidence supporting that Stamp or score had long since changed. 

For example, a user could mint a Stamp using an account on some Web2 service in the small window between creating the account and it being shut down by the service's compliance team. Without expiry, you would not be able to tell, but with expiry, after some time the user would simply not be able to reverify the Stamp. 

The shorter the time between the issuance date and the expiration date, the more security you gain, but the trade off is that the user experience deteriorates because users are forced to reverify frequently.


## Offchain Stamps

Offchain Stamps expire after 90 days. This is handled by the Gitcoin server. You can bump the expiry date by another 90 days by reverifying your Stamps on the [Passport app](https://passport.gitcoin.co/).


## Onchain Stamps

Like offchain Stamps, onchain Stamps also expire. For Passport attestations, there is a key in the schema called `Expiration Dates`. An integrator can query this field to see whether the current time is later or earlier than the `expiryDate` and use this to determine whether a Stamp has expired. The `expiryDate` is automatically set to 90 days after the `issuanceDate`. Reverification requires issuing a new Passport attestation.

Onchain scores do not have an explicit expiry date associated with them. Integrators can use the attestation transaction time as a proxy for the issuance date. As a rule of thumb, we recommend expiring scores 90 days after it was created. Offchain Stamps also expire after 90 days.

You can read more detail about onchain Samp and score expiry [here](../smart-contracts/onchain-expirations.md).
