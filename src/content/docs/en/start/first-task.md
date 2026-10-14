---
title: Give it a first task
description: 'Write tasks with five parts: outcome, sources, constraints, deliverable, review point. Start with a task that needs no sign-ins.'
sidebar:
  order: 5
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Get started (official docs)
    url: https://docs.x.ai/grok-bot/get-started
  - title: Approvals, security, and privacy (official docs)
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
---

**A strong request has five parts: the outcome, the sources, the constraints, the deliverable and the review point.**

## The five parts

| Part | Ask yourself | Example |
| --- | --- | --- |
| Outcome | What does done look like? | A list of every unanswered customer email this week |
| Sources | Which apps, sites or files? | Gmail inbox, the customer list in the CRM |
| Constraints | What must it avoid or ask about first? | Do not reply to anyone; do not edit the CRM |
| Deliverable | What format comes back? | A table: customer, subject, due date, suggested reply |
| Review point | When should it stop for you? | Show me the drafts before anything else |

A ready-made prompt is in [Templates: five-part request](/en/templates/five-part-request/).

## Start with a zero-risk test

No connectors, no sign-ins: attach a document and ask for a summary.

```text
Summarize this document in five bullets.
Put dates, decisions and open questions in a separate section.
Cite the page or section for each point.
Do not modify the source file.
```

## Ways to give input

- Type in the composer.
- Dictate: "Start voice input" or `Cmd/Ctrl+D` on desktop; "Start dictation" on mobile.
- "Start voice chat" for a live conversation.

## When an app needs a sign-in

If the Bot reaches a site that needs authentication, it asks you to take over the computer. Choose **Take over**, enter your credentials or solve the CAPTCHA yourself, then choose **I'm done**.

:::danger[Never paste passwords into chat]
Enter passwords, SMS codes and two-factor codes yourself through Take over. Do not send them in the conversation.
:::

Browser sessions persist on the shared computer, so your other Bots can use them when appropriate. For supported services, install a plugin from **Connect apps** in the sidebar and authorize it in your browser.

## Iterate

If the result is off, ask the Bot to revise it and state lasting preferences ("always use a table"). Once a process is stable, ask the Bot to [save it as a skill or create a routine](/en/advanced/skills-and-routines/).
