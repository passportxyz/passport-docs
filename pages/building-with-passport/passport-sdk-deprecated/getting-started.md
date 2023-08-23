---
description: This page provides an overview of the Gitcoin Passport SDK
---

# Getting Started with the Passport SDK

## The Gitcoin Passport SDK

[The Passport SDK](https://github.com/gitcoinco/passport-sdk)

The SDK comprises a set of libraries designed to help developers interact with the Gitcoin Passport. This section explains how to install each of the libraries with npm. To learn more about using them in your dApp, progress to the integration section.

### Packages

#### [Reader](https://github.com/gitcoinco/passport-sdk/tree/main/packages/reader)

Reads from any Passport stream (on Ceramic).&#x20;

To get started, import the library and construct a `passportReader` instance.&#x20;

You can add to your project as a module

`import PassportReader from "@gitcoinco/passport-sdk-reader"`

or import the bundle.&#x20;

`<script src="./dist/reader.bundle.js" type="script/javascript"/>`

#### [Scorer API](https://github.com/gitcoinco/passport-sdk/tree/main/packages/scorer)

Based on initial user feedback, most communities will benefit from using the Scoring API under development rather than building a weighted scorer with the SDK. **Please check back in on progress**, and consider using the Scoping API as a first place to begin experimenting with Passport scoring.

Score the contents of a Passport.&#x20;

To add to your project, either add with npm or yarn, or download the Git repository and install the dependencies manually.&#x20;

```bash
# install dependencies

yarn add @gitcoinco/passport-sdk-scorer

yarn install

# then run webpack

yarn run webpack
```

#### [Writer ](https://github.com/gitcoinco/passport-sdk/tree/main/packages/writer)

**The Writer is scheduled to be deprecated. Please consider building Stamp integrations into the Passport App at [https://github.com/gitcoinco/passport](https://github.com/gitcoinco/passport)**


Writes to an authenticated DIDs Passport stream in Ceramic.&#x20;

You can install the Writer library using npm or yarn. You can also download the Git repository and install dependencies manually.

```bash
# install dependencies

yarn add @gitcoinco/passport-sdk-writer
yarn install

# begin by running webpack

yarn run webpack

```

#### [Types](https://github.com/gitcoinco/passport-sdk/tree/main/packages/types)

Shared types (used by other packages in the SDK).&#x20;

To use this library, ensure `@gitcoinco/passport-sdk-types` is included as a package dependency. Then, import types like so :&#x20;

```typescript
// import sdk types

import { VerifiableCredential } from "@gitcoinco/passport-sdk-types"
```



## Working with Ceramic

Gitcoin Passport and the Passport SDK are built on top of the Ceramic Network for data persistence. If you're new to Ceramic, check out their documents to get familiarized with the basics:

[Ceramic Documentation](https://developers.ceramic.network/learn/welcome/)

With the Passport SDK, it's not necessary to interact with Ceramic directly, but you may find it helpful for debugging or just a general understanding of the system.

