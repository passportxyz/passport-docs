# Introduction

If you’re interested in setting up a Gitcoin Passport and connecting Stamps to it, head to our [support site](https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/what-is-gitcoin-passport) for more info.

## What is Passport?

Passport is a tool that allows users to present evidence that they are real, unique humans and signal their trustworthiness to apps. It is a way to collect and present data without exposing it or giving up ownership. 

Under the hood, it is a unique decentralized identifier (a DID) associated with your Ethereum address, stored on the Ceramic network. 

The DID can be used to look up a user's Stamp data, which exists as a collection of Verified Credentials.

**Verified Credentials do not contain any personal identifying information!** They simply demonstrate, using a cryptographic signature, that the user gave access to a specific app and that some criteria were met.

## Use Cases

Developers can integrate Passport in a variety of different programs and apps in the web3 ecosystem, as demonstrated by the following use case examples:

- Sybil resistance for faucets, bundlers and airdrops
- Gating access to content, events, polls, or communities
- Priority weighting votes
- Proving trustworthiness

Passport is a versatile and valuable tool for managing access, promoting transparency, and establishing trust within different web3 environments. 

[Learn more about Passport use cases](../overview/use-cases).


## Retrieving Passport Data

### Passport API

The Passport API serves as a powerful tool for developers, offering access to Passport scores and Stamps. You can learn more about each of the following endpoints via our [API reference](api-reference).

It facilitates:

| Endpoint action                            | Endpoint                                    |
| ------------------------------------------ | ------------------------------------------- |
| Retrieval of signing messages              | `GET /registry/signing-message`             |
| Submitting Passports for scoring           | `POST /registry/submit-passport`            |
| Retrieval of scores for one address        | `GET /registry/score/{scorer_id}/{address}` |
| Retrieval of scores for multiple addresses | `GET /registry/score/{scorer_id}`           |
| Retrieval of Stamps linked to Passports    | `GET /registry/stamps/{address}`            |
| Retrieval of all available Stamps          | `GET /registry/stamp-metadata`              |
| Retreival of community staking amounts     | `GET /registry/gtc-stake/{address}`         |

### Smart contracts

Gitcoin Passport also has a [smart contract stack](contract-reference) that allows the following:
- Users to migrate their Stamps onchain
- Developers to query a user's Stamps directly from the blockchain

This means that Stamp data is available natively to other smart contracts and that no authorization or interactions with centralized servers are needed to query Stamp data.

Currently, Stamps are available on [OP Mainnet](https://chainlist.org/chain/10) and the [Base Goerli](https://chainlist.org/chain/84531) test network.

You can read more about [onchain Passports](./major-concepts/onchain-passports) or get building with our [onchain Stamp tutorial](tutorials/integrating-onchain-stamp-data).


## Protecting Content with Passport

An excellent [use case](../overview/use-cases) for Passport is to gate access to special content. To make this happen, we'll need to:

1. Set up a Passport Scorer and API key
2. Visit the API Access page to learn how to set up your Scorer and API key
3. Submit the user’s address for scoring
4. Make a POST request to /registry/submit-passport
5. Fetch the user’s Passport score
6. Make a GET request to /registry/score/{scorer_id}/{address}
6. Verify that their score is above a certain threshold. The score that is returned from step #3 will vary depending on the type of Scorer you set up (Unique Humanity vs Unique Humanity Binary, etc.)
7. Provide access to the gated content

At this point if the user’s score was above your threshold you can provide them with access to the gated content.

## Getting Started

To begin your development journey with Passport API, follow these steps:

- [Get access to the API](getting-access)
- [Get to "Hello World" with the API](quick-start-guide)
- [Review the API Reference to get to know the available endpoints](api-reference)
- [Choose a tutorial that best matches your use case. Review the example code and integrate](tutorials)

By following these steps, you'll be well-equipped to start developing with Passport API and make the most of its features.
