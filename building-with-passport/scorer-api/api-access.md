---
description: >-
  This document outlines the steps required to obtain an API key and Scorer ID
  to access the Gitcoin scorer API.
---

# API Access

The [Scorer API](https://www.scorer.gitcoin.co/) provides programmatic access to a wallet's Passport score. Once you have your API key, you need to include it with each request you make to the API. This allows Gitcoin to identify your app and verify that you are authorized to access the API.

### Getting Your API Key

1. Log in to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/): Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. Navigate to the API Keys section: After logging in, go to the "API Keys" section.
3. Generate an API key: Click on the "+ Create a Key" button to generate a unique API key for your account.
4. Store your X-API key securely: Store your X-API key in a secure place, as it will be used to access the scorer API.

### Scorers

A scorer is an individual object with a unique ID that is associated with your account. If you are using the Gitcoin Scorer API in multiple applications, you can set up separate communities for each one. This allows you to customize the scoring rules for each application and deduplicate any identical Passport VCs that are submitted to the same application.

By using communities, you can manage specific parameter settings and log traffic for your Passport-enabled applications. This can help you ensure that the identity verification functionality is working correctly and meets the needs of your stakeholders.

### Getting your Scorer ID

1. Log in to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/): Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. Navigate to the Communities section: After logging in, go to the "Communities" section
3. Create a Scorer: Click on the "+ Create a Scorer" button and input a scorer name and description.
4. Click on the newly created scorer and you will see the scorer ID in the page URL i.e [https://www.scorer.gitcoin.co/dashboard/scorer/](https://www.scorer.gitcoin.co/dashboard/community/39){scorer id}

### Using Your X-API Key

To access the Gitcoin Scorer API, include your X-API key in the "Authorization" header of each API request. The header should have the following format:

```
"X-API-KEY": "<API_key>"
```

> Replace `"<API_key>"` with your actual API key.

For example, in a cURL request, the header would look like this:

curl -H "X-API-KEY: {API-KEY}" [https://api.scorer.gitcoin.co/endpoint](https://scorer.gitcoin.co/api/endpoint)

```
curl -H "X-API-KEY: {API_KEY}" https://api.scorer.gitcoin.co/endpoint
```
