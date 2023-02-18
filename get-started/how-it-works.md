---
description: >-
  This page explains how Gitcoin Passport enables you to verify the unique
  humanity of a wallet who wants to access your app/project.
---

# How it works

_Gitcoin Passport is a self-sovereign data collection protocol built with the Ceramic Network, created in line with the Decentralized Identifier (DID) and Verifiable Credential (VC) specifications_.&#x20;

_This data is intended for broad interoperability for any system that wishes to issue or consume VCs to establish the ‘unique humanity’ of an individual through their direct ownership of multiple accounts (Twitter, BrightID), or web3 assets (ENS)._

_The Gitcoin Passport team continually expands what stamps Passport holders can collect. Stamps represent a web3 citizen's participation in various groups and communities._

## How A Passport-Gated Project Validates A User's Identity

**Below is an example of how a project—that has integrated with Gitcoin Passport and requires users to have a particular set of stamps (VCs) to interact with their system—would review a potential user's Passport.**

#### STEP 1: Load a user's Passport&#x20;

Upon arriving at this app, the user is prompted to connect their Passport. The user signs a message in their wallet that controls their Passport, granting the app access to their public key, and the app can lookup their DID (https://github.com/w3c-ccg/did-pkh).&#x20;

The app then attempts to fetch the Passport data from Gitcoin Passport's servers and the Ceramic network.&#x20;

* If no passport is found, continue to [Step 2](how-it-works.md#step-2-direct-user-to-create-or-manage-their-passport)
* If a passport is found, continue to [Step 3](how-it-works.md#step-3-validate-and-score-the-users-passport)

#### STEP 2: Direct user to create or manage their Passport

If the user does not have a passport or does not hold enough stamps to meet that app's requirements, the user should be directed to the Gitcoin Passport app at [passport.gitcoin.co](https://passport.gitcoin.co/).

{% hint style="info" %}
Gitcoin's instance of the Passport app has integrated the identity and verification stamps necessary for building their Unique Humanity. The Unique Humanity score (among other scores available soon) incentivizes users to provide multiple stamps as evidence that they are a single user, and in reward are given increasing weight to their matching abilities in the Quadratic Funding mechanism used by Gitcoin Grants.
{% endhint %}

Once connected to the Passport application, users sign a message granting the app access to their Ceramic stream. New users will have a blank passport created, and existing users will see their passport data and existing stamps.&#x20;

{% hint style="info" %}
It is important to note that stamps expire/decay after a certain amount of time. This ensures Passport holders are still providing an accurate representation of themselves. By default, stamps expire after 90 days.
{% endhint %}

They can then continue managing their passport, linking new services and claiming stamps to enrich their verifiable online identity.

#### STEP 3: Validate and score the user's Passport

When a passport has been loaded, the app can validate the stamps, calculate a score and decide if the user has the necessary stamps to continue into the system. It is important to note, that the validation step is extremely important, in order to make sure that the stamps have been issued by a trusted provider (in this case Gitcoin). The Verification of the VCs is done by using the API endpoint(s).

The integrating app should adhere to this process to ensure they aren’t being presented passports with invalid VCs, and that VCs were issued by trusted servers. Right now, Gitcoin is the only trusted issuer of these VCs. We expect that change in time but have not yet defined criteria for issuers to be certified.

**STEP 4: Grant or deny the user access**

If the user has the required stamps and/or a high enough score, it's up to you to decide what they get access to.

Some examples include:&#x20;

* Access to a gated Discord
* Ability to vote on a governance proposal
* Ability to participate in a grants program
* Ability to play a game
