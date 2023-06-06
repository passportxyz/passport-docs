---
description: >-
  This is an overview for leaders of services like POAP and BrightID to
  understand how they can become a Stamp Provider for Passport
---

# Creating a new Stamp

***

***

***

### 1. Fork the Passport GitHub repository

***

***

***

***

### 2. Create new files

***

***

```bash
cd platforms/src && mkdir example
```

***

```bash
# files to create inside platforms/src/example:

  __tests__
      |-- example.test.ts
  Providers
      |-- example.ts
  App-Bindings.ts
  index.ts
  Providers-config.ts
  
```

***

| file                          | purpose                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| \_\_tests\_\_/example.test.ts | includes thorough test cases for the Stamp                                                |
| Providers/example.ts          | includes a `verify()` function that receives a proof and verifies it.                     |
| App-bindings.ts               | Collects all the Stamp data and formats for communication with the Gitcoin server         |
| Providers-config.ts           | Collects Stamp metadata. For example, icon image, name and description, provider settings |
| index.ts                      | Exports the providers, config and app bindings                                            |
|                               |                                                                                           |

***

#### `App-bindings.ts`

***

***

***

#### `EVM Stamps`

Copy the following code into the file, replacing `<EXAMPLE>` with your Stamp name. Note that for EVM Stamps the `AppContext` and `ProviderPayload` types are imported from `"../types"` and the`Platform` class is imported from `"../utils/platform".`

The new Stamp is exported as a class extending the `Platform` class.

```typescript
//App-bindings.ts - EVM
import { AppContext, ProviderPayload } from "../types";
import { Platform } from "../utils/platform";

export class <EXAMPLE> extends Platform {
    platformId = "<EXAMPLE>";
    path = "<EXAMPLE>";
    clientId: string = null;
    redirectUri: string = null;
    isEVM = true;
    // if the Stamp requires extra information to be displayed to the user, add
    // here
    banner = {
        heading:
        "Your Stamp heading here"
    };

    async getProviderPayload(appContext: AppContext): Promise<ProviderPayload> {
        const result = await Promise.resolve({});
        return result;
    }
}
```

#### Non-EVM Stamps

Copy the following code into the file, replacing `<EXAMPLE>` with your Stamp name. Note that for non-EVM Stamps the `PlatformOptions`type is imported from `"../types"` and the`Platform` class is imported from `"../utils/platform".`

The new Stamp is exported as a class extending the `Platform` class.

```typescript
//App-bindings.ts - OAuth
import { PlatformOptions } from "../types";
import { Platform } from "../utils/platform";
export class <EXAMPLE> extends Platform {
    platformId = "<EXAMPLE>";
    path = "<EXAMPLE>";
    clientId: string = null;
    redirectUri: string = null;

constructor(options: platformOptions = {}) {
    super();
    this.clientId = options.clientId as string;
    this.redirectUri = options.redirectUri as string;
}

async getOauthUrl(state: string): Promise<string> {
    const <EXAMPLE>Url = await Promise.resolve(
        `<EXAMPLE> URL`
    );
    return <EXAMPLE>Url;
    }
}
```

#### `Providers-config.ts`

Copy the following code into `Providers-config.ts` replacing `<EXAMPLE>` with your Stamp name. This file imports the `PlatformSpec` and `PlatformGroupSpec` from `"../types"` and exports the Stamp details and provider config data.

```typescript
//Providers-config.ts
import { PlatformSpec, PlatformGroupSpec, Provider } from "../types";
import { <EXAMPLE>Provider } from <ProviderFile>

export const PlatformDetails: PlatformSpec = {
    icon: "./assets/<EXAMPLE>StampIcon.svg",
    platform: "<EXAMPLE>",
    name: "<EXAMPLE>",
    description: "Description to user about how they're going to use the Stamp",
    connectMessage: "Connect Account",
    };
    
export const ProviderConfig: PlatformGroupSpec[] = [
    {
    platformGroup: "Name of the Stamp platform group",
    providers: [
        {
        title: "Title of the provider",
        name: "<EXAMPLE>",
        },
    },
];

export const providers: Provider[] = [new <ProviderClass>()]
```

