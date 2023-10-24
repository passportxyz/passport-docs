---
description: This tutorial introduces client-side scoring 
---

# Custom scoring

Gitcoin Passport offers eevral scoring algorithms that can be executed on the Gitcoin servers, such that a numeric score for a Passport can be requested from the Passport API. However, this means you are restricted to Gitcoin's algorithm and Gitcoin's opinion about the relative weighting assigned to each individual Stamp. This might not be apopropriate for all use cases. For example, you might have a string preference for certain Stamps that are particularly relevant to your community that you want to weight more strongly in the scoring, or perhaps you have a great idea for a completely new algorithm that you want to implement to gate your app.

This tutorial will walk you through developing a custom scorer for your app.

### Prerequisites

Before we delve into this, it's important to note that there are a few preliminary steps you need to complete. Please ensure that these prerequisites are met before proceeding with the guide.

1. You have created a Passport Scorer and received a Scorer ID
2. You have an API key

If you haven't completed the preliminary steps above please refer to our [getting access guide](../getting-access) first. Once you're done with that, return here and continue with this walkthrough.

## Integrating a Scorer

### Setting up a basic app

We'll create an app using `Nextjs`. We can bootstrap using `create-next-app`. This automatically creates all the necessary subdirectories, configuration and boilerplate code required to get us building as quickly as possible.

Start by entering the following command into your terminal:

```sh
npx create-next-app passport-app
```

This will create a new directory called `passport-app` and populate it with several sub-directories and files that form the skeleton of our app. `create-next-app` will ask for yes/no responses to a series of configuration questions - answer as follows:

```sh
npx create-next-app passport-app

✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use Tailwind CSS with this project? … No
✔ Would you like to use `src/` directory with this project? … No
✔ Would you like to use experimental `app/` directory with this project? …Yes
✔ What import alias would you like configured? … @/*
```

Next, change to the new `passport-app` directory and install `ethers`:

```sh
npm install ethers
```

