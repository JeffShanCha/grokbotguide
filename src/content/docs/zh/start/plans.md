---
title: 订阅怎么选：X 订阅、SuperGrok 还是 Cursor
description: 2026 年 10 月起，新用户通过 The X Subscription 的 Premium（$30/月）及以上档位获得 Grok Bot；已有 SuperGrok 或 Cursor 付费套餐的可以继续用。各档价格、用量和切换前要知道的事。
sidebar:
  label: '02 · 订阅怎么选'
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Plans and usage（The X Subscription 官方文档）
    url: https://docs.x.ai/x-subscription/pricing
  - title: Grok Bot on The X Subscription（官方文档）
    url: https://docs.x.ai/x-subscription/grok-bot
  - title: Do I have to switch?（官方文档）
    url: https://docs.x.ai/x-subscription/do-i-have-to-switch
  - title: Introducing The X Subscription（xAI 公告）
    url: https://x.ai/news/x-subscription
  - title: Plans and billing（Cursor 帮助中心）
    url: https://cursor.com/help/grok-bot/plans
  - title: Introducing The X Subscription（Cursor 论坛官方帖）
    url: https://forum.cursor.com/t/introducing-the-x-subscription/174450
---

:::tip[结论]
- **从没订阅过**：买 The X Subscription 的 **Premium（$30/月）**。这是包含 Grok Bot 的最低档，Plus（$8/月）不含。
- **天天让 Bot 跑定时任务、用量不够**：升级到 **Super（$100/月）**，用量是 Premium 的将近 4 倍。
- **已经在付费用 SuperGrok 或 Cursor**：直接用，不必马上切换。官方说明切换是可选的，不切换原套餐继续有效。
:::

价格查询日期：2026-10-15，以 [x.ai/pricing](https://x.ai/pricing) 和 grok.com 账单页为准。标价不含税，部分地区结账时会加税。

## The X Subscription 各档

2026 年 10 月 12 日，xAI 把 Grok、Cursor 和 X Premium 合成一个订阅 **The X Subscription**，10 月 13 日起对新用户开放，并在之后几天逐步向全球开放。

| 档位 | 月付 | 年付 | 用量 | Grok Bot |
| --- | --- | --- | --- | --- |
| Free | $0 | — | 有限 | 不含 |
| Plus | $8 | $80 | 1 倍 | 不含 |
| **Premium** | **$30** | $300 | 4 倍 | **包含** |
| Super | $100 | $1000 | 15 倍 | 包含 |
| Ultra | $200 | $2000 | 50 倍 | 包含 |

「用量」是相对 Plus 的共享用量倍数。年付折合每月约 $7、$25、$84、$167。

- **用量是共享的**：Grok Bot、Grok 应用和 Cursor 里的 Grok 模型共用同一个每周额度，每周重置。白天让 Bot 跑了很多任务，晚上在 Cursor 里写代码能用的就少了。
- **超出部分**：可以买 Additional Usage 额度继续用，也可以设置消费上限。Cursor 里的第三方模型不在共享额度内，从第一次使用就扣 Additional Usage。
- **团队**：Premium、Super、Ultra 按席位计价（$30 / $100 / $200），每个席位和对应个人档的用量相同；Plus 没有团队版。
- **付款方式**：网页端支持银行卡、Apple Pay、Google Pay 和 Link，部分方式只在部分国家可用，以结账页显示为准；也可以通过 App Store 或 Google Play 订阅。

## 已有 SuperGrok 或 Cursor 套餐

- **不必马上切换**：官方说明切换是可选的，不切换原套餐继续有效。切换入口在账单设置里陆续开放。
- **仍包含 Grok Bot 的旧套餐**：SuperGrok、SuperGrok Plus、SuperGrok Heavy（关联到 Cursor 账号后使用，SuperGrok Lite 不含），以及 Cursor 的 Pro、Pro+、Ultra 和自助购买的 Teams。
- **新用户还能不能买旧套餐**：Cursor 官方论坛确认旧版 Ultra 不再对新用户开放；媒体报道称 SuperGrok 等独立套餐也不再卖给新用户，官方文档没有直接写明。新用户直接选 The X Subscription 即可。
- **旧套餐之间的对应关系**：Pro 对应 SuperGrok 或 X Premium+，Pro+ 对应 SuperGrok Plus，Ultra 对应 SuperGrok Heavy。同时有 Cursor 套餐和关联订阅时不叠加，按每周用量更多的那个算。

:::danger[两件不能撤销的事]
- **关联 SuperGrok 或 X Premium+ 是永久的**：不能解绑，也不能转到另一个 Cursor 账号。
- **切换到 The X Subscription 时合并账号也是永久的**：被合并账号上的旧 Cursor 和 Grok 订阅会在结账时取消，未用完的时间按比例退款。有多个 Cursor 账号的，要先选好主账号。

操作前先确认登录的是你要长期使用的账号。
:::

## 本站怎么选

本站的实测统一使用 **SuperGrok** 订阅完成，文章里的截图和用量感受都基于它。如果你是通过 The X Subscription 使用，界面和用量显示可能略有不同。

## 关联 SuperGrok（已有 SuperGrok 订阅时）

1. 在 Grok Bot 应用里用 Cursor 账号登录。
2. 桌面端打开 **Settings → Usage & Billing**，点击关联 SuperGrok 的按钮（按钮上会显示你的档位名）。
3. 移动端在提示时点 **Link Grok Account**，完成后点 **Finished Linking? Refresh My Status**。
4. 之后升级 SuperGrok 不需要重新关联，每周用量最多 24 小时内更新。

:::note
Grok Bot 要求开启云端数据存储。如果你的 Cursor 账号开着「Legacy Privacy Mode」，需要先切换到支持的数据设置。
:::
