---
title: 'Grok Bot × documents: a zero-risk first task'
description: 'No connectors and no sign-ins. The best way to try Grok Bot for the first time.'
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
role: assistant
difficulty: beginner
apps: [File upload]
sources:
  - title: Get started (official docs)
    url: https://docs.x.ai/grok-bot/get-started
---

**This is the first test the official docs recommend: attach a document, ask for a summary in a specific format, and tell the Bot not to modify the file.** It needs no connectors or sign-ins and takes no external action.

## You need

- A PDF or Word document, such as meeting notes, a contract or a product spec.
- Any Bot you have created (see [Create your first Bot](/en/start/first-bot/)).

## Steps

1. Attach the document in the Bot's conversation.
2. Send this prompt:

```text
Summarize this document in five bullets.
Put dates, decisions and open questions in a separate section.
Cite the page or section for each point.
Do not modify the source file.
```

3. Check the result: exactly five bullets? Do the citations match? Is the source file unchanged?

## Try next

- Add "Use this format for every summary from now on" and see whether the Bot keeps the preference.
- Ask the Bot to "save this summary process as a skill", then type `/` in a new conversation to call it.

:::tip[Add your results]
What kind of document did you try? Use "Edit page" at the bottom to add your test notes. Once tested, this page can move from "From official docs" to "Community tested".
:::
