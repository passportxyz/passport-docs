---
description: Rationale and sneak-peek at onchain Passport data
---

# Onchain Passports

First off, you can learn more about retrieving onchain Passport data by working through the following tutorial:

[Integrating onchain Stamp data](../integration-guides/integrating-onchain-stamp-data.md)

### Why would we want Stamps to be onchain?

Smart contracts are only aware of data that lives onchain. Gitcoin Passport Stamp data currently lives offchain and is therefore not available to smart contracts unless it is supplied by an oracle service or bundled into transaction data, both relying on some permissioned offchain operator.

Take [Gitcoin Grants](https://grants.gitcoin.co/) as an example. They are migrating from being a centralized platform to a permissionless protocol that relies heavily on coordination via smart contracts. Gitcoin Passport is an excellent choice for filtering bots and other malicious participants out of the grant rounds. However, because Stamps are currently created and stored offchain, the participant filtering has to happen offchain, adding a centralized operator back into the stack.

A better solution is to create Passport scores and stamps using onchain primitives. Fully onchain Passport data would be available to smart contracts natively, making it easier and cheaper to execute logic based on Stamp data. The benefit of this is transparency and forkability - if you don't like how Gitcoin manages their funding rounds then you can fork the smart contracts and still benefit from Passport's Stamp and scoring tools. Don't like Passport's scoring algorithm? Fork the contract and deploy your own version. With onchain Passport infrastructure you can be confident that all the data and tooling you need is available on Ethereum and not locked away in a centralized database or dependant upon an opaque API.

### Offchain stamps

Gitcoin Passport Stamps are stored on the Ceramic network. One of the great features of Ceramic is a tight integration with Ethereum that enables Passport holders to sign events and grant permissions straight from their Ethereum account. However, Ceramic is not part of the Ethereum blockchain - it is a peer-to-peer network in its own right. This means that Ceramic data is not accessible to smart contracts on Ethereum unless:

a) Stamp data is passed to Ethereum as transaction `CALLDATA` and used in smart contract function execution b) some oracle system is established to bring Stamp data onchain

However, option a) is very expensive, and option b) requires complex decentralized infrastructure to be established first. Both options would ultimately rely on an offchain, likely centralized, operator to generate Stamp and score data offchain so it can be added to transactions or feed Stamp data to an oracle service.

### Onchain Stamps

Instead, Stamps can be created using onchain web3 primitives. This way, stamp data could live onchain and be instantly accessible to smart contracts. This would enable systems such as quadratic funding, voting and access control to exist entirely onchain.

The Passport team has developed a method for optionally migrating a user's Stamps onchain using the Ethereum Attestation Service. Users will have the option to mint all their offchain data onchain in a single click.&#x20;

Onchain Stamps are currently only available on Ethereum testnets - specifically BaseGoerli. This is a network that is only used for testing and development - it does not handle real world value or real apps. However, productions deploys on Ethereum and a selection of Ethereum layer 2s is coming soon.

### How do onchain Stamps work?

Onchain Stamp data is handled by a set of smart contracts. The Gitcoin Passport smart contracts build on top of [EAS (Ethereum Attestation Service)](https://attest.sh/), using Attestations as the foundational building blocks.&#x20;

Attestations are digital records that are cryptographically signed by some trusted attester. In this case, Gitcoin signs to verify that a user has a particular set of Stamps. Attestations conform to schema. Schema are predefined structures for Attestations that ensure all the necessary data are included when an Attestation is created, and that it can be decoded and verified easily.&#x20;

Gitcoin has an attester contract that allows trusted Gitcoin addresses to create attestations, confirming to the schema, that demonstrate that a user owns some set of Stamps. The attestation contains all the necessary metadata about those Stamps. The `Attestation` has a unique identifier (`uuid`) that connects all this data to the user's specific address.

As an app builder, you are interested in retrieving the Attestation for a given address. To do this you use the Resolver contract. This accepts an address and returns the associated `uuid` that you can then pass to the EAS contract to retrieve the attestation, which you can then decode and use in your app.

So your flow is:

* get user address
* pass user address to resolver contract, returning a unique attestation identifier (`uuid`)
* pass the `uuid` to the EAS contract, returning an `Attestation`
* decode and unpack the `Attestation,` returning the user's Stamp data&#x20;

### Why isn't Passport onchain by default?

Onchain Stamps are opt-in. You do not have to migrate your Stamps onchain to use Gitcoin Passport - it is up to you, the user. It is important to have an offchain source of truth and a stable offchain infrastructure users can use while onchain Stamps grow and mature.&#x20;

Onchain Stamps are likely to become more and more popular as more and more online activity moves onchain. However, not all users will want to use them. There is a small cost involved in migrating Stamps onchain and some users may find their needs are met by the offchain versions for the foreseeable future.

### Timeline

The Passport team are currently testing the necessary smart contracts on the Sepolia testnet. Watch this space for details about the Mainnet launch!
