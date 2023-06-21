---
description: Learn how to retrieve a Passport score
---

# Quick Start

This page will get you up and running with the Passport API. You will come away with the following:

* How to prepare a Passport for scoring on the Gitcoin server
* How to retrieve Passport scores

To follow this quick start, you'll first need to visit [scorer.gitcoin.co](https://scorer.gitcoin.co/), where you'll create an API key, a Scorer, and an associated Scorer ID. Learn more about this process on our [API access page](scorer-api/api-access.md).



### API basics

The base URL for the API methods we'll be using is `https://api.scorer.gitcoin.co/`. There are several API endpoints that can be accessed by extending this base URL.&#x20;

You can browse the API details in the [Passport API pages](scorer-api/). The methods that return data about a specific Passport are all invoked using [HTTP GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET). The method to submit a Passport uses [HTTP POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).&#x20;

You will also need to include some header information. Both GET and POST requests require your API key. POST requests also require the payload type to be defined. It is always `application/json`.



### How to retrieve a score

There are two basic steps to retrieving a Passport score. First, you submit a Passport to your Scorer instance on the Gitcoin server. This triggers the Scorer instance to calculate a score for a specified address.

Once this is done, you can retrieve the score for that address in a separate request.

{% hint style="info" %}
Note that submitting the Passport is _**only required for scoring using the Gitcoin server**_. It is not required for retrieving Stamp data.
{% endhint %}

#### **Submitting a Passport**

The following endpoint is used to submit a Passport.

```sh
https://api.scorer.gitcoin.co/registry/submit-passport
```

This endpoint receives HTTP POST requests with the `address` to be scored and the `scorer_id` in the payload. An example POST request that submits address `0x2C1E111d7C3adc823B5fA3af3f07EB62831C3c5` to Scorer `100` looks as follows:

```bash
curl -X POST 'https://api.scorer.gitcoin.co/registry/submit-passport' \
--data '{"address":"0x2C1E111d7C3adc823B5fA3af3f07EB62831C3c5","scorer_id":"100"}' \ 
-H "Content-Type: application/json" \ 
-H 'X-API-KEY: {your-api-key}'
```

The response from this endpoint should look as follows:

{% code overflow="wrap" %}
```json
{
  "address": "0x2C1E111d7C3adc823B5fA3af3f07EB62831C3c5",
  "score": null,
  "status": "PROCESSING",
  "last_score_timestamp": null,
  "evidence": null,
  "error": null
}
```
{% endcode %}

This response indicates that the address was successfully submitted and that its score is being calculated on the server.

#### Retrieving the score

This endpoint simply returns the Passport score for the address provided in the request. The address must already have been submitted to the server.

```bash
https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${address}
```

This endpoint receives HTTP GET requests with the `address` and the `scorer_id` appended to the URL. An example GET request that queries address `0x2C1E111d7C3adc823B5fA3af3f07EB62831C3c5` at Scorer `100` looks as follows:

```bash
curl --request GET 'https://api.scorer.gitcoin.co/registry/score/100/0x2C1E111d7C3adc823B5fA3af3f07EB62831C3c5' \ 
--header 'X-API-KEY: {your-api-key}'
```

The response from this endpoint should look as follows:

```json
{
  "address": "0x21c1010e11c3cda823d6fa3aebf08e6b2836e5f7",
  "score": "26.26.573997110",
  "status": "DONE",
  "last_score_timestamp": "2023-06-21T09:24:16.827006+00:00",
  "evidence": null,
  "error": null
}
```

The score is provided in the `score` field in the returned object.



### Next Steps

Now you have seen how to retrieve a Passport score from the Gitcoin server, you can start building this into your apps.&#x20;

You can explore the [Integration guides](integration-guides/) to learn how to use Passport scores to control access to certain content, retrieve Stamp data and metadata from the API, and how to display Passport information in your app's UI.
