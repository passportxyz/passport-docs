# Passport API

The Passport API serves as a powerful tool for developers, offering access to Passport scores and Stamps using REST endpoints. 

## Why use the API

The API offers a simple integration; one that requires just two requests to submit and request user Passport data. This data is retrieved from the centralized Gitcoin servers, meaning it is the most up-to-date data available for Passport users. 

### Example developer journey

An excellent [use case](../../overview/use-cases) for Passport is to gate access to special content. To make this happen, we'll need to:

1. Get access by [creating a Passport Scorer and API key](getting-access)
2. Visit the API Access page to learn how to set up your Scorer and API key
3. Submit the user’s address for scoring
4. Make a `POST` request to `/registry/submit-passport`
5. Fetch the user’s Passport score
6. Make a `GET` request to `/registry/score/{scorer_id}/{address}`
6. Verify that their score is above a certain threshold. The score that is returned from step #3 will vary depending on the type of Scorer you set up (Unique Humanity vs Unique Humanity Binary, etc.)
7. Provide access to the gated content

At this point if the user’s score was above your threshold you can provide them with access to the gated content.

## Available endpoints

| Endpoint action                              | Endpoint                                    |
| -------------------------------------------- | ------------------------------------------- |
| Retrieval of signing messages                | `GET /registry/signing-message`             |
| Submitting Passports for scoring             | `POST /registry/submit-passport`            |
| Retrieval of scores for one address          | `GET /registry/score/{scorer_id}/{address}` |
| Retrieval of scores for multiple addresses   | `GET /registry/score/{scorer_id}`           |
| Retrieval of Stamps linked to Passports      | `GET /registry/stamps/{address}`            |
| Retrieval of all available Stamps            | `GET /registry/stamp-metadata`              |
| Retreival of community staking amounts       | `GET /registry/gtc-stake/{address}`         |

Learn more about each of these endpoints on our [API Reference](api-reference) page, or experiment with them using our [API playground](https://api.scorer.gitcoin.co/docs) (requires [API key and Scorer](getting-access)).

## Next steps

Learn more about the Passport API:
* [Getting access](getting-access)
* [Quick start](quick-start-guide)
* [Tutorials](tutorials)
* [API reference](api-reference)
* [Data dictionary](data-dictionary)