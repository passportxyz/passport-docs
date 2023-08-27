---
description: >-
  This page walks you through how to integrate the Passport SDK into your dApp,
  so you can keep out bots and bad actors
---

# How to Passport-Gate Your Project (by Integrating the Passport SDK)

In the **Getting Started** section, we went over how to install each of the Passport libraries. Now, we'll go over the basic usages of each of the libraries so you can get the identity solution you need for your dApp.

### I need to…

## Create and manage DIDs

The Writer library allows an integrated dApp to write to an authenticated DID Passport stream in Ceramic.

### Getting Started with the Writer library

The below tutorial outlines how to:

* connect a wallet
* create and authenticate a DID construct a new instance of Writer
* create a new Passport belonging to a user or retrieve their existing decentralized identity data from Ceramic, and
* add a Stamp to a Passport belonging to a specific user.

At the end of this step, you’ll understand how to interact with Passport DIDs in your project’s verification process.

```typescript
import {DID} from "dids";
import {EthereumAuthProvider} from "@3id/connect";

...

// connect to wallet somehow
const provider = wallet.provider;
const address = wallet.accounts[0];

// Create and authenticate a DID
const testDID = new DID({
    provider: new EthereumAuthProvider(provider, address),
});
await testDID.authenticate();

// Construct a writer
const passportWriter = new PassportWriter(testDID);

// Create a Passport belonging to testDID
const passportStreamID = await passportWriter.createPassport();

// Get the Passport by Stream ID
const passport = (await passportWriter.loader.load(passportStreamID)).content;

// Get the Passport belonging to testDID
const testDIDPassport = await passportWriter.getPassport();

// Add a Stamp to the Passport belonging to testDID
const newStamp = {
    provider: "An Identity Provider",
    credential: {...a Verifiable Credential...}
};
await passportWriter.addStamp(newStamp);
```

### Setting up Ceramic framework

