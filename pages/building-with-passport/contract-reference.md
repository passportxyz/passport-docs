# Contract Reference

The Gitcoin smart contract stack allows developers to pull Stamp data directly from the blockchain rather than having to make requests to a centralized server. The smart contract stack is built on top of the Ethereum Attestation Service. This page will outline the smart contract stack and provide all the deployment details you need to integrate onchain Stamp data in your app. 


## Overview

The flow of information through the smart contract stack is as follows:

To add Stamps to the blockchain:

- A user decides to migrate their Stamps onchain using the Passport app
- The Passport app requests a list of verified Stamps fromm the Gitcoin IAM server
- The Passport app then requests the `GitcoinVerifier` contract to create an Attestation containing the verified Stamps
- The Attestation is passed from the `GitcoinVerifier` contract to the `GitcoinAttester` contract where the sender address is verified and then the Attestation is forwarded to the `EAS` contract.
- The EAS contract adds the Attestation to the blockchain and assigns it a unique identifier known as a `UID`.
- The EAS contract sends the user address and UID to the `Resolver` contract, where it is stored.

To query onchain Stamps:

- A request is sent to the `Resolver` contract passing the user address
- The `Resolver` contract returns a `UID`
- The `UID` is passed to the `EAS` contract
- The `EAS` contract returns an encoded Attestation
- The user decodes the Attestation and extracts the Stamp data

This is summarized in the following diagram:

```mermaid
sequenceDiagram
    actor User
    participant App as Passport App
    participant IAM as IAM Service
    participant Verifier as Verifier (gitcoin, onchain)
    participant Attester as Attester (gitcoin, onchain)
    participant EAS
    participant Resolver as Resolver (gitcoin, onchain)
    User->>App: "Write stamps onchain"
    App->>IAM: "Verify and attest payload"
    IAM-->>App: PassportAttestationRequest
    activate Verifier
    App->>Verifier: PassportAttestationRequest
    Verifier->>Verifier : validate
    Verifier->>Attester : submitAttestations
    activate Attester
    Attester->>Attester : validate sender
    activate EAS
    Attester->>EAS : multiAttest
    activate Resolver
    EAS->>Resolver : multiAttest
    Resolver-->>EAS : 
    deactivate Resolver
    EAS-->>Attester : UUIDs: bytes32[]
    deactivate EAS
    Attester-->>Verifier : 
    deactivate Attester
    Verifier-->>App : 
    deactivate Verifier
    App-->>User : display onchain status
```

## Contract descriptions

### GitcoinAttester

