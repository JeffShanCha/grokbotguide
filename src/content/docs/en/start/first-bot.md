---
title: Create your first Bot
description: One Bot, one job. Give it a name, a responsibility and a clear list of things it must never do.
sidebar:
  order: 4
grade: official
needs_testing: true
author: grokbotguide
sources:
  - title: Get started (official docs)
    url: https://docs.x.ai/grok-bot/get-started
  - title: Create and manage Bots (official docs)
    url: https://docs.x.ai/grok-bot/bots
---

**A good Bot has a name, one primary job, and one sentence about what it must never do.** The official docs are explicit: several focused Bots work better than one general-purpose Bot.

## Create it

- At the end of the first-run tour, pick a suggested teammate on "Meet a future teammate", or choose "Create your own".
- Any time later, choose **New** in the sidebar (`Cmd/Ctrl+N`) → **Create new Bot**, then use **Edit Profile** in the Bot menu to set its name, label, description and avatar.

## Write the description

The description holds **durable rules**; conversation messages hold **this task**. A description should cover three things:

1. **What it owns**: the outcome it is responsible for.
2. **What it produces**: the format of its deliverables.
3. **What it never does without approval**: for example "Never send external messages without my approval."

The official example is a Bot named Piper that owns product performance. It investigates with observability tools, keeps links and screenshots, separates evidence from hypotheses, returns a short summary with the top issue first, and **never changes production settings**.

A description template you can paste:

```text
You are "<name>", responsible for <type of work>.
Every deliverable: <format, e.g. 5 bullets + source links>.
How you work: <preferences, e.g. evidence before conclusions, facts separate from guesses>.
Never, without my approval: <send messages / change data / pay / touch production>.
If information is missing or a source will not open: stop and tell me; do not fill gaps with old data.
```

## Naming

Name Bots after jobs, such as Talent Scout, Expense Manager or Bug Reproduction. A generic name like "General Helper" gives the Bot less guidance and makes its saved context harder to reuse.

## When to add another Bot

Create a separate Bot when the work has **its own goal, tools and sources, working style, approval boundary, or recurring schedule**.

Next: [give it its first task](/en/start/first-task/).
