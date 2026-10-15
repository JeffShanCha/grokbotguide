---
title: "Grok Bot 怎么连接 Slack？"
description: "个人使用：添加 Slack 插件，Bot 以你的身份发言。团队使用：发布 Team Bot 并接入 Slack，Bot 有自己的应用身份。两种方式的步骤和区别。"
sidebar:
  order: 6
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Connect plugins（Cursor 帮助中心）"
    url: https://cursor.com/help/grok-bot/connect-plugins
  - title: "Team Bots（官方文档）"
    url: https://docs.x.ai/grok-bot/team-bots
  - title: "Message and collaborate（官方文档）"
    url: https://docs.x.ai/grok-bot/chat-and-collaboration
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/how-to-connect-grok-bot-to-slack/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot 怎么连接 Slack？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"有两种方式：个人用，在 Connect apps 添加 Slack 插件并授权，Bot 以你本人的身份读和发消息；团队用，把 Bot 发布成 Team Bot，再选 Bring to your team’s Slack，它会在 Slack 里有自己的应用身份，同事可以私信或 @ 它。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 在 Slack 里以谁的身份发消息？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"个人 Slack 插件以你本人的身份发言；Team Bot 接入 Slack 后，以 Bot 自己的 Slack 应用身份发言。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 会回复 Slack 频道里的所有消息吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Team Bot 在频道里只在被 @ 时回答，私信则每条都回。\"}}]}"
---

有两种方式：**个人用**，在 Connect apps 添加 Slack 插件并授权，Bot 以你本人的身份读和发消息；**团队用**，把 Bot 发布成 Team Bot，再选 **Bring to your team’s Slack**，它会在 Slack 里有自己的应用身份，同事可以私信或 @ 它。

## 两种方式对比

| | Slack 插件（个人） | Team Bot 接入 Slack（团队） |
| --- | --- | --- |
| 发言身份 | 你本人 | Bot 自己的 Slack 应用 |
| 谁能用 | 只有你 | 团队成员私信或在频道 @ 它 |
| 能发到哪 | 你能发言的频道 | 被邀请进去的频道 |
| 适合 | 站会摘要、私人简报 | 团队问答、需求分拣 |

## 个人：添加 Slack 插件

1. 侧边栏 **Connect apps** → 搜索 Slack → 添加
2. 在浏览器里授权你的 Slack 工作区（OAuth 登录）
3. 确认它出现在 **Installed** 里
4. 要用另一个工作区，再连接一次

Bot 准备好的 Slack 消息会以卡片出现，可选 **Send message** 或 **Discard**。注意群聊里不会出现 Slack 草稿。

## 团队：Team Bot 接入 Slack

1. 发布 Team Bot 后，在 Bot 详情里选 **Bring to your team’s Slack**
2. 选 **Connect Slack workspace**，在 Slack 里批准
3. 选一个你能安装应用的工作区，点 **Connect**
4. 用 `/invite @Bot名字` 拉进频道
5. 同事在 **Settings → General → Team Bots** 里关联一次自己的 Slack 账号

工作区需要管理员审批时会显示 Awaiting admin approval，用 **Send request in Slack** 发起申请。频道里只有 @ 它才会回答。

## 常见追问

### Grok Bot 在 Slack 里以谁的身份发消息？

个人 Slack 插件以你本人的身份发言；Team Bot 接入 Slack 后，以 Bot 自己的 Slack 应用身份发言。

### Grok Bot 会回复 Slack 频道里的所有消息吗？

Team Bot 在频道里只在被 @ 时回答，私信则每条都回。

## 相关阅读

- [Grok Bot × Slack：每日站会摘要](/zh/recipes/slack-daily-standup/)
- [Grok Bot × Slack 团队版](/zh/recipes/slack-team-bot/)
- [Grok Bot 怎么连接 Gmail？](/zh/answers/how-to-connect-grok-bot-to-gmail/)
