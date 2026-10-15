---
title: "Grok Bot 订阅怎么选：X 订阅、SuperGrok 还是 Cursor？"
description: "Grok Bot 没有单独售卖，可以通过 X 订阅、SuperGrok 或 Cursor 付费套餐获得。对比各渠道的档位对应关系、用量规则和关联前必须知道的事。"
sidebar:
  order: 5
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Plans and billing（Cursor 帮助中心）"
    url: https://cursor.com/help/grok-bot/plans
  - title: "Grok Bot FAQ（官方文档）"
    url: https://docs.x.ai/grok-bot/faq
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/grok-bot-vs-cursor-plans/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot 订阅怎么选：X 订阅、SuperGrok 还是 Cursor？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Grok Bot 不单独卖。目前有三条路：X 订阅（Premium、Super、Ultra 包含，Plus 和免费版不含）、关联 SuperGrok（SuperGrok、Plus、Heavy；Lite 不含）、Cursor 付费套餐（Pro、Pro+、Ultra 和 Teams，官方现在称为旧版套餐）。同时有多个时不叠加，按每周用量更多的那个算。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 需要单独购买吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"不需要单独购买。X 订阅 Premium、Super、Ultra，SuperGrok、SuperGrok Plus、SuperGrok Heavy，以及 Cursor 付费套餐都包含 Grok Bot。\"}}, {\"@type\": \"Question\", \"name\": \"同时有 Cursor 和 SuperGrok，用量会叠加吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"不会叠加，Grok Bot 使用两者中每周用量更多的那个。\"}}, {\"@type\": \"Question\", \"name\": \"SuperGrok 关联到 Cursor 账号后可以解绑吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"不可以。关联是永久的，也不能转移到另一个 Cursor 账号。\"}}]}"
---

Grok Bot 不单独卖。目前有三条路：**X 订阅**（Premium、Super、Ultra 包含，Plus 和免费版不含）、**关联 SuperGrok**（SuperGrok、Plus、Heavy；Lite 不含）、**Cursor 付费套餐**（Pro、Pro+、Ultra 和 Teams，官方现在称为旧版套餐）。同时有多个时不叠加，按每周用量更多的那个算。

## 档位对应关系

官方帮助中心给出的对应关系：

| 档位 | Cursor 套餐 | 关联订阅 |
| --- | --- | --- |
| 基础档 | Pro | SuperGrok 或 X Premium+ |
| 中档 | Pro+ | SuperGrok Plus |
| 高档 | Ultra | SuperGrok Heavy |

关联 SuperGrok 或 X Premium+ 是「用量额度」，不是 Cursor 套餐；你原来的 Cursor 套餐保持不变。

## 关联前一定要知道

- **关联是永久的**：不能解绑，也不能转到另一个 Cursor 账号。关联前先确认登录的是对的 Cursor 账号。
- 关联后升级 SuperGrok，每周用量最多要 24 小时才更新，不用重新关联。
- 两个订阅都保持各自扣费，取消一个不会取消另一个。

## 用量怎么算

- **每周用量**：订阅内含，每周重置。
- **按量计费**：每周用量用完后继续使用，通过 Cursor 计费，计入每月上限；上限不会打断正在进行的任务，但之后会停。
- 没开按量计费时，每周用量用完 Grok Bot 就停止。
- X 订阅的用量和 Cursor、Grok 应用共用一个每周额度。

## 怎么选

- 已经付费用 Cursor 写代码：直接用 Cursor 账号，不用再买。
- 主要用 Grok 或 X：用已有的 X 订阅或 SuperGrok。
- 团队：自助购买的 Cursor Teams 每个成员都包含 Grok Bot，按量计费默认开启。企业版找客户经理。

价格经常调整，以 grok.com/dashboard/billing 和 Cursor 定价页为准。

## 试用

免费试用是一笔用量额度，同时有 7 天期限；按 Agent 步骤和 token 消耗，不按消息数，大任务用得快。免费账号点 Cancel Trial 会立即结束并清空剩余额度。

## 常见追问

### Grok Bot 需要单独购买吗？

不需要单独购买。X 订阅 Premium、Super、Ultra，SuperGrok、SuperGrok Plus、SuperGrok Heavy，以及 Cursor 付费套餐都包含 Grok Bot。

### 同时有 Cursor 和 SuperGrok，用量会叠加吗？

不会叠加，Grok Bot 使用两者中每周用量更多的那个。

### SuperGrok 关联到 Cursor 账号后可以解绑吗？

不可以。关联是永久的，也不能转移到另一个 Cursor 账号。

## 相关阅读

- [订阅怎么选（详细版）](/zh/start/plans/)
- [Grok Bot 是什么](/zh/start/what-is-grok-bot/)
- [Grok Bot 用量用完怎么办](/zh/answers/grok-bot-not-working/)
