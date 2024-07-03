---
title: Stamps developer overview
description: Instructions for creating new Stamps
---

## What is a Stamp?

Stamps are the key identity verification mechanism of Passport. A Stamp is a collection of one or more [verifiable credentials](#verifiable-credentials-vcs) from an identity provider that is collected in a Passport. Stamps are provided by a variety of web2 and web3 identity authenticators including Google, BrightID, Holonym, Civic, ENS, and more. Stamps do not store any personally identifiable information, only the verifiable credentials issued by the identity authenticator.

Passport aggregates Stamps and assigns each Stamp a different weight according to the needs of a particular community. This weight is used to calculate the cost of forgery of an identity, a score which reflects the credibility of a potential participant’s online identity. 

The Passport team is highly selective about the new Stamps that are added to the platform. To be considered, you can follow the steps outlined in on this page.

## Stamp assessment criteria

When new Stamps are proposed we evaluate them according to some key criteria:

- **Strong non-Sybil signal**

  Stamps should represent some strong method for identifying Sybils vs non-Sybils so that we can ensure that each Stamp helps to improve the Sybil-defense that Passport offers. We prioritize new signals that are unique or different to the signals we have already have in Passport. It’s ideal if there’s already data, from internal efforts, indicating the effectiveness of the credentials.

- **Free** (or very cheap)

  We have heard feedback from end users who are frustrated by the costs of some of the existing Stamps. Where possible we'd like to expand the set of free or very cheap options available to our users.

- **Easy to use**
  
  Ensuring that a user can quickly get set up and verified is important to the overall Passport and partner platform's success. We’ll prioritize those Stamps and credentials that can be included in the existing ‘1-click’ verification flow.

- **Strong partnership**

  We pass Sybil data back and forth in an aggregate and anonymized way with our strongest partners to help all parties improve Sybil defense. We expect future partners to participate in this program as well.

- **Substantial user base**

  The more users you have, the more users we can start offering Sybil defense to. This also helps grow the Passport ecosystem as each new partner helps grow all partners.


## What types of Stamps would we like to see more of?

We are specifically interested in Stamps that are accessible in areas of the world that are currently under-represented, such as Asia, Africa, and Latin America. This is so people in those regions don't find it more difficult to prove themselves to be real users than people from other areas.

Similarly, we are interested to see more Stamps that are accessible to new-comers to Web3, but still match our key criteria. 

## Process

If you believe your Stamp meets the criteria described above, then you should submit your Stamp using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdpxAUllQKuPd7ogO7hJMuSUoZzThF0ZRpKVw7MVJg6CD0sPg/viewform?usp=sf_link).

We review form submissions periodically and will get back to partners who's Stamps we want to integrate as soon as possible.

If we decide to move forward with your Stamp, the next step is to follow the instructions in [this guide](https://docs.passport.xyz/stamps/integrating-a-new-stamp).
