# Deduplicating stamps

## Why is deduplication necessary?

Stamp deduplication is a crucial feature that prevents users from setting up more than one Passport and using the same credentials to verify their identity multiple times. Deduplication is critical to ensure each person can only have one instance of each stamp. Deduplication ensures that a user can only tie each stamp to one identity.

## How does Gitcoin Passport handle duplicate stamps?

Passport handles the issue of stamp duplication by automatically identifying and eliminating duplicate stamps. This prevents users from using the same credentials to verify their stamps and identity across multiple Gitcoin Passports. This ensures that each user in an application has a unique and consistent digital identity.

By default, the Gitcoin Passport Scorer API uses a **last in, first out (LIFO)** stamp deduplication method.&#x20;

This means that, in a given scoring instance, if a Passport holder submits a stamp that has already been submitted by another user, the _duplicate_ stamp is ignored and not counted towards the score.

For example, let’s say you build an application that uses the Gitcoin Passport API to verify the unique humanity of your users. Two Passports, “Passport A” and “Passport B,” present the same stamp based on the same Twitter account. In this scenario, the Last-in-First-out deduplication method would only count the stamp instance that was submitted earliest, ignoring the one that was submitted later.

For example, if Passport A submitted the Twitter stamp first, followed by Passport B, your app would only count the instance of the Twitter stamp submitted by Passport A. The same rule applies to any subsequent instances of the stamp, regardless of the Passport.

This LIFO method ensures that each Passport’s score accurately reflects the unique identity of its holder. This prevents duplicate stamps from skewing the verification process and prevents users from re-using evidence of personhood across multiple Passports.

## Things to note

If a user creates a Passport with a Twitter stamp, they can also create a separate Passport with a Google stamp, and potentially more with other unique stamps.&#x20;

While users cannot create multiple Passports with the same stamps, they can create multiple Passports with unique stamps in each. Stamp deduplication means that users that choose to create multiple Passports will have to spread their stamps across them, preventing those passports from accruing high scores.

Stamps are also unique to scoring instances. For example, one user uses Passport holder A with one Twitter account in an application that uses scoring instance X, and another user uses the same Twitter account in a distinct Passport in an independent scoring instance Y. In this case, both users will get scored for the Twitter account. As long as the scoring instances are independent, there is no concern for double counting or interference between instances.

In addition, the scores assigned to Passports will not change once they are issued. This means that there is no need to recalculate Passport scores or synchronize them again in case of duplicate stamp submissions. Once a score is assigned to a Passport, it remains fixed and can be relied upon for future verifications, even if a duplicate stamp is submitted by a new Passport. This makes the scoring process more efficient and streamlined, which is particularly important for large and complex applications that score a high volume of verifiable credentials.

## Summary

The LIFO deduplication strategy has several benefits for Passport holders and developers. It ensures that each Passport holder (i.e. Ethereum address) is assessed based on their unique set of stamps, and that no one receives an unfair advantage due to having the same stamp as another Passport holder within a given scoring instance. This means that for applications using the Passport API, there will be no double-counting of stamps within the app, ensuring a fair and accurate assessment of each user’s unique identity.&#x20;

