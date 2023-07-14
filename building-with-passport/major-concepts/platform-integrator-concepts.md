---
description: Content for platform integrator ecosystem partners
---

# Platform Integrator concepts

This page is for platforms who integrate with Gitcoin Passport and make its sybil-resisting functionality available to their ecosystem partners and organizations.&#x20;

On this page, you will learn what types of attack Gitcoin Passport can protect you from, see examples of existing platform integrations, understand integration best-practices and identify the key information your users need to know.

### Audience definitions

First off, some audience definitions:

1. **Platform Integrator:** An application that integrates with Passport and makes the functionality available to their ecosystem partners.&#x20;
2. **Ecosystem partners:** Organizations or apps who use the platforms built by Platform Integrators.&#x20;
3. **End-users:** People who are engaging with the ecosystem partner's content or programs within the platform.

We'll use [Snapshot](https://snapshot.org/#/) as an example. Snapshot is an off-chain voting platform that allows DAOs, DeFi protocols, or NFT communities to participate in the decentralized governance. Within the Snapshot platform, Optimism Collective allows users to vote on proposals using the Snapshot technology.&#x20;

In this situation, Snapshot would be a platform integrator, Optimism Collective would be an ecosystem partner, and the users submitting and voting on proposals are end-users.&#x20;



### What are Sybils and why should you care?

Sybils are fake users. They can negatively affect your platform in several ways. There are several ways that users can become incentivized to create Sybil accounts, for example to receive a reward multiple times, or have additional influence over a vote. They prevent you from efficiently allocating power and/or capital among your community by capturing it for some dishonest person or group. Without some form of Sybil defense, you have no way to tell whether the users showing up to your application really represent individual human users or whether they are actually bots or fake accounts.



### What is Sybil defense?

Sybil defense is a catch-all term for any actions that minimize the effect of Sybils. Typically, Sybil defense involves filtering out users that can't provide sufficient evidence that they are real human individuals. The more effective the Sybil defence, the more confident you can be that your users are real, and the more effectively you can distribute rewards, votes and other forms of capital and agency to your community.

Gitcoin Passport is a Sybil defense tool. It provides everything you need to check the personhood of your users without invading their privacy.

