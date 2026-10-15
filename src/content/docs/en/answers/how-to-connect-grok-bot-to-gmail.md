---
title: "How do I connect Grok Bot to Gmail?"
description: "Add the Gmail plugin from Connect apps and authorize it. Includes safe permission settings, a drafts-only setup, and fixes for failed sign-ins and blocked work accounts."
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Connect plugins (Cursor Help Center)"
    url: https://cursor.com/help/grok-bot/connect-plugins
  - title: "Grok Bot Tutorial: AI Email Management (Charlie Automates)"
    url: https://charlieautomates.com/blog/grok-bot-tutorial-ai-email-management/
  - title: "Grok Bot setup guide (Wright Mode)"
    url: https://www.wrightmode.com/blog/grok-bot-setup-guide
  - title: "Approvals, security, and privacy (official docs)"
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/how-to-connect-grok-bot-to-gmail/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"How do I connect Grok Bot to Gmail?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Open Connect apps in the Grok Bot sidebar, add the Gmail plugin and authorize your Google account in the browser. Once it shows under Installed, it is connected. One Gmail plugin connects one mailbox at a time.\"}}, {\"@type\": \"Question\", \"name\": \"Can Grok Bot connect to more than one Gmail account?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"One Gmail plugin connects one mailbox at a time. The Help Center notes some plugins can connect a second account; check the plugin detail page.\"}}, {\"@type\": \"Question\", \"name\": \"Will Grok Bot send emails on its own?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"If the plugin has send permission, it may send when a task calls for it. Turn off send, reply and forward in the plugin toggles and keep it to drafts.\"}}, {\"@type\": \"Question\", \"name\": \"What if Gmail says an admin must approve the app?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Your Google Workspace admin has to approve the app named Grok first. Switching browsers or relinking will not bypass it.\"}}]}"
---

Open **Connect apps** in the Grok Bot sidebar, add the **Gmail** plugin and authorize your Google account in the browser. Once it shows under **Installed**, it is connected. One Gmail plugin connects one mailbox at a time.

## Steps

1. Open **Connect apps** in the sidebar (on mobile: avatar → Connect apps), or follow an in-chat **Connect** card.
2. Search for Gmail and add it.
3. When asked to **Authorize** or **Authenticate**, sign in and approve in the browser.
4. Back in Grok Bot, confirm Gmail is under **Installed**. **Needs auth** or **Disconnected** means installed but not signed in; authorize again.

## What it can do

Per the Cursor Help Center: search and read mail, draft and send, and apply labels. A plugin can only do what your Google account can already do; it cannot change sharing or raise access.

## Recommended permissions

- In the plugin tool toggles, turn off **send, reply and forward** and keep read, drafts and labels (the Wright Mode setup). This is more reliable than writing "do not send" in a prompt.
- Keep it to drafts for the first week. Drafts appear as a card with **Send email** or **Discard**.
- Set deleting, unsubscribing and clicking links in emails to **Ask first** in Auto Review.

## If it will not connect

- **Sign-in did not finish**: choose **Reconnect** (or **Reopen** on the chat card) and authorize with the right Google account.
- **Company Google Workspace**: an admin may need to approve the app named **Grok** first. Switching browsers or relinking will not get around it.
- **Marketplace disabled by your team admin**: it shows Disabled by team admin.
- **Access revoked on the Google side**: remove the plugin and add it again.

## Related questions

### Can Grok Bot connect to more than one Gmail account?

One Gmail plugin connects one mailbox at a time. The Help Center notes some plugins can connect a second account; check the plugin detail page.

### Will Grok Bot send emails on its own?

If the plugin has send permission, it may send when a task calls for it. Turn off send, reply and forward in the plugin toggles and keep it to drafts.

### What if Gmail says an admin must approve the app?

Your Google Workspace admin has to approve the app named Grok first. Switching browsers or relinking will not bypass it.

## Read next

- [Grok Bot × Gmail: triage your inbox daily](/en/recipes/gmail-inbox-triage/)
- [Approvals, security and privacy](/en/advanced/approvals-and-security/)
- [Grok Bot not working?](/en/answers/grok-bot-not-working/)
