# Integrating onchain Stamp data

In this tutorial, you'll learn how to show different content to users depending on their Passport data. Here, the Stamp data will be retrieved from the blockchain.

Specifically, you will:

* Fetch user Stamp data from the blockchain using the Gitcoin Passport smart contract stack
* Use Stamp data to generate your own Passport score, using Gitcoin's Stamp weights.
* Conditionally display a user's Passport data depending on their onchain data.
* Redirect users to instructions for improving their Passport scores and getting their Stamps onchain.

You can learn more about Passport's available smart contracts and the typical developer flow via our [contract reference page](../contract-reference).

### Prerequisites

To follow this tutorial, you'll need [Next.js](https://nextjs.org/), [Node](https://nodejs.org/en), and [Chakra-UI](https://chakra-ui.com/) installed on your machine. You will be using the [BaseGoerli](https://chainlist.org/chain/84531) test network - you will need to import this network into your wallet. Some familiarity with smart contracts is recommended.

This app uses a blockchain, rather than Gitcoin's database server, as a backend. This means you **do not need an API key or Scorer ID,** but you do need to have a browser wallet that can connect to the BaseGoerli test network.


### App outline

The app we will build will be a webpage where users can connect their wallet to check their onchain credentials.

You can find the code from this tutorial in this [GitHub repo](https://github.com/jmcook1186/passport-onchain-stamps-app/tree/main).

The app will work as follows:

* When the user visits the sample app, they have access to several tabs - one to welcome them and then more where they can check their onchain data. The second tab shows whether there is any onchain data for the connected user. The third shows what Stamps the user has. The final tab shows the user's Passport score.
* The user will connect their wallet and Gitcoin Passport to the app. Their data will be retrieved from the blockchain and their score will be calculated automatically from their Stamps.
* If the user does not have any Stamps, the tabs contain information about how to create a Passport, add Stamps and migrate them onchain.

This simple example demonstrates the principles you would use to gate a real app using Gitcoin Passport onchain.

The app will be built using [Next.js](https://nextjs.org/).

### Smart contract logic

The Gitcoin Passport smart contracts build on top of [EAS (Ethereum Attestation Service)](https://attest.sh/), using Attestations as the foundational building blocks. You can read the [contract reference](../contract-reference) page for a primer on how the contracts work.

The `decoder` contract exposes an API that allows you to simply pass in an address and retrieve the decoded data, rather than having to rawAttestations and decode client-side.

### Setting up the app

We'll create an app using [Next.js](https://nextjs.org/). We can bootstrap using `create-next-app`. This automatically creates all the necessary subdirectories, configuration and boilerplate code required to get us building as quickly as possible.

Start by entering the following command into your terminal:

```sh
npx create-next-app passport-onchain-app
```

This will create a new directory called `passport-app` and populate it with several sub-directories and files that form the skeleton of our app. `create-next-app` will ask for yes/no responses to a series of configuration questions - answer as follows:



```sh
npx create-next-app passport-onchain-app

✔ Would you like to use TypeScript? …  Yes
✔ Would you like to use ESLint? …  Yes
✔ Would you like to use Tailwind CSS? … No 
✔ Would you like to use `src/` directory? …  Yes
✔ Would you like to use App Router? (recommended)  Yes
✔ Would you like to customize the default import alias? … No 
```


Next, change your working directory to the new `my-passport-app` directory and install `ethers`:

```sh
npm install ethers
```

We also need the Ethereum Attestation Service software development kit:

```sh
npm install @ethereum-attestation-service/eas-sdk
```

Finally, this tutorial will also use [Chakra-UI](https://chakra-ui.com/) for styling:

```sh
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Since the data you will work with is all available on a public blockchain, there is no need to handle any sensitive information such as API keys. You can just get coding!

### Building the App

Now that the app is set up, you can begin building. The code that controls what is rendered in the browser is contained in `src/app/page.tsx`. When you created your project, `create-next-app` saved a version of `page.tsx` with some default code. You can delete all the code in `page.tsx` and replace it with this boilerplate:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ChakraProvider, Flex, Heading, Button } from '@chakra-ui/react'
import { TabLayout } from './tab-contents'
import { GITCOIN_PASSPORT_WEIGHTS } from './stamp-weights';

const decoderContractAddress = "0xa652BE6A92c7efbBfEEf6b67eEF10A146AAA8ADc";
const abi = require('./PassportDecoderABI.json')

declare global {
  interface Window {
    ethereum: any
  }
}

declare global {
  var provider: ethers.BrowserProvider
}

interface Stamp {
  id: number
  stamp: string
}

export default function Passport() {
  // here we deal with any local state we need to manage
  const [address, setAddress] = useState<string>('default')
  const [connected, setConnected] = useState<boolean>(false)
  const [hasStamps, setHasStamps] = useState<boolean>(false)
  const [stamps, setStamps] = useState<Array<Stamp>>([])
  const [score, setScore] = useState<Number>(0)
  const [network, setNetwork] = useState<string>('')

  useEffect(() => {
    checkConnection()
    async function checkConnection() {
      if (connected) {
        console.log("already connected")
      } else {
        const result = await connect()
        console.log(result)
      }
    }
  }, [address, connected])

  async function connect() {
    try {
      globalThis.provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const network = await provider.getNetwork()
      setAddress(accounts[0])
      setConnected(true)
      setNetwork(network.chainId.toString())
    } catch (err) {
      console.log('error connecting...')
    }
    return true
  }

  const styles = {
    main: {
      width: '900px',
      margin: '0 auto',
      paddingTop: 90
    }
  }

  return (
    /* this is the UI for the app */
    <div style={styles.main}>
      <ChakraProvider>
        <Flex minWidth='max-content' alignItems='right' gap='2' justifyContent='right'>
          <Button colorScheme='teal' variant='outline' onClick={connect}>Connect</Button>
          <Button colorScheme='teal' variant='outline' onClick={queryPassport}>Query Passport</Button>
        </Flex>
        <div>
          {connected && <p>✅ Wallet connected</p>}
          {connected && network == "84531" && <p>✅ network: BaseGoerli</p>}
          {connected && network != "84531" && <p>🔴 Please switch to BaseGoerli network</p>}
        </div>
        <br />
        <br />
        <br />
        <br />
        <Heading as='h1' size='4xl' noOfLines={2}>Onchain Stamp Explorer!</Heading>
        <br />
        <br />
        <TabLayout hasStamps={hasStamps} stamps={stamps} score={score} />
      </ChakraProvider >
    </div >
  )
}

```

**Note** that you can swap out the contract addresses if you want to run an app on a different network. You can check all the deployed contract addresses on the [contract reference page](../contract-reference)

There are some parts of this boilerplate code that might look unfamiliar even if you have been through the other [tutorials](/building-with-passport/tutorials) on this site. This is because there is some specific set up required to use smart contracts on the backend.

First, the `provider` field is being assigned as a global variable. The `provider` is a connection to the blockchain. In this app, the connection is made by inheriting network configuration from your wallet. If you are using Metamask with default settings, your connection will be via Infura to whichever network your wallet is connected to. If you have a wallet pointing to your own node's RPC provider, it will use that. The reason `provider` is assigned to a global variable is so that it can be captured during the wallet connection but later it can be passed as an argument when you create instances of the smart contracts.

The `chainID` for the network you are connected to is requested from the `provider` too and the value is stored in the app's state. This is used in the UI to warn the user if they are connected to a network other than Base Goerli. There are two statuses presented in the UI - one that confirms that the user is connected and one that either confirms the wallet is connected to Base Goerli or warns the user they are connected to the wrong network.

Second, there are two contract addresses defined immediately below the import statements:

```typescript
const decoderContractAddress = "0xa652BE6A92c7efbBfEEf6b67eEF10A146AAA8ADc";
const abi = require('./PassportDecoderABI.json')
```

This is the addresses on the BaseGoerli blockchain where the `decoder` contract is stored. The `abi` is a formatted set of function signatures that allow the contract bytecode to be decoded and instantiated in your app.

You will also need to load a file containing the weights for individual Stamps so you can calculate a Passport score.

```typescript
import { GITCOIN_PASSPORT_WEIGHTS } from './stamp-weights';
```

The elements imported from `./stamp-weights` is a list of weights for each Stamp used to create a Passport score. In the 'web2' model for Gitcoin Passport this is done server-side, but here we will implement our own scoring algorithm using onchain Stamps. Again, create a file in the `src/app` folder called `stamp-weights.ts` and populate it with the code located in [this GitHub file](https://github.com/jmcook1186/passport-onchain-stamps-app/blob/main/src/app/stamp-weights.ts).

**Note** that the information in `stamp-weights.ts` needs to stay consistent with Gitcoin - you can check the up-to-date list of stamp weights[ in this Github file](https://github.com/gitcoinco/passport-scorer/blob/main/api/scorer/settings/gitcoin\_passport\_weights.py). 

The elements imported from `tab-contents` are components used to build the UI. This file should also be located in the `src/app` folder, called `tab-contents.tsx`, and should be populated with the code located in [this GitHub file](https://github.com/jmcook1186/passport-onchain-stamps-app/blob/main/src/app/tab-contents.tsx).

Otherwise, the `create-next-app` boilerplate code is quite standard. There is a `connect()` function that instantiates the `provider` by grabbing network configuration from your browser wallet (make sure you are connected to BaseGoerli) and a `checkConnection()` function wrapped in `useEffect` that automatically triggers a connection when the page is first loaded.

### Getting Passport data

Getting Passport data requires instantiating the `decoder` contract and calling its `getPassport` function. The `ethers` library provides everything we need to instantiate the contract. Create a contract using `new ethers.Contract()` passing the contract address, ABI and the provider object as arguments. One complication is that the ABI is divided up into sections specific to each chain where the contract has been deployed, so you actually need to pass a specifier with the hex-encoded chain ID too - for BaseGoerli this is `0x1a4`.

Once the contract instance exists, you can simply call `getPassport` passing in the user address, which is stored in your app's state. If the function call returns some Stamp data, you can set the `hasStampData` flag to `true` and return the data.

```ts
async function getPassportInfo() {
  const decoderContract: ethers.Contract = new ethers.Contract(decoderContractAddress, new ethers.Interface(abi['0x1a4']), provider)
  const passportInfo: [] = await decoderContract.getPassport(address)
  if (passportInfo.length > 1) {
    setHasStamps(true)
  }
  return passportInfo
}
```

### Extracting Stamps

The next step is to write a function to extract the Stamp names from `passportData` into an array and then set the values of the state variables `stamps`. The following code snippet contains that function - you can paste it into your app:

```typescript
async function getStamps(passportInfo: []) {
  var stamps: Stamp[] = [];
  for (var i = 0; i < passportInfo.length; i++) {
    stamps.push({ id: i, stamp: passportInfo[i][0] })
  }
  setStamps(stamps)
  return stamps
}
```

Well done!  at this point you have implemented all the logic required to retrieve the list of Stamps owned by your connected user! For some apps, this might be all you need - you can simply display the contents of `stamps` to show which Stamps are owned by the user.

### Calculating a score

Passport scores are calculated by summing weights assigned to each specific Stamp. Gitcoin have defined a list of Stamp weights that are used when scoring is done on the Gitcoin server. In this app, you will use the same weights to calculate a score from the onchain Stamps. The weights themselves are defined in the `stamp-weights.ts` file that you are already importing in the boilerplate code.

To create a score, you need to write a function that iterates over your list of Stamp names, looks up each name in the stamp weights data, and adds that weight to a cumulative sum. The sum after you have iterated over all the available Stamps becomes your Passport score. This can be achieved with the following function that you can paste into your app:

```typescript
function calculate_score(stampData: Array<Stamp>) {
  let i = 0
  var scores: Array<number> = []
  let names = stampData.map(entry => entry.stamp);

  names.forEach(name => {
    if (GITCOIN_PASSPORT_WEIGHTS.hasOwnProperty(name)) {
      let key = name as keyof Object;
      let value = GITCOIN_PASSPORT_WEIGHTS[key].toString();
      scores.push(parseFloat(value))
    }
  })

  const totalScore = scores.reduce((acc, currentScore) => acc + currentScore, 0)

  return totalScore
}
```

Now you have implemented all the logic required to retrieve and decode onchain Stamps and calculate a score in your app!

### Executing the functions

Now you have all your app functions defined, you need to determine when and how they are executed. There is an ordering of functions implied by the return types and arguments of each function - some functions take the outputs of others as inputs.

The following function executed each function in turn, wrapped in some basic error handling:

```typescript
async function queryPassport() {
  const passportInfo = await getPassportInfo()
  const stamps = await getStamps(passportInfo);
  const score = calculate_score(stamps)
  setScore(score)
}
```

Now, all you have to do is call `queryPassport()` to execute all the necessary logic to retrieve `stamps` and `score`.

### Stamps and scores in the UI

The boilerplate code includes a basic UI that pulls in components from `tab-contents.tsx`. This will render five tabs to the webpage, each containing different information. This component can take your `stamp` and `score` data and render differently depending on their values. This is already handled in the boilerplate UI. What is not yet implemented is a way to trigger the `queryPassport()` function. You can add a button for this. Right below the existing `Button` component, inside the `Flex` tags, you can add the following:

```html
<Button colorScheme='teal' variant='outline' onClick={queryPassport}>Query Passport</Button>
```

You can browse the contents of `tab-contents.tsx` to see how the `stamp` and `score` data is used to render content. Conceptually, this is what's happening in each tab:

* **Home**: a general introduction that renders identically for any user
* **About onchain Stamps**: Information about onchain Stamps that renders identically for any user
* **Are your Stamps onchain?**: If the user has onchain Stamps, has connected their wallet and queried their Passport, the app will render a congratulatory message and confirm that they have onchain Stamps. If the user has _not_ queried their Passport or they don't have any onchain Stamps they see some sad emojis and a message informing them that they have either forgotten to connect or they don't have any onchain Stamps. They are directed to the Passport app to migrate their Stamps.
* **Browse your Stamps**: If the user has onchain Stamps, has connected their wallet and queried their Passport, the app will render each Stamp in the browser. If the user has _not_ queried their Passport or they don't have any onchain Stamps they see some sad emojis and a message informing them that they have either forgotten to connect or they don't have any onchain Stamps. They are directed to the Passport app to migrate their Stamps.
* **See your score**: If the user has onchain Stamps, has connected their wallet and queried their Passport, the app will render their Passport score. If the user has _not_ queried their Passport or they don't have any onchain Stamps they see some sad emojis and a message informing them that they have either forgotten to connect or they don't have any onchain Stamps. They are directed to the Passport app to migrate their Stamps.

### Run the app

Well done - your app is ready to use! You can run it locally using

`npm run dev`

You can navigate to `localhost:3000` to try it out!

The app looks as follows:

![](public/onchain-stamp-explorer-1.png)

![](public/onchain-stamp-explorer-2.png)

![](public/onchain-stamp-explorer-3.png)


### Summary

Congratulations - you have built an app that retrieves user Stamp data from the blockchain, calculates a Passport score and uses that information to conditionally render content to your webpage.

Now you can use the principle demonstrated here to build creatively and integrate onchain Stamps into
