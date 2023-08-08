# Style Guide

This style guide lays out the basic standards for the documentation on this site. This is to encourage standardized syntax, tone, grammar and styling across the site. The aim of the style guide is **not** to stifle individualism, but to empower a diverse set of contributors from across the community by:

* being clear about the best practises we want to adhere to
* being clear about the criteria by which pull requests will be evaluated
* being transparent about the guiding philosophy

while also serving our audience of users and developers by:

* maintaining a consistent "voice" across the site
* lowering barriers to entry by consistentlyusing welcoming and accessible language
* making it easy to find the right information

### Audience personas

Our documentation serves two primary personas: **users** and **developers.**

Users are people interested Gitcoin passport because of the activities it unlocks for them. They are most likely interested in how to use their Passport, but less interested in how it works under the hood. They want to know, for example, how to cretae a Passport for the first time, or how to maximize their score to access apps. They probably are not interested in seeing code.

Developers are people building apps that integrate Gitcoin Passport. They might not be users themselves, and they are msot interested in udnerstanding how to build Gitcoin Passport into their own applications. They are more interested in the mechanics of how Gitcoin passport workls and will want to see code snippets, example and reference documentation.

These personas are best served separately, so that users are not burdened with uneccessary details and dveeloeprs can easily find the right information to unlock their building.

The documentation on this site is therefore divided into two distinct pathways. One serves users and the other serves developers. It is important to think about which group of users you are serving when you add a new page.

### Information architecture

