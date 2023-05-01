---
description: How to read stamps from a Passport
---

# Reading Passport stamps

It is common for apps to retrieve a score based upon Passport stamps but there are also many reasons why you might want to access the stamps themselves. For example, holding one specific stamp might be the only criteria for accessing your content, or certain stamps might give access to different parts of your app.

The Gitcoin Passport API exposes an endpoint specifically for this purpose.

An [HTTP GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request to the following endpoint will return a list of each stamp owned by a given address:

```
/registry/stamps/{address}
```

The response will be in the form of a [`CursorPaginatedStampCredentialResponse`](../building-with-passport/scorer-api/endpoint-definition.md), which is a JSON object of the following format:

```json
{
  "next": "string",
  "prev": "string",
  "items": [
    {
      "version": "string",
      "credential": {}
    }
  ]
}
```

The `credential` field will be populated with the stamps.



**Note** that to be able to retrieve the stamps using this endpoint, the Passport _must already have been submitted_ to the registry using the `registry/submit-passport` endpoint, which in turn requires a message returned from the `registry/signing-message` endpoint to be signed by the Passport holder's Ethereum account. This is possible using raw API requests but requires offline message signing. It is more commonly built into the flow of an app using a package such as `ethers.js`. There are instructions for how to do this in the [Quick Start](../building-with-passport/quick-start-guide.md) guide.



Example request using [Curl:](https://curl.se)

```
curl -X GET "https://api.scorer.gitcoin.co/registry/stamps/0x..." \
 -H 'accept: application/json' \
 -H 'X-API-Key: Zs....'
```

For a Passport with just one stamp (Google account) the following data will be returned:

```json
{"next": null, "prev": null, "items": [
    {"version": "1.0.0", "credential": 
        {"type": ["VerifiableCredential"], "proof": {"jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..sgcMRAONRMogvfaP_MOzy7TfTgmMPiXcErIsIKap-nPnOuTGNSkhGDtxWFl4Mp6uuYnecRDkmxBmS5iDNCMGDA", 
        "type": "Ed25519Signature2018", 
        "created": "2023-04-20T13:21:38.948Z", 
        "proofPurpose": "assertionMethod", 
        "verificationMethod": "did:key:z6LkghvGLgRRhS4LobLEdj1bLbMA1tnJJJAvzcPyqm#z6MkgYU5LChvHHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC"}, 
        "issuer": "did:key:z6LLobLkghvGHEdj1bgGJARLhS4LvPbMA1tm2zcRyymYU55M", 
        "@context": ["https://www.w3.org/2018/credentials/v1"], 
        "issuanceDate": "2023-04-20T13:21:38.948Z", 
        "expirationDate": "2023-07-19T13:21:38.948Z", 
        "credentialSubject": {
            "id": "did:pkh:eip155:1:0x1a3011D94D8c9995845deCBf2A7775b559G3aee7", 
            "hash": "v0.0.0:kWgm+E06OQrSk0M9NcEI3il5FIs9UoJQP3geH4LBuoY=", 
            "@context": [
                {"hash": "https://schema.org/Text", 
                "provider": "https://schema.org/Text"}], 
                "provider": "Google"
            }
        }
    }, 
```
