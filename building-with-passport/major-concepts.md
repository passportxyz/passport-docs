---
description: These are the concepts you need to know to understand Gitcoin Passport
---

# Major Concepts

### Passports

The example below shows the JSON data format for a Gitcoin Passport. This is an example of a Decentralized Identifier (DID), as defined in the [W3c documentation](https://w3c.github.io/did-core/#a-simple-example). Each passport contains a field named `stamps`. This is a array where your stamps are stored.

To see what each stamp looks like, scroll down to the stamps section. When you add stamps to your passport, they are pushed into this array. The entire Passport (DID) object is stored on the Ceramic network and associated with your Ethereum address.

```
{
	"issuanceDate": null,
	"expiryDate": null,
	"stamps": [

	]
}
```

### Passport Protocol

The "Passport Protocol" refers to the infrastructure that enables web3 citizens to create their own Passport, prove their decentralized identity and access Passport-gated projects. It is all the tooling that enables developers to build Passport gating into their apps.

Web3 citizens interface with the Passport Protocol through the Passport holder dApp at passport.gitcoin.co. Developers can use the [Scorer API](https://api.scorer.gitcoin.co/docs) to easily integrate Gitcoin Passport into their apps.

### Passport-Gating

"Passport gating" means integrating the Passport Protocol ed instances of e.gf. and into an app for the purpose of screening accounts to keep out bots, bad actors, or simply real people who don't meet a certain threshold of trustworthiness.

**Usage:**

* "I like how this project gated its community with Gitcoin Passport. I'm going to ask the project owner for their gating algorithm, so I can use it for inspiration."
* "Some examples of Passport-gated dApps include: Snapshot, Bankless Academy, and Gitcoin Grants."
* "Because this community is gated with Gitcoin Passport, it is able to ask for pieces of proof of not just identity via services like BrightID, but also reputation via services like POAP."

See the Quick Start Guide to learn how to gate your project.

### Stamps

Stamps are the key identity verification mechanism of Gitcoin Passport. A stamp is a collection of one or more [verifiable credentials](major-concepts.md#verifiable-credentials-vcs) from an identity provider that is collected in a Passport. Stamps are provided by a variety of web2 and web3 identity authenticators including Google, Facebook, BrightID, ENS, and Proof of Humanity. Custom stamps for particular communities are under development. Stamps do not store any personally identifiable information, only the verifiable credentials issued by the identity authenticator.

Passport aggregates stamps and assigns each stamp a different weight according to the needs of a particular community. This weight is used to calculate the cost of forgery of an identity, a score which reflects the credibility of a potential participant’s online identity. For example, a community for developers could assign a greater weight to a Github stamp, resulting in higher scores for those who have Github stamps.

The code snippet below shows a single stamp. This particular stamp proves ownership of a Discord account. The stamps array in the Gitcoin passport object contains multiple instances of this data structure representing each different passport stamp. All the stamps conform to this specific format inherited from [https://www.w3.org/2018/credentials/v1](https://www.w3.org/2018/credentials/v1).

```json
{
    "provider": "Discord",
    "credential": {
        "type": [
            "VerifiableCredential"
        ],
        "proof": {
            "jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..Ac4ey_k49EFc-pNUpbJdfVYQxskVKVEPSZ36bak_vvtGf5gIqy1TXyWlbR5tzhFrzjYlFc-GHQKwSvW-0xzdBA",
            "type": "Ed25519Signature2018",
            "created": "2023-04-20T12:31:48.468Z",
            "proofPurpose": "assertionMethod",
            "verificationMethod": "did:key:zM6khhvGHobLobLYjd1b1MAtnbgRLh4Sdj1bgRLPGAAvbMA1nt2zcRyqmYU5LC#zKKkghvGHLobELLhS4LPGJAvz2cRyqmYU5LC"
        },
        "issuer": "did:key:z6MGH1tn2zcRobLEdj1bgJLhS4LPGGAvbMARkghvymqYU5CL",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "issuanceDate": "2023-04-20T12:31:48.468Z",
        "expirationDate": "2023-07-19T12:31:48.468Z",
        "credentialSubject": {
            "id": "did:pkh:eip155:1:0x281aa163B9b0927B8B5C68e5A009ddD06a103Eeb",
            "hash": "v0.0.0:Hl1gllZWqCCj69w9nmsjbaaahK3QtZthAE7/ku/jN7s=",
            "@context": [
                {
                    "hash": "https://schema.org/Text",
                    "provider": "https://schema.org/Text"
                }
            ],
            "provider": "Discord"
        }
    }
    }
```

###

### Verifiable credentials (VCs)

Each stamp is composed of one or more "verifiable credential". These credentials are individual pieces of evidence that can be tested in order to issue a stamp. For example, the Github stamp includes VCs for several different properties of a user's Github account, including the Github OAuth (can the user sign in to the account) and the number of followers, forks and stars the user has accumulated. Together, these VCs comprise the Github Passport stamp.

###

### Duplication of Stamps

The Passport itself does not require a unique underlying account to issue a VC. This means that any number of wallets can create Passports that link to the same underlying identity. While it is fine for an honest user to have multiple Passports, for example to maintain different user profiles (for example "home" and "work") it is not acceptable to use the same credential multiple times to influence a single outcome. Passport is built to support contextual identity so you can maintain Passports that you use within specific communities. It's also important for recoverability that stamps are not bound to a single Ethereum address - otherwise losing access to your wallet means losing the ability to prove your identity using the stamps that had previously been tied to it.

To enable users to maintain distinct personas is different communities, but simultaneously prevent dishonest multiplication of stamps we have added a `hash` field to the Passport stamps.

This `hash` is a unique identifier that is generated for all VCs issued by the Gitcoin server. It allows a stamp to be uniquely identified, so a particular app can check that it has only been used once, while preserving anonymity.

As a developer, you don't need to implement any logic for deduplicating stamps if you use the default scorer. The deduplication is done server-side. However, if you are building a custom scorer you may want to store the hashes and deduplicate stamps yourself to prevent users from submitting the same set of stamps in multiple Passports.

More details about Passport deduplication can be found on our [Deduplicating Stamps](../get-started/deduplicating-stamps.md) page.

### Streams

Passport identity data is stored as a decentralized data stream on Ceramic. Streams are individual instances of state on the Ceramic network. They are mutable and can only be altered after receiving a transaction signed by the account that owns it. These data streams are what allow Passport data to be interoperable and portable across multiple chains and dApps.

### Scorer

A Scorer is an instance of a scoring algorithm. Gitcoin Passport provides the Scorer API that provides a straightforward way for developers to interact with the Passport Protocol, including adding Passports to a registry and calculating the Passport score isng a scoring algorithm.

### Scoring Mechanisms

To evaluate the unique humanity of users in web3 applications, Gitcoin has devised two scoring mechanisms - Gradual Unique Humanity Verification and Boolean Unique Humanity Verification. These mechanisms consider multiple stamps connected to a Passport holder, such as verified Twitter and Google accounts, possession of GTC or ETH, and previous participation in Gitcoin Grants. Each stamp is assigned a weight based on its significance in assessing the unique humanity of the Passport holder. These weights are used as inputs to an algorithm that calculates a Passport score for the holder. The weights are defined in the [Passport Github](https://github.com/gitcoinco/passport-scorer/blob/main/api/scorer/settings/gitcoin\_passport\_weights.py).

The approach for scoring is designed to focus on interactions across a wide range of technology platforms, where the global maxima for a Passport score is quite high, making it unrealistic for real humans to achieve a perfect score. Nevertheless, these scores can still be used to grant access to partial rights, features, and other benefits to Passport holders based on their score. For instance, developers may offer access to a web app to users with a score above a particular threshold, or provide special features to power users with scores above a certain level.

The Gradual Unique Humanity Verification mechanism allows developers to assign partial rights to users based on their unique humanity score. For example, a user with a score of 30/100 may receive 30% of a full testnet ETH faucet payment, while a user with a score of 45/100 may have their votes multiplied by 45/100. Developers can customize the gradual weights in various ways to tailor their application.

The Boolean Unique Humanity Verification mechanism is aimed at preventing bot/sybil attacks and safeguarding user privacy. It involves asking users to verify a particular set of stamps, each with a specific significance in assessing their unique humanity. Users are deemed unique humans if they meet or exceed the predetermined threshold of verified stamps that reach a combined score above a certain threshold.

The algorithm used to calculate Passport scores is transparent and easily auditable. The exact formula used to calculate the score is available in the Gitcoin Scorer code base, and the scoring weight of each stamp is determined by Gitcoin's data scientists based on the identities of users in previous Gitcoin Grants rounds and other Gitcoin Passport use cases. By using these scoring mechanisms, developers can ensure that only unique humans are able to participate in their applications while still preserving the privacy of users.

### Sybil

A Sybil is a fake user. Many applications require confidence that each of their users represents a real human individual rather than a bot or an impersonator. However, users can try to create multiple personas that they use to access a service, gaining more than their fair share or reward or influence. Each of these dishonest personas is known as a Sybil. Take voting for example; if a user can create ten accounts and convince a platform that they are all valid, then they have multiplied their influence over the outcome of the vote by 10x. Gitcoin Passport is an anti-Sybil tool because it makes it harder for attackers to convince platforms that these Sybil accounts represent genuine users.