Read more about Sybil defense on the [Gitcoin blog](https://www.gitcoin.co/passport).



### Why Gitcoin Passport?

Gitcoin Passport aggregates evidence of personhood from across web2 and web3, makes it available via a simple API, and does so while preserving user's privacy. Application developers and platform owners benefit from easy integration and flexibility to choose what evidence is most important to them, and how high their threshold for evidence should be. Users benefit from a simple UI that guides them along a simple path to collecting Passport Stamps and presenting them to apps, requiring only an Ethereum account to get started.&#x20;

Integrating Gitcoin Passport into an application is a powerful and flexible way to add Sybil defense to your application that is straightforward for developers and users alike. Importantly, Gitcoin Passport is flexible so you can configure your own Sybil defenses to your own specification, ensuring you get the best protection for your particular use case.

Read more on [why you should use Gitcoin Passport](platform-integrator-concepts.md#why-gitcoin-passport).



### How to integrate Gitcoin Passport into your platform

The most common way platforms use Gitcoin Passport is to use Passport scores or specific combinations of Stamps to control access to some content or function. This can be handled in just a few simple functions in your app.&#x20;

We have detailed guides demonstrating various Passport integrations. After you have integrated Passport into your app, your users can connect their Ethereum wallet, and the app can make an API call to the Gitcoin server to retrieve the user's Stamps and Passport score.&#x20;

The score is the sum of weights assigned to the user's Stamps. It is possible to create custom algorithms for scoring Passports from raw Stamp data, but using Gitcoin's server is considered best practice for several reasons:&#x20;

1. You benefit from [Stamp weights](https://github.com/gitcoinco/passport-scorer/blob/main/api/scorer/settings/gitcoin\_passport\_weights.py) that have been assigned by Gitcoin data scientists.
2. You do not have to handle complications such as [Stamp deduplication](../major-concepts.md#duplication-of-stamps) - the server does this for you.
3. You can follow our simple [integration guides](../integration-guides/) to quickly and easily start defending your app from Sybils!

You might want to use Stamp data instead of a Passport score. For example, a few specific Stamps might be particularly important to you (maybe you decide that having >50 Github followers is a hard requirement to access your platform). In this case you can access your user's Stamp collection and confirm ownership of individual Stamps.

Finally, you might not necessarily want to automatically gate access based on Passport scores or stamps. Perhaps you simply want to display Stamp and score information about each user, so you can make real-time decisions based on user's trustworthiness. For example, you might have to determine an honest user from several impersonator accounts. Quick access to Stamp and score data would give you a strong signal about who is the genuine user. There is a guide for displaying Stamp and score data in your app's UI [here](../integration-guides/#integrating-stamps-and-scores)!

Read more on [How Passport works](../how-it-works.md).

Start building using our [Integration guides](../integration-guides/).[ ](../how-it-works.md)



### **What does this look like for ecosystem partners?**

It would be helpful to understand the [audience definitions](platform-integrator-concepts.md#audience-definitions) in the introduction of this page when reading this section.

If integrated properly, ecosystem partners utilizing a platform's services will be able to utilize Passport functionality to ensure that their content or programs are minimally affected by Sybils.&#x20;

For example, an ecosystem partner runs a forum and voting platform in addition to their main application. Integrating Passport across all these platforms gives them confidence that your whole organization is protected to the same standard, with the same configuration.&#x20;

A Passport integration is straightforward, flexible and configurable to ecosystem partners' needs depending on how a platform integrator builds the integration. You can easily set global configurations that are standard across all platforms and partners, or you could tailor your Sybil defenses to each platform, so that you can have stricter controls for more sensitive services.&#x20;



### What does this look like for end users?

End users benefit from a very straightforward verification process and proof of personhood they can use across web3. Gitcoin Passport is a very widely used Sybil defense tool that your users can set up once and then use to identify themselves to all kinds of apps and services.&#x20;

Your end users can follow this simple guide to set up their Passport:

1. To get started, you must have an Ethereum wallet.&#x20;
2. Then, you can visit the [Passport app](https://passport.gitcoin.co/).&#x20;
3. There, you can sign in with Ethereum and connect Stamps to your Passport in a few clicks.&#x20;
4. When they want to utilize a tool that is Passport-gated, you can sign a message and provide access to the platform provider to read your Stamp and score data.



### More customization

Some platforms will find that they have specific needs that are not met by the standard Stamp library. In that case, you can add a new Stamp specifically for your purpose! Creating a Stamp requires some provable action to be captured in the form of a Verifiable Credential. We have created a [step-by-step guide ](../../stamps/integrating-a-new-stamp.md)to help platforms to create new Stamps.



### Use cases

Gitcoin Passport is already protecting many real world applications! There are several use case articles on the [Gitcoin blog](https://www.gitcoin.co/blog-2/tag/case-studies) where you can read about how various apps have integrated Passport.&#x20;

Some examples include:

{% embed url="https://www.gitcoin.co/blog/building-reputation-on-r-elinkd" %}
Relinked
{% endembed %}

{% embed url="https://www.gitcoin.co/blog/guild-xyz-and-gitcoin-passport-partner" %}
Guild.xyz
{% endembed %}

{% embed url="https://www.gitcoin.co/blog/bankless-academy-a-gitcoin-passport-case-study" %}
Bankless Academy
{% endembed %}

### Where to go from here?

* You can explore this site!
  * Learn more about the [major concepts](../major-concepts.md) underpinning Gitcoin Passport
  * Read more about [how Passport works](../how-it-works.md) and [why you should use it](../../overview/)
  * Start building by following our [integration guides](../integration-guides/)
* Get you own Gitcoin Passport at [https://passport.gitcoin.co](https://passport.gitcoin.co)
* You can join the [Gitcoin discord](https://discord.gg/6NB65hxF) and ask questions to the developers, users and wider community

