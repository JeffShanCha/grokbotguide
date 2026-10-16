---
title: "Using Grok Bot from China: availability, payment and how it differs from @grok"
description: "The three questions Chinese users ask most: how Grok Bot differs from @grok on X, whether it works from mainland China, and how to pay. Where the official docs are silent, we say so."
sidebar:
  order: 9
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Payment methods (official docs)"
    url: https://docs.x.ai/x-subscription/payment-methods
  - title: "Grok Bot on The X Subscription (official docs)"
    url: https://docs.x.ai/x-subscription/grok-bot
  - title: "Tag @bot on X (official docs)"
    url: https://docs.x.ai/grok-bot/tag-bot-on-x
  - title: "Regions (Cursor docs)"
    url: https://docs.cursor.com/account/regions
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/grok-bot-in-china/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Using Grok Bot from China: availability, payment and how it differs from @grok\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Grok Bot is not @grok on X: @grok answers publicly in X replies, while Grok Bot is a separate app whose Bots operate your tools on a cloud computer and report only to you. The official docs do not list supported countries or mention mainland China, and X and grok.com are not directly reachable from mainland China. Payment on the web is by card, Apple Pay, Google Pay or Link, or through the App Store and Google Play.\"}}, {\"@type\": \"Question\", \"name\": \"Is Grok Bot the same as @grok on X?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. @grok answers publicly on X; Grok Bot is a separate app whose Bots operate your tools on a cloud computer and report only to you. Replying with @bot on X hands a task to your Grok Bot.\"}}, {\"@type\": \"Question\", \"name\": \"Can I use Grok Bot from mainland China?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The official docs do not list supported countries or mention mainland China. X and grok.com are not directly reachable there, so you need a connection that can reliably reach these services, and you should follow local laws.\"}}, {\"@type\": \"Question\", \"name\": \"Can I pay for Grok Bot with Alipay or WeChat Pay?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The official web payment methods are cards, Apple Pay, Google Pay and Link; Alipay and WeChat Pay are not mentioned. You can also subscribe through the App Store or Google Play.\"}}]}"
---

**Grok Bot is not @grok on X**: @grok answers publicly in X replies, while Grok Bot is a separate app whose Bots operate your tools on a cloud computer and report only to you. **The official docs do not list supported countries or mention mainland China**, and X and grok.com are not directly reachable from mainland China. **Payment** on the web is by card, Apple Pay, Google Pay or Link, or through the App Store and Google Play.

## How it relates to @grok

| | @grok on X | Grok Bot |
| --- | --- | --- |
| Where | X posts and replies | The Grok Bot app (desktop and mobile) |
| What it does | Answers questions, explains posts | Opens sites and operates Gmail, Slack and other tools on a cloud computer; runs scheduled tasks |
| Who sees results | Public replies on X | Only you, in the Grok Bot app |
| Cost | Free with limits | The X Subscription Premium ($30/month) and up |

The bridge between them is **@bot**: reply on X with "@bot + request" and your main Bot takes over. Posts that also tag @grok are not handed off. @bot is unavailable when the X account country is in the EU, UK, Australia, Iceland, Liechtenstein or Norway; it goes by the account country, not your location.

## Does it work from China?

- The official docs (subscription, eligibility and FAQ pages) **do not list supported countries or regions** and do not mention mainland China. We found no official statement either way.
- X and grok.com are not directly reachable from mainland China, so signing in, subscribing and using Grok Bot need a connection that can reliably reach these services. Follow the laws where you live.
- Bot tasks run on a **cloud computer**, so the sites and services it opens are reached from the cloud, not from your own network. Your device only needs to reach the Grok Bot app.
- If you also use other models in Cursor: Cursor says some models are unavailable in certain regions under model-provider policies, and you can request a prorated refund if you lose access.

## How to pay

- Officially supported on the web: **cards, Apple Pay, Google Pay and Link**. Some methods are only available in some countries; checkout shows what you can use.
- You can also subscribe through the **App Store** or **Google Play**, if the Grok app is available in your store region.
- The docs do not mention Alipay, WeChat Pay or PayPal.
- Whether a China-issued Visa or Mastercard goes through depends on the issuer. Start with a monthly plan before paying for a year.
- List prices exclude tax, which may be added at checkout.

## Suggested order

1. Confirm you can reliably open x.ai and grok.com and sign in.
2. Subscribe to Premium monthly ($30); see [Which plan](/en/start/plans/).
3. Install the app and follow [Create your first Bot](/en/start/first-bot/) with a small task that does not touch real accounts.
4. Then connect Gmail, Slack and other tools. Company Google Workspace or Slack may need admin approval.

## Related questions

### Is Grok Bot the same as @grok on X?

No. @grok answers publicly on X; Grok Bot is a separate app whose Bots operate your tools on a cloud computer and report only to you. Replying with @bot on X hands a task to your Grok Bot.

### Can I use Grok Bot from mainland China?

The official docs do not list supported countries or mention mainland China. X and grok.com are not directly reachable there, so you need a connection that can reliably reach these services, and you should follow local laws.

### Can I pay for Grok Bot with Alipay or WeChat Pay?

The official web payment methods are cards, Apple Pay, Google Pay and Link; Alipay and WeChat Pay are not mentioned. You can also subscribe through the App Store or Google Play.

## Read next

- [What is Grok Bot?](/en/start/what-is-grok-bot/)
- [Which plan to choose](/en/answers/grok-bot-vs-cursor-plans/)
- [Grok Bot × X: hand off threads with @bot](/en/recipes/x-tag-bot/)
