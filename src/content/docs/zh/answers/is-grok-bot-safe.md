---
title: "给 Grok Bot 账号权限安全吗？"
description: "Grok Bot 的安全边界：审批卡片、Auto Review、密码用 Take over、所有 Bot 共用一台电脑、分享 Bot 的风险，以及官方推荐的最小权限做法。"
sidebar:
  order: 8
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Approvals, security, and privacy（官方文档）"
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
  - title: "Use the computer and apps（官方文档）"
    url: https://docs.x.ai/grok-bot/computer-and-apps
  - title: "Grok Bot FAQ（官方文档）"
    url: https://docs.x.ai/grok-bot/faq
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/is-grok-bot-safe/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"给 Grok Bot 账号权限安全吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"可以安全使用，但要自己设好边界。三条底线：敏感动作走审批（发送、发布、付款、删除、改生产环境）；密码和验证码只用 Take over 自己输入，不要发在聊天里；记住你所有的 Bot 共用一台云电脑，分成多个 Bot 不是安全隔离。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 不同的 Bot 之间是隔离的吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"不是。你所有的 Bot 共用一台云电脑，文件、浏览器登录和命令行凭据彼此可见，分成多个 Bot 不是安全边界。\"}}, {\"@type\": \"Question\", \"name\": \"可以把密码发给 Grok Bot 吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"不要。密码、验证码、两步验证都应该通过 Take over 自己输入；支持的连接可以用安全密钥请求，内容不会进入对话。\"}}]}"
---

可以安全使用，但要自己设好边界。三条底线：**敏感动作走审批**（发送、发布、付款、删除、改生产环境）；**密码和验证码只用 Take over 自己输入**，不要发在聊天里；记住**你所有的 Bot 共用一台云电脑**，分成多个 Bot 不是安全隔离。

## 官方推荐的做法

- 每个流程只连接它需要的工具；支持的话用权限受限的服务账号
- 从只读任务和草稿开始
- 发送、发布、购买、删除、改生产环境始终放在审批之后
- 定期检查连接器和运行中的 Routine；源系统变了先暂停
- 重要决策保留来源链接和操作记录

## 最容易忽略的风险

- **共享电脑**：文件、浏览器登录、命令行凭据对你所有的 Bot 都可见。一个 Bot 能登录的网站，其他 Bot 也能用。
- **Auto Review 是模型判断**：它是最小权限和显式审批的补充，不是替代；规则要写得窄。
- **审批不会撤销已完成的工作**：看不懂目标或后果的审批不要点。
- **公开分享 Bot**：会公开它的描述、Skill 和 Routine。描述里不要写 API Key、内部网址、客户数据。

## 数据与隐私

Grok Bot 使用 Cursor 的账号和数据设置，必须开启云端数据存储（不支持 Legacy Privacy Mode）；是否用于训练按你的 Cursor 设置。删除 Bot 不会删除共享电脑上的文件和登录状态。

## 常见追问

### Grok Bot 不同的 Bot 之间是隔离的吗？

不是。你所有的 Bot 共用一台云电脑，文件、浏览器登录和命令行凭据彼此可见，分成多个 Bot 不是安全边界。

### 可以把密码发给 Grok Bot 吗？

不要。密码、验证码、两步验证都应该通过 Take over 自己输入；支持的连接可以用安全密钥请求，内容不会进入对话。

## 相关阅读

- [审批、安全与隐私（完整版）](/zh/advanced/approvals-and-security/)
- [Grok Bot 怎么连接 Gmail？](/zh/answers/how-to-connect-grok-bot-to-gmail/)
- [多 Bot 协作](/zh/advanced/teams-of-bots/)
