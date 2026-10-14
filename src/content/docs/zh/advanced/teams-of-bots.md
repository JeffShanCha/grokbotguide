---
title: 多 Bot 协作
description: 什么时候该拆成多个 Bot、如何交接、共享电脑意味着什么。
sidebar:
  order: 3
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Create and manage Bots（官方文档）
    url: https://docs.x.ai/grok-bot/bots
  - title: Grok Bot FAQ（官方文档）
    url: https://docs.x.ai/grok-bot/faq
  - title: Use cases（官方文档）
    url: https://docs.x.ai/grok-bot/use-cases
---

**从最小的团队开始：一个 Bot 负责一个端到端的结果，只有角色稳定后才增加专职 Bot。**

## 基本事实

- 多个 Bot 可以**并行**工作，每个 Bot 在共享电脑上有自己的屏幕；但一个 Bot 同一时间只能在它的屏幕上做一个电脑操作任务。
- Bot 之间的**对话是分开的**，但共享文件、浏览器会话、群聊消息和任务交接会在它们之间传递上下文。
- 所有 Bot 共用一台电脑，所以拆成多个 Bot 是为了**分工**，不是为了**隔离权限**。

## 什么时候拆

当一项工作有自己的目标、工具与数据源、做事风格、审批边界或固定周期时，单独建一个 Bot。

## 怎么协作

- 需要看到交接过程时，用**群聊**把相关 Bot 拉在一起。
- 对外动作（发消息、改数据）保持清晰的审批边界，不要因为是「Bot 交给 Bot」就放松。
- 官方用例里的「Chief of Staff」是一种常见的统筹角色：汇总各渠道变化、按你的优先级过滤、列出需要你决定的事。见 [角色库：幕僚长](/zh/bots/chief-of-staff/)。

## 管理大量 Bot

| 操作 | 效果 |
| --- | --- |
| Pin | 把常用 Bot 固定在侧边栏顶部 |
| Hide from sidebar | 从主列表隐藏，**不会**暂停它和它的 Routine |
| Duplicate | 复制资料、设置、已启用的 Skill、Routine 和头像；不复制对话、记忆和附件 |
| Delete | 删除资料、对话和 Routine；共享电脑上的文件和登录可能还在 |

如果以后可能还要用到它的工作成果，选隐藏而不是删除。

## 关于记忆

Bot 会保留稳定的偏好、重要事实和工作摘要，但**记忆不是权威数据源**。经常变化的事实放在源系统里；重要决策前让 Bot 重新打开最新数据；发现过时的假设直接纠正；安全边界写在描述里。
