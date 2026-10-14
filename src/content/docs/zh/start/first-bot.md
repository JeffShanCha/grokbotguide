---
title: 创建第一个 Bot
description: 一个 Bot 只负责一件事：起名字、写职责、写清楚绝对不能做的事。
sidebar:
  order: 4
grade: official
needs_testing: true
author: grokbotguide
sources:
  - title: Get started（官方文档）
    url: https://docs.x.ai/grok-bot/get-started
  - title: Create and manage Bots（官方文档）
    url: https://docs.x.ai/grok-bot/bots
---

**好 Bot 的标准：一个名字、一项主要职责、一句「绝不能做什么」。** 官方明确建议：多个专注的 Bot 比一个万能 Bot 效果好。

## 创建

- 首次引导结束时，在「Meet a future teammate」里选一个推荐角色，或选「Create your own」。
- 之后随时可以点侧边栏的 **New**（快捷键 `Cmd/Ctrl+N`）→ **Create new Bot**，再通过 Bot 菜单的 **Edit Profile** 改名字、标签、描述和头像。

## 写描述（Description）

描述里放**长期有效的规则**，对话里放**这一次的任务**。描述建议包含三件事：

1. **负责什么**：它拥有哪一类工作的结果。
2. **产出什么**：交付物的格式。
3. **未经审批绝不做什么**：比如「未经我批准，不对外发送任何消息」。

官方示例：一个叫 Piper 的 Bot 负责产品性能。它用可观测性工具排查问题，保留链接和截图，把证据和猜测分开写，先给最重要的问题的简短总结，并且**从不修改生产环境设置**。

可以直接套用的中文描述模板：

```text
你是「<名字>」，负责 <一类工作>。
每次交付：<格式，例如 5 条要点 + 来源链接>。
做事方式：<偏好，例如先列证据再给结论，事实和推测分开写>。
未经我批准，绝不：<发送消息 / 修改数据 / 付款 / 改生产环境>。
信息不全或来源打不开时：停下来告诉我，不要用旧数据凑。
```

## 起名

用岗位命名，比如 Talent Scout、Expense Manager、Bug Reproduction。「General Helper」这种泛泛的名字会让 Bot 得到的指导更少，积累的上下文也更难复用。

## 什么时候该再建一个 Bot

当一项工作有**自己的目标、工具和数据源、做事风格、审批边界或固定周期**时，就单独建一个 Bot。

下一步：[给它派第一个任务](/zh/start/first-task/)。