The attester is an ownable smart contract that includes a function for forwarding Attestation data to the `EAS`` contract. There is an allow-list of verified senders that can call the `submitAttestations` function - currently only Gitcoin is on the list. Addresses on the allow-list can add or remove other addresses from the allow-list and set the address for the EAS contract.

### GitcoinVerifier

The verifier validatea the Passport data that a user wants to bring onchain. The validation is performed by checking the EIP-712 signature for the data that is sent in by the Passport app. The EIP-712 signature will be created by the Passport IAM Service which is the same service that issues the Stamps (verifiable credentials) for the Passport applications.

The flow when the user triggers the process to bring their data onchain from the Passport app is the following:

- The Passport App creates a payload with the data to be written onchain (a list of stamps) and sends this to the IAM Service
- The IAM service validates that data and signs it with the EIP-712 procedure
- The Passport App will call the GitcoinVerifier function verifyAndAttest
- The signature of the data will be validated, and validation passes the function submitAttestations(MultiAttestationRequest[] calldata multiAttestationRequest) and the GitcoinAttester will be called to write the data to the EAS protocol

#### Fee

A small fee is collected by the verifier each time data is written onchain. When the `verifyAndAttest` method in the `GitcoinAttester` contract is called, it will check if the expected amount of ETH has been sent to the smart contract, and will revert if not.

The amount of the fee is determined by the IAM server, and it is the equivalent of 2 USD in ETH. The fee is part of the data structure that is signed with the EIP-712 procedure, so that it cannot be changed during the process of writing Stamps onchain.

#### Replay protection

In order to prevent against replay attacks, the Passport structure that is passed in the `verifyAndAttest` function call must contain a transaction counter (known as a nonce).

This nonce is unique per recipient. The nonce will start from 0, and it will be incremented by 1 for each call that is made to the `verifyAndAttest` function for the specified recipient.

The Passport structure must contain the correct (the next) nonce for the recipient, in order for the call to `verifyAndAttest` to succeed. It will be reverted otherwise.

### GitcoinResolver

The `GitcoinResolver` contract is used to track map Attestations to user addresses.

The Attestations are stored in a mapping where the Attestation is stored as raw bytes (allowing Attestations with any schema to be included).

In order to ensure the integrity of the data that the contract stores, the resolver smart contract shall only validate and store date from trusted sources:

- a trusted EAS contract
- a trusted Attester

## Contract addresses

The entire Gitcoin smart contract stack is currently deployed on two blockchains: Optimism Mainnet and Base Goerli.
Optimism Mainnet is a **'live' Ethereum layer-2 network**, meaning it secures real assets, transaction gas is paid in real ETH and there are real world consequences! 

Base Goerli is a **test network**, meaning the tokens there have no real world value and it can be used as a safe sandbox for developing your apps.


### Optimism Mainnet

The Optimism chain ID is [10](https://chainlist.org/chain/10).

#### Contracts

| contract        | address                                    | link                                                                                                 |
| --------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| issuer          | 0x804233b96cbd6d81efeb6517347177ef7bD488ED | [Etherscan](https://optimistic.etherscan.io/address/0x804233b96cbd6d81efeb6517347177ef7bD488ED)      |
| EAS             | 0x4200000000000000000000000000000000000021 | [Etherscan](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000021)      |
| GitcoinResolver | 0xc94aBf0292Ac04AAC18C251d9C8169a8dd2BBbDC | [Etherscan](https://optimistic.etherscan.io/address/0xc94aBf0292Ac04AAC18C251d9C8169a8dd2BBbDC#code) |
| GitcoinVerifier | 0xa8eD4d2C3f6f98A55cdDEd97C5aE9B932B0633A4 | [Etherscan](https://optimistic.etherscan.io/address/0xa8eD4d2C3f6f98A55cdDEd97C5aE9B932B0633A4)      |
| GitcoinAttester | 0x843829986e895facd330486a61Ebee9E1f1adB1a | [Etherscan](https://optimistic.etherscan.io/address/0x843829986e895facd330486a61ebee9e1f1adb1a)      |

#### EAS Schema

| schema   | uid                                                                | link                                                                                                                   |
| -------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| passport | 0xd7b8c4ffa4c9fd1ecb3f6db8201e916a8d7dba11f161c1b0b5ccf44ceb8e2a39 | [EasScan](https://optimism.easscan.org/schema/view/0xd7b8c4ffa4c9fd1ecb3f6db8201e916a8d7dba11f161c1b0b5ccf44ceb8e2a39) |
| score    | 0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89 | [EasScan](https://optimism.easscan.org/schema/view/0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89) |



### Base Goerli

The Base Goerli chain ID is [84531](https://chainlist.org/chain/84531).

#### Contracts

| contract        | address                                    | link                                                                                       |
| --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| issuer          | 0x5f603Ed913738d9105bAf3BD981AA4750016B167 | [BaseScan](https://goerli.basescan.org/address/0x5f603Ed913738d9105bAf3BD981AA4750016B167) |
| EAS             | 0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A | [BaseScan](https://goerli.basescan.org/address/0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A) |
| GitcoinResolver | 0xA10606c17d94a4DBDc4dD804d1B88fF5030aeE94 | [BaseScan](https://goerli.basescan.org/address/0xA10606c17d94a4DBDc4dD804d1B88fF5030aeE94) |
| GitcoinVerifier | 0x5bC95C6e11520D25BE8c7bDf7AAc3E2eEAbD8564 | [BaseScan](https://goerli.basescan.org/address/0x5bC95C6e11520D25BE8c7bDf7AAc3E2eEAbD8564) |
| GitcoinAttester | 0x5bbbc733e12f50e6834c40a90066f2f9ffb820e0 | [BaseScan](https://goerli.basescan.org/address/0x5bbbc733e12f50e6834c40a90066f2f9ffb820e0) |

#### EAS Schema

| schema   | uid                                                                | link                                                                                                                       |
| -------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| passport | 0x9d43e5c201404b9ab0913bcd6475c78e32d32a4d78233b2c309e9b6828f59e45 | [BaseScan](https://base-goerli.easscan.org/schema/view/0x9d43e5c201404b9ab0913bcd6475c78e32d32a4d78233b2c309e9b6828f59e45) |
| score    | 0xf72ba57b5fb4c12a5f967574bc44a11efb8be76bcfbf47ced36e1afe226ba702 | [BaseScan](https://base-goerli.easscan.org/schema/view/0xf72ba57b5fb4c12a5f967574bc44a11efb8be76bcfbf47ced36e1afe226ba702) |


## Schema

### Passport 
The Attestation schema for onchain Stamps is as follows:

```
new SchemaEncoder(
  "uint256[] providers, bytes32[] hashes, uint64[] issuanceDates, uint64[] expirationDates, uint16 providerMapVersion"
);
```

- `providers`: a bitmap where the position of each bit maps to a specific Stamp and the value of the bit represents ownership (0 = user does not own the Stamp, 1 = user owns the Stamp)
- `hashes`: contains the hashes for the individual Stamps a user owns. This can be used for deduplication.
- `issuanceDates`: UNIX timestamp for the Stampo issuance
- `expirationDates`: UNIX timestamp for the expiration date of a specific Stamp
- `providerMapversion`: indicates the version of the `providers` bitmap that should be used to decode the Attestation


### Score

```
new SchemaEncoder(
  "uint256 score,uint32 scorer_id,uint8 score_decimals"
);
```

- `score`: an unsigned integer representing the user's Passport score
- `scorer_id`: the ID for the scorer that issued the score
- `score_decimals`: the number of decimals in `score`