---
description: >-
  Questions commonly asked by web3 citizens who have or are looking to create a
  Passport (to prove their humanity or build their decentralized identity)
---

# FAQ for Passport Holders

<details>

<summary>What data is stored in my Passport</summary>

The only information in your passport is the Decentralized Identifier (DID) associated with your Ethereum address and the Verifiable Credentials (VCs) issued for each service you connect to your passport. No identifiable details are stored in your passport as we encrypt the account details when creating your VCs.

You can inspect the data yourself in the Gitcoin Passport by clicking the `</> Passport JSON` button in the upper right of the Passport dashboard.

</details>

<details>

<summary>Who can read this data?</summary>

The data on Ceramic is readable to anyone, but can only be written by you.

Knowing your ethereum address, or your DID, or your Ceramic Stream ID the data can be fetched from Ceramic, and your Passport can be read.

</details>

<details>

<summary>Am I going to get doxxed?</summary>

Short answer. No. There is no personally identifiable information stored in your passport.

We do store a unique identifier in the VCs that we generate, but this is hashed and salted with a private key, and is not brute-forceable, it's only function is to create a unique fingerprint for the VC-account relationship for the purposes of deduping during scoring.

</details>

<details>

<summary>Could someone triangulate all my stamps to figure out who I am?</summary>

Currently this seems impossible given the few number of stamps, and the low level of specificity to the claims that are being validated (currently only account ownership).&#x20;

But in the future, as the number of stamps grows and the uniqueness of each passport increases this may become a risk even while keeping PII out of the stamps. We are very concerned about privacy and will be watching this potential vector to mitigate any chances users may reveal their identity in ways they aren't intending.&#x20;

To reiterate, this is type of accidental doxxing is not possible with the current version of the passport.

</details>

<details>

<summary>Who can write into my Passport?</summary>

Only you can write into your passport. This is important, you grant access to apps that you visit when you sign a message with your wallet granting access to your stream (like when you connect to the Gitcoin Passport app). Your Passport requires your unique wallet signature to allow write operations, and only apps that want to write to your passport need to request you to sign those messages.

</details>



