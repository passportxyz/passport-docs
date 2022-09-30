---
description: Organized from highest level frameworks to lower-level libraries.
---

# Major Concepts

### Stamps&#x20;

Stamps are the key identity verification mechanism of Gitcoin Passport. A stamp is a verifiable credential from an identity provider that is collected in a Passport. Stamps are provided by a variety of web2 and web3 identity authenticators including Google, Facebook, Bright ID, ENS, and Proof of Humanity. Stamps given out by particular communities are a functionality that is under development. They do not store any personally identifiable information, only the verifiable credential issued by the identity authenticator.

Passport aggregates stamps and assigns each stamp a different weight according to the needs of a particular community. This weight is used to calculate the cost of forgery of an identity, a score which reflects the credibility of a potential participant’s online identity. For example, a community for developers could assign a greater weight to a Github stamp, resulting in higher scores for those who have Github stamps.

### Streams

Passport identity data is stored as a decentralized data stream on Ceramic. Streams are individual instances of state on the Ceramic network. They are mutable and can only be altered after receiving a transaction signed by the account that owns it. These data streams are what allow Passport data to be interoperable and portable across multiple chains and dApps.

### **Reader**

Reader is a library in the Passport SDK which allows an integrated dApp to read any Passport stream on Ceramic. A Passport stream contains all the identity data for a single user in a way that can be accessed across chains. Reader is how your dApp or community can view data on the verifiable credentials stored in a user’s Passport stamps without making personally identifiable information visible or accessible: it accesses the identity information stored on the Ceramic network and allows you to use it in your verification process.

**Learn more about this library in the integration section.**

### Verifier

Verifier is a library in the Passport SDK that confirms the contents of a given Passport and ensures that each verifiable credential was issued correctly. In the broader Passport evaluation process, Verifier comes before Scorer.

**Learn more about this library in the integration section.**

### **Scorer**

Scorer is the library in the Passport SDK that allows an integrated dApp to generate a score based on the verifiable credentials stored in a Gitcoin Passport according to their own criteria and the needs of their community.&#x20;

Once the Verifier package evaluates verifiable credentials in a Passport (to ensure that they were correctly issued) the Scorer decides which VC issuers it will consider (allowing for the filtering of unknown or untrusted VC issuing services) and allows the app to assign different weights to each of the VCs to generate a passport score that reflects the trustworthiness of the user’s identity.&#x20;

The weights placed on each VC can be adjusted, which allows each app that integrates the passport to choose the Stamps they place the most trust in, as well as the stamps that are necessary to participate in the app.&#x20;

Think of Scorer as the tool that allows your community to design its own customs process: one that ensures each potential participant meets the necessary requirements and follows the correct regulations before entering your dApp.

{% hint style="info" %}
Deduplication of Stamps

You may have noticed at this point that the passport itself does not require unique underlying account to issue a VC. This means that any number of wallets can create passports that link to the same underlying identity.\
\
The choice here is twofold:

1. Binding a stamp to a wallet creates recoverability issues. What if you lose access to your wallet? The underlying stamp would be lost with it, and you wouldn't be able to link your identity providers to a new wallet
2. We have built Passport to support contextual identity, you may have a passport that you use within one community, and another you use elsewhere. \


Because multiple passports may use the same underlying service for generating a stamp we have added the hash field into our stamps. This hash is a unique identifier that is generated for all VCs issues by the Gitcoin IAM, and provides a unique identifier for the underlying account while preserving anonymity.\
\
So when you're scoring, you will probably want to store the hashes and dedupe the stamps you are considering in your scoring process to avoid folks submitting the same stamp attached to multiple passports.\

{% endhint %}

**Learn more about this library in the integration section.**

### Writer

Writer is the library in the Passport SDK that creates, reads, and updates a Gitcoin Passport. Writer allows you to create a front end instance of Passport that is tailored to your community’s branding and onboarding or voting specifications.&#x20;

Writer essentially allows you to create a new data stream to store someone’s identity information in Ceramic without having to interact with Ceramic Network directly.&#x20;

With Writer, you can issue your own verifiable credentials as well as retrieve someone’s DID from the Ceramic Network. This complements other libraries in the Passport SDK, such as Reader and Scorer, which focus specifically on assessing stamps.

**Learn more about this library in the integration section.**

****
