---
description: This page explains how to create you own Passport as a web3 citizen.
---

# Creating your Gitcoin Passport

## Creating your Passport

Visit the Gitcoin Passport app at [passport.gitcoin.co](https://passport.gitcoin.co):

{% embed url="https://passport.gitcoin.co" %}
The Passport App
{% endembed %}

When you arrive at the passport app you'll be prompted to sign in with your Ethereum wallet.

{% hint style="success" %}
Your Passport is associated with your Ethereum address, so be sure to connect a wallet you use regularly.
{% endhint %}

With your wallet connected, you'll be prompted to sign a message allowing the app to sign in with your Ethereum account and access your data on Ceramic.

If this is your first time using the Passport app, you will get a new Passport created for you.

If you are a returning user your Passport information should be retrieved and you can see your previously saved Stamps.

If it has been longer than 90 days since you last logged in, you may be presented with a fresh Passport. This is because stamps expire/decay after 90 days and you are required to refresh them to confirm the details are still accurate.

## Collecting Stamps

Once connected you'll have a variety of stamps available to you that you can collect and add to your passport.&#x20;

Each Stamp flow is unique, but the underlying flow is similar:&#x20;

* The Passport app will guide you through connecting to the various identity providers (i.e. OAUTH with Google). In each flow, you will be asked to grant the Passport app access to some of your account data.&#x20;
* Once connected, the Passport app will communicate with our IAM server to issue a signed Verifiable Credential. This credential represents your ownership of that connected account, and allows others to know that your passport is the unique owner of the account you connected with. Your account details are encrypted and are not made available to those accessing your passport - only the information that you connected an account is shared - no DOXXing yourself!&#x20;
* The Verifiable Credential will be saved into your Passport and will be available to any 3rd party app where you present your passport.

{% hint style="info" %}
**Good to know:** Some Identity providers have their own verification process that can take some time to complete. But once you're verified there, collecting the Stamp for that service should be quick.
{% endhint %}



If you have questions about the privacy of your data, check out our FAQ:

{% content-ref url="faq.md" %}
[faq.md](faq.md)
{% endcontent-ref %}

## Presenting your Passport

See [**Presenting Your Passport**](presenting-your-passport.md) **** to learn about when you might be asked to present your Passport.



