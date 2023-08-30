# API Reference

The Passport API enables developers to retrieve Passport scores and Stamp metadata for users who have created a Gitcoin Passport.

You can also experiment with the Passport API using our [API playground tool](https://api.scorer.gitcoin.co/docs) and adding your API keys via the 'Authorize' button.

## Authentication

To access the Gitcoin Passport API, you will need a [Scorer ID and an API key](getting-access).

To make a successful request, you will need to include your API key in the "Authorization" header of each API request. The header should have the following format:

```
"X-API-KEY: {API_key}"
```

Replace `{API_key}` with your API key. For example, if you were using cURL, your request might look something like this:

```bash
curl --request GET 'https://api.scorer.gitcoin.co/registry/signing-message' \
    --header 'X-API-KEY: VwUi___.0yQU1HIAE4hLEMkVs___'
```

## Rate limits

Your API key will allow you to make up to a certain number of requests to any of the endpoints included on this page during a certain period of time.

You will start off with Tier 1, and will need to [request higher rate limits](https://forms.gle/bteHxCAVBdiv5Ttm7) if necessary.

| Tier   | Rate limit                    |
| ------ | ----------------------------- |
| Tier 1 | 125 requests per 15 minutes   |
| Tier 2 | 350 requests per 15 minutes   |
| Tier 3 | 2000 requests per 15 minutes  |
| Tier 4 | 2000+ requests per 15 minutes |

## Timeouts

The load balancer for all Passport API endpoints has a timeout of 60 seconds. This means that if a request to one of these endpoints does not receive a response within 60 seconds, the request will be aborted.

If your request times out, you should set up retry logic by calling the API again after a short delay, typically increasing the delay for each subsequent retry.

However, it is important to mention that you should not implement retry logic when making requests to the [Submit for scoring](#submit-for-scoring) endpoint. Even if your request times out, the scoring process should still be in progress.

## Pagination

Some requests are likely to return a large amount of data. You can paginate it by adding `?limit=<x>`, where `x` is the number of elements of the dataset you wish to return in each response, to the end of the request. This instructs the server to only send x "pages" of the response.

For the Stamps endpoint, `x` refers to the number of Stamp objects to return in each response. The full request to the Stamp endpoint, including the pagination instruction and headers, could look as follows:

```bash
curl --request GET 'https://api.scorer.gitcoin.co/registry/stamps/{address}?limit=3' \
  --header 'X-API-KEY: {API-KEY}'
```

In this example, the API will return three Stamps in each response.

To help you navigate, the returned data includes values in the `prev` and `next` fields. These are endpoint URLs with pre-filled query parameters you can use to retrieve the previous or next chunk of data. Note that if you request a `limit` of 3, your `next` value is also going to have a `limit` of 3. For example, if the response contains Stamps 4, 5 and 6, the URL in `prev` will return Stamps 1, 2, and 3. The URL in `next` will return Stamps 7, 8, and 9.

This is what a response looks like with the `next` and `prev` fields. Notice these fields values are endpoint URLs.

```json
{
  "next": "https://api.scorer.gitcoin.co/registry/stamps/{address}?token=bmVw%4dFNQ9fM3TcxMTcD%3D&limit=3",
  "prev": "https://api.scorer.gitcoin.co/registry/stamps/{address}?token=c9fMTcHJlTcwdlxMNQ%3D%3D&limit=3",
  "items": [
    {
      "version": "1.0.0",
      "credential": {...}
    }
  ]
}
```

To retrieve the next page of results you can use the URL provided in the `next` field, in this case:

```bash
curl --request GET 'https://api.scorer.gitcoin.co/registry/stamps/{address}?token=bmVw%4dFNQ9fM3TcxMTcD%3D&limit=3' \
  --header 'X-API-KEY: {API-key}'
```

You can also use the `offset` parameter to retrieve data from a given location in a paginated API response. The offset value given identifies the first element in the response you want to retrieve. For example, passing `offset=5` means the response will skip the first 5 elements and start at element 6 of the returned data. You can combine this with `limit` to get specific chunks of data, for example to retrieve objects 6 - 10, you could pass `offset=5&limit=5`.



Here's what that would look like in practice, retrieving the 6th to 10th Stamps for a given address:

```bash
curl --request GET 'https://api.scorer.gitcoin.co/registry/stamps/{address}?offset=5&limit=5' \
  --header 'X-API-KEY: {API-key}' 
```

## Data dictionary

We have put together a [data dictionary](/building-with-passport/major-concepts/data-dictionary) that you can use to better understand each field that delivers with the response payloads from the Passport API endpoints.



## Available endpoints

To get a Passport score from an ETH address, follow these steps:

1. **Optional:** [Retrieve a signing message from the Scorer](#retrieve-a-signing-message)\
   `GET /registry/signing-message`
2. [Submit the Ethereum address to the Scorer](#submit-for-scoring)\
   `POST /registry/submit-passport`
3. [Retrieve the Passport score for a single address](#get-score-of-a-single-address)\
   `GET /registry/score/{scorer_id}/{address}`
4. [Retrieve the Passport scores of all submitted addresses](#get-scores-of-all-submitted-addresses)\
   `GET /registry/score/{scorer_id}`

Use the following endpoints to receive Stamps data:

* [Receive Stamps connected to one or multiple submitted Passports](#get-stamps)\
   `GET /registry/stamps/{address}`
* [Receive all Stamps available in Passport](#get-stamps-metadata) \[Beta]\
   `GET /registry/stamp-metadata`

Use the following endpoint to receive staking information

* [Receive GTC staking amounts](#receive-gtc-staking-amounts)
   `GET /registry/gtc-stake/{address}`


### Retrieve a signing message

This endpoint returns a message verifying the agreement to submit a wallet address for scoring, and a `nonce` that can be used to verify the authenticity of the signed message.

You don't need to get a signature from this endpoint, but you do need a signature from the wallet you are scoring that proves that the user owns the wallet.

> GET /registry/signing-message

```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/signing-message \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample response"
{
    "message": "I hereby agree to submit my address in order to score my associated Gitcoin Passport from Ceramic.\n\nNonce: {Nonce}\n",
    "nonce": "{Nonce}"
}
```

### Submit for scoring

Before receiving a Passport score, developers need to submit an Ethereum address to their Scorer.

To do so, developers need to POST the relevant Ethereum address and their Scorer ID to this endpoint.

There are two different values that deliver with the `status` field:

* `PROCESSING` - Continue to poll for the results using the [GET scores](#get-score-of-a-single-address) endpoint until the `DONE` status is returned. `score` field will return as `null`.
* `DONE` - The Scorer has completed scoring the specified Passport. `score` field will return with Passport score.

> POST /registry/submit-passport

#### JSON body parameters

| Name        | Type | Required | Description                                                                                      |
| ----------- | ---- | -------- | ------------------------------------------------------------------------------------------------ |
| `address`   | Text | Yes      | The wallet address                                                                               |
| `scorer_id` | Text | Yes      | The Scorer ID                                                                                    |
| `signature` | Text | No       | Signature received from the wallet                                                               |
| `nonce`     | Text | No       | Nonce generated in the signing message. This is needed for requiring a signature before scoring. |

```bash filename="Sample request" copy
curl --request POST \
  --url https://api.scorer.gitcoin.co/registry/submit-passport \
  --header 'X-API-KEY: {API KEY}' \
  --header 'Content-Type: application/json' \
  --data '{
    "address": "{ADDRESS}",
    "scorer_id": "{SCORER ID}",
    "signature": "{SIGNATURE - OPTIONAL)",
    "nonce": "{NONCE - OPTIONAL}"
  }'
```

#### Sample responses

The name in the parenthesis represents what [type of Scorer](/building-with-passport/getting-access#types-of-scorers) you are using.

```json filename="Sample response: PROCESSING"
{
    "address": "{address}",
    "score": null,
    "status": "PROCESSING",
    "last_score_timestamp": "2023-02-03T12:08:21.735838+00:00",
    "evidence": null,
    "error": null
}
```

```json filename="Sample response: DONE (Unique Humanity)"
{
    "address": "{address}",
    "score": "{score}",
    "status": "DONE",
    "last_score_timestamp": "{timestamp}",
    "evidence": null,
    "error": null
}
```

```json filename="Sample response: DONE (Unique Humanity: Binary)"
{
    "address": "{address}",
    "score": "{score}",
    "status": "DONE",
    "last_score_timestamp": "{timestamp}",
    "evidence": {
        "type": "ThresholdScoreCheck",
        "success": true,
        "rawScore": "{score}",
        "threshold": "15.00000"
    },
    "error": null
}
```

### Get score of a single address

You must submit any Passports you'd like to request a score for via the [Submit for scoring](#submit-for-scoring) endpoint before successfully receiving a score via this endpoints.

Use this endpoint to retrieve the score for one Ethereum address. You can use the [multiple address](#get-scores-of-all-submitted-addresses) endpoint if you have more than one address submitted to a Scorer.

> GET /registry/score/{scorer\_id}/{address}

```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/score/{scorer_id}/{address} \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample response"
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
  ]
}        
```

### Get scores of all submitted addresses

You must submit any Passports you'd like to request a score for via the [Submit for scoring](#submit-for-scoring) endpoint before successfully receiving their scores via this endpoints.

Use this endpoint to retrieve the score for one Ethereum address. You can use the [single address](#get-score-of-a-single-address) endpoint if you'd like to request a score for one address.

> GET /registry/score/{scorer\_id}

#### Query parameters

| Name                       | Required | Text                                                                                                                                                                                                 |
| -------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `last_score_timestamp_gt`  | No       | Filters response to only those scores submitted to the given Scorer instance \*after\* the given timestamp. Format: [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)               |
| `last_score_timestamp_gte` | No       | Filters response to only those scores submitted to the given Scorer instance \*after or at\* the given timestamp. Format: [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)         |
| `limit`                    | No       | Paginates response, providing the given number of response elements per page. Learn more about [pagination](#pagination).                                                                            |
| `offset`                   | No       | For a paginated response, `offset` determines the Stamp object at which the response should start. Learn more about [pagination](#pagination).                                                       |


```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/score/{scorer_id} \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample response"
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

You can also add a query to return all the scores for a given address for a certain time period. This can be useful if you want to filter your responses so that it only returns scores that have been _updated since your last request._

The two possible query parameters are `last_score_timestamp_gt` and `last_score_timestamp_gte`. The difference between the two is that `_gt` (standing for 'greater than') returns updated scores that were created by your scorer instance strictly _after_ the given time, whereas `_gte` (standing for 'greater than or equal') returns updated scores after or at the same time as the given time.

The argument should be provided in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.

For example:

```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/score/{scorer_id}?address={address}?last_score_timestamp_get=2023-07-20T19%3A54%3A44.463335%2B00%3A00 \
    --header 'X-API-KEY: {API KEY}'
```


### Get Stamps

Use this endpoint to request all Stamps that have been connected to an Ethereum address.

If you would like to retrieve the metadata for all available Stamps, please use the [Get Stamps metadata](#get-stamps-metadata) endpoint.

> GET /registry/stamps/{address}

#### Query parameters

| Name               | Required | Text                                                                                                                                                               |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `include_metadata` | No       | [Beta] Returns optional `metadata` object with additional details about connected Stamps.                                                                          |
| `limit`            | No       | Paginates response, providing the given number of Stamps per page (For example, use `limit=3` to request three Stamps) Learn more about [pagination](#pagination). |


```bash filename="Sample request" copy
curl --request GET \
    --url 'https://api.scorer.gitcoin.co/registry/stamps/{address}?include_metadata=true' \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample response"
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

### Get Stamps metadata \[Beta]

Use this endpoint to request all Stamps available on Passport.

If you would like to retrieve just the Stamps that are connected to a specified Ethereum address, please use the [Get Stamps](#get-stamps) endpoint.

> GET /registry/stamp-metadata

```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/stamp-metadata \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample request"
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

### Receive GTC staking amounts

This endpoint returns both self (`stakes`) and community (`xstakeAggregates`) staking amounts for a specified address. It also breaks down staking amounts based on round ID. 

> GET /registry/gtc-stake/{address}

```bash filename="Sample request" copy
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/gtc-stake/{address} \
    --header 'X-API-KEY: {API KEY}'
```

```json filename="Sample response"
{
  "users": [
    {
      "stakes": [
        {
          "stake": "string",
          "round": {
            "id": "string"
          }
        },
        {
          "stake": "string",
          "round": {
            "id": "string"
          }
        }
      ],
      "xstakeAggregates": [
        {
          "total": "string",
          "round": {
            "id": "string"
          }
        }
      ]
    }
  ]
}
```
