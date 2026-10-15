---
title: Skills 与 Routines
description: Skill 写清楚怎么做，Routine 决定什么时候做。先手动跑通，再存成 Skill，最后才自动化。
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Skills and routines（官方文档）
    url: https://docs.x.ai/grok-bot/skills-routines-and-automations
---

**Skill 描述「怎么做」，Routine 决定「哪个 Bot、什么时候做」。** 官方推荐的顺序是：先手动完成一次任务，改到稳定，存成 Skill，最后再用 Routine 自动化。

## Skill

一个好的 Skill 写清楚六件事：

1. 什么时候用
2. 需要哪些输入和权限
3. 执行步骤
4. 怎么校验结果
5. 返回什么
6. 哪些动作需要审批

Skill 在你所有的 Bot 之间共享，但某个 Bot 要用它，可能还需要相应的连接器或登录状态。

### 三种创建方式

- **让 Bot 保存刚才的做法**：任务跑通后说「把刚才的流程保存成一个叫『每周客户健康度』的 Skill，包括数据来源、规则、输出格式和审批要求」。
- **演示教学（Teach a task）**：在一对一对话里打开电脑视图 → 选 **Teach a task** → 描述你要演示的结果 → 操作一遍 → 停止录制并检查生成的 Skill。录制最长 10 分钟，不录麦克风。这个功能在逐步开放，看不到就用上一种方式。
- **从 Connect apps 安装**：侧边栏 **Connect apps** 里可以发现并安装官方打包的连接器和 Skill。

:::caution
演示生成的 Skill 只是草稿。决策规则、失败处理和审批边界要自己补上；需要输入密码的步骤用安全接管流程，不要在录制画面里露出。
:::

### 在对话里引用

桌面端输入框里，输入 `/` 引用一个已保存的 Skill，输入 `@` 引用 Bot、群组、Routine 或连接器。私有 Skill 在 **Connect apps → Your plugins → Manage plugins and skills → Private skills**。

## Routine

### 定时 Routine

让负责的 Bot 按时间表执行一个流程，说清楚输入来源、期望输出、数据缺失时怎么办。Bot 创建前会和你确认：负责的 Bot、时间表和时区、输入来源、期望结果、审批边界、来源缺失时的处理。创建后会显示下一次运行时间。合上电脑后后台 Routine 也会照常运行。

### 事件触发 Routine

通过 Cursor 账号的集成，可以在 Slack 消息、GitHub 通知等事件发生时启动 Routine。匹配规则要**窄**：指定频道 + 指定关键词，而不是「每条新消息」——宽泛的监听会制造噪音、消耗更多用量，还容易对无关内容采取行动。

### 管理

打开 Bot → **View conversation details** → **Routines**，可以启用或暂停、**Test run**、改时间表或指令、看最近的成功和失败记录、删除。

:::danger[Test run 会真的执行]
Test run 会真实地打开网站、改文件、调用连接器。用安全的输入测试，写操作保持在审批之后。
:::

长时间无人值守时，Grok Bot 可能会问你是否继续运行 Routine；不回复的话 Routine 可能被暂停，回来后记得检查。

## 限制

| 项目 | 限制 |
| --- | --- |
| 每个 Bot 拥有的 Routine | 最多 50 个 |
| 每个 Routine 保留的运行记录 | 最近 20 次 |
| 定时最小间隔 | 5 分钟 |
| 演示录制时长 | 最长 10 分钟 |
| 删除 Routine | 立即生效，不能撤销 |
| 删除 Bot | 同时删除它拥有的 Routine |

## 设计可靠的自动化

- 先让 Bot 准备、起草或建议，再执行。
- 发送、购买、删除、发布、改生产系统一律走审批。
- 写清楚数据缺失或过期时怎么办。
- 尽量让重试不会重复执行（幂等）。
- 规定部分完成时如何汇报。
- 网站、连接器或数据格式变了以后重新测试。

现成的例子见 [模板库](/zh/templates/)。

## 相关问题

- [Grok Bot 怎么设置定时任务（Routine）？](/zh/answers/how-to-schedule-grok-bot-routines/)
- [电脑关机后 Grok Bot 还能工作吗？](/zh/answers/does-grok-bot-work-when-laptop-is-closed/)
