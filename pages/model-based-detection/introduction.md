# Model based detection


The Ethereum activity scorer is a machine learning model trained on known Sybil and non-Sybil Ethereum account data that examines the transaction history for a given Ethereum address and assigns it a trust score.


The Ethereum activity scorer is designed to be as easy as possible to use. There is a public endpoint that requires no authorization credentials. Yousimply send a request to that endpoint passing an Ethereum address. The model is run remotely on a Gitcoin server and the response contains a score out of 100. 

The model itself is a black box whose outcome is based on ~50 features. 

There will also be models for NFT ownership and zk-sync activity coming soon.

## Double verification

Some applications may be happy to rely on the model-based scorers alone; however, in many cases it is advisable to offer the unique humanity model as a fallback to support use cases that require specific reasoning for an accounts acceptance/rejection to be reported. IOn this case a typical flow would be to allow users to check their Ethereum activity score and only require Passport verification if the Etheruem score does not exceed your chosen threshold.


## Integrating the model based scoring

You can retrieve a score with a simple APi request from your app. We have provided a [walkthrough tutorial](./tutorials/double-verification.md) for the Etheruem activity scorer to show you how it is done.