#### `index.ts`

***

```typescript
//index.ts
export { <EXAMPLE>Platform } from "./App-Bindings";
export { ProviderConfig, PlatformDetails, providers } from "./Providers-config";
export { <EXAMPLE>Provider
```

***

#### `Providers/example.ts`

{% hint style="info" %}
_Remember your file name will not be "example.ts" - it will be your stamp name. Some existing examples include "google.ts", "EthErc20Possession.ts" and "github.ts"._
{% endhint %}

This is where the hard work is done, because it is in this file that you will define your custom verification logic. The code will vary between applications depending on precisely what information is being verified. The verification could include communication with API servers, blockchain nodes or RPC providers, smart contracts or other external resources. We can walk through an example here, but bear in mind that you will have to adapt to your specific use case.

Let's look at the Ethereum activity Stamp. This is an EVM Stamp that checks whether a user owns a certain threshold amount of ETH or ERC-20 tokens. &#x20;

```typescript
// EthErc20Possession.ts

// ----- Types
import type { Provider, ProviderOptions } from "../../types";
import type { RequestPayload, VerifiedPayload } from "@gitcoin/passport-types";

// ----- Ethers library
import { Contract } from "ethers";
import { formatUnits } from "@ethersproject/units";
// ----- RPC Getter
import { getRPCProvider } from "../../utils/signer";

/*
Eth ERC20 Possession Provider can be used to check a greater than balance for ethereum or any other EVM token (ERC20).
By default this will verify the ethereum balance for the address in the parameter. To customize the
token set the contract_address or decimal number in the options passed to the class. The default decimal number for formatting
is 18.
*/

// define ERC20 contract ABI here

// set the network rpc url based on env
export const RPC_URL = process.env.RPC_URL;

export async function getTokenBalance(
  address: string,
  tokenContractAddress: string,
  decimalNumber: number,
  payload: RequestPayload
): Promise<number> {
  // define a provider using the rpc url
  const staticProvider = getRPCProvider(payload);
  // load Token contract
  const readContract = new Contract(tokenContractAddress, ERC20_ABI, staticProvider);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const tokenBalance: string = await readContract?.balanceOf(address);
  const balanceFormatted: string = formatUnits(tokenBalance, decimalNumber);
  return parseFloat(balanceFormatted);
}

export async function getEthBalance(address: string, payload: RequestPayload): Promise<number> {
  // define a provider using the rpc url
  const staticProvider = getRPCProvider(payload);
  const ethBalance = await staticProvider?.getBalance(address);
  // convert a currency unit from wei to ether
  const balanceFormatted: string = formatUnits(ethBalance, 18);
  return parseFloat(balanceFormatted);
}

export type ethErc20PossessionProviderOptions = {
  threshold: number;
  recordAttribute: string;
  contractAddress: string;
  decimalNumber: number;
  error: string;
};

// Export an Eth ERC20 Possessions Provider. This is intended to be a generic implementation that should be extended
export class EthErc20PossessionProvider implements Provider {
  // The type will be determined dynamically, from the options passed in to the constructor
  type = "";

  // Options can be set here and/or via the constructor
  _options: ethErc20PossessionProviderOptions = {
    threshold: 1,
    recordAttribute: "",
    contractAddress: "",
    decimalNumber: 18,
    error: "Coin Possession Provider Error",
  };

  // construct the provider instance with supplied options
  constructor(options: ProviderOptions = {}) {
    this._options = { ...this._options, ...options };
    this.type = `${this._options.recordAttribute}#${this._options.threshold}`;
  }

  // verify that the proof object contains valid === "true"
  async verify(payload: RequestPayload): Promise<VerifiedPayload> {
    const { address } = payload;
    let valid = false;
    let amount = 0;

    try {
      if (this._options.contractAddress.length > 0) {
        amount = await getTokenBalance(address, this._options.contractAddress, this._options.decimalNumber, payload);
      } else {
        amount = await getEthBalance(address, payload);
      }
    } catch (e) {
      return {
        valid: false,
        error: [this._options.error],
      };
    } finally {
      valid = amount >= this._options.threshold;
    }
    return {
      valid,
      record: valid
        ? {
            // store the address into the proof records
            address,
            [this._options.recordAttribute]: `${this._options.threshold}`,
          }
        : {},
    };
  }
}
```



There is a lot going on in this file, but we can break it down to make it easier to digest. The first thing to notice is that this contract requires information from the Ethereum blockchain, which requires access to a node or an RPC ([remote procedure call](https://www.ibm.com/docs/en/aix/7.1?topic=concepts-remote-procedure-call)) provider - these enable requests to be made to Ethereum, roughly equivalent to getting access to an API server in the Web2 world. In the code above, the following line instantiates an RPC provider.

```typescript
// set the network rpc url based on env
export const RPC_URL = process.env.RPC_URL;
```

This grabs an RPC endpoint from the environment variables. You can set this to your own node's RPC or use a third party RPC service. Either way, this is your code's entry point to the Ethereum network. This step is common to any verification method that relies on Ethereum blockchain data.

Next there are two function definitions: `getEthBalance()` and `getTokenBalance()`. The `getEthBalance()` function calls the `getBalance()` function, which is part of the standard [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/), passing the user's address. The amount of ETH they own is returned.&#x20;

The `getTokenBalance()` function is slightly more complicated because it interacts with a smart contract rather than using the result of a JSON-RPC API request directly. Instead of token accounts and balances being stored directly in Ethereum's state trie, they are stored in the contract's storage. The values are accessed using contract functions, rather than using the JSON-RPC API directly.

The ERC-20 token contract includes a function `balanceOf()` that returns the token balance for a given address. This function is common to all contracts that conform to the ERC-20 token standard. It is also necessary to specify which specific token you are interested, by providing the contract address. This is why `getEthBalance()` only takes the user address as an argument, whereas `getTokenBalance()` also takes a contract address (and a decimal number which is used to ensure the correct precision for token balances).&#x20;

Both functions take a [`requestPayload`](https://github.com/gitcoinco/passport/blob/9ece5cd399851ccd5a9b76447ad47667181faf6f/types/src/index.d.ts) argument that is used to pass user-defined values from the client into the verification logic.&#x20;

_**Every Stamp has to have a `verify()` function**_ that returns a boolean (true/false) indicating whether or not the verification was successful and some proof details. In this example, the `verify()` function is quite simple. It checks whether a contract address has been provided. If so, it calls `getTokenBalance()` and assigns the return value to `amount`. If no contract address was provided, it calls  `getEthBalance()`instead and assigns that return value to `amount`.  The value of `amount` is then compared to the user-defined threshold. If `amount` exceeds the threshold then the verification is successful, `valid` is set to `true` and `verify()` returns the user address along with some basic details about the verification (name and threshold value). Otherwise, `verify()` returns an empty object.

_**For a new Stamp, you will need to extend the logic explained here to your precise use case.**_ For EVM Stamps you will likely have some specific contract to call that may or may not conform to the ERC-20 standard. For non-EVM Stamps you probably want to make API calls to some server for verification information instead of interacting with Ethereum. You can browse the verification logic for all the existing EVM and non-EVM Stamps on the [Passport Github repository](integrating-a-new-stamp.md).



#### `__tests__/example.test.ts`

This is where you will add tests for your verification logic. Precisely how the tests are organized is up to you, as the tests will be specific to the individual Stamp. A standard pattern is to mock endpoints that return a range of responses that could be expected from your real external server and design tests to ensure your verification logic handles them all well. You should mock all possible responses to ensure complete test coverage.

As an example, see the tests for the [ETH transaction credential](https://github.com/gitcoinco/passport/blob/main/platforms/src/ETH/\_\_tests\_\_/ethTransactions.test.ts).

### 3. Update existing files

You have now created all the new files you need to create a new Stamp. The remaining steps all focus on pulling the new information you created into the existing Passport infrastructure, so that Passport can recognize and handle your new Stamp.

You will need to navigate up a level, out of your newly created files and into `platforms/src` to find the relevant files to update.

#### `platforms.ts`

First, you will need to import the newly created platforms from the folders you just created, and export the instances from a single central location. `platforms/src/platforms.ts` acts as that central location. This file already contains the relevant code for the existing platforms, so you just need to follow the syntax for adding your own. The code snippet below shows what code you need to add. Just bear in mind that many lines of code referring to existing platforms have been removed from this example for clarity - your real file will have much more code in it!

Remember to replace `EXAMPLE` with your platform name!

```typescript
//platforms.ts
...
import * as Twitter from "./Twitter";
import * as Ens from "./Ens";
import * as <EXAMPLE> from "./<EXAMPLE>";

