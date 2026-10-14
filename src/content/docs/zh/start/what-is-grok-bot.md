---
title: Grok Bot 是什么
description: 5 分钟了解 Grok Bot：常驻云端的 AI 同事，有自己的电脑，能登录你的应用把活干完。
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Introducing Grok Bot（xAI）
    url: https://x.ai/news/introducing-grok-bot
  - title: Grok Bot Overview（官方文档）
    url: https://docs.x.ai/grok-bot/overview
  - title: Grok Bot FAQ（官方文档）
    url: https://docs.x.ai/grok-bot/faq
---

**Grok Bot 是 xAI 推出的「AI 同事」产品**：每个 Bot 有名字、职责和长期记忆，在一台属于你的云端电脑上工作，可以登录网站和应用，把一件事从头做到尾，只在需要你审批时回来找你。它于 2026 年 8 月 11 日以 beta 形式发布。

## 和普通 AI 助手有什么不同

| | 普通 AI 聊天助手 | Grok Bot |
| --- | --- | --- |
| 能做什么 | 回答问题、写内容 | 操作网站和应用，把任务做完 |
| 在哪里运行 | 你打开对话时才工作 | 云端电脑，合上电脑后继续运行 |
| 记忆 | 以对话为主 | 每个 Bot 记住自己的职责、偏好和过往工作摘要 |
| 自动化 | 基本没有 | Skills（做法）+ Routines（定时或事件触发） |
| 协作 | 单个助手 | 多个 Bot 并行工作、互相交接 |

## 核心概念

- **Bot**：一个有明确职责的 AI 同事，比如「销售外呼」「费用管理」「Bug 复现」。官方建议每个 Bot 只负责一件事，而不是一个万能助手。
- **云端电脑**：你的所有 Bot 共用一台持久的云端电脑，带浏览器、文件系统和终端。注意：文件、浏览器登录状态对你所有的 Bot 都可见，不同 Bot 之间**不是**安全隔离。
- **Connectors 与 Computer use**：有官方连接器的应用优先用连接器（更稳）；没有的，Bot 会像人一样操作网页。
- **Skills**：可复用的做事方法，写清楚输入、步骤、校验方式、输出和哪些动作需要审批。
- **Routines**：让某个 Bot 按时间表或在某个事件发生后自动执行一个流程。
- **审批**：发消息、发布、付款、删除、改生产环境等敏感动作可以设成必须你点「允许」。

## 在哪里用

桌面端支持 macOS、Windows、Linux，移动端支持 iPhone / iPad 和 Android（官方 FAQ）。对话和 Bot 在登录的设备之间同步。

## 下一步

1. [选择订阅](/zh/start/plans/)
2. [安装与登录](/zh/start/install/)
3. [创建第一个 Bot](/zh/start/first-bot/)
