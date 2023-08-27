# Introduction

If you’re interested in setting up a Gitcoin Passport and connecting Stamps to it, head to our [support knowledge base](https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/what-is-gitcoin-passport) for more info.

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

[Learn more about Passport use cases](overview/use-cases).

## Passport API Overview

The Passport API serves as a powerful tool for developers, offering access to Passport scores and Stamps.

It facilitates:
| Endpoint action                             | Endpoint                                    |
| ------------------------------------------- | ------------------------------------------- |
| Retrieval of signing messages               | `GET /registry/signing-message`             |
| Submitting Passports for scoring            | `POST /registry/submit-passport`            |
| Retrieval of scores for one address         | `GET /registry/score/{scorer_id}/{address}` |
| Retrieval of scores for multiple addresses  | `GET /registry/score/{scorer_id}`           |
| Retrieval of Stamps linked to Passports     | `GET /registry/stamps/{address}`            |
| Retrieval of all available Stamps           | `GET /registry/stamp-metadata`              |

## Gating Content with Passport

An excellent use case for Passport is to gate access to special content. To make this happen, we'll need to:

- Set up a Passport Scorer and API key
- Visit the API Access page to learn how to set up your Scorer and API key
- Submit the user’s address for scoring
- Make a POST request to /registry/submit-passport
- Fetch the user’s Passport score
- Make a GET request to /registry/score/{scorer_id}/{address}
- Verify that their score is above a certain threshold. The score that is returned from step #3 will vary depending on the type of Scorer you set up (Unique Humanity vs Unique Humanity Binary, etc.)
- Provide access to the gated content

At this point if the user’s score was above your threshold you can provide them with access to the gated content.

## Getting Started

To begin your development journey with Passport API, follow these steps:

- [Get access to the API](/building-with-passport/getting-access)
- [Get to "Hello World" with the API](/building-with-passport/quick-start-guide)
- [Review the API Reference to get to know the available endpoints](/building-with-passport/api-reference)
- [Choose a tutorial that best matches your use case. Review the example code and integrate](/building-with-passport/tutorials)

By following these steps, you'll be well-equipped to start developing with Passport API and make the most of its features.