To use the Passport properly, you’ll have to have a basic understanding of the Ceramic framework. Unfamiliar with Ceramic? You can check out their documentation [here](https://developers.ceramic.network/reference/self-id/modules/framework/).

1. **Configure the Ceramic Provider**

The Provider component has to be added at the root of the application tree in order to use the hooks provided below. It can be used to provide a custom configuration for the [Self.ID](http://self.id) clients, authentication, state and UI options.

```typescript
import {Provider} from '@self.id/framework'

function App({children}) {
    return <Provider client={{ceramic: 'testnet-clay'}} session={true}>{children}</Provider>
}
```

2\. **Retrieve a user’s authenticated DID**

The useViewerConnection hook needs to be set up before a user’s authentic DID can be located.

This code snippet explains how to import the hook and use it to connect to a Ceramic stream to retrieve a DID.

```typescript
import {useViewerConnection} from "@self.id/framework";

const [viewerConnection, connectCeramic, disconnectCeramic] = useViewerConnection();

// connect to wallet somehow
const provider = wallet.provider;
const address = wallet.accounts[0];

connectCeramic(new EthereumAuthProvider(provider, address));

useEffect(() => {
    switch (viewerConnection.status) {
        case "idle": {
            // not connected yet
            break;
        }
        case "connected": {
            // user connected - construct a writer authenticated by user's DID
            const passportWriter = new PassportWriter(viewerConnection.selfID.did);
            // ... do stuff with passport writer ...
            break;
        }
        case "failed": {
            // user refused to connect or authenticate to ceramic
            break;
        }
        default:
            break;
    }
}, [viewerConnection.status]);
```

### Requesting Verifiable Credentials

A user’s verifiable credentials can be retrieved from Gitcoin’s IAM server. There are two servers: a production server and a staging server.

* Production Server: [https://passport-iam.gitcoin.co](https://passport-iam.gitcoin.co)
* Staging Server:[https://testnet.passport.gitcoin.co](https://testnet.passport.gitcoin.co)

The following code snippet explains the end to end process of retrieving verifiable credentials.

```typescript
// Fetch a verifiable challenge credential to prove user owns their address
export const fetchChallengeCredential = async (
  iamUrl: string = "<https://testnet.passport.gitcoin.co>",
  payload: RequestPayload
): Promise<IssuedChallenge> => {
  // fetch challenge as a credential from API that fits the version, address and type (this credential has a short ttl)
  const response: { data: CredentialResponseBody } = await axios.post(
    `${iamUrl}/v${payload.version}/challenge`,
    {
      payload: {
        address: payload.address,
        type: payload.type,
      },
    }
  );

  return {
    challenge: response.data.credential,
  } as IssuedChallenge;
};

// Fetch a verifiableCredential
export const fetchVerifiableCredential = async (
  iamUrl: string = "<https://testnet.passport.gitcoin.co>",
  payload: RequestPayload,
  signer: { signMessage: (message: string) => Promise<string> } | undefined
): Promise<VerifiableCredentialRecord> => {
  // must provide signature for message
  if (!signer) {
    throw new Error("Unable to sign message without a signer");
  }

  // first pull a challenge that can be signed by the user
  const {challenge} = await fetchChallengeCredential(iamUrl, payload);

  // sign the challenge provided by the IAM
  const signature = challenge.credentialSubject.challenge
    ? (await signer.signMessage(challenge.credentialSubject.challenge)).toString()
    : "";

  // must provide signature for message
  if (!signature) {
    throw new Error("Unable to sign message");
  }

  // pass the signature as part of the proofs obj
  payload.proofs = {...payload.proofs, ...{signature: signature}};

  // fetch a credential from the API that fits the version, payload and passes the signature message challenge
  const response: { data: CredentialResponseBody } = await axios.post(
    `${iamUrl}/v${payload.version}/verify`,
    {
      payload,
      challenge,
    }
  );

  // return everything that was used to create the credential (along with the credential)
  return {
    signature,
    challenge,
    record: response.data.record,
    credential: response.data.credential,
  } as VerifiableCredentialRecord;
};
```

### Issuing Verifiable Credentials

With Passport, projects also have the ability to issue their own verifiable credentials, which can be used as Passport stamps and carried with a user across their engagements in the open web.

Here’s an example of how to create a verifiable credential from SpruceID’s DIDKit.

```typescript
import * as DIDKit from "@spruceid/didkit-wasm-node";

const key = process.env.ISSUER_KEY || DIDKit.generateEd25519Key();

// Keeping track of the hashing mechanism (algo + content)
const VERSION = "v0.0.0";

// utility to create an ordered array of the given input (of the form [[key:string, value:string], ...])
const objToSortedArray = (obj: { [k: string]: string }): string[][] => {
  const keys: string[] = Object.keys(obj).sort();
  return keys.reduce((out: string[][], key: string) => {
    out.push([key, obj[key]]);
    return out;
  }, [] as string[][]);
};

// construct and issue a VerifiableCredential via DIDKit
const issueCredential = async (
  subjectAddress: string,
  provider: string,
  record: object,
  expiresInSeconds: number,
): Promise<VerifiableCredential> => {
  // get DID from key
  const issuer = DIDKit.keyToDID("key", key);
  // read method from key
  const verificationMethod = await DIDKit.keyToVerificationMethod("key", key);
  // stringify assertionMethod we feed to didkit-wasm-node
  const verifyWithMethod = JSON.stringify({
    proofPurpose: "assertionMethod",
    verificationMethod,
  });

  const issuanceDate = new Date();
  const expirationDate = new Date();
  expirationDate.setSeconds(issuanceDate.getSeconds() + expiresInSeconds);

  // Generate a hash like SHA256(IAM_PRIVATE_KEY+PII), where PII is the (deterministic) JSON representation
  // of the PII object after transforming it to an array of the form [[key:string, value:string], ...]
  // with the elements sorted by key
  // This hash can be used to de-duplicate provider verifications without revealing PII
  const hash = base64.encode(
    createHash("sha256")
      .update(key, "utf-8")
      .update(JSON.stringify(objToSortedArray(record)))
      .digest()
  );

  // generate a verifiableCredential
  const credential = await DIDKit.issueCredential(
    JSON.stringify({
      "@context": ["<https://www.w3.org/2018/credentials/v1>"],
      type: ["VerifiableCredential"],
      issuer,
      issuanceDate: issuanceDate.toISOString(),
      expirationDate: expirationDate.toISOString(),
      credentialSubject: {
        "@context": [
          {
            hash: "<https://schema.org/Text>",
            provider: "<https://schema.org/Text>",
          },
        ],
        // construct a pkh DID on mainnet (:1) for the given wallet address
        id: `did:pkh:eip155:1:${subjectAddress}`,
        provider,
        hash: `${VERSION}:${hash}`,
      },
    }),
    verifyWithMethod,
    key
  );

  // parse the response of the DIDKit wasm
  return JSON.parse(credential) as VerifiableCredential;
};

const exampleVerifiableCredential = issueCredential(
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "Example-Passport-Writer-Provider",
  {myRecord: "my value"},
  600
)
```

## Read identity data from a Passport

Reader allows an integrated dApp to read from any Passport stream on Ceramic.

### Getting Started

To set up the Reader library, import the library and construct a passport reader instance.

Then, pass in a ceramic node URL and network ID that points toty Gitcoin’s main Ceramic node.

```typescript
// add to your project as a module
import PassportReader from "@gitcoinco/passport-sdk-reader"

// or import the bundle
<script src="./dist/reader.bundle.js" type="script/javascript"/>

...

// create a new instance pointing at Gitcoins mainnet Ceramic node
const reader = new PassportReader("<https://ceramic.passport-iam.gitcoin.co>", "1");

// read a Passport for any Ethereum Address
const passport = await reader.getPassport("0x0...");
```

### Reader Methods

Setting up the passport reader instance enables several read-only methods that allow you to get to the content of a Gitcoin Passport.

**getGenesis**

Passes in an Ethereum address and returns the did:pkh and genesis IDX streams.

`reader.getGenesis(address: string): Promise<CeramicGenesis | false>`

**getPassport**

Passes in an Ethereum address and returns a fully hydrated Passport record, with all verifiable credentials.

`reader.getPassport(address: string): Promise<CeramicPassport | Passport | false>`

**getPassportStream**

Passes in a Ceramic DID and returns a raw Passport stream record. This is a shallow copy of Passport that needs to have its stamps hydrated.

`reader.getPassportStream(address: string): Promise<CeramicPassport | false>`

## Verify the contents of a Passport

Verifier allows an integrated dApp to verify the contents of a Passport. This is a necessary step to later evaluate the contents of a Passport and produce a cost of forgery score.

### Getting Started

1. To set up verifier, import the library as a module or import the bundle, then construct a passportVerifier instance.

```typescript
// import as a module
import PassportVerifier from "@gitcoinco/passport-sdk-verifier";

// or import the bundle
<script src="./dist/verifier.bundle.js" type="script/javascript"/>
```

2\. Create a new instance pointing at the community clay node on the Ceramic mainnet, along with the criteria you wish to score against.

```typescript
const verifier = new PassportVerifier();
```

3\. Verify all Stamps held in a Passport

```typescript
const passport = await verifier.verifyPassport("0x0...");
```

**Getting started on a browser may require additional steps.**
You may need to asynchronously load `@gitcoinco/passport-sdk-verifier` before loading the package.


Next Js Example

```typescript
const [verifier, setVerifier] = useState();

useEffect(() => {
  const initVerifier = async () => {
    // Dynamically load @gitcoinco/passport-sdk-verifier
    const PassportVerifier = (await import("@gitcoinco/passport-sdk-verifier")).PassportVerifier;
    setVerifier(new PassportVerifier("<https://ceramic.staging.dpopp.gitcoin.co>"));
  };

  initVerifier().then(() => {
    console.log("Verifier inited :)");
  });
}, []);
```

### Verifier Methods

After the PassportVerifier instance is created, read-only methods for verifying the content of a Gitcoin Passport are exposed.

**verifyPassport**

Pass in an Ethereum address and get back a Passport where each of the Stamps includes a verified: boolean field.


```typescript
PassportVerifier.verifyPassport(address: string, passport?: Passport, additionalStampCheck?: (stamp: Stamp) => boolean): Promise<Passport>
```


**verifyStamp**

Pass in a Stamp and get back a Stamp with a verified: boolean field completed.


```typescript
PassportVerifier.verifyStamp(address: string, stamp: Stamp, additionalStampCheck?: (stamp: Stamp) => boolean): Promise<Stamp>
```


**verifyCredential**

Pass in a Verifiable Credential and get back a boolean.


```typescript
PassportVerifier.verifyCredential(credential: VerifiableCredential): Promise<boolean>
```

## Evaluate the contents of a Passport

The Scorer library allows an integrated dApp to score the verifiable credentials held by a Passport based on customized criteria.

### Getting Started with Scorer

After importing the library, construct a `passportScorer` instance to specify the scoring criteria and the Ceramic node URL or network ID, if desired.

1. **Import the PassportScorer as a module or bundle.** `import PassportScorer from "@gitcoinco/passport-sdk-scorer"` _or_ \*\*\*\*`<script src="./dist/scorer.bundle.js" type="script/javascript"/>`
2. **Create a new instance that defines the criteria you wish to score against.**

```typescript
const scorer = new PassportScorer([
    {
        provider: "BrightID",
        issuer: "did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC",
        score: 0.5
    }
]);
```

3\. **Get the score for a specific wallet address.**

```typescript
const score = await scorer.getScore("0x0...");
```

This instance exposes read-only methods to score the content of a Gitcoin Passport.

To get a score for a wallet address based on the scoring criteria of this instance, as well as any additional checks, use the `getScore` method.


```typescript
PassportScorer.getScore(address: string, passport?: Passport, additionalStampCheck?: (stamp: Stamp) => boolean): Promise<number>
```

