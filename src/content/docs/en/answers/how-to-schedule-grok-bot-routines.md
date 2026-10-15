---
title: "How do I schedule Grok Bot routines?"
description: "Ask the owning Bot to run a workflow on a timetable. Covers time zone settings, the five-minute minimum, Test run, event triggers, and a checklist for routines that did not run."
sidebar:
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Skills and routines (official docs)"
    url: https://docs.x.ai/grok-bot/skills-routines-and-automations
  - title: "Settings and notifications (official docs)"
    url: https://docs.x.ai/grok-bot/settings-and-notifications
  - title: "Troubleshooting (official docs)"
    url: https://docs.x.ai/grok-bot/troubleshooting
  - title: "A deep dive into Grok Bot (Flavio Copes)"
    url: https://flaviocopes.com/grok-bot/
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/how-to-schedule-grok-bot-routines/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"How do I schedule Grok Bot routines?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"In the conversation with the Bot that owns the job, say when it should run, what it should do, what to deliver and what to do if data is missing. The Bot repeats the settings for you to confirm, creates the routine and shows the next run. Set the time zone under Settings → General → Bot → Timezone.\"}}, {\"@type\": \"Question\", \"name\": \"How often can a Grok Bot routine run?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Routine schedules must be at least five minutes apart.\"}}, {\"@type\": \"Question\", \"name\": \"Do routines run when my laptop is closed?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes. Routines run on Grok Bot’s cloud computer, so closing your laptop or the app does not stop them.\"}}, {\"@type\": \"Question\", \"name\": \"Which time zone do routines use?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The Timezone set under Settings → General → Bot.\"}}]}"
---

In the conversation with the Bot that owns the job, say when it should run, what it should do, what to deliver and what to do if data is missing. The Bot repeats the settings for you to confirm, creates the routine and shows the next run. Set the time zone under **Settings → General → Bot → Timezone**.

## Recommended order

The official advice: do the task once by hand, refine it, save it as a skill, and only then automate it with a routine. Scheduling an untested workflow makes failures hard to debug.

## Six things to state

The Bot confirms these before creating the routine, so give them up front:

1. The owning Bot
2. The schedule and time zone
3. The input source
4. The expected result
5. The approval boundary
6. What to do when a source is missing

For example: "Every weekday at 8:00 (America/New_York), run the Daily customer-risk skill on the current account list and post a linked watch list here. Do not contact customers. If a source is unavailable, report a failure instead of using old data."

## Managing routines

Open the Bot → **View conversation details** → **Routines** to enable or pause, run a **Test run**, edit the schedule or instruction, review recent runs, or delete. **A Test run does real work**, so use safe inputs. On mobile you can view history, pause and resume, but not edit schedules or test.

## Limits

| Item | Limit |
| --- | --- |
| Routines per Bot | Up to 50 |
| Run history kept | 20 most recent per routine |
| Minimum interval | 5 minutes |
| Deleting | Immediate and permanent; deleting a Bot deletes its routines |

## Event triggers

Besides schedules, Cursor account integrations can start a routine from events such as Slack messages or GitHub notifications. Keep matching rules narrow, such as one channel plus one phrase, rather than every new message.

## Routine did not run?

Check the official list:

- The routine is enabled
- The schedule and time zone are correct
- The owning Bot still exists
- Required plugins are still authenticated
- The computer can reach the source system
- Usage or account access has not been paused

After a long absence Grok Bot may ask whether to keep routines running; if you do not answer, they may be paused.

## Do not schedule too often

Every run uses usage even when nothing changed. Flavio Copes points out that every 15 minutes is 96 runs a day.

## Related questions

### How often can a Grok Bot routine run?

Routine schedules must be at least five minutes apart.

### Do routines run when my laptop is closed?

Yes. Routines run on Grok Bot’s cloud computer, so closing your laptop or the app does not stop them.

### Which time zone do routines use?

The Timezone set under Settings → General → Bot.

## Read next

- [Skills and routines in depth](/en/advanced/skills-and-routines/)
- [Template: daily customer-risk routine](/en/templates/daily-customer-risk/)
- [Does Grok Bot work when my laptop is closed?](/en/answers/does-grok-bot-work-when-laptop-is-closed/)
