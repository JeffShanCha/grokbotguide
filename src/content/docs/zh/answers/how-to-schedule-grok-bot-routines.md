---
title: "Grok Bot 怎么设置定时任务（Routine）？"
description: "在对话里让负责的 Bot 按时间表运行一个流程即可。包括时区设置、最小间隔、Test run、事件触发，以及 Routine 没有运行时的排查清单。"
sidebar:
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Skills and routines（官方文档）"
    url: https://docs.x.ai/grok-bot/skills-routines-and-automations
  - title: "Settings and notifications（官方文档）"
    url: https://docs.x.ai/grok-bot/settings-and-notifications
  - title: "Troubleshooting（官方文档）"
    url: https://docs.x.ai/grok-bot/troubleshooting
  - title: "A deep dive into Grok Bot（Flavio Copes）"
    url: https://flaviocopes.com/grok-bot/
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/how-to-schedule-grok-bot-routines/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot 怎么设置定时任务（Routine）？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"直接在负责这件事的 Bot 的对话里说清楚「什么时候、做什么、交付什么、数据缺失怎么办」，Bot 会复述设置让你确认，然后创建 Routine 并显示下一次运行时间。时区在 Settings → General → Bot → Timezone 里设置。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 的定时任务最短多久运行一次？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Routine 的时间间隔至少 5 分钟。\"}}, {\"@type\": \"Question\", \"name\": \"电脑关机后 Routine 还会运行吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"会。Routine 在 Grok Bot 的云电脑上运行，合上电脑或关闭应用都不影响。\"}}, {\"@type\": \"Question\", \"name\": \"Routine 用的是哪个时区？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"使用 Settings → General → Bot 里设置的 Timezone。\"}}]}"
---

直接在负责这件事的 Bot 的对话里说清楚「什么时候、做什么、交付什么、数据缺失怎么办」，Bot 会复述设置让你确认，然后创建 Routine 并显示下一次运行时间。时区在 **Settings → General → Bot → Timezone** 里设置。

## 推荐顺序

官方建议：先手动完成一次任务，改到稳定，存成 Skill，最后再用 Routine 自动化。直接把没跑通过的流程做成定时任务，出错时很难排查。

## 创建时要说清楚的六件事

Bot 创建前会和你确认这些，最好一次说全：

1. 由哪个 Bot 负责
2. 时间表和时区
3. 输入来源
4. 期望结果
5. 审批边界（哪些动作要先问你）
6. 来源缺失时怎么办

例如：「每个工作日 8:00（Asia/Shanghai），对当前客户列表运行『每日客户风险』Skill，在本对话发一份带链接的观察清单。不要联系客户。数据源打不开就报告失败，不要用旧数据。」

## 管理 Routine

打开 Bot → **View conversation details** → **Routines**：启用或暂停、**Test run**、改时间表或指令、看最近的成功和失败记录、删除。注意 **Test run 会真实执行**，用安全的输入测试。手机上能看运行记录、暂停和恢复，但不能改时间表、不能测试。

## 限制

| 项目 | 限制 |
| --- | --- |
| 每个 Bot 的 Routine 数 | 最多 50 个 |
| 保留的运行记录 | 每个 Routine 最近 20 次 |
| 最小间隔 | 5 分钟 |
| 删除 | 立即生效，不能撤销；删除 Bot 会同时删除它的 Routine |

## 事件触发

除了定时，还可以通过 Cursor 账号的集成，在 Slack 消息、GitHub 通知等事件发生时启动 Routine。匹配规则要窄，比如「某个频道 + 某个关键词」，不要监听「每条新消息」。

## Routine 没有运行？

按官方排障清单逐项检查：

- Routine 是否启用
- 时间表和时区是否正确
- 负责的 Bot 是否还在
- 需要的插件是否仍然处于授权状态
- 云电脑能否访问数据源
- 用量或账号访问是否被暂停

另外，长时间不打开应用时，Grok Bot 可能会询问是否继续运行 Routine，不回复可能会被暂停。

## 别把频率设太高

每次运行都消耗用量，哪怕什么都没发现。Flavio Copes 算过：15 分钟一次就是每天 96 次。

## 常见追问

### Grok Bot 的定时任务最短多久运行一次？

Routine 的时间间隔至少 5 分钟。

### 电脑关机后 Routine 还会运行吗？

会。Routine 在 Grok Bot 的云电脑上运行，合上电脑或关闭应用都不影响。

### Routine 用的是哪个时区？

使用 Settings → General → Bot 里设置的 Timezone。

## 相关阅读

- [Skills 与 Routines 详解](/zh/advanced/skills-and-routines/)
- [模板：每日客户风险清单（Routine）](/zh/templates/daily-customer-risk/)
- [电脑关机后 Grok Bot 还能工作吗？](/zh/answers/does-grok-bot-work-when-laptop-is-closed/)
