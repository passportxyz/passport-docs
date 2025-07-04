---
title: Custom Passport
description: Build a custom Passport dashboard around your ecosystem's unique needs.
---

# Custom Passport

Custom Passport enables partners to develop a Human Passport dashboard that is customized to the unique needs of their ecosystem. This offering enables several additional features above and beyond what is offered on the standard Passport app, which can enable tailored proof of humanity solutions.

If you’re interested in building with Custom Passport, please reach out to our team:

[Contact the Passport team](https://docs.google.com/forms/d/e/1FAIpQLSdTSjRV6NjyTBZEwZxlD2j7EyG0LwU1spoc48BO-xNLiq1s7w/viewform)

## What’s possible

The custom Passport experience offers lots of customization options related to the look and feel of the experience, the stamp selection and even the scoring weights of stamps. Each of these options are configurable and still come with default values to guide the experience. Learn more about each feature below:

| Customization                            | Description                                                                                                                                                                                                                                                                                                                                                                    |
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Branded dashboard and CTAs               | Create a custom dashboard for your users to verify their humanity through. (Examples include [Scroll](https://app.passport.xyz/#/scroll/dashboard), [Shape](https://app.passport.xyz/#/shape/dashboard), & [Linea’s Verax](https://app.passport.xyz/#/verax/dashboard))  Access this dashboard via a distinct URL, and add your branding, messaging, and a CTA (push Passport onchain or point to a domain of your choosing) to a module at the top of the page.  Display your custom Stamp weights and score threshold.  |
| Curate Stamps and weights                | Remove any Stamps or credentials that don’t make sense for your ecosystem, and adjust the remaining [credential weights](../major-concepts/credential-map-and-weights.mdx) to better reflect your ecosystem’s needs.                                                                                                                                                                                                                                   |
| Create your own Stamps:<br>GuestList     | Enable your known humans to easily obtain a passing score based on their inclusion on a pre-vetted list.  This list could be based on POAP ownership, in-person event attendance, your own KYC, or other high-human or reputation signals.                                                                                                                                     |
| Create your own Stamps:<br>DeveloperList | Reward developers who have contributed to the development of specified GitHub repositories with points.  This Stamp could be built around a set of company-owned repositories, or around different important programming languages or tools.                                                                                                                                   |
| Elevated rate limits                     | Access the custom score and Stamp data via the Stamps API with elevated rate limits.                                                                                                                                                                                                                                                                                         |

## Custom Passport Requirements

To build a custom dashboard, we need assets, messages, and CTAs that will help to inform your users around the program that is being protected. Also, if you choose to take advantage of the custom scorer or custom Stamps, we will partner with you to identify the proper weights, lists, and repos needed to set up those features on the backend. 

### Branded Dashboard

The branded dashboard requires the following assets, messages, and CTAs to set it up:

| Required element                               | Description                                                                                                                                                                                                   | Example                                                                                                                                                               |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Custom URL path                                | This path element will be used in your branded dashboard’s unique URL, which is where your users will access it.                                                                                              | https://app.passport.xyz/#/verax                                                                                                                                      |
| Partner name                                   | This will be used in a few different locations throughout the dashboard.                                                                                                                                      | Verax                                                                                                                                                                 |
| Score threshold                                | The minimum score threshold that you will use to protect access to your program.                                                                                                                              | 20+                                                                                                                                                                   |
| Branded module:<br>Logo                        | This will display in the branded module at the top of the dashboard.<br>Should be the negative version suitable for dark backgrounds, square or vertical aspect ratio for maximum visibility.<br>Must be SVG.  |                                                                                                                                                                       |
| Branded module:<br>Primary description         | This description helps your users understand the program that is being protected and how the score will be used. <br>Must be 200 characters or less.                                                          | Verax is a community maintained public attestation registry on Linea. Push your Passport Stamps onto Verax to gain rewards for early adopters in the Linea ecosystem. |
| Branded module:<br>Secondary description       | This additional, optional description can help to clarify certain elements from your protected campaign. <br>Must be 100 characters or less                                                                   | This action requires ETH bridged to Linea Mainnet to cover network fees.                                                                                              |
| Branded module:<br>CTA link                    | This can be one of two things:<br>A link to your website.<br>A button that enables users to push onchain to your network, assuming we have also partnered to enable this                                      | https://poh.linea.build                                                                                                                                               |
| Branded module:<br>CTA text                    | The text that will be added to the button within the branded module.                                                                                                                                          | Get Linea’s PoH badge                                                                                                                                                 |
| Branded module:<br>Primary and secondary color | This color will be used to <br>Must be a hex color.                                                                                                                                                           | #d2dc95                                                                                                                                                               |

### Custom Scorer

If you decide that you’d like to remove any Stamps or reweight their credentials to better match your ecosystem’s needs, we will partner with you to come up with an updated set of weights. 

You can find the current Passport Stamp and credentialweights in the following link:

[Credential Map and Weights](/building-with-passport/stamps/major-concepts/credential-map-and-weights)

Please let us know the following if you’d like to customize the score:
* Which Stamps and credentials would you like to remove
* How you would like to reweight each of the individual Stamps

We can then review your request and let you know if it will still provide effective Sybil defense for your program. 

### GuestList Stamp

If you would like to create your own Stamp based on a pre-vetted allowlist, please provide us with either the NFT, POAP, or list of addresses that should be provided access to this Stamp. 

We will also need you to provide the points that you would like to be awarded with this Stamp.

### DeveloperList Stamp

If you would like to create a Stamp that awards points for developer contribution, we will need you to provide the list of repos that developers will have needed to make commits to, as well as the number of commits you would like to award points for, and the number of points to assign. 

For example, you can build a Stamp that awards developers for having made the following level of commitments:
* 1 commit – 1 point
* 5 commits – 2 points (additional, on top of the earlier tier)
* 10 commits – 3 points (same as the above)

### Elevated Rate Limits

Please let us know how many users you expect to participate in this campaign so we can help identify the right rate limit for you!

## The Process

Once you identify that you’d like to take advantage of the Custom Passport offering, we can get started on putting together the above requirements. 

As you provide these, we will build out your branded dashboard for you, and will provide you review sessions along the way. We can adjust and optimize your dashboard for you before your campaign goes live. 

## Requesting Custom Passport data

If you are just checking scores from your Custom Passport offchain, you can use the [Stamps API v2](/building-with-passport/stamps/passport-api) to access your users' data.

If, instead, you're enabling your users to push their Passport onchain and you are using a [custom scorer](#custom-scorer), you will need to use the [Decoder contract](/building-with-passport/stamps/smart-contracts/contract-reference#decoder-contract), and more specifically, the `getScore` (0xdaadd662) method, making sure to pass both your [scorer ID](/building-with-passport/stamps/passport-api/getting-access) and the specified wallet address to pull users' custom scores. 