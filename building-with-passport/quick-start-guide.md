# Quick Start Guide

In this guide, you'll learn how to gate an application using Gitcoin passport.

You'll be using [Next.js](https://nextjs.org/) and the [Gitcoin Passport Scorer API](https://api.scorer.gitcoin.co/docs#/) to do this. The API enables everything you need to easily build sybil resistance into your web or mobile application.

To follow this tutorial, you'll first need to visit [https://scorer.gitcoin.co/](https://scorer.gitcoin.co/). Here, you'll create both an API key and a Scorer.

### Creating a Scorer

First, click `Sign in with Ethereum`. A prompt will appear to connect your wallet. In this guide we will use Metamask, but the principles are the same for all the wallet options. You will have to unlock your wallet and sign a message to access the scorer app.



<figure><img src="../.gitbook/assets/sign-in-to-scorer.png" alt=""><figcaption><p>Metamask sign-in request</p></figcaption></figure>



Clicking "Sign-In" in your wallet gives you access to the scorer app. There are two options available in the scorer app: `Scorer` and `API Keys`.

We'll start by creating a new `Scorer`. A `Scorer` is an instance of an algorithm that generates a score from the stamps in a Passport. To get started, click the `+ Scorer` button.

<figure><img src="../.gitbook/assets/scorer-page.png" alt=""><figcaption><p>the scorer app</p></figcaption></figure>



Give your scorer a name and a short description, then click `Continue`. You will be presented with several options for the type of scorer to create. This is because the Passport stamps can be weighted in different ways depending upon the intended use case. In this example, we want to use the Passport to identify Sybils. For the scorer type, choose **Sybil Prevention**:



<figure><img src="../.gitbook/assets/scorer-use-case.png" alt=""><figcaption><p>select a scorer use case</p></figcaption></figure>

There are some options for the Sybil prevention model to run in the scorer.

The two that are currently active are `Unique Humanity` and `Unique Humanity (binary)`.

The only difference between these two is that the `Unique Humanity` returns a score between 0-100 that indicates how likely it is that a passport is owned by an honest user, whereas `Unique Humanity (binary)` returns a 0 or 1 depending on whether the Passport is flagged as a likely Sybil.

For the scoring mechanism, choose **Unique Humanity**:



<figure><img src="https://arweave.net/P6eKM-crq8LVGCtjpVZR9RLuiR35F7Jc-6mBXGxMHJY" alt=""><figcaption><p>Choose unique humanity</p></figcaption></figure>

Click `Create Scorer`. Your scorer will be added to your dashboard. Note that it has a `Scorer ID`, which you will need later.

### Creating an API key

The scorer app has a tab labelled `API Keys`. Open that tab and Click the a `+ API Key` button.



<figure><img src="../.gitbook/assets/api-key.png" alt=""><figcaption></figcaption></figure>

You will be prompted to give the API key a name and then click `Create`.

Your key will be added to your dashboard. The key itself is the sequence of characters to the right of the key name that looks something like this:

`kXPtlSOq.6q7V6fgg2nVICVla00nc2NyIqildHyf7`.

Copy and paste this key and save it somewhere safe and secure, such as in an encrypted password manager or key store.

You'll need both the Scorer ID and the API Key to complete the rest of the steps in this guide.

### Application outline

Now that you have a `Scorer` and an API Key, you can move on to building your app. The app will work as follows:

* When the user visits the sample app, they will be asked to connect their wallet
* Once they've connected, we'll automatically fetch their passport score from the Gitcoin Scorer API
* If their score meets a threshold, we'll show the user a secret message
* If the score does not meet the threshold, we'll withold the secret message and let the user know that they need to increase their Passport score.
* If the user does not yet have their passport configured, we'll ask them to configure and submit it.

