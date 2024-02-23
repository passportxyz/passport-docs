---
title: Status and error codes
description: Referene documentation for the status and error codes returned from the Passport API.
---

# Status and error codes

## HTTP Status codes

| Code | Title                 | Description                     |
| ---- | --------------------- | ------------------------------- |
| 200  | OK                    | The request was successful.     |
| 400  | Bad request           | Bad request                     |
| 401  | Unauthorized          | Your API key is invalid.        |
| 404  | Not found             | The resource does not exist.    |
| 429  | Too Many Requests     | The rate limit was exceeded.    |
| 500  | Internal Server Error | An error occurred with our API. |



## Error types

All errors are returned in the form of JSON with a detail explaining the error

> Example error response.

```json
  {
    "detail": "string"
  }
```

| Error Detail                               | Description                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| Invalid nonce                              | The `nonce` used in the submit Passport API request could not be verified        |
| Address does not match signature           | The signer could not be verified                                                 |
| Invalid limit                              | The page limit of the Passport API request is greater than 1000                  |
| Unable to get score for provided Scorer ID | Unable to validate that the Scorer ID belongs to the account holding the API key |
| Unauthorized                               | `X-API-Key` was not specified in the header or an invalid API key was provided   |
| Internal Server Error                      | Something went wrong on our end                                                  |

More detailed information about the API endpoints and error and status codes can be found in the [API reference](../api-reference)
