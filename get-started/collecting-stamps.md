---
description: How to add stamps to your passport
---

# Collecting stamps

**Congratulations on creating your Gitcoin Passport!**

Now that you have your Passport you can start collecting evidence that you are a real individual human. This is done using stamps.

[Stamps](../building-with-passport/major-concepts.md#stamps) are proof of ownership or activity on other platforms. Collecting these stamps together in one place allows Gitcoin Passport to aggregate your online identity in one place. The more stamps you collect, the stronger your evidence and the more access and influence you will have across the web.

When you sign in to the[ Gitcoin Passport app](https://passport.gitcoin.co) you will be presented with a selection of stamps and a score in the upper right corner of the page. Each stamp has its own unique verification procedure. For example, clicking on the Twitter stamp will direct you to log in to your Twitter account. The app will confirm that you were able to log in, and then also look at metrics such as your follower count, and use this information to update your Passport score.

As you repeat the process for more stamps, you will see your score updating.

<figure><img src="../.gitbook/assets/stamps-page.png" alt=""><figcaption><p>The Gitcoin Passport stamps page</p></figcaption></figure>

Although each individual stamp has a unique verification process, the underlying flow is similar:&#x20;

* The Passport app guides you through connecting to the various identity providers. You will be asked to grant the Passport app access to some of your account data. This data is **never stored or exported** by Gitcoin Passport - the app simply checks the data exists.&#x20;
* The Passport app communicates with our server to issue a signed [Verifiable Credential.](../building-with-passport/major-concepts.md) This credential represents your ownership of the connected account. Your account details are encrypted - the only information that is shared by your Passport is the credential _representing_ your account ownership, not any details about the accounts themselves.&#x20;
* The Verifiable Credential will be saved into your Passport and will be available to any 3rd party app where you present your passport.

{% hint style="info" %}
**Good to know:** Some Identity providers have their own verification process that can take some time to complete. But once you're verified there, collecting the Stamp for that service should be quick.
{% endhint %}



## Reverifying your stamps

If you are a returning user your Passport information will automatically be retrieved and displayed in the Passport app. You will be presented with the option to "one-click verify" your existing stamps. This automatically renews all your stamps, preventing them from expiring and requiring manual reverification. However, if you do not log in and reverify for 90 days your stamps will expire and require fresh verification to confirm the details they hold are still accurate.



Next, head to [**Presenting your Passport**](presenting-your-passport.md) to learn how to use your passport across the web!

