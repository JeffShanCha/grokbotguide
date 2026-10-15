---
title: "Grok Bot 怎么连接 Gmail？"
description: "在 Connect apps 添加 Gmail 插件并授权即可。附权限设置、只出草稿的做法，以及授权失败、公司邮箱被拦的处理方法。"
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Connect plugins（Cursor 帮助中心）"
    url: https://cursor.com/help/grok-bot/connect-plugins
  - title: "Grok Bot Tutorial: AI Email Management（Charlie Automates）"
    url: https://charlieautomates.com/blog/grok-bot-tutorial-ai-email-management/
  - title: "Grok Bot setup guide（Wright Mode）"
    url: https://www.wrightmode.com/blog/grok-bot-setup-guide
  - title: "Approvals, security, and privacy（官方文档）"
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/how-to-connect-grok-bot-to-gmail/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot 怎么连接 Gmail？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"在 Grok Bot 侧边栏打开 Connect apps，搜索并添加 Gmail 插件，按提示在浏览器里授权你的 Google 账号，看到它出现在 Installed 里就连好了。一个 Gmail 插件一次只连一个邮箱。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 能同时连多个 Gmail 邮箱吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"一个 Gmail 插件一次只连一个邮箱；官方帮助中心提到有的插件可以连接第二个账号，具体以插件详情页为准。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 会不会自己发邮件？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"如果插件开着发送权限，它在任务需要时可能会发。建议在插件工具开关里关掉发送、回复、转发，只出草稿。\"}}, {\"@type\": \"Question\", \"name\": \"连接 Gmail 时提示需要管理员批准怎么办？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"公司 Google Workspace 的管理员需要先批准名为 Grok 的应用，换浏览器或重新授权都无法绕过。\"}}]}"
---

在 Grok Bot 侧边栏打开 **Connect apps**，搜索并添加 **Gmail** 插件，按提示在浏览器里授权你的 Google 账号，看到它出现在 **Installed** 里就连好了。一个 Gmail 插件一次只连一个邮箱。

## 连接步骤

1. 打开侧边栏的 **Connect apps**（手机上点头像 → Connect apps），也可以点对话里弹出的 **Connect** 卡片。
2. 搜索 Gmail，选择添加。
3. 出现 **Authorize** 或 **Authenticate** 时，在浏览器里登录并授权。
4. 回到 Grok Bot，确认 Gmail 出现在 **Installed** 里。显示 **Needs auth** 或 **Disconnected** 表示「已安装但还没登录」，要再授权一次。

## 连好之后能做什么

官方帮助中心写明：搜索和阅读邮件、起草和发送、给邮件打标签。插件只能做你这个 Google 账号本来能做的事，不能改共享设置或提升权限。

## 建议的权限设置

- 在插件的工具开关里先关掉 **发送、回复、转发**，只保留读取、草稿和打标签（Wright Mode 作者的做法）。比在指令里写「不要发送」更可靠。
- 头一周只让它出草稿，你自己发。Bot 准备好的邮件会以卡片出现，可以选 **Send email** 或 **Discard**。
- 删除、退订、点击邮件里的链接，在 Auto Review 里设成 **Ask first**。

## 连不上怎么办

- **授权没完成**：点 **Reconnect**（对话卡片上是 **Reopen**），用正确的 Google 账号重新授权。
- **公司 Google Workspace**：管理员可能要先批准名为 **Grok** 的应用。换浏览器或重新授权都绕不过去，只能找管理员。
- **团队管理员禁用了插件市场**：会显示 Disabled by team admin。
- **在 Google 那边撤销过授权**：先删掉插件再重新添加。

## 常见追问

### Grok Bot 能同时连多个 Gmail 邮箱吗？

一个 Gmail 插件一次只连一个邮箱；官方帮助中心提到有的插件可以连接第二个账号，具体以插件详情页为准。

### Grok Bot 会不会自己发邮件？

如果插件开着发送权限，它在任务需要时可能会发。建议在插件工具开关里关掉发送、回复、转发，只出草稿。

### 连接 Gmail 时提示需要管理员批准怎么办？

公司 Google Workspace 的管理员需要先批准名为 Grok 的应用，换浏览器或重新授权都无法绕过。

## 相关阅读

- [Grok Bot × Gmail：每天自动整理收件箱](/zh/recipes/gmail-inbox-triage/)
- [审批、安全与隐私](/zh/advanced/approvals-and-security/)
- [Grok Bot 用不了怎么办？](/zh/answers/grok-bot-not-working/)
