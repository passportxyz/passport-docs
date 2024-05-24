# Model Based Detection 

The Model Based Detection API utilizes machine learning models trained on known Sybil and human EVM account data that examines the transaction history against a specific set of features built around an ecosystem for a given Ethereum address and assigns it a trust score. Currently, we have only made the ETH activity model score available via this API, but we have plans to greatly expand this to other L2s and ecosystems. 


The Ethereum activity score is designed to ease both user and developer friction when proving humanity. You simply send a request to the Model Based Detection endpoint, passing an Ethereum address. The model is run remotely on a Gitcoin server and the response contains a score between 0 (likely Sybil) and 100 (likely human). 

The ETH activity model itself is a black box whose outcome is based on 50+ features. 


## Double verification

Some applications may be happy to rely on the model-based scores alone; however, in many cases it is advisable to offer the unique humanity model as a fallback to support use cases that may include users who might not have strong account history with their EVM address. 

In this case a typical flow would be to initially check users' ETH activity score, provide access to those who pass, and let those who don't pass the initial check to use the [Stamp-based verification](https://docs.passport.xyz/building-with-passport/passport-api/overview) to prove their humanity.


## Integrating the model based score

You can retrieve a model-based score with a simple API request. We have provided a [walkthrough tutorial](./tutorials/double-verification.md) for the Etheruem activity score to show you how it is done.
