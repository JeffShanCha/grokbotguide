---
title: Teams of Bots
description: When to split work across Bots, how handoffs work, and what the shared computer means.
sidebar:
  order: 3
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Create and manage Bots (official docs)
    url: https://docs.x.ai/grok-bot/bots
  - title: Grok Bot FAQ (official docs)
    url: https://docs.x.ai/grok-bot/faq
  - title: Use cases (official docs)
    url: https://docs.x.ai/grok-bot/use-cases
---

**Start with the smallest useful roster: one Bot owns one end-to-end outcome. Add specialists only once a role is stable.**

## The basics

- Bots can work **in parallel**, each on its own screen of the shared computer, but one Bot runs only one computer-use task at a time.
- **Conversations are separate** per Bot, but shared files, browser sessions, group messages and handoffs pass context between them.
- All Bots share one computer, so splitting work across Bots is about **division of labor**, not **isolating access**.

## When to split

Create a separate Bot when the work has its own goal, tools and sources, working style, approval boundary or recurring schedule.

## How to collaborate

- Use a **group chat** when you want handoffs to be visible.
- Keep external actions (sending, changing data) behind a clear approval boundary, even when one Bot hands off to another.
- The official Chief of Staff use case is a common coordinator role: it digests changes across channels, filters them to your priorities and flags decisions you owe. See [Bot library: Chief of Staff](/en/bots/chief-of-staff/).

## Managing many Bots

| Action | Effect |
| --- | --- |
| Pin | Keeps an active Bot at the top of the sidebar |
| Hide from sidebar | Removes it from the main list; does **not** pause it or its routines |
| Duplicate | Copies profile, settings, enabled skills, routines and avatar; not history, memory or attachments |
| Delete | Removes profile, conversation and routines; shared-computer files and sign-ins may remain |

If you might need a Bot's work later, hide it instead of deleting it.

## About memory

A Bot keeps stable preferences, important facts and work summaries, but **memory is not an authoritative source**. Keep changing facts in the source system, ask the Bot to reopen current data before important decisions, correct outdated assumptions directly, and write safety boundaries into the description.
