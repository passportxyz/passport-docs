---
description: >-
  As a web3 citizen, you will present your Passport to get access to more
  trustworthy experiences on web3.
---

# Presenting your Passport

Here are some examples of why having your own Passport—with many stamps collected—may come in handy:

* If an **event organizer** uses Passport to gate access to their event, then this event might only allow people with certain stamps in their Passport.
* If a **grants program manager** integrates Passport into their Quadratic Funding-powered grants program like Gitcoin Grants, this program might only offer a matching funds multiple to donors with a Passport over a certain score
* If a **community organizer** gates a sub-community with Passport, this might mean that only community members that have earned a certain set of stamps through meaningful participation in the community may get access to the **sub-community**.&#x20;
* If the **developer** **of an online marketplace** uses Passport to gate their marketplace, this might mean it has a high cost of forgery bar for buyers and sellers, which may increase trust and reduce fraud between parties.
* If the **developer of an online polling service** uses Passport to gate polls, this might mean that you can trust the results more, since they might be less tampered with bot manipulation.

When you arrive to a Passport-gated app, you'll be prompted to connect your wallet. The app will use your address to fetch information about your Passport, including what stamps it has.

{% hint style="success" %}
Be sure to use the same wallet that you used to create your passport.
{% endhint %}



## Presenting Your Passport to the Example Passport Reader

The Gitcoin Passport provides an example reader application to help you get started, check that out at https://example-passport-reader.gitcoin.co and the repo for that at [https://github.com/gitcoinco/passport-reader/](https://github.com/gitcoinco/passport-reader/)

Upon arriving on the passport reader app you'll be prompted to connect your wallet.&#x20;

{% hint style="success" %}
**Good to know:** Your Passport is associated to your Ethereum address, so be sure that you connect to 3rd party apps using the same address that you used to create your passport.
{% endhint %}

With your wallet connected, the 3rd party application is now able to locate and read your Passport from the Ceramic Network.

Additionally, applications can verify that your Verifiable Credentials were issued by known trusted authorities and have not been altered. Apps which read your Passport and Verifiable Credentials can selectively choose the stamps and issuers that they trust, allowing for application specific scores to be generated based on your Stamp collection. The process of verifying your stamps can be handled completely offline, but implementations might vary between apps.



\




