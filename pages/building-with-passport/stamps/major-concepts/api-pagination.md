---
title: API pagination
description: Learn how to paginate through API responses.
---

# API pagination

Some requests are likely to return a large amount of data. You can paginate it by adding `?limit=<x>`, where `x` is the number of elements of the dataset you wish to return in each response, to the end of the request. This instructs the server to only send x "pages" of the response.

For the Stamps endpoint, `x` refers to the number of Stamp objects to return in each response. The full request to the Stamp endpoint, including the pagination instruction and headers, could look as follows:

```bash
curl --request GET 'https://api.passport.xyz/v2/stamps/{address}?limit=3' \
  --header 'X-API-KEY: {API-KEY}'
```

In this example, the API will return three Stamps in each response.

To help you navigate, the returned data includes values in the `prev` and `next` fields. These are endpoint URLs with pre-filled query parameters you can use to retrieve the previous or next chunk of data. Note that if you request a `limit` of 3, your `next` value is also going to have a `limit` of 3. For example, if the response contains Stamps 4, 5 and 6, the URL in `prev` will return Stamps 1, 2, and 3. The URL in `next` will return Stamps 7, 8, and 9.

This is what a response looks like with the `next` and `prev` fields. Notice these fields values are endpoint URLs.

```json
{
  "next": "https://api.passport.xyz/v2/stamps/{address}?token=bmVw%4dFNQ9fM3TcxMTcD%3D&limit=3",
  "prev": "https://api.passport.xyz/v2/stamps/{address}?token=c9fMTcHJlTcwdlxMNQ%3D%3D&limit=3",
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
curl --request GET 'https://api.passport.xyz/v2/stamps/{address}?token=bmVw%4dFNQ9fM3TcxMTcD%3D&limit=3' \
  --header 'X-API-KEY: {API-key}'
```