This tutorial will also use [Chakra-UI](https://chakra-ui.com/) for styling, so install it using `npm`:

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Now, create a new file in `passport-app`/ and add the following to set the Passport API Key and Scorer ID values (if you need a reminder of how to get the API key and Scorer values, revisit the Quick Start guide):

```sh
NEXT_PUBLIC_GC_API_KEY=<your-api-key>
NEXT_PUBLIC_GC_SCORER_ID=<your-scorer-id>
```

Save this file as `.env.local`.&#x20;

Replace the contents of `app/page.tsx` with the following boilerplate code (this includes all the very basic logic to render a page and connect a wallet to the app, but none of the logic required to check a user Passport - we will add this step by step in this tutorial):

```tsx
'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ChakraProvider, Button, Checkbox, Stack, Badge, SimpleGrid, Heading, Text } from '@chakra-ui/react'

const APIKEY = process.env.NEXT_PUBLIC_GC_API_KEY
const SCORERID = process.env.NEXT_PUBLIC_GC_SCORER_ID

// endpoint for submitting passport
const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport'
// endpoint for getting the signing message
const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message'
// score needed to see hidden message
const thresholdNumber = 20
const headers = APIKEY ? ({
  'Content-Type': 'application/json',
  'X-API-Key': APIKEY
}) : undefined

declare global {
  interface Window {
    ethereum?: any
  }
}

// define Stamp here
// define UserStruct here

export default function Passport() {
  // here we deal with any local state we need to manage
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    checkConnection()
    async function checkConnection() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        // if the user is connected, set their account
        if (accounts && accounts[0]) {
          setAddress(accounts[0].address)
        }
      } catch (err) {
        console.log('not connected...')
      }
    }
  }, [])

  async function connect() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddress(accounts[0])
    } catch (err) {
      console.log('error connecting...')
    }
  }

  async function getSigningMessage() {
    try {
      const response = await fetch(SIGNING_MESSAGE_URI, {
        headers
      })
      const json = await response.json()
      return json
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function submitPassport() {
    try {
      // call the API to get the signing message and the nonce
      const { message, nonce } = await getSigningMessage()
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      // ask the user to sign the message
      const signature = await signer.signMessage(message)
      // call the API, sending the signing message, the signature, and the nonce
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          address,
          scorer_id: SCORERID,
          signature,
          nonce
        })
      })

      const data = await response.json()
      console.log('data:', data)
    } catch (err) {
      console.log('error: ', err)
    }
  }
  
  // add checkPassport() here
  
  // add getPassportScore() here
  
  // add getPassportStamps() here

  // add updateShowTrusted() here
    
  // add updateShowStamps() here
  
  // add checkTrustedUsers() here

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
        <Heading as='h1' size='4xl' noOfLines={1}>Are you a trusted user?</Heading>
        <Text as='b'>If you have a score above 20, a Github Stamp AND a Lens Stamp, you are a trusted user!</Text>
        <Stack spacing={3} direction='row' align='center' marginTop={30}>
          <Button colorScheme='teal' variant='outline' onClick={connect}>Connect</Button>
          <Button colorScheme='teal' variant='outline' onClick={submitPassport}>Submit Passport</Button>
        </Stack>
      </ChakraProvider >
    </div >
  )
}
```

You can start this app now by navigating your terminal to the project directory (`passport-app`) and running `npm run dev`. Then, navigate your browser to `localhost:3000`. You will see a basic app load in the browser, with buttons that enable you to connect your wallet and submit your Passport to the registry. You can go ahead and test that the `Connect` and `Submit Passport` buttons are working as expected.

Your app should look like this:

![](public/trusted-user-app-pt1.png)

The rest of the tutorial will build upon this basic app by adding functions and UI code to `app/page.tsx`.

### Checking a Passport

In this tutorial you will learn how to create a more advanced Scorer integration that will determine whether connected users are trusted or untrusted according to a combination of their score and ownership of specific stamps.&#x20;

The boilerplate code already provides buttons the users can click to connect their wallet and submit their Passport to the registry. We won't cover these functions again in this tutorial, so please note that a wallet connection and submitted Passport are required for calls to the Scorer API to return useful responses.


### **Retrieving Stamps**

Next we want to retrieve the user's Stamps by calling the `/registry/stamps` endpoint. The following function requests a user's Passport Stamp data from that endpoint and prints it to the console. If no score exists it prints a warning to the console.

```tsx
async function getPassportStamps(currentAddress: string) {
  console.log("in getStamps()")
  const stampProviderArray = []
  const GET_PASSPORT_STAMPS_URI = `https://api.scorer.gitcoin.co/registry/stamps/${currentAddress}`
  try {
    const response: Response = await fetch(GET_PASSPORT_STAMPS_URI, { headers })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.log('error: ', err)
  }
}
```

We can invoke the function on the click of a button by adding the following to the UI:

<pre class="language-html"><code class="lang-html"><strong>&#x3C;Button colorScheme='teal' variant='outline' onClick={() => getPassportStamps(address)}>Check Stamps&#x3C;/Button>
</strong></code></pre>

If we run the app using `npm run dev`, connect a wallet that has some Stamps and click the `Check Stamps` button, the following information will be displayed in the console. In this example there are 33 credentials in the array, with one expanded as an example - the length of the `items` array will depend upon how many verified credentials the Passport holds.

```json
stamp data: 
Object { next: null, prev: null, items: (33) […] }
  items: Array(33) [ {…}, {…}, {…}, … ]
    0: Object { version: "1.0.0", credential: {…} 
      credential: Object { issuer: "did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC", issuanceDate: "2023-04-20T13:21:38.948Z", expirationDate: "2023-07-19T13:21:38.948Z", … }
        "@context": Array [ "https://www.w3.org/2018/credentials/v1" ]
        credentialSubject: Object { id: "did:pkh:eip155:1:0x1D4098C948Dc41958Bf3A745deC77AE059C3aDF6", hash: "v0.0.0:kWgm+E06OQrSk0M9NcEI3il5FIs9UoJQP3geH4LBuoY=", provider: "Google", … }
        expirationDate: "2023-07-19T13:21:38.948Z"
        issuanceDate: "2023-04-20T13:21:38.948Z"
        issuer: "did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC"
        proof: Object { jws: "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..sgcMRAONRMo7TfTgmMPgvfaP_MOzyiXcErIsIKap-nNpOuTNGSkhTdgxWFl5Mp6ueYnmcRDkgxBiDNCMmS5GDA", type: "Ed25519Signature2018", created: "2023-04-20T13:21:38.948Z", … }
        type: Array [ "VerifiableCredential" ]
        <prototype>: Object { … }
        version: "1.0.0"
<prototype>: Object { … }
1: Object { version: "1.0.0", credential: {…} }
2: Object { version: "1.0.0", credential: {…} }
3: Object { version: "1.0.0", credential: {…} }
4: Object { version: "1.0.0", credential: {…} }
5: Object { version: "1.0.0", credential: {…} }
...
next: null
prev: null
<prototype>: Object { … }
```

Printing this object to the console isn't particularly useful to us, but seeing the object structure in this way demonstrates that the API call is working correctly and gives us information we can use to parse the Stamp data effectively.

### **Handling Stamp data**

There is a lot of information contained in the object returned from `/registry/stamps` - for most use-cases only a subset of the data is useful. We might, for example, only be interested in the Stamp `provider`, and not the granular details of the credential expiry, proof etc. We can parse this information out of each item in the array.

Let's just try to parse out the useful information first. We'll do this in a separate function, so let's replace our `console.log()` statement with a some simple code that parses out the `provider` for each of the user's stamps as a `string` and adds it to an `Array`. We'll print this array to the console to check we only have the `provider` strings.

```tsx
async function getPassportStamps(currentAddress: string) {
  console.log("in getStamps()")
  const stampProviderArray = []
  const GET_PASSPORT_STAMPS_URI = `https://api.scorer.gitcoin.co/registry/stamps/${currentAddress}`
  try {
    const response: Response = await fetch(GET_PASSPORT_STAMPS_URI, { headers })
    const data = await response.json()
    // parse stamp data from json
    for (const i of data.items) {
      stampProviderArray.push(i.credential.credentialSubject.provider)
    }
    console.log(stampProviderArray)
  } catch (err) {
    console.log('error: ', err)
  }
}
```

Clicking the `Check Stamps` button will now display the following in the console:

```
  stampProviders: Array(33) [ "Google", "NFT", "GitPOAP", … ]
    0: "Google"
    1: "NFT"
    2: "GitPOAP"
    3: "POAP"
    4: "Lens"
    5: "Ens"
    6: "FiftyOrMoreGithubFollowers"
    7: "TenOrMoreGithubFollowers"
    8: "StarredGithubRepoProvider"
    9: "ForkedGithubRepoProvider"
    10: "FiveOrMoreGithubRepos"
    11: "Github"
    12: "Discord"
    13: "EthGasProvider"
    ...
```

Now, for our actual app we want to **return the array** to use elsewhere instead of just printing it to the console, so **replace** `console.log(stampProviderArray)` with `return stampProviderArray`.\*

### Tracking the Stamps in state

The two functions, `getPassportScore()` and `getPassportStamps()` return data that we want to keep track of in our app so that we can use it to make decisions about the trustworthiness of a user. This means we need a way to track this data in the app's state and functions that access that state to make some calculations.

We can start by wrapping the two functions in an outer `checkPassport()` function that calls both `getPassportScore()` and `getPassportStamps`:

```tsx
  async function checkPassport(currentAddress = address) {
    let score: number = await getPassportScore(currentAddress) as number
    let stampProviders = await getPassportStamps(currentAddress) as Array<string>
  }
```

Instead of creating lots of state variables for each user, we can define an interface that can hold all the relevant information we want to track about each user. Add the following interface to the boilerplate code outside of the `Passport()` component:

```tsx
interface UserStruct {
  id: number;
  address: string;
  stampProviders: Array<Stamp>;
}
```

The `UserStruct` interface has fields for the user's address and Stamp providers as well as a unique identifier. Notice that we also defined the type of the `stampProviders` field to be an array of `Stamp` - this is a new struct we haven't defined yet. We need instances of `Stamp` to contain the name of each Stamp provider with a unique identifier. Add the following interface to the code just above the `UserStruct`:

```tsx
interface Stamp {
  id: number
  stamp: string
}
```

In our `checkPassport()` function, we can pass the response from and `getPassportStamps()` into a new instance of `UserStruct`. We can then add each instance to a state variable array. First, add a state variable `userInfo` as an array that will take instances of `UserStruct`.

```tsx
const [userInfo, setUserInfo] = useState<Array<UserStruct>>([])
```

Now, we can update `checkPassport()` to create a new `UserStruct` from the values returned from the Passport API call, plus the user address and a unique ID calculated by adding 1 to the current length of the `userInfo` array. This new `UserStruct` is added to the `userInfo` array using the `setUserInfo` method.

Remember, before constructing the `UserStruct` we have to parse the Stamp providers into an array of `Stamps` that can be passed to the `UserStruct`'s `stampProviders` field.

We also want to add a condition to prevent repeatedly adding the same user to the `userInfo` array, so we can wrap the call to `setUserInfo` in a simple `if` statement to check whether the user already exists.

```tsx
async function checkPassport(currentAddress = address) {
  let stampProviders = await getPassportStamps(currentAddress) as Array<string>
  let stamps: Array<Stamp> = []
  for (var i = 0; i < stampProviders.length; i++) {
    let s: Stamp = { id: i, stamp: stampProviders[i] }
    stamps.push(s)
  }
  const id = userInfo.length + 1
  let user: UserStruct = { id: id, address: currentAddress, stampProviders: stamps }
  console.log(user)
  if (userInfo.map(user => user.address).includes(currentAddress || currentAddress.toUpperCase())) {
    console.log("address already checked")
  } else {
    console.log("adding user to state var")
    console.log("userInfo", userInfo)
    setUserInfo(userInfo.concat(user))
  }
  console.log("userInfo", userInfo)
}
```

Now each user's Stamps are tracked in custom structs in our application's state.

### Scoring the Stamp data

Passport scores are calculated by summing weights assigned to each specific Stamp. Gitcoin have defined a list of Stamp weights that are used when scoring is done on the Gitcoin server. The weights themselves are defined in the `stamp-weights.ts` file that you are already importing in the boilerplate code.

To create a score, you need to write a function that iterates over your list of Stamp names, looks up each name in the stamp weights data, and adds that weight to as cumulative sum. The sum after you have iterated over all the available Stamps becomes your Passport score. This can be achieved with the following function that you can paste into your app:

```typescript
function calculate_score(stampData: Array<Stamp>) {
    let i = 0
    var scores: Array<number> = []
    var score = 0;
    while (i < stampData.length) {
      let id = stampData[i].stamp
      if (GITCOIN_PASSPORT_WEIGHTS.hasOwnProperty(id)) {
        try {
          let temp_score = GITCOIN_PASSPORT_WEIGHTS[id]
          scores.push(parseFloat(temp_score))
        } catch {
          console.log("element cannot be added to cumulative score")
        }
      }
      i++;
    }
    for (let i = 0; i < scores.length; i++) {
      score += scores[i]
    }
    return score
  }
```

Now you have implemented all the logic required to retrieve and decode onchain Stamps and calculate a score in your app!
