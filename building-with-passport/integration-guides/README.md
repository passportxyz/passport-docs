---
description: Walk-through tutorials for integrating Gitcoin Passport into your apps
---

# Integration guides

This section includes several walk-through tutorials for integrating Gitcoin Passport into your apps. You will find several tutorials here that demonstrate how to use Passport to:

* gate access to certain content
* grab Passport data and display it to your UI
* use Passport to determine who receives a token airdrop (coming soon)
* build smart contract applications that use Passport data (coming soon)



## Where to start

To take your very first steps into building apps with Gitcoin Passport, you can visit the [Quick Start guide](../quick-start-guide.md).&#x20;

If you want to go deeper into gating access using Passport scores and learn about best practices for Passport scoring, visit [Gating access with Passport scores](gating-access-with-passport-scores.md).

To learn how to work with individual stamps and use stamp and scorer data in your app's UI, read the [Integrating stamps and scorers](integrating-stamps-and-scorers.md) guide.



## Tutorials

Here's what you can expect to learn in each of our walk-through guides.

### Gating access with Passport scores

This tutorial will guide you through building a simple "knowledge hub" app with some specific content that can only be accessed by users with a Passport score above a threshold.&#x20;

The app is built using [Nextjs](https://nextjs.org/), [Chakra-ui](https://chakra-ui.com/) and [ethers](https://docs.ethers.org/v5/).

You will learn:

* How to create a Passport Scorer and API key
* How to create a simple app using `create-next-app`
* How to connect a user's Ethereum wallet using `ethers`
* How to use the Gitcoin Passport API to calculate a user's Passport score
* How to handle user's Passport scores in your app's state.
* How to conditionally render content based on the user's Passport score.
* How to add styling using Chakra-ui

### Integrating stamps and scores

This tutorial will guide you through building a simple app that shows whether a user is "trusted" or not based upon their Passport score and ownership of specific stamps. Multiple users can connect to the app and the stamps they own are displayed in the app's UI.&#x20;

The app is built using [Nextjs](https://nextjs.org/), [Chakra-ui](https://chakra-ui.com/) and [ethers](https://docs.ethers.org/v5/).

You will learn:

* How to create a Passport Scorer and API key
* How to create a simple app using `create-next-app`
* How to connect a user's Ethereum wallet using `ethers`
* How to use the Gitcoin Passport API to calculate a user's Passport score
* How to use the Gitcoin Passport API to query a user's stamps
* How to handle the stamp data returned from the Passport API's `stamps` endpoint
* How to handle multiple user's stamp and score data in your app's state
* How to create a simple "trust" algorithm based on a user's stamp and score data.
* How to conditionally render content based on the user's Passport score.
* How to render stamp data in the app's UI.
* How to add styling using Chakra-ui.