This site generally aims to conform to the modular documentation specs defined by [RedHat](https://redhat-documentation.github.io/modular-docs/). This is because the documentation is user-centric and intended to guide readers to complete specific tasks.

Modular documentation generally follows a heirarchy that first separates information into distinct _user stories_.

Each user story is then subdivided into individual self-contained chunks called _modules_.

Each module can be one of three types: _concept_, _procedure_ or _reference_.

A concept module gives the reader descriptions, explanations and examples that help them understand some aspect of a product. A procedure module explains how to achieve some specific task. A reference module provides useful data or syntax reminders for users so that they don't have to remember them.

On this site, we first divide the content according to user persona: users and developers.

Then, each subdivision is a specific user story - that is some specific objective the reader might have. For example, `Creating a Passport` is a user story. It is clear what the intended outcome of this section is: the user should learn how to create a Passport. The individual modules are the sections on the page that explain some particular step the user needs to take to achieve the overall aim of creating a Passport.

An example of a procedure module on the `Creating a Passport` page might be `Getting an Ethereum address` and it would aim to guide the user throuhg thr process of getting an Ethereum address. An example of a concept module on the page could be `What is a wallet?` - the aim of the module would eb to explain the concept of wallets. A reference module on the page could be `Useful Links` and it would simply list useful links for this user story on the page as a convenience tool.

This is the overall information architecture that the site aims to conform to, because it is oriented around helping a reader to achieve specific objectives using Gitcoin Passport. If you add pages to the documentation, please take the time to think about how it can fit into this high level philosophy.

### Global styles

There are some core principles that serve both users and developers equally well. These should be applied across the entire site.

#### Language and tone

**Active voice**

Using _active voice_, rather than _passiver voice_ puts the subject of the sentence first, making the writing more impactful and relatable. It makes the relationship between actor and action very clear.

An example of using the active voice over the passive voice is:

`the developers wrote some code`

rather than

`some code was written by developers`

There are occasions when the passive voice is appropriate, such as when there is no clear subject for the sentence or the subject is irrelevant. For example, `100 ETH was added to the account`. However, as a general rule, we will try to prioritize using the active voice.

**Action oriented**

Action-oriented prose emphasises specific tasks that have some tangible outcome. For example, it is preferable for us to write about

`how to read a Passport score`

compared to

`using the scorer API`.

The former emphasises the benefit the page will have on the user (they will learn how to achieve a specific objective, in this case reading a Passport score) instead of being open-ended and "feature-oriented".

**Second-person narratives**

Your writing can feel more accessible and engaging if you refer to the reader directly. This means using the personal pronoun "you" and making direct instructions to the reader. It implies that the reader is the main character and that the documentation is made to help them on their journey.

For example, use:

`connect your Passport`

instead of

`the passport can be connected`

or

`the user can connect their passport`

**Conscious language**

You should use [conscious language](https://github.com/conscious-lang/conscious-lang-docs) as much as possible. This is because the documentation is supposed to be accessible to as many people as possible. We want to create a welcoming, inclusive environment and avoiding trigger words and unneccessarily offensive terminology goes a long way to making people feel valued.

**Jargon**

You should try to avoid jargon wherever possible. This helps to create a friendly tone and prevents readers from being intimidated by unfamiliar terminology.

**Acronyms**

Acronyms should be spelled out in full on the first use on a page, with the acronym itself in parentheses. Subsequent uses can refer to the acronym only. For example:

`Ethereum uses a proof-of-stake (PoS) based consensus mechanism`

**Capitalization**

You should start proper nouns with capital letters. This includes capitalizing the word "Passport" when it refers to Gitcoin Passport. Other examples that occur frequently across these docs include: Ethereum, Gitcoin, Ceramic, DID, Scorer, Mainnet etc.

#### Styling

**Headings**

Headings are styled using the hash character (#). The number of hashes preceding the title corresponds to the level of the heading. For example, a single hash creates a top level heading. Two hashes is a second-level heading.

In these docs the page title should be a top level (single hash) heading. All other headings should be minimum of second-level (two hashes). Nesting up to 5 hashes is allowed.

e.g.

```
# Main page title

## Section One
  ...
### Getting started
  ...
#### Some more details
  ...
##### Really fine detail 1
  ...
##### Really fine detail 2
  ...

### Moving on
  ...
#### Some fine details
  ...
## Section 2
  ...
### Getting started
  ...
#### Details
  ...
```

**Links**

Inline links are fine, but it is best if they are not too frequent. A good rule of thumb is to have fewer than 5 inline links per paragraph. More than that can become distracting for the reader.

Link texts should be descriptive. This means linking from, e.g.

"more information in the React documentation"

rather than

"more information here".

In this example the reader expects to be directed to the React documentation before they even click the link, reducing some friction. It is also reassuring from a security perspective (because it is clear to readers where a link is intended to take them) and makes it easier to maintain the site when links are updated later.

When linking to internal pages, use relative paths, e.g.

`/devs/getting-started`

over

`https://docs.gitcoin.co/devs/getting-started`.

**Images**

Images can be embedded in pages using standard markdown notation:

`![alt text](path-to-image)`

You should save the image into the `/public` folder and use the relative path to it in the link, rather than linking to an external resource. Any images that require aknowledgements must have them included clearly in the image caption or in text immediately beneath the image. Do not add any images that would break copyright.

### Styles for Users

Users are people that are interesting in using Gitcoin passport to demonstrate their identity/credentials. They are not interested in writing code. Users are a very diverse group of people from a range of backgrounds with a variety of experiences and expertise.

This means we should use language that is accessible as possible and avoid using words that are specific to the software industry. Jargon from web3, software development or any other technical industry are likely to be points of friction for at least some of our Users.

To be as inclusive as possible, we should **use language that as many people as possible can understand without having to look things up**.

Images and screenshots are helpful because some Users will learn better from visual assets than from text.

### Styles for Developers

Developers want to write code that incorporates Gitcoin Passport into their applications. This means developers like to see examples in the form of code snippets. In our markdown files, code snippets are wrapped in three " \` " characters. The language can be defined in the same line. So, for example:

\`\`\`js\
console.log("some javascript code")\
\`\`\`

renders as:

```js
console.log("some javascript code")
```

Developers probably also appreciate frequent links to external documentation and API references, and links to Github repositories with full application code.

### Internationalization

Right now we are an English-language only site. We would prefer to be available in many languages! If you can help us to internationalize our documentation, get in touch through Github or Discord!
