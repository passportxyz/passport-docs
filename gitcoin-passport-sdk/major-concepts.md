---
description: Organized from highest level frameworks to lower-level libraries.
---

# Major Concepts

### Cost of Forgery&#x20;

The cost of forgery score is the main way Passport is used to build trust between open web participants and dApps. As the name implies, cost of forgery is a measure of how difficult it would be for a sybil attacker to duplicate a participant’s identity. In essence, it measures the extent to which a profile is sybil resistant.&#x20;

When a participant connects their Passport to a dApp, the dApp uses a the Passport algorithm to assign a weight to each stamp. These weights are used to calculate a final cost of forgery score, a metric that is used to determine how trustworthy a participant is. The more stamps a participant has in their Passport, the higher the cost of forgery is. While the way this metric is used varies, decentralized apps and communities can generally give participants with higher cost of forgery scores access to more amenities, a shorter vetting process, and other perks.

### Stamps&#x20;

Stamps are the key identity verification mechanism of Gitcoin Passport. A stamp is a verifiable credential from an identity provider that is collected in a Passport. Stamps are provided by a variety of web2 and web3 identity authenticators including Google, Facebook, Bright ID, ENS, and Proof of Humanity. Stamps given out by particular communities are a functionality that is under development. They do not store any personally identifiable information, only the verifiable credential issued by the identity authenticator.

Passport aggregates stamps and assigns each stamp a different weight according to the needs of a particular community. This weight is used to calculate the cost of forgery of an identity, a score which reflects the credibility of a potential participant’s online identity. For example, a community for developers could assign a greater weight to a Github stamp, resulting in higher scores for those who have Github stamps.

### Streams

Passport identity data is stored as a decentralized data stream on Ceramic. Streams are individual instances of state on the Ceramic network. They are mutable and can only be altered after receiving a transaction signed by the account that owns it. These data streams are what allow Passport data to be interoperable and portable across multiple chains and dApps.

### **Reader**

Reader is a library in the Passport SDK which allows an integrated dApp to read any Passport stream on Ceramic. A Passport stream contains all the identity data for a single user in a way that can be accessed across chains. Reader is how your dApp or community can view data on the verifiable credentials stored in a user’s Passport stamps without making personally identifiable information visible or accessible: it accesses the identity information stored on the Ceramic network and allows you to use it in your verification process.

**Learn more about this library in the integration section.**

### **Scorer**

Scorer is a library in the Passport SDK that allows an integrated dApp to evaluate the verifiable credentials stored in a Gitcoin Passport according to their own criteria and the needs of their community. Once the Verifier package evaluates verifiable credentials in a Passport to ensure that they were correctly issued, the Scorer assigns different weights to each of the VCs to generate a cost of forgery score that reflects the trustworthiness of the user’s identity in addition to their fit with the community. The weights placed on each VC can be adjusted, which allows each dApp to choose the identity authenticators they place the most trust in, as well as the stamps that are necessary to participate in the app. Think of Scorer as the tool that allows your community to design its own customs process: one that ensures each potential participant meets the necessary requirements and follows the correct regulations before entering your dApp.

**Learn more about this library in the integration section.**

### Verifier

Verifier is a library in the Passport SDK that confirms the contents of a given Passport and ensures that each verifiable credential was issued correctly. In the broader Passport evaluation process, Verifier comes before Scorer.

**Learn more about this library in the integration section.**

### Writer

Writer is a library in the Passport SDK which creates, reads, and updates a Gitcoin Passport. Writer allows you to create a front end instance of Passport that is tailored to your community’s branding and onboarding or voting specifications. Writer essentially allows you to create a new data stream to store someone’s identity information in Ceramic without having to interact with Ceramic Network directly. With Writer, you can issue your own verifiable credentials as well as retrieve someone’s DID from the Ceramic Network. This complements other libraries in the Passport SDK, such as Reader and Scorer, focus specifically on assessing stamps.

**Learn more about this library in the integration section.**

****
