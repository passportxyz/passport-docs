---
description: How to read Stamps from a Passport
---

# Reading Passport Stamps

It is common for apps to retrieve a score based upon Passport Stamps but there are also many reasons why you might want to access the Stamps themselves. For example, holding one specific stamp might be the only criterion for accessing your content, or specific Stamps might give access to different parts of your app.

The Gitcoin Scorer API exposes an endpoint specifically for this purpose.

An HTTP GET request to the [Get Stamps](../building-with-passport/scorer-api/endpoint-definition.md#get-stamps) endpoint will return a list of each stamp owned by a given address:

The response is a JSON object of the following format:

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

The `credential` field will be populated with each connected Stamp.

{% hint style="info" %}
To be able to retrieve Stamps using this endpoint, you should have a signed message verifying that the user owns the specified wallet (you can use the [retrieve a signing message](../building-with-passport/scorer-api/endpoint-definition.md#retrieve-a-signing-message) endpoint for this step), and make sure the address has been submitted to your Scorer using the [submit for scoring](../building-with-passport/scorer-api/endpoint-definition.md#submit-for-scoring) endpoint.&#x20;
{% endhint %}



Example request using [Curl:](https://curl.se)

```bash
curl -X GET "https://api.scorer.gitcoin.co/registry/stamps/0x..." \
 -H 'accept: application/json' \
 -H 'X-API-Key: Zs....'
```

For a Passport with just one Stamp (Google account) the following data will be returned:

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
