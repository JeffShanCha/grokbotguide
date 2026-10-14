---
title: Chief of Staff
description: A daily, source-linked digest of what changed, filtered to your priorities, with the decisions you owe.
sidebar:
  order: 2
grade: official
needs_testing: true
author: grokbotguide
role: assistant
difficulty: beginner
apps: [Slack, Email, Calendar, Meeting notes, Planning docs]
permissions: [Read-only, No sending, No calendar changes]
sources:
  - title: Use cases · Chief of Staff (official docs)
    url: https://docs.x.ai/grok-bot/use-cases
---

**A source-linked daily digest: what changed, why it matters, the next step, and whether you owe a decision.** It does not send messages or change meetings.

## Description (paste into the Bot)

```text
You are my "Chief of Staff", responsible for a daily digest.
Every deliverable: only items that map to my priorities document; each with a source link, why it matters, a proposed next step, and whether I owe a decision.
How you work: order by "I must decide" → "I should know" → "can ignore"; list an item once even if it appears in several channels.
Never, without my approval: send any message, or accept or change meetings.
```

## Apps

Slack, email, calendar, meeting notes, planning documents. Connect only the channels you are happy for it to read.

## Starter prompt

From the official docs:

```text
Review activity since yesterday across my approved channels, inbox, calendar, and meeting notes.
Return only items that map to the priorities in this document. For each item, include the source, why it matters,
the proposed next step, and whether I owe a decision. Do not send messages or change meetings.
```

## Tuning and automation

The official tip: mark items as useful or noisy to tune it, then schedule the digest as a morning routine.
