---
title: Skills and routines
description: A skill says how to do it; a routine says when. Run it by hand first, save it as a skill, then automate.
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Skills and routines (official docs)
    url: https://docs.x.ai/grok-bot/skills-routines-and-automations
---

**A skill describes how to do a task. A routine decides which Bot runs it and when.** The recommended order: complete the task once by hand, refine it until it is reliable, save it as a skill, and only then automate it with a routine.

## Skills

A good skill covers six things:

1. When to use it
2. Required inputs and access
3. The sequence of work
4. How to validate results
5. What to return
6. What requires approval

Skills are shared across all your Bots, but a Bot may still need the relevant connector or sign-in to use one.

### Three ways to create a skill

- **Ask the Bot to save what it just did**: "Save the process you just used as a skill called 'Weekly account health', including the source systems, rules, output format and approval requirements."
- **Teach a task by demonstration**: in a one-to-one conversation, open the computer view → **Teach a task** → describe the result → perform the workflow once → stop and review the generated skill. Recordings last up to ten minutes and do not capture microphone audio. The feature is rolling out gradually; if you do not see it, use the first method.
- **Install from Connect apps**: the **Connect apps** sidebar lists supported connectors and packaged skills.

:::caution
A skill learned from a demonstration is only a draft. Add decision rules, failure handling and approval boundaries yourself, and use the secure handoff for credentials rather than showing them on screen.
:::

### Referencing in chat

In the desktop composer, type `/` to reference a saved skill and `@` to reference Bots, groups, routines or connectors. Private skills live under **Connect apps → Your plugins → Manage plugins and skills → Private skills**.

## Routines

### Scheduled routines

Ask the owning Bot to run a workflow on a timetable, and specify the input source, expected output and what to do if data is missing. Before creating it, the Bot confirms the owning Bot, schedule and time zone, input source, expected result, approval boundary and missing-source behavior, then shows the next run. Background routines keep running while your computer is closed.

### Event-triggered routines

Cursor account integrations can start a routine from events such as Slack messages or GitHub notifications. Keep matching rules **narrow** (a specific channel plus a specific phrase) rather than "every new message"; broad listeners create noise, use more usage and risk acting on irrelevant input.

### Managing routines

Open the Bot → **View conversation details** → **Routines** to enable or pause, run a **Test run**, edit the schedule or instructions, review recent success and failure history, or delete.

:::danger[A test run does real work]
A test run really navigates websites, changes files and calls connected tools. Use safe inputs and keep write actions behind approval.
:::

After a long absence Grok Bot may ask whether to keep routines running. If you do not answer, routines may be paused, so check them when you return.

## Limits

| Item | Limit |
| --- | --- |
| Routines per Bot | Up to 50 |
| Run records kept per routine | The 20 most recent |
| Minimum schedule interval | 5 minutes |
| Teaching recording length | Up to 10 minutes |
| Deleting a routine | Immediate, cannot be undone |
| Deleting a Bot | Also deletes the routines it owns |

## Designing for trust

- Have the Bot prepare, draft or recommend before it executes.
- Require approval for sending, purchasing, deleting, publishing or changing production systems.
- Define what happens when data is missing or stale.
- Make retries idempotent where possible.
- Specify how partial completions are reported.
- Re-test after websites, connectors or source formats change.

See ready-made examples in [Templates](/en/templates/).
