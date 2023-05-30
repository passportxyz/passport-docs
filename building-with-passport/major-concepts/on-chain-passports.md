---
description: Rationale and sneak-peek at on-chain Passport data
---

# On-chain Passports

:rotating\_light: **On-chain stamps are not available yet, but they are coming soon!** :rotating\_light:

### Why would we want stamps to be on-chain?

Smart contracts are only aware of data that lives on-chain. Gitcoin Passport stamp data currently lives off-chain and is therefore not available to smart contracts unless it is supplied by an oracle service or bundled into transaction data, both relying on some permissioned off-chain operator.

Take Gitcoin Grants as an example. They are migrating from being a centralized platform to a permissionless protocol that relies heavily on coordination via smart contracts. Gitcoin Passport is an excellent choice for filtering bots and other malicious participants out of the grant rounds. However, because stamps are currently created and stored offchain, the participant filtering has to happen off chain, adding a centralized operator back into the stack.

A better solution is to create Passport scores and stamps using on-chain primitives. Fully on-chain Passport data would be available to smart contracts natively, making it easier and cheaper to execute logic based on stamp data. The benefit of this is transparency and forkability - if you don't like how Gitcoin manages their funding rounds then you can fork the smart contracts and still benefit from Passport's stamp and scoring tools. Don't like Passport's scoring algorithm? Fork the contract and deploy your own version. With on chain Passport infrastructure you can be confident that all the data and tooling you need is available on Ethereum and not locked away in a centralized database or dependant upon an opaque API.

### Today's stamps

Today's Gitcoin Passport stamps are stored on the Ceramic network. One of the great features of Ceramic is a tight integration with Ethereum that enables Passport holders to sign events and grant permissions straight from their Ethereum account. However, Ceramic is not part of the Ethereum blockchain - it is a peer-to-peer network in its own right. This means that Ceramic data is not accessible to smart contracts on Ethereum unless:

a) stamp data is passed to Ethereum as transaction `CALLDATA` and used in smart contract function execution b) some oracle system is established to bring stamp data onchain

However, option a) is very expensive, and option b) requires complex decentralized infrastructure to be established first. Both options would ultimately rely on an offchain, likely centralized, operator to generate stamp and score data off-chain so it can be added to transactions or feed stamp data to an oracle service.

### On-chain stamps

Instead, stamps can be created using on-chain web3 primitives. This way, stamp data could live on chain and be instantly accessible to smart contracts. This would enable systems such as quadratic funding, voting and access control to exist entirely on-chain.

The Passport team is currently developing a method for optionally migrating a user's stamps on-chain using the Ethereum Attestation Service. Users will have the option to mint all their off-chain data on-chain in a single click. It is likely this will deploy on Ethereum Mainnet and also a selection of Layer 2s so that gas costs are minimized.

### Why isn't Passport on-chain by default?

On-chain stamps have not yet been rolled out, and when they are they will be opt-in. There are several reasons for this. First, it is expensive to migrate a stamp on Ethereum Mainnet, and deploying to a Layer 2 first requires decisions about which Layer 2(s) to prioritize, and how to ensure consistency across multiple chains. While on-chain stamps are in their infancy, the off-chain stamp is useful as a single source of truth that on-chain stamps can verify against. Today, as the migration on-chain is relatively nascent, it is helpful to be able to iterate quickly on design decisions using an off-chain model.&#x20;

### Timeline

The Passport team are currently testing the necessary smart contracts on the Sepolia testnet. Watch this space for details about the Mainnet launch!
