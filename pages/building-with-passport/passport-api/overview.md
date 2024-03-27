---
title: Passport API overview
description: General overview of the Gitcoin Passport API
---
# Passport API

The Passport API serves as a powerful tool for developers, offering access to Passport scores and Stamps using REST endpoints. 

## Why use the API

The API offers a simple integration; one that requires just two requests to submit and request user Passport data. This data is retrieved from the centralized Gitcoin servers, meaning it is the most up-to-date data available for Passport users. 

### Example developer journey

An excellent [use case](../../overview/use-cases) for Passport is to gate access to special content. To make this happen, we'll need to:

1. [Creating a Passport Scorer and API key](getting-access)
2. Submit the user’s address for scoring using the [POST /registry/submit-passport](https://docs.passport.gitcoin.co/building-with-passport/passport-api/api-reference#submit-for-scoring) endpoint. Find the user's score in the response. 
3. Depending on the [type of scorer](https://docs.passport.gitcoin.co/building-with-passport/passport-api/getting-access#types-of-scorers) you set up, you will either compare the unique humanity score against a [threshold](https://docs.passport.gitcoin.co/building-with-passport/major-concepts/scoring-thresholds) that you set, or utilize the binary score. 

At this point, you know whether the user was able to prove their humanity or not, and you can grant access to the protected program. 

If you need to refresh the score, resubmit the address to `POST /registry/submit-passport`.

You can also retrieve the last refreshed score by making a request to the following endpoint:
`GET /registry/score/{scorer_id}/{address}`

## Available endpoints

| Endpoint action                             | Endpoint                                    |
| ------------------------------------------- | ------------------------------------------- |
| Retrieval of signing messages               | `GET /registry/signing-message`             |
| Submitting Passports for scoring or refresh | `POST /registry/submit-passport`            |
| Retrieval of scores for one address         | `GET /registry/score/{scorer_id}/{address}` |
| Retrieval of scores for multiple addresses  | `GET /registry/score/{scorer_id}`           |
| Retrieval of Stamps linked to Passports     | `GET /registry/stamps/{address}`            |
| Retrieval of all available Stamps           | `GET /registry/stamp-metadata`              |
| Retreival of community staking amounts      | `GET /registry/gtc-stake/{address}`         |

Learn more about each of these endpoints on our [API Reference](api-reference) page, or experiment with them using our [API playground](https://api.scorer.gitcoin.co/docs) (requires [API key and Scorer](getting-access)).

## Next steps

Learn more about the Passport API:
* [Getting access](getting-access)
* [Quick start](quick-start-guide)
* [Tutorials](tutorials)
* [API reference](api-reference)
* [Data dictionary](data-dictionary)
