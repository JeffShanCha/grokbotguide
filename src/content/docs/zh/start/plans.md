---
title: 订阅怎么选：X 订阅、SuperGrok 还是 Cursor
description: Grok Bot 不单独售卖，可以通过 X 订阅、关联 SuperGrok 或 Cursor 付费套餐获得。各渠道包含哪些档位、怎么对应、关联前要注意什么。
sidebar:
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Plans and billing（Cursor 帮助中心）
    url: https://cursor.com/help/grok-bot/plans
  - title: Grok Bot FAQ（官方文档）
    url: https://docs.x.ai/grok-bot/faq
  - title: Get started（官方文档）
    url: https://docs.x.ai/grok-bot/get-started
  - title: VentureBeat 发布报道
    url: https://venturebeat.com/orchestration/spacexais-grok-bot-turns-agents-into-persistent-digital-coworkers-that-can-operate-your-apps-for-120-per-month
---

**Grok Bot 不单独售卖，目前有三条获取渠道：X 订阅、关联 SuperGrok 系列订阅，或 Cursor 付费套餐。** 价格和档位会调整，下单前请以官方页面为准。

只想看结论，可以读[《Grok Bot 订阅怎么选》](/zh/answers/grok-bot-vs-cursor-plans/)的简短答案。

## 可用的订阅

| 渠道 | 包含 Grok Bot 的档位 | 不包含 | 说明 |
| --- | --- | --- | --- |
| X 订阅 | Premium、Super、Ultra（个人和团队席位） | Plus、免费版 | 用量与 Cursor、Grok 应用共用一个每周额度 |
| SuperGrok | SuperGrok、SuperGrok Plus、SuperGrok Heavy；X Premium+ 也可关联 | SuperGrok Lite | 个人订阅，需要关联到 Cursor 账号 |
| Cursor 个人版 | Pro、Pro+、Ultra | | 官方帮助中心现在称为旧版（legacy）套餐 |
| Cursor 团队版 | 自助购买的 Teams | | 每个成员都包含 Grok Bot，按量计费默认开启 |
| 企业 | 联系 Cursor 客户经理 | | |

## 档位对应关系

| 档位 | Cursor 套餐 | 关联的订阅 |
| --- | --- | --- |
| 基础档 | Pro | SuperGrok 或 X Premium+ |
| 中档 | Pro+ | SuperGrok Plus |
| 高档 | Ultra | SuperGrok Heavy |

- 同时有 Cursor 套餐和关联订阅时**不叠加**，Grok Bot 使用两者中**每周用量更多**的那个。例如 Pro 用户关联 SuperGrok Plus 后按中档计算。
- 订阅内含**每周用量**，每周重置；符合条件的账号可以开按量计费，用完每周用量后继续使用，计入每月上限。

:::caution[价格以官方为准]
发布当天 VentureBeat 报道的参考价：个人通过 Cursor Ultra 为 $200/月，团队通过 Cursor Premium Teams 为 $120/席/月，SuperGrok Heavy 为 $300/月。这些数字之后可能调整，请以 grok.com/dashboard/billing 和 Cursor 定价页为准。
:::

## 本站怎么选

本站的实测统一使用 **SuperGrok** 订阅完成，文章里的截图和用量感受都基于它。如果你已经是 Cursor 付费用户，可以直接用 Cursor 账号，不需要再买。

## 关联 SuperGrok 的步骤

:::danger[关联是永久的]
SuperGrok 或 X Premium+ 一旦关联，就不能解绑，也不能转到另一个 Cursor 账号。关联前先确认登录的是你要长期使用的 Cursor 账号。
:::

1. 在 Grok Bot 应用里用 Cursor 账号登录（没有就先注册一个）。
2. 桌面端打开 **Settings → Usage & Billing**，点击「Link SuperGrok …」（按钮文字会显示你的档位）。
3. 移动端在提示时点 **Link Grok Account**，完成后点 **Finished Linking? Refresh My Status**。
4. 之后升级 SuperGrok 不需要重新关联，每周用量最多 24 小时内更新。

:::note
Grok Bot 要求开启云端数据存储。如果你的 Cursor 账号开着「Legacy Privacy Mode」，需要先切换到支持的数据设置。
:::
