---
description: >-
  This document outlines the steps required to obtain an API key and Scorer ID
  to access the Gitcoin Scorer API.
---

# API Access

The [Scorer API](https://www.scorer.gitcoin.co/) provides programmatic access to a wallet's Passport score. Once you have your API key, you need to include it with each request you make to the API. This allows Gitcoin to identify your app and verify that you are authorized to access the API.

### Getting Your API Key

1. **Log in to** [**scorer.gitcoin.co**](https://www.scorer.gitcoin.co/)**:** Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. **Navigate to the API Keys section:** After logging in, go to the "API Keys" section.
3. **Generate an API key:** Click on the "+ Create a Key" button to generate a unique API key for your account.
4. **Store your API key securely:** Store your API key in a secure place, as it will be used to access the Scorer API.

### Scorers and Scorer ID

A Scorer is an individual object with a unique ID that is associated with your account. If you are using the Gitcoin Scorer API in multiple applications, you can set up separate communities for each one. This allows you to customize the scoring rules for each application and deduplicate any identical Passport VCs that are submitted to the same application.

By using communities, you can manage specific parameter settings and log traffic for your Passport-enabled applications. This can help you ensure that the identity verification functionality is working correctly and meets the needs of your stakeholders.

#### Getting your Scorer ID

1. Log in to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/): Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. Navigate to the Communities section: After logging in, go to the "Communities" section
3. Create a Scorer: Click on the "+ Create a Scorer" button and input a Scorer name and description.
4. Click on the newly created scorer and you will see the Scorer ID in the page URL.\
   Example: `https://www.scorer.gitcoin.co/dashboard/scorer/{scorer id}`

#### Types of Scorers

When you create your Scorer you will be presented with several options for the Scorer type. This is because Passport Stamps can be weighted in different ways depending upon the intended use case. **Sybil Prevention** is the most commonly used.

There are two options currently active for the Sybil prevention model to run in the Scorer.&#x20;

* `Unique Humanity` - Returns a score between 0-100 that indicates how likely it is that a passport is owned by an honest user
* `Unique Humanity (binary)` - Returns a 0 or 1 depending on whether the Passport is flagged as a likely Sybil.

<figure><img src="../../.gitbook/assets/scorer-use-case.png" alt=""><figcaption><p>Selecting a use case</p></figcaption></figure>

<figure><img src="https://arweave.net/P6eKM-crq8LVGCtjpVZR9RLuiR35F7Jc-6mBXGxMHJY" alt=""><figcaption><p>Selecting the scorer type</p></figcaption></figure>

### Next step

Review one of the following pages to learn how you can use your Scorer, Scorer ID, and API key.&#x20;

{% content-ref url="../quick-start-guide.md" %}
[quick-start-guide.md](../quick-start-guide.md)
{% endcontent-ref %}

{% content-ref url="../integration-guides/" %}
[integration-guides](../integration-guides/)
{% endcontent-ref %}

{% content-ref url="endpoint-definition.md" %}
[endpoint-definition.md](endpoint-definition.md)
{% endcontent-ref %}
