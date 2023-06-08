# Endpoint Definition

To use the Gitcoin Scorer API to score an Ethereum address, you need to have a Scorer app configured, an associated Scorer ID, and your API keys.&#x20;

Learn more about these credentials from our [API Access](api-access.md) guide.

### Available endpoints

To get a Passport score from an ETH address, follow these steps:

1. **Optional:** [Retrieve a signing message from the Scorer](endpoint-definition.md#retrieve-a-signing-message)\
   `GET /registry/signing-message`
2. [Submit the Ethereum address to the Scorer](endpoint-definition.md#submit-for-scoring)\
   `POST /registry/submit-passport`
3. [Retrieve the Passport score for one or multiple addresses](endpoint-definition.md#get-scores)\
   `GET /registry/score/{scorer_id}/{address}`\
   `GET /registry/score/{scorer_id}`

You can also receive the specific Stamps data:&#x20;

* [Receive Stamps connected to one or multiple submitted Passports\
  ](endpoint-definition.md#get-stamps)`GET /registry/stamps/{address}`
* [Receive all Stamps available in Passport](endpoint-definition.md#get-stamps-metadata) \[Beta]\
  `GET /registry/stamp-metadata`



### Retrieve a signing message

This endpoint returns a message verifying the agreement to submit a wallet address for scoring, and a `nonce` that can be used to verify the authenticity of the signed message.&#x20;

You don't need to get a signature from this endpoint, but you do need a signature from the wallet you are scoring that proves that the user owns the wallet.&#x20;

> GET /registry/signing-message

{% code title="Sample request" overflow="wrap" %}
```sh
curl --location \
    --request GET 'https://api.scorer.gitcoin.co/registry/signing-message' \
    --header 'X-API-KEY: {API KEY}'
```
{% endcode %}

{% code title="Sample response" overflow="wrap" lineNumbers="true" %}
```json
{
    "message": "I hereby agree to submit my address in order to score my associated Gitcoin Passport from Ceramic.\n\nNonce: {Nonce}\n",
    "nonce": "{Nonce}"
}
```
{% endcode %}



### Submit for scoring

Before receiving a Passport score, developers need to submit an Ethereum address to their Scorer.

To do so, developers need to POST the relevant Ethereum address and their Scorer ID to this endpoint.&#x20;

> POST /registry/submit-passport

#### JSON body parameters

<table><thead><tr><th width="174">Name</th><th width="99">Type</th><th width="106">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>address</code></td><td>Text</td><td>Yes</td><td>The wallet address</td></tr><tr><td><code>scorer_id</code></td><td>Text</td><td>Yes</td><td>The Scorer ID</td></tr><tr><td><code>signature</code></td><td>Text</td><td>No</td><td>Signature received from the wallet</td></tr><tr><td><code>nonce</code></td><td>Text</td><td>No</td><td>Nonce generated in the signing message. This is needed for requiring a signature before scoring.</td></tr></tbody></table>

{% code title="Sample Response" overflow="wrap" lineNumbers="true" %}
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



### Get scores

You must submit any Passports you'd like to request a score for via the Submit for scoring endpoint before successfully receiving their scores via these endpoints.

Use these endpoints to retrieve the score for one Ethereum address, or all Ethereum addresses that have been submitted to a Scorer.&#x20;

\
To request the score of a specified address:

> GET /registry/score/{scorer\_id}/{address}

{% code title="Sample request" overflow="wrap" %}
```
curl --request GET 'https://api.scorer.gitcoin.co/registry/score/{scorer_id}/{address}' \
    --header 'X-API-KEY: {API KEY}'
```
{% endcode %}



To request the scores for all addresses that have been submitted to a Scorer:

> GET /registry/score/{scorer\_id}

{% code title="Sample request" overflow="wrap" %}
```
curl --location --request GET 'https://api.scorer.gitcoin.co/registry/score/{scorer_id}' \
--header 'X-API-KEY: {API KEY}'
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
        },
        {
            "address": "{wallet}",
            "score": "{score}",
            "status": "DONE",
            "last_score_timestamp": "{timestamp}",
            "evidence": null,
            "error": null
        }
    ],
    "count": 2
}
```
{% endcode %}



### Get Stamps

Use this endpoint to request all Stamps that have been connected to an Ethereum address.&#x20;

If you would like to retrieve the metadata for all available Stamps, please use the [Get Stamps metadata](endpoint-definition.md#get-stamps-metadata) endpoint.&#x20;

> GET /registry/stamps/{address}

#### Query parameters

<table><thead><tr><th width="225">Name</th><th width="105.33333333333331">Required</th><th></th></tr></thead><tbody><tr><td><code>include_metadata</code></td><td>No</td><td>[Beta] Returns optional <code>metadata</code> object with additional details about connected Stamps.</td></tr></tbody></table>

{% code title="Sample request" overflow="wrap" %}
```
curl --request GET 'https://api.scorer.gitcoin.co/registry/stamps/{address}?include_metadata=true' \
    --header 'X-API-KEY: {API KEY}'
```
{% endcode %}

{% code title="Sample response" overflow="wrap" %}
```json
{
  "next": "string",
  "prev": "string",
  "items": [
    {
      "version": "string",
      "credential": {},
      "metadata": {}
    }
  ]
}
```
{% endcode %}



### Get Stamps metadata

Use this endpoint to request all Stamps available on Passport.&#x20;

If you would like to retrieve just the Stamps that are connected to a specified Ethereum address, please use the [Get Stamps](endpoint-definition.md#get-stamps) endpoint.

> GET /registry/stamp-metadata

{% code title="Sample request" overflow="wrap" %}
```
curl --request GET 'https://api.scorer.gitcoin.co/registry/stamp-metadata' \
    --header 'X-API-KEY: {API KEY}'
```
{% endcode %}

{% code title="Sample response" overflow="wrap" %}
```json
[
  {
    "id": "string",
    "icon": "string",
    "name": "string",
    "description": "string",
    "connectMessage": "string",
    "groups": [
      {
        "name": "string",
        "stamps": [
          {
            "name": "string",
            "description": "string",
            "hash": "string"
          }
        ]
      }
    ]
  }
]
```
{% endcode %}

