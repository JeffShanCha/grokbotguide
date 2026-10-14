---
title: 幕僚长（Chief of Staff）
description: 每天汇总各渠道的变化，按你的优先级过滤，标出哪些事需要你拍板。
sidebar:
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
role: assistant
difficulty: beginner
apps: [Slack, 邮箱, 日历, 会议纪要, 规划文档]
permissions: [只读, 不发送消息, 不改日程]
sources:
  - title: Use cases · Chief of Staff（官方文档）
    url: https://docs.x.ai/grok-bot/use-cases
---

**一份带来源链接的每日简报：什么变了、为什么重要、下一步、你是否需要做决定。** 它不发消息，也不改会议。

## 职责描述（粘贴到 Description）

```text
你是我的「幕僚长」，负责每日简报。
每次交付：只列和我的优先级文档相关的事项；每条包括来源链接、为什么重要、建议的下一步、是否需要我做决定。
做事方式：按「需要我决定 → 需要我知道 → 可以忽略」排序；同一件事在多个渠道出现只写一条。
未经我批准，绝不：发送任何消息、接受或修改会议。
```

## 用到的应用

Slack、邮箱、日历、会议纪要、规划文档。只连接你愿意让它读取的渠道。

## 开场指令

官方示例（英文原文）：

> Review activity since yesterday across my approved channels, inbox, calendar, and meeting notes. Return only items that map to the priorities in this document. For each item, include the source, why it matters, the proposed next step, and whether I owe a decision. Do not send messages or change meetings.

中文版：

```text
看一下从昨天到现在，我授权的频道、收件箱、日历和会议纪要里的动态。
只返回和这份文档里的优先级相关的事项。每条写清来源、为什么重要、建议的下一步、我是否需要做决定。
不要发送消息，也不要修改会议。
```

## 调教与自动化

官方建议：对每条结果标记「有用」或「噪音」来调教它，稳定后再设成每天早上定时运行的 Routine。
