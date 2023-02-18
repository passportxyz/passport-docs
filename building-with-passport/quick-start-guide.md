# Quick Start Guide

In this guide, you'll learn how to build a gated application with Next.js and Gitcoin Passport.

We'll be using the Gitcoin Passport API to do this. The API enables everything you need to easily build sybil resistance into your web or mobile application.

To follow this tutorial, you'll first need to visit [https://scorer.gitcoin.co/](https://scorer.gitcoin.co/). Here, you'll create both an API key as well as a Community.

The Community will be where you declare the scoring mechanism for your app.

#### Application flow

How this sample application will work.

1. When the user visits the sample app, they will be asked to connect their wallet
2. Once they've connected, we'll fetch their passport score from the Gitcoin Scorer API
3. If their score meets the threshold that was set, we'll show the secret message
4. If the score does not meet the threshold, we'll let them know to increase their score.
5. If they do not yet have their passport configured, we'll ask them to configure and submit their passport.

This is similar to how you might use Gitcoin passport in a real-world application.

#### API Endpoints

The API endpoint we'll be using is`https://api.scorer.gitcoin.co/`, you can view interactive API details at [https://api.scorer.gitcoin.co/docs#/](https://api.scorer.gitcoin.co/docs#/).

When sending a request to the Scorer API, the API key must be included as a header like this:

```json
{
  'Content-Type': 'application/json',
  'X-API-Key': '{APIKEY}'
} 
```

There are 3 main API endpoints we'll be using.

1. Getting the score for an address

This endpoint just returns the score for any given address.

```
https://api.scorer.gitcoin.co/registry/score/${COMMUNITYID}/${address}
```

2. Getting the signing message and nonce

This returns the signing message and nonce required in the request for submitting a passport.

```
https://api.scorer.gitcoin.co/registry/signing-message
```

3. Submitting a passport

Once the user has signed the message, we'll send a new request to this endpoint along with the address, Community ID, signature, and nonce.

```
https://api.scorer.gitcoin.co/registry/submit-passport
```

So the full request might look like this:

```javascript
const response = await fetch(SUBMIT_PASSPORT_URI, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    address,
    community: COMMUNITYID,
    signature,
    nonce
  })
})
```

### Getting started

> To reference final version of this app at any time, check out the codebase located [here](https://github.com/dabit3/nextjs-gitcoin-passport)

The first thing we'll do is create a new Next.js application:

```
npx create-next-app my-passport-app

✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use `src/` directory with this project? … No
✔ Would you like to use experimental `app/` directory with this project? …Yes
✔ What import alias would you like configured? … @/*
```

Next, change to the new directory and install `ethers`:

```
npm install ethers
```

Now, create a new file named `.env.local` and set the Gitcoin API Key and Community ID values:

```
NEXT_PUBLIC_GC_API_KEY=<your-api-key>
NEXT_PUBLIC_GC_COMMUNITY_ID=<your-community-id>
```

### Imports and configuration

Next, open `app/page.tsx` and remove all of the existing code.

In this step, we'll be doing the following:

1. Importing the [`ethers.js`](https://docs.ethers.org/v5/) library to interact with the user's EVM wallet
2. Importing the `useState` and `useEffect` hooks from React to store local state and run some code after rendering
3. Configuring variables for the Gitcoin Passport API Key, Community ID, API endpoints, and the point configuration for the app (the `thresholdNumber`)
4. Creating a variable to hold the header information that will be sent with the API calls

Add the following code to `app/page.tsx`:

```javascript
'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const APIKEY = process.env.NEXT_PUBLIC_GC_API_KEY
const COMMUNITYID = process.env.NEXT_PUBLIC_GC_COMMUNITY_ID

// endpoint for submitting passport
const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport'
// endpoint for getting the signing message
const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message'
// score needed to see hidden message
const thresholdNumber = 20

const headers = API_KEY ? ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY
}) : undefined

declare global {
  interface Window{
    ethereum?: any
  }
}
```

### App component and state

Now that we have all of the imports and configuration that we'll need to build out the functionality in our app, let's build out the UI.

In this step, we'll be doing the following:

1. Creating local state variables
2. Returning the UI for the app
   1. If the user is not yet connected, we show them a connect button
   2. Once they are connected, we will show them a button to submit their passport
   3. If the user is connected their score will be fetched, and if they've submitted their passport they will be able to view their score.

Next, add the following below the imports:

```javascript
export default function Passport() {
  // here we deal with any local state we need to manage
  const [address, setAddress] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [score, setScore] = useState<string>('')jaa
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
                Number(score) >= thresholdNumber && (
                  <h2>Congratulations, you can view this secret message!</h2>
                )
              }
              {
                Number(score) < thresholdNumber && (
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

I've commented some of the functionality already implemented, as well as some of the things we'll need to do next to make all of this work.

#### Connecting the user's wallet

The next thing we'll add is a function for connecting the user's wallet.

In this step, we'll be doing the following:

1. When the user clicks the connect button and connects their wallet, we'll set their address in the local state, set `connected` to true, and then call the Gitcoin Passport API to check their score.

Add the following code below the `useState` hooks:

```javascript
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

#### Checking the user's passport score

In this step, we'll be doing the following:

1. Create a function to call the Gitcoin scorer API to get the user's score, passing in the Community ID and the user's address as request parameters.
2. If the user has a score, we set it in the local state.
3. If the user does not yet have a score, we set a message to be displayed to them asking them to create stamps and submit their passport.

Add the following code below the `useState` hooks:

```javascript
async function checkPassport(currentAddress = address) {
  setScore('')
  setNoScoreMessage('')
  // 
  const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${COMMUNITYID}/${currentAddress}`
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

#### Checking the user's connection when the app loads

We've created a button to allow the user to click a button to connect, but if they've already connected in the past then we can detect the connection and bypass that step making the user experience better.

To do this, add the following `useEffect` hook to your code below the `useState` hooks:

```javascript
useEffect(() => {
  checkConnection()
  async function checkConnection() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      // if the user is connected, set their account and fetch their score
      if (accounts && accounts[0]) {
        setConnected(true)
        setAddress(accounts[0])
        checkPassport(accounts[0])
      }
    } catch (err) {
      console.log('not connected...')
    }
  }
}, [])
```

#### Submitting their passport

The last piece of functionality we need to implement will be to allow a user to submit their passport for scoring.

In this step, we'll be doing the following:

1. Creating an API call to get the signing message from the Gitcoin Passport API
2. We can then prompt the user with the signing message to sign a transaction
3. Once the transaction is signed, we can send the signed message along with other parameters in a separate API call to submit their passport
4. When submitting the passport, we include the following parameters
   1. Wallet address
   2. Community ID
   3. Signature
   4. Nonce

Add the following 2 functions after the `checkPassport` function:

```javascript
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
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      // ask the user to sign the message
      const signature = await signer.signMessage(message)
      
      // call the API, sending the signing message, the signature, and the nonce
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          address,
          community: COMMUNITYID,
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

#### Styling 💅

Finally, we'll add some basic styles! (feel free to modify these as you'd like):

```javascript
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

#### Testing it out

Now we should be able to test out the app!

To do so, open your terminal and run the following command:

```
npm run dev
```

## 🎉 Congratulations!

You've built your first gated application with Gitcoin Passport!
