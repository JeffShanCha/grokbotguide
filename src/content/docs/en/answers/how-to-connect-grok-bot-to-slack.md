---
title: "How do I connect Grok Bot to Slack?"
description: "Personal use: add the Slack plugin and the Bot posts as you. Team use: publish a Team Bot to Slack and it gets its own app identity. Steps and differences for both."
sidebar:
  order: 6
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Connect plugins (Cursor Help Center)"
    url: https://cursor.com/help/grok-bot/connect-plugins
  - title: "Team Bots (official docs)"
    url: https://docs.x.ai/grok-bot/team-bots
  - title: "Message and collaborate (official docs)"
    url: https://docs.x.ai/grok-bot/chat-and-collaboration
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"en\", \"url\": \"https://grokbotguide.ai/en/answers/how-to-connect-grok-bot-to-slack/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"How do I connect Grok Bot to Slack?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"There are two ways. For yourself, add the Slack plugin from Connect apps and authorize it; the Bot reads and posts as you. For a team, publish the Bot as a Team Bot and choose Bring to your team’s Slack; it gets its own Slack app, and teammates can DM or @mention it.\"}}, {\"@type\": \"Question\", \"name\": \"Who does Grok Bot post as in Slack?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"With the personal Slack plugin it posts as you; a Team Bot connected to Slack posts as its own Slack app.\"}}, {\"@type\": \"Question\", \"name\": \"Does Grok Bot reply to every message in a Slack channel?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A Team Bot only answers in channels when it is mentioned; in DMs it answers every message.\"}}]}"
---

There are two ways. **For yourself**, add the Slack plugin from Connect apps and authorize it; the Bot reads and posts as you. **For a team**, publish the Bot as a Team Bot and choose **Bring to your team’s Slack**; it gets its own Slack app, and teammates can DM or @mention it.

## Compare the two

| | Slack plugin (personal) | Team Bot in Slack (team) |
| --- | --- | --- |
| Posts as | You | The Bot’s own Slack app |
| Who can use it | Only you | Teammates via DM or @mention |
| Where it posts | Channels you can post in | Channels it is invited to |
| Good for | Standup summaries, personal briefs | Team Q&A, request triage |

## Personal: add the Slack plugin

1. **Connect apps** in the sidebar → search Slack → add
2. Authorize your Slack workspace in the browser (OAuth)
3. Confirm it shows under **Installed**
4. For another workspace, connect again

Slack drafts appear as a card with **Send message** or **Discard**. Slack drafts do not appear in group chats.

## Team: bring a Team Bot to Slack

1. After publishing the Team Bot, choose **Bring to your team’s Slack** in its details
2. Choose **Connect Slack workspace** and approve in Slack
3. Pick a workspace where you can install apps and choose **Connect**
4. Invite it to channels with `/invite @BotName`
5. Teammates link their Slack account once under **Settings → General → Team Bots**

If the workspace needs admin approval, setup shows Awaiting admin approval; use **Send request in Slack**. In channels it only answers when mentioned.

## Related questions

### Who does Grok Bot post as in Slack?

With the personal Slack plugin it posts as you; a Team Bot connected to Slack posts as its own Slack app.

### Does Grok Bot reply to every message in a Slack channel?

A Team Bot only answers in channels when it is mentioned; in DMs it answers every message.

## Read next

- [Complete tutorial: Slack standups: decisions, changed deadlines and message evidence](/en/recipes/slack-daily-standup/)
- [Complete tutorial: Team data questions: shared definitions before shared answers](/en/recipes/slack-team-bot/)
- [How do I connect Grok Bot to Gmail?](/en/answers/how-to-connect-grok-bot-to-gmail/)
