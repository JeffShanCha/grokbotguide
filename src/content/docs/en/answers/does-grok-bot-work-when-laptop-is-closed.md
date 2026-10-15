---
title: "Does Grok Bot keep working when my laptop is closed?"
description: "Yes. Grok Bot runs on a cloud computer that belongs to you, so closing the app, your laptop or your phone does not stop background work or routines."
sidebar:
  order: 7
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Grok Bot FAQ (official docs)"
    url: https://docs.x.ai/grok-bot/faq
  - title: "Use the computer and apps (official docs)"
    url: https://docs.x.ai/grok-bot/computer-and-apps
  - title: "Approvals, security, and privacy (official docs)"
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/does-grok-bot-work-when-laptop-is-closed/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Does Grok Bot keep working when my laptop is closed?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes. Grok Bot works on a persistent cloud computer, so closing the app, shutting your laptop or locking your phone does not stop background work or routines.\"}}, {\"@type\": \"Question\", \"name\": \"Do Grok Bot routines run when my laptop is off?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes. Routines run on Grok Bot’s cloud computer, independent of your own computer.\"}}, {\"@type\": \"Question\", \"name\": \"Will Grok Bot control my own computer?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Only if you enable and approve local execution. The default asks every time; the official advice is Never allow unless needed.\"}}]}"
---

**Yes.** Grok Bot works on a persistent cloud computer, so closing the app, shutting your laptop or locking your phone does not stop background work or routines.

## The cloud computer is not your computer

- **Cloud computer**: one per user, shared by all your Bots, with a browser, file system and terminal. Closing your laptop does not affect it.
- **Your own Mac or Windows machine**: a Bot only runs commands there if you enable and approve local execution under **Settings → General → Bot → Execution on Local Computer**. The default is to ask every time; the official advice is Never allow unless a task needs it.

## While you are away

- Actions that need approval wait for you; approval cards from routines expire after about 10 minutes and the action does not run.
- For logins and CAPTCHAs the Bot stops and waits for you to take over; you can do it from your phone.
- After a long absence Grok Bot may ask whether to keep routines running; if you do not answer, they may be paused.
- Turn on the Bot’s **Notifications** to hear about results, questions and approvals.

## Related questions

### Do Grok Bot routines run when my laptop is off?

Yes. Routines run on Grok Bot’s cloud computer, independent of your own computer.

### Will Grok Bot control my own computer?

Only if you enable and approve local execution. The default asks every time; the official advice is Never allow unless needed.

## Read next

- [What is Grok Bot?](/en/start/what-is-grok-bot/)
- [How do I schedule Grok Bot routines?](/en/answers/how-to-schedule-grok-bot-routines/)
- [Grok Bot × your phone](/en/recipes/mobile-voice/)
