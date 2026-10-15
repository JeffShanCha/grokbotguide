---
title: "Grok Bot not working? How to fix common problems"
description: "Sign-in stuck, cloud computer unreachable, Bot stuck, sites asking for login again, plugin auth failing, routines not running, @bot silent: fixes in the official order."
sidebar:
  order: 3
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Troubleshooting (official docs)"
    url: https://docs.x.ai/grok-bot/troubleshooting
  - title: "Use the computer and apps (official docs)"
    url: https://docs.x.ai/grok-bot/computer-and-apps
  - title: "Plans and billing (Cursor Help Center)"
    url: https://cursor.com/help/grok-bot/plans
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/grok-bot-not-working/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot not working? How to fix common problems\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Start with the least destructive step: Retry → restart the app → Recover computer → Update Bot’s Computer, and only then Reset, which can lose recent unsynced work. Most \\\"stuck\\\" Bots are waiting for your approval, a login or a CAPTCHA; open the computer view to check.\"}}, {\"@type\": \"Question\", \"name\": \"What do I do when the Grok Bot computer is unreachable?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Try Retry, restart the app, Recover computer, then Settings → Computer → Update Bot’s Computer, and Reset only as a last resort. Recover and Update keep files and logins.\"}}, {\"@type\": \"Question\", \"name\": \"Why is my Grok Bot stuck?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Usually it is waiting for an approval, login, CAPTCHA or answer from you. Open the computer view; send a redirect or \\\"Stop now\\\" if needed.\"}}, {\"@type\": \"Question\", \"name\": \"What happens when Grok Bot usage runs out?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Without on-demand usage it stops until the weekly reset; with on-demand it continues and counts toward your monthly limit.\"}}]}"
---

Start with the least destructive step: **Retry → restart the app → Recover computer → Update Bot’s Computer**, and only then Reset, which can lose recent unsynced work. Most "stuck" Bots are waiting for your approval, a login or a CAPTCHA; open the computer view to check.

## Find the category

| Symptom | Check first |
| --- | --- |
| Sign-in never completes | The browser shows a successful Cursor sign-in; use your company SSO if required |
| Legacy Privacy Mode error | Change the Cursor account data setting or ask your admin |
| Computer still setting up | First setup and updates take minutes; keep the app open |
| Computer unreachable | Follow the recovery order below |
| Bot stuck | Open the computer view for a pending question, approval, login or CAPTCHA |
| Site keeps asking to log in | Take over, sign in yourself, then tell the Bot to continue |
| Plugin will not install or authenticate | Connect apps → Your plugins, check Installed, authorize again |
| Routine did not run | See the checklist in "How do I schedule routines" |
| Usage used up | Check Usage & Billing; without on-demand it simply stops |
| @bot did not reply | Regions, videos or GIFs, or also tagging @grok all block it |

## Computer unreachable: recovery order

1. Choose **Retry** or reopen the conversation
2. Restart the Grok Bot app
3. If offered, choose **Recover computer** (the dialog says Recover Grok Bot’s Computer)
4. Otherwise go to **Settings → Computer** and choose **Update Bot’s Computer**; on mobile, Settings → Bot → Bot Computer → Reset Computer
5. Wait for the replacement computer
6. Use **Reset** only if recovery and update both fail and you accept losing recent work

Recover and Update keep files and logins; Reset restores the last snapshot. Bot profiles and conversations are usually safe.

## A Bot looks stuck

- Check its status in the sidebar and conversation
- Open the computer to see whether it is waiting on a page
- Look for a pending question, approval, login, CAPTCHA or secret request
- Send a short redirect, or "Stop now" to end the work
- A Bot runs one computer-use task on its screen at a time; a new one waits for the current one

## Approval card will not work

Read the target and arguments; if the card is no longer actionable, ask the Bot to regenerate the action. If something always needs approval, check **Settings → General → Bot → Auto-review** for a matching Ask first rule, including team rules; Ask first beats Allow automatically. Approvals from routines expire after about 10 minutes.

## Before contacting support

Collect the app version, OS version, exact error, Bot or routine name, approximate time and time zone, any request or conversation ID, and whether retry or restart changed anything. Never include passwords, codes or secrets. Support: support@x.ai, community Discord: discord.gg/x-ai.

## Related questions

### What do I do when the Grok Bot computer is unreachable?

Try Retry, restart the app, Recover computer, then Settings → Computer → Update Bot’s Computer, and Reset only as a last resort. Recover and Update keep files and logins.

### Why is my Grok Bot stuck?

Usually it is waiting for an approval, login, CAPTCHA or answer from you. Open the computer view; send a redirect or "Stop now" if needed.

### What happens when Grok Bot usage runs out?

Without on-demand usage it stops until the weekly reset; with on-demand it continues and counts toward your monthly limit.

## Read next

- [How do I schedule Grok Bot routines?](/en/answers/how-to-schedule-grok-bot-routines/)
- [Approvals, security and privacy](/en/advanced/approvals-and-security/)
- [Grok Bot × X: @bot region limits](/en/recipes/x-tag-bot/)
