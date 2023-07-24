# Endpoint Definition

The Passport API enables developers to retrieve Passport scores and Stamp metadata for users who have created a Gitcoin Passport.&#x20;

You can also experiment with the Passport API using our [API playground tool](https://api.scorer.gitcoin.co/docs) and adding your API keys via the 'Authorize' button.

## Authentication

To access the Gitcoin Passport API, you will need a [Scorer ID and an API key](api-access.md).&#x20;

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

Your API key will allow you to make up to a certain number of requests to any of the endpoints included on this page during a certain period of time.&#x20;

You will start off with Tier 1, and will need to [request higher rate limits](https://forms.gle/bteHxCAVBdiv5Ttm7) if necessary.&#x20;

<table><thead><tr><th width="135">Tier</th><th>Rate limit</th></tr></thead><tbody><tr><td>Tier 1</td><td>125 requests per 15 minutes</td></tr><tr><td>Tier 2</td><td>350 requests per 15 minutes</td></tr><tr><td>Tier 3</td><td>2000 requests per 15 minutes</td></tr><tr><td>Tier 4</td><td>2000+ requests per 15 minutes</td></tr></tbody></table>

## Timeouts

The load balancer for all Passport API endpoints has a timeout of 60 seconds. This means that if a request to one of these endpoints does not receive a response within 60 seconds, the request will be aborted.

If your request times out, you should set up retry logic by calling the API again after a short delay, typically increasing the delay for each subsequent retry.

However, it is important to mention that you should not implement retry logic when making requests to the [Submit for scoring](endpoint-definition.md#submit-for-scoring) endpoint. Even if your request times out, the scoring process should still be in progress.

## Pagination

Some requests are likely to return a large amount of data. You can paginate it by adding `?limit=<x>`, where `x` is the number of elements of the dataset you wish to return in each response, to the end of the request. This instructs the server to only send x "pages" of the response.&#x20;

For the Stamps endpoint, `x` refers to the number of Stamp objects to return in each response. The full request to the Stamp endpoint, including the pagination instruction and headers, could look as follows:

<pre class="language-bash"><code class="lang-bash">curl --request GET 'https://api.scorer.gitcoin.co/registry/stamps/{address}?limit=3' \
<strong>  --header 'X-API-KEY: {API-KEY}'
</strong></code></pre>

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

We have put together a [data dictionary](../major-concepts/data-dictionary.md) that you can use to better understand each field that delivers with the response payloads from the Passport API endpoints.



## Available endpoints

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
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/signing-message \
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

There are two different values that deliver with the `status` field:

* `PROCESSING` - Continue to poll for the results using the [GET scores](endpoint-definition.md#get-scores) endpoint until the `DONE` status is returned. `score` field will return as `null`.
* `DONE` - The Scorer has completed scoring the specified Passport. `score` field will return with Passport score.

> POST /registry/submit-passport

#### JSON body parameters

<table><thead><tr><th width="174">Name</th><th width="99">Type</th><th width="106">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>address</code></td><td>Text</td><td>Yes</td><td>The wallet address</td></tr><tr><td><code>scorer_id</code></td><td>Text</td><td>Yes</td><td>The Scorer ID</td></tr><tr><td><code>signature</code></td><td>Text</td><td>No</td><td>Signature received from the wallet</td></tr><tr><td><code>nonce</code></td><td>Text</td><td>No</td><td>Nonce generated in the signing message. This is needed for requiring a signature before scoring.</td></tr></tbody></table>

{% code title="Sample request" overflow="wrap" %}
```bash
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
{% endcode %}

#### **Sample responses**

The name in the parenthesis represents what [type of Scorer](https://docs.passport.gitcoin.co/building-with-passport/scorer-api/api-access#types-of-scorers) you are using.&#x20;

{% tabs %}
{% tab title="PROCESSING" %}
{% code overflow="wrap" lineNumbers="true" %}
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
{% endtab %}

{% tab title="DONE (Unique Humanity)" %}
{% code overflow="wrap" lineNumbers="true" %}
```json
{
    "address": "{address}",
    "score": "{score}",
    "status": "DONE",
    "last_score_timestamp": "{timestamp}",
    "evidence": null,
    "error": null
}
```
{% endcode %}
{% endtab %}

{% tab title="DONE (Unique Humanity: Binary)" %}
{% code overflow="wrap" lineNumbers="true" %}
```json
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
{% endcode %}
{% endtab %}
{% endtabs %}

### Get scores

You must submit any Passports you'd like to request a score for via the Submit for scoring endpoint before successfully receiving their scores via these endpoints.

Use these endpoints to retrieve the score for one Ethereum address, or all Ethereum addresses that have been submitted to a Scorer.&#x20;

#### To request the score of a specified address

> GET /registry/score/{scorer\_id}/{address}

{% code title="Sample request" overflow="wrap" %}
```bash
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/score/{scorer_id}/{address} \
    --header 'X-API-KEY: {API KEY}'
```
{% endcode %}

#### To request the scores for all addresses that have been submitted to a Scorer

> GET /registry/score/{scorer\_id}

<pre class="language-bash" data-title="Sample request" data-overflow="wrap"><code class="lang-bash"><strong>curl --request GET \
</strong><strong>    --url https://api.scorer.gitcoin.co/registry/score/{scorer_id} \
</strong><strong>    --header 'X-API-KEY: {API KEY}'
</strong></code></pre>

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

<table><thead><tr><th width="225">Name</th><th width="105.33333333333331">Required</th><th></th></tr></thead><tbody><tr><td><code>include_metadata</code></td><td>No</td><td>[Beta] Returns optional <code>metadata</code> object with additional details about connected Stamps.</td></tr><tr><td><code>limit</code></td><td>No</td><td>Paginates response, providing the given number of Stamps per page (For example, use <code>limit=3</code> to request three Stamps)<br><br>Learn more about <a href="endpoint-definition.md#pagination">pagination</a>.</td></tr><tr><td><code>offset</code></td><td>No</td><td>For a paginated response, <code>offset</code> determines the Stamp object at which the response should start. <br><br>Learn more about <a href="endpoint-definition.md#pagination">pagination</a>.</td></tr></tbody></table>



{% code title="Sample request" overflow="wrap" %}
```bash
curl --request GET \
    --url 'https://api.scorer.gitcoin.co/registry/stamps/{address}?include_metadata=true' \
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



### Get Stamps metadata \[Beta]

Use this endpoint to request all Stamps available on Passport.&#x20;

If you would like to retrieve just the Stamps that are connected to a specified Ethereum address, please use the [Get Stamps](endpoint-definition.md#get-stamps) endpoint.

> GET /registry/stamp-metadata

{% code title="Sample request" overflow="wrap" %}
```bash
curl --request GET \
    --url https://api.scorer.gitcoin.co/registry/stamp-metadata \
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