...

// Order of this array determines order in the Passport UI
const platforms: Record<string, PlatformConfig> = {
  Twitter,
  Ens,
  <EXAMPLE>,
  ...
};

export default platforms;

```



Next navigate into `types`. The file you need to update is `types/src/index.d.ts`. You will add the new Stamp's Platform ID and Provider ID to the bottom of their respective union types (`PLATFORM_ID` and `PROVIDER_ID`).



```typescript
//index.d.ts
export type PLATFORM_ID =
| "Google"
| "Ens"
...
| "<EXAMPLE>";
export type PROVIDER_ID =
| "Twitter"
| "TwitterTweetGT10"
...
| "<EXAMPLE>"
| "<EXAMPLE>";
```

#### `app/context/ceramicContext.tsx`

In this file you will import the Stamp from `@gitcoin/passport-platforms` again. Then create and add the Stamp to the platforms map by adding it to the bottom of the existing list of platforms.&#x20;

```typescript
//ceramicContext.tsx
...
import {
Brightid,
Coinbase,
...,
<EXAMPLE>,
} = stampPlatforms;
export const platforms = new Map<PLATFORM_ID, PlatformProps>();
...
platforms.set("<EXAMPLE>", {
platform: new <EXAMPLE>.<EXAMPLE>Platform(),
platformGroupSpec: <EXAMPLE>.ProviderConfig,
});
```



The final thing to do in the `app` package is to save a copy of your Stamp's icon, in `.svg` format, to the `app/public/assets` directory.



The rest of the files only need to be updated **if your app has new environment variables** that need to be added to the infrastructure, app or `iam` packages. If, for example, your Stamp can be verified using the Etherscan or Alchemy keys that are already made available through Gitcoin, then you can skip straight past these updates.

The next few files to update live in the `app` package:

#### `.env-example.env`

First, add the new Stamp's client ID, callback URL and any other environment variables that are necessary for your new Stamp to `.env-example.env`. This is an example file that contains dummy variables to avoid exposing sensitive data on the public Github repository. **Please DO NOT add any real values to .env-example.env** or they will be exposed publicly! Add the relevant fields for your new Stamp and then add DUMMY values that are not the same as your real values!

```typescript
NEXT_PUBLIC_PASSPORT_<EXAMPLE>_CLIENT_ID=<EXAMPLE>DUMMY_CLIENT
_ID
NEXT_PUBLIC_PASSPORT_<EXAMPLE>_CALLBACK=http://localhost:300
0/
```



#### `.env`

Now add the **real** values for your Stamp's environment variables to your local `.env` file.

```typescript
NEXT_PUBLIC_PASSPORT_<STAMP_PLATFORM_NAME>_CLIENT_ID=<EXAMPLE>_CLIENT
_ID
NEXT_PUBLIC_PASSPORT_<EXAMPLE>_CALLBACK=http://localhost:300
0/
```



Net we will update some files in the `iam` package. This is where the IAM authority is configured which is responsible for issuing `verifiableCredentials`. These verifiable credentials are issued based on a successful response from the `verify()` function for each Stamp. You defined your verification logic in a `verify()` function in [this earlier step](integrating-a-new-stamp.md#providers-example.ts).

All you need to do in the `iam` package is update the environment variables so that the necessary data for your Stamp is available. In the next section we will configure the `infra` package so that these environment variables, and those created earlier, are instantiated and provided as context to a remote server responsible for doing the actual Stamp issuance.

#### `iam/.env-example.env`

Add your **dummy** environment variables to `.env-example.env`.

```typescript
<EXAMPLE>_CLIENT_ID=EXAMPLE_CLIENT_ID
<EXAMPLE>_CLIENT_SECRET=EXAMPLE_CLIENT_SECRET
<EXAMPLE>_CALLBACK=http://localhost:3000/
```



#### `iam/.env`

Add your **real** environment variables to `.env`.

```typescript
<EXAMPLE>_CLIENT_ID=123456abcdef
<EXAMPLE>_CLIENT_SECRET=123456abcdef
<EXAMPLE>_CALLBACK=http://localhost:3000/
```



Now we can leave the `iam` package and update a few files in the `infra` package. This is where we configure the remote server to issue Stamps based on your Stamp details and verification logic.



#### `infra/review/index.ts`

Here you will add secrets objects for each of the environment variables you added to your `.env` files. This allows your secrets to be transmitted securely to the remote server so your Stamp verification logic can be executed without having to expose any keys or other sensitive information on the public repository.

In this file you will find an instance of the `Fargate` service assigned to the variable `service` . In there, you will find an array named `secrets` nested inside several other objects. You need to add a `secrets` object to this array for each of your environment variables.



```typescript
//index.ts
const service = new awsx.ecs.FargateService("dpopp-iam", {
  cluster,
  ...,
  taskDefinitionArgs: {
    containers: {
      iam: {
      ...,
      secrets: [
        {
          name: " <EXAMPLE>_CLIENT_ID ",
          valueFrom:
          `${IAM_SERVER_SSM_ARN}: <EXAMPLE>_CLIENT_ID:: `,
        },
        {
          name: " <EXAMPLE>_CLIENT_SECRET ",
          valueFrom:
          `${IAM_SERVER_SSM_ARN}: <EXAMPLE>_CLIENT_SECRET:: `,
        },
        {
          name: " <EXAMPLE>_CALLBACK ",
          valueFrom:
          `${IAM_SERVER_SSM_ARN}: <EXAMPLE>_CALLBACK:: `,
        },
      ],
    }
  }
}
});
```



This step should then be **repeated identically** for the `staging` and `production` versions of this file. To be clear, update `infra/staging/index.ts`and `infra/production/index.ts` in exactly the same way as you just updated `infra/review/index.ts`.



### 4. Further customization

You may need additional procedures for your Stamp. You can create a procedures folder inside of the Stamp folder to hold any additional verification, auth, etc. you may need. Every Stamp is slightly different and will require different materials in order to function correctly - since the design space is so large, it's up to you to know what you need for your specific purpose!



### 5. Build and run the services

You will need to have [Node (v16 LTS)](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads) installed in order to follow these steps.

Now you have updated your local copy of the Gitcoin Passport repository, you can build and run it. You can do this by navigating to the top level project directory (`passport`) and running:

```bash
npm install --global lerna
lerna init
lerna bootstrap
```

Next, you can start the `iam` app and `ceramic` services concurrently. This step will only work if you have created your environment variables as explained in the previous steps on this page.

```bash
yarn start
```



### 6. Raise a Pull Request

Finally, having seen your app running successfully, you can raise a pull request against the Gitcoin Passport GitHub repository. This will make the changes you have made to support your app part of the canonical public Stamp repository. However, before this happens your changes will be reviewed by the Passport team who may request changes.



### 7. See some examples

It might be helpful to look at some past examples of pull requests that add Stamps to the Passport GitHub repository. Browse the examples below to see exactly how others have gone about it:

[Hypercert Stamp](https://github.com/gitcoinco/passport/pull/1298/files)

[Guildxyz Stamp](https://github.com/gitcoinco/passport/pull/1224/files)

[Coinbase Stamp](https://github.com/gitcoinco/passport/pull/1049/files)

[Phi Stamp](https://github.com/gitcoinco/passport/pull/1232/files)