This simple example demonstrates the principles you would use to gate a real application using Gitcoin passport. The app will be built using [Next.js](https://nextjs.org/) and will make use of several of the Scorer API methods.

#### API endpoints

The base URL for the API methods we'll be using is `https://api.scorer.gitcoin.co/`. There are several API methods that can be accessed by extending this base URL. You can browse the API details at [https://api.scorer.gitcoin.co/docs](https://api.scorer.gitcoin.co/docs). The methods that return data about a specific passport are all invoked using HTTP GET. The method to submit a passport uses HTTP POST. In either case, some specific header information is required, including the content type (which is always `application/json`) and the Scorer API key.

When sending a request to the Scorer API, the header information will look as follows (with `API_KEY` representing the key you copied and pasted from the Scorer app earlier):

```json
{
  'Content-Type': 'application/json',
  'X-API-Key': '{API_KEY}'
} 
```

There are 3 main API endpoints you'll use to build this application.

**Getting the score for an address**

This endpoint simply returns the Passport score for the address provided in the request.

```sh
https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${address}
```

**Getting the signing message and nonce**

Users are required to sign a message in order to connect their Passport to the app. This endpoint is used to generate the appropriate message for them to sign.

```sh
https://api.scorer.gitcoin.co/registry/signing-message
```

**Submitting the passport**

Once the user has signed the message, we'll send a new request to this endpoint along with the address, Scorer ID, signature, and nonce.

```sh
https://api.scorer.gitcoin.co/registry/submit-passport
```

The full response might look as follows:

```js
const response = await fetch(SUBMIT_PASSPORT_URI, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    address: ,
    scorer_id: SCORER_ID,
    signature: ,
    nonce: 
  })
})
```

### Building the app

**Note** that the full code for this project is in [this codebase](https://github.com/dabit3/nextjs-gitcoin-passport). You can refer to this repository any time if you need some extra context as you go through the instructions below.

The first thing to do is create a new [Next.js](https://nextjs.org/) application using the command

`npx create-next-app`

in the terminal. You'll be prompted to configure the app - choose the following options:

```sh
npx create-next-app my-passport-app

✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use `src/` directory with this project? … No
✔ Would you like to use experimental `app/` directory with this project? …Yes
✔ What import alias would you like configured? … @/*
```

Next, change to the new directory and install `ethers`:

```sh
npm install ethers
```

Now, create a new file in `my-passport-app` and add the following to set the Passport API Key and Scorer ID values:

```sh
NEXT_PUBLIC_GC_API_KEY=<your-api-key>
NEXT_PUBLIC_GC_SCORER_ID=<your-scorer-id>
```

Save this file as `.env.local`

#### Imports and configuration

In this step, you'll do the following:

* Import the ethers.js library to interact with the user's EVM wallet
* Import the useState and useEffect hooks from React to store local state and run some code after rendering
* Configure variables for the Gitcoin Passport API Key, Scorer ID, API endpoints, and a value for the threshold score a passport must have to give access to the hidden message (the `THRESHOLD_NUMBER`)
* Create a variable to hold the header information that will be sent with the API calls

Start by opening `app/page.tsx` and removing all of the existing code. Then add the following code to `app/page.tsx` and save the file:

```js
// import the necessary packages
'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// these lines read the API key and scorer ID from your .env.local file
const APIKEY = process.env.NEXT_PUBLIC_GC_API_KEY
const SCORER_ID = process.env.NEXT_PUBLIC_GC_SCORER_ID

// endpoint for submitting passport
const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport'
// endpoint for getting the signing message
const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message'
// score needed to see hidden message
const THRESHOLD_NUMBER = 20

// these lines add the corretc header information to the request
const headers = APIKEY ? ({
  'Content-Type': 'application/json',
  'X-API-Key': APIKEY
}) : undefined

// enable wallet interactions
declare global {
  interface Window{
    ethereum?: any
  }
}
```

This code includes all of the necessary import and configuration for your app. The comments in the code explain what is happening line-by-line.

#### App component and state

The next step is to add logic to the app that allows a user to interact with it. This means building out a UI (user interface).

In this step, you'll do the following:

* Create local state variables
* Return the UI for the app
* If the user is not yet connected, show them a connect button
* Once the user is connected, show them a button to submit their passport
* If the user is connected their score will be fetched, and if they've submitted their passport they will be able to view their score.

Start by, adding the following code immediately below the existing code in `app/page.tsx`:

```js
export default function Passport() {
  // here we deal with any local state we need to manage
  const [address, setAddress] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [score, setScore] = useState<string>('')
  const [noScoreMessage, setNoScoreMessage] = useState<string>('')

  /* todo check user's connection when the app loads */
  
  /* todo connect user's wallet */

  /* todo check user's passport */

  /* todo get signing message from API */

  /* todo submit passport for scoring */

  return (
    /* this is the UI for the app */
    <div style={styles.main}>
      <h1 style={styles.heading}>Gitcoin Passport Scorer 🫶</h1>
      <p style={styles.configurePassport}>Configure your passport <a style={styles.linkStyle} target="_blank" href="https://passport.gitcoin.co/#/dashboard">here</a></p>
      <p style={styles.configurePassport}>Once you've added more stamps to your passport, submit your passport again to recalculate your score.</p>

      <div style={styles.buttonContainer}>
      {
        !connected && (
          <button style={styles.buttonStyle} onClick={connect}>Connect Wallet</button>
        )
      }
      {
        score && (
          <div>
            <h1>Your passport score is {score} 🎉</h1>
            <div style={styles.hiddenMessageContainer}>
              {
                Number(score) >= THRESHOLD_NUMBER && (
                  <h2>Congratulations, you can view this secret message!</h2>
                )
              }
              {
                Number(score) < THRESHOLD_NUMBER && (
                  <h2>Sorry, your score is not high enough to view the secret message.</h2>
                )
              }
            </div>
          </div>
        )
      }
      {
        connected && (
          <div style={styles.buttonContainer}>
            <button style={styles.buttonStyle} onClick={submitPassport}>Submit Passport</button>
            <button style={styles.buttonStyle} onClick={() => checkPassport()}>Check passport score</button>
          </div>
        )
      }
      {
        noScoreMessage && (<p style={styles.noScoreMessage}>{noScoreMessage}</p>)
      }
      </div>
    </div>
  )
}
```

Note that only a portion of the intended functions are implemented in this code snippet - there are `todo` statements in the code as placeholders showing where more functions should be added later. The first section of the code is for defining local state variables. This means setting up some values that will exist throughout the lifecycle of the application, rather than being specific to individual functions. For more background on state management, see the [React documentation](https://react.dev/learn/state-a-components-memory).

```js
  const [address, setAddress] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [score, setScore] = useState<string>('')
  const [noScoreMessage, setNoScoreMessage] = useState<string>('')
```

The next section of the code after the `todo` comments is the `return` statement. Everything following the keyword `return` is HTML code that defiones how the UI is rendered to the user. You can see that there are calls to functions that do not yet exist, such as `checkPassport`. The next sections will focus on creating those missing functions.

#### Connecting the user's wallet

The next thing we'll add is a function for connecting the user's wallet when they click the `connect` button.

In this step we'll do the following:

* When the user clicks the connect button and connects their wallet, their `address` will be set in the local state, `connected` will be set to true, and then the Gitcoin Passport API will be called to check their score.

Open `app/page.tsx` and find the `todo` comment `/* todo check user's connection when the app loads */`. Replace this comment with the following code:

```js
async function connect() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAddress(accounts[0])
    setConnected(true)
    checkPassport(accounts[0])
  } catch (err) {
    console.log('error connecting...')
  }
}
```

This function connects the user's wallet to your app. It detects the address of the user's wallet and adds it to the `address` variable using the `setState` method. It updates `setConnected` to `true` and then passes the `address` to another function that checks the Passport score. This `checkPassport` function has not been written yet, so we'll add it int he next step.

#### Checking the user's connection when the app loads

The UI includes a button that allows the user to trigger the app to connect their wallet by clicking, but if they've already connected some time in the past then we can bypass that step and simply automatically connect, improving the user experience.

To do this, add the following `useEffect` hook to your code in place of the `/* todo check user's connection when the app loads */` comment:

```js
useEffect(() => {
  checkConnection()
  async function checkConnection() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.listAccounts()
      // if the user is connected, set their account and fetch their score
      if (accounts && accounts[0]) {
        setConnected(true)
        setAddress(accounts[0].address)
        checkPassport(accounts[0].address)
      }
    } catch (err) {
      console.log('not connected...')
    }
  }
}, [])
```

For more information on the `useEffect` hook, see the [React documentation](https://react.dev/reference/react/useEffect#useeffect).

#### Checking the user's Passport score

This function checks the user's Passport score. This requires that the user has already submitted their passport for scoring. If they have not, they need to do that first. You'll add the necessary function that allows them to submit their passport in the next step.

In this step, you'll do the following:

* Create a function to call the Gitcoin scorer API to get the user's score, passing in the Scorer ID and the user's address as request parameters.
* If the user has a score, we set it in the local state.
* If the user does not yet have a score, we set a message to be displayed to them asking them to create stamps and submit their passport.

Find the `todo` comment `/* todo check user's passport */` in `app/pages.tsx`. Replace the comment with the following code:

```js
async function checkPassport(currentAddress = address) {
  setScore('')
  setNoScoreMessage('')
  // 
  const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${currentAddress}`
  try {
    const response = await fetch(GET_PASSPORT_SCORE_URI, {
      headers
    })
    const passportData = await response.json()
    if (passportData.score) {
      // if the user has a score, round it and set it in the local state
      const roundedScore = Math.round(passportData.score * 100) / 100
      setScore(roundedScore.toString())
    } else {
      // if the user has no score, display a message letting them know to submit thier passporta
      console.log('No score available, please add stamps to your passport and then resubmit.')
      setNoScoreMessage('No score available, please submit your passport after you have added some stamps.')
    }
  } catch (err) {
    console.log('error: ', err)
  }
}
```

This function takes the user address as an argument. It then creates an API request by adding the address and the scorer ID that was loaded from your `.env.local` file to the Scorer API's `registry/scorer` endpoint. It then makes the request and assigns the result to the `passportData` variable. This `passportData` has several fields including `score`. The function extracts the value in the `score` field, rounds it to the nearest integer and stores it in the local state variable `score` using the `setScore` method. The function throws an exception if the score is missing, directing the user to add soem stamps to the passport before tryign again.

#### Submitting the user's Passport

The last piece of functionality to implement will be allowing a user to submit their passport for scoring.

In this step, you'll do the following:

* Create an API call to get the signing message from the Gitcoin Passport API
* Prompt the user with the signing message to sign a transaction
* Once the transaction is signed, send the signed message along with other arguments in a separate API call to submit their passport

The following parameters are required in the API call to submit the passport:

```
- Wallet address
- Scorer ID
- Signature
- Nonce
```

Add the following two functions to `app/page.tsx` after the `checkPassport` function, replacing the `/* todo get signing message from API */` and `/* todo submit passport for scoring */` comments:

```js
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
    setNoScoreMessage('')
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
          scorer_id: SCORER_ID,
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
```

The first function, `getSigningMessage` calls the `signing-message` API endpoint. The response contains the `nonce` and `message` data required for signing. This function is called inside the second funtion, `submitPassport`. The message is passed to the user's wallet to be signed. Once signed, it is added to the body of a POST request to the `submit-passport` API endpoint along with the `signature`, `scorer_id` and `nonce`. Assuming the API call is successful, the user's Passport is submitted and the `checkpassport` function can be called to retrieve its score.

### Styling

Finally, add some styling to your app! Some basic styling is suggested below, but you are free to unleash your creativity! For more information on CSS styling, see [these instructions](https://developer.mozilla.org/en-US/docs/Learn/Getting\_started\_with\_the\_web/CSS\_basics).

```js
const styles = {
  main: {
    width: '900px',
    margin: '0 auto',
    paddingTop: 90
  },
  heading: {
    fontSize: 60
  },
  intro: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, .55)'
  },
  configurePassport: {
    marginTop: 20,
  },
  linkStyle: {
    color: '#008aff'
  },
  buttonContainer: {
    marginTop: 20
  },
  buttonStyle: {
    padding: '10px 30px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    borderBottom: '2px solid rgba(0, 0, 0, .2)',
    borderRight: '2px solid rgba(0, 0, 0, .2)'
  },
  hiddenMessageContainer: {
    marginTop: 15
  },
  noScoreMessage: {
    marginTop: 20
  }
}
```

### Testing it out

You are now ready to test your app! To do so, open your terminal and run the following command:

```
npm run dev
```

Your app is now available in your web browser by navigating to `localhost:3000`.

### 🎉 Congratulations!

You've built your first gated application with Gitcoin Passport! If you used the default styling, your app will look as follows:



<figure><img src="../.gitbook/assets/quick-start-app.png" alt=""><figcaption><p>Your app should look something like this!</p></figcaption></figure>

Use the buttons to connect your wallet and test all the functions you just added!

