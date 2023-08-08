---
description: >-
  Questions commonly asked by web3 citizens who have or are looking to create a
  Passport (to prove their humanity or build their decentralized identity)
---

# FAQ for Passport Holders

## What data is stored in my Passport

The only information in your passport is the Decentralized Identifier (DID) associated with your Ethereum address and the Verifiable Credentials (VCs) issued for each service you connect to your passport. No identifiable details are stored in your passport as we encrypt the account details when creating your VCs.

You can inspect the data yourself in the Gitcoin Passport by clicking the `</> Passport JSON` button in the upper right of the Passport dashboard.


## Who can read this data?

The data on Ceramic is readable to anyone, but can only be written by you.

Knowing your Ethereum address, or your DID, or your Ceramic Stream ID the data can be fetched from Ceramic, and your Passport can be read.


## Am I going to get doxxed?

Short answer. No. There is no personally identifiable information stored in your Passport.

We do store a unique identifier in the VCs that we generate, but this is hashed and salted with a private key, and is not brute-forceable, it's only function is to create a unique fingerprint for the VC-account relationship for the purposes of deduplicating during scoring.


## Could someone triangulate all my stamps to figure out who I am?

Currently this seems impossible given the few number of Stamps, and the low level of specificity to the claims that are being validated (currently only account ownership).&#x20;

But in the future, as the number of Stamps grows and the uniqueness of each Passport increases this may become a risk even while keeping PII out of the stamps. We are very concerned about privacy and will be watching this potential vector to mitigate any chances users may reveal their identity in ways they aren't intending.&#x20;

To reiterate, this is type of accidental doxxing is not possible with the current version of the Passport.


## Who can write into my Passport?

Only you can write into your Passport. This is important, you grant access to apps that you visit when you sign a message with your wallet granting access to your stream (like when you connect to the Gitcoin Passport app). Your Passport requires your unique wallet signature to allow write operations, and only apps that want to write to your Passport need to request you to sign those messages.


## How are scores calculated? Can the algorithm change?

The Gitcoin Passport server implements a scoring algorithm that sums the weights of all the individual Stamps owned by an address. The weights are assigned by Gitcoin developers and can be found on the [Gitcoin Github](https://github.com/gitcoinco/passport-scorer/blob/43833b4d68a4c20abe6bc99af78dab119b84b9a2/api/scorer/settings/gitcoin\_passport\_weights.py#L4).&#x20;


These weights can change if Gitcoin developers find that different weights offer overall better Sybil defence. If the weights aren't right for your use-case, you are always free to implement your own scoring algorithm using Stamp data retrieved from the [Passport API](../building-with-passport/scorer-api/) (just remember you need to consider [Stamp deduplication](deduplicating-stamps.md)).



There will also be additional scoring mechanisms available via the Scorer app in the future.


## Is the set of Stamps fixed?

No. Stamps can be added and removed from the Stamp registry.&#x20;

You can [add a Stamp](../stamps/integrating-a-new-stamp.md) for your community. This means it is possible that you could have to update your gating algorithm if a Stamp you rely on gets removed. We will always give notice and support users affected by changing Stamps.

