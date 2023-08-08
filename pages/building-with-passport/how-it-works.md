---
description: >-
  This page explains how Gitcoin Passport enables you to verify the unique
  humanity of a wallet who wants to access your app/project.
---

# How Passport works

Gitcoin Passport is a tool that allows users to present evidence that they are real, unique humans and signal their trustworthiness to apps. It is a way to collect and present data without exposing it or giving up ownership. Under the hood, it is a unique identifier (a DID) associated with your Ethereum address, stored on the Ceramic network. The DID can be used to look up a user's Stamp data, which exists as a collection of Verified Credentials.

_Verified Credentials **do not contain any personal identifying information**! They simply demonstrate, using a cryptographic signature, that the user gave access to a specific app and that some criteria were met._

Apps can use the [Gitcoin Passport API](scorer-api/) to query the Passport data and make decisions about how to handle certain users. The API can aggregate the data into a "score" or detect ownership of specific Stamps.

The Gitcoin Passport team continually expands what Stamps Passport holders can collect. Stamps represent a user's participation in various groups and communities.

### How can apps use Passport for access control?

Apps can integrate Gitcoin Passport to control who can access certain content or functions. For example, a website might have a secret section that is only visible to users owning a specific set of Stamps, or a voting system might restrict participation to users with a certain Passport score. Here's how this works:

#### 1: Load a user's Passport

When a user loads an app they are immediately prompted to connect their Ethereum wallet. The user signs a message in their wallet that controls access to their Passport. If this message is signed, the app is granted access to their public key, which can be used to lookup their [DID](https://github.com/w3c-ccg/did-pkh) on Ceramic.

* If the DID **is not** associated with a Passport, continue to ​Step 2
* If the DID **is** associated with a Passport, continue to ​Step 3

#### 2: Direct user to create or manage their Passport

If the user does not have a Passport or does not hold enough Stamps to meet that app's requirements, the user should be directed to the Gitcoin Passport app at [https://passport.gitcoin.co/](https://passport.gitcoin.co/).

Gitcoin's instance of the Passport app has integrated the identity and verification Stamps necessary for building their Unique Humanity. The Unique Humanity score increases as the user adds more Stamps as evidence that they are a unique human.

Explore our [Creating your Passport](../get-started/creating-your-passport.md) and [Collecting Stamps](../get-started/collecting-stamps.md) pages for more details.

#### 3: Validate and score the user's Passport

Once a Passport has been connected, the app can verify the Stamps, calculate a score and decide if the user has the necessary Stamps to continue into the system. The verification step is extremely important - it checks that the Stamps have been issued by a trusted provider. The verification of the VCs is done using the Passport API. Right now, Gitcoin is the only trusted issuer of these VCs. We expect to enable a process for becoming a trusted issuer soon. The scoring algorithm sums the weights of all the individual Stamps owned by a Passport. These weights are set by Gitcoin (see [this file](https://github.com/gitcoinco/passport-scorer/blob/43833b4d68a4c20abe6bc99af78dab119b84b9a2/api/scorer/settings/gitcoin\_passport\_weights.py#L4)) and can change over time as the algorithm is refined for better Sybil defense.

#### STEP 4: Grant or deny the user access

The Passport score or list of Stamps can be returned from the Passport API and used to execute access control logic in an app. If a user has the required Stamps and/or a high enough score, the app can give them access to different content. You can build a simple app for yourself by following our developer tutorials.

Some examples include:

* Access to a gated Discord
* Ability to vote on a governance proposal
* Ability to participate in a grants program
* Ability to play a game
