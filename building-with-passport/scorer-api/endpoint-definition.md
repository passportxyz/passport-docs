# Endpoint Definition

To use the Gitcoin Scorer API to score an Ethereum address, you need to have an account set up, a scorer configured, and your API keys. See our [**API Access**](api-access.md) guide if you haven't already done so.

This page will walk you through interacting with the specific endpoints you'll need to integrate with the Scorer API. But the API does more! For more details, check out the [API documentation](https://api.scorer.gitcoin.co/docs).

### Getting a Wallet's Passport Score

To submit an Ethereum wallet address for scoring, follow these steps:

1. Retrieve a challenge message from the scorer.
2. Have the user sign the challenge.
3. Submit the Ethereum address and the signed challenge to the scorer.

### Signing Message

> * GET /registry/signing-message

This endpoint returns a message verifying the agreement to submit your wallet address in order to score the passport and a nonce that will be used to verify the authenticity of the signed message. This endpoint is necessary if you want to require a signature while scoring.

{% code title="Sample request" overflow="wrap" %}
```sh
curl --location \
    --request GET 'https://api.scorer.gitcoin.co/registry/signing-message' \
    --header 'X-API-KEY: {API KEY}' \
    --header 'Accept: application/json'
```
{% endcode %}

{% code title="Sample response (200 OK)" overflow="wrap" lineNumbers="true" %}
```json
{
    "message": "I hereby agree to submit my address in order to score my associated Gitcoin Passport from Ceramic.\n\nNonce: {Nonce}\n",
    "nonce": "{Nonce}"
}
```
{% endcode %}

### Submit Passport

To submit an ETH address for scoring, developers need to make an API call to the following endpoint

> * POST /registry/submit-passport

#### Payload

| Name      | Type | Required | Description                                                                                      |
| --------- | ---- | -------- | ------------------------------------------------------------------------------------------------ |
| address   | Text | True     | The wallet address                                                                               |
| scorer    | Text | True     | The scorer ID                                                                                    |
| signature | Text | False    | Signature received from the wallet                                                               |
| nonce     | Text | False    | Nonce generated in the signing message. This is needed for requiring a signature before scoring. |

{% code title="Sample request" overflow="wrap" %}
```
curl --request POST 'https://api.scorer.gitcoin.co/registry/submit-passport' \
  --header 'X-API-KEY: {API KEY}' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "address": "{Wallet address}",
    "scorer": "{Scorer ID}",
    "signature": "",
    "nonce": "{Nonce}"
  }'
```
{% endcode %}

{% code title="Sample Response (200 OK)" overflow="wrap" lineNumbers="true" %}
```json
{
    "address": "{address}",
    "score": null,
    "status": "PROCESSING",
    "last_score_timestamp": "2023-02-03T12:08:21.735838+00:00",
    "evidence": null,
    "error": null
}
```
{% endcode %}

### Get Scores

Used to retrieve the score for an ETH address that has already been submitted or for addresses for a scorer.

To request the score of a single address:

> * /registry/score/{scorer\_id}/{address}  -  to retrieve the score for a specific address

{% code title="Sample request" overflow="wrap" %}
```
curl --request GET 'https://api.scorer.gitcoin.co/registry/score/{scorer_id}/{address}' \
    --header 'X-API-KEY: {API KEY}' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json'
```
{% endcode %}

{% code title="Sample response" overflow="wrap" %}
```json
{
    "address": "{address}",
    "score": "{score}",
    "status": "DONE",
    "last_score_timestamp": "2023-02-03T12:08:21.735838+00:00",
    "evidence": null,
    "error": null
}
```
{% endcode %}

To request the scores for a list of addresses:

> /registry/score/{scorer\_id}  -  to retrieve the score for a list of addresses in the scorer

{% code title="Sample request" overflow="wrap" %}
```
curl --location --request GET 'https://api.scorer.gitcoin.co/registry/score/{scorer_id}' \
--header 'X-API-KEY: {API KEY}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json'
```
{% endcode %}

{% code title="Sample response" overflow="wrap" lineNumbers="true" %}
```json
{
    "items": [
        {
            "address": "{wallet}",
            "score": "{score}",
            "status": "DONE",
            "last_score_timestamp": "{timestamp}",
            "evidence": null,
            "error": null
        }
    ],
    "count": 1
}
```
{% endcode %}
