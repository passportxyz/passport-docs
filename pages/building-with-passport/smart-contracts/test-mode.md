---
title: Test mode
description: How to test the onchain infrastructure
---

As developers, we often want to test our apps and integrations on testnets, where there is nothing of real world value at stake, before we go live on a live public mainnet. You can always deploy the Gitcoin Passport smart contracts to your own local ephemeral blockchain, but it is also recommended to test your integration on a public testnet too, as this more realistically simulates a mainnet environment.

For this reason, the Passport team deployed the Passport smart contracts on several public testnets, including Base Goerli, Linea Goerli and OP Goerli.

## Test mode in the Passport app

The Passport app can be run in test mode by appending`/#/?dashboard=testing` to the app URL (making the full URL `https://passport.gitcoin.co/#/?dashboard=testing`). This enables you to write Passport data and scores to the Gitcoin Passport smart contracts on several testnets, meaning you can experiment and get comfortable with the flows before trying it out on Mainnet. 

When you sign in to the Passport App, you first have to enable Test Mode. There is a button for this at the top of the page. Enabling test Mode requires an additional signature from your Ethereum account.
 
Once Test Mode is enabled, the supported testnets are listed in a panel on the right-hand side of the page when you click on `Bring Passport onchain`. The app switches over to whichever network you select by clicking on the options in the panel in the app's UI.

![Test mode UI](../../../public/test-mode-app.png)

Other than the network selection panel, the behavior of the test app is identical to the real, "live" Passport app.


## Test mode for developers

Test mode also gives developers the ability to read and write to Passport smart contracts and also develop and test Passport integrations into their own smart contracts. On test networks, this can be done without spending any real ETH on gas fees and without putting any assets at risk from exploits. Since the Passport contracts are deployed on public testnets as can be used by anyone, there are proper Passport data and many integrations on these testnets that offer a much more realistic test environment than local, ephemeral blockchains and the Passport contracts are already deployed there and managed by the passport team, easing your development process. To work in Test Mode, developers simply have to switch their development environments onto one of the supported test networks and use the appropriate contract addresses for that network.


## Which networks are supported?

The available test networks are:

- [Optimism Sepolia](https://sepolia-optimism.etherscan.io/)
- [Linea Goerli](https://docs.linea.build/)
