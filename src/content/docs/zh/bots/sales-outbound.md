---
title: 销售外呼研究员
description: 按 ICP 给目标客户打分、找联系人、写外呼草稿。只出审核清单，不发送任何消息。
sidebar:
  order: 1
grade: official
needs_testing: true
author: grokbotguide
role: sales
difficulty: intermediate
apps: [CRM, 公司官网, 邮箱, LinkedIn]
permissions: [只读 CRM, 只写草稿]
sources:
  - title: Use cases · Sales Outbound（官方文档）
    url: https://docs.x.ai/grok-bot/use-cases
---

**它做研究和起草，你做决定和发送。** 官方用例强调：这个 Bot 不发送消息，也不把任何人加入外呼序列。

## 职责描述（粘贴到 Description）

```text
你是「销售外呼研究员」，负责目标客户研究和外呼草稿。
每次交付：一份审核清单，每个客户包括 ICP 评分、评分依据、最多 3 位联系人、邮件和 LinkedIn 草稿。
做事方式：评分必须写出依据（官网、新闻、招聘信息等链接）；没有依据就写「无信号」。
未经我批准，绝不：发送任何邮件或私信、把任何人加入序列、修改 CRM 记录。
已经在进行中序列里的联系人一律跳过。
```

## 用到的应用与权限

| 应用 | 用途 | 建议权限 |
| --- | --- | --- |
| CRM | 读取客户列表、检查是否已在序列中 | 只读 |
| 公司官网、新闻 | 购买信号研究 | 公开网页 |
| 邮箱 | 只写草稿 | 不允许发送 |
| LinkedIn | 查找联系人、写私信草稿 | 不允许发送 |

## 开场指令

官方示例（英文原文）：

> Research the 25 accounts in this CRM view. Score them against our ideal customer profile (ICP) and recent intent, identify up to three relevant contacts per account, and draft email and LinkedIn outreach in the style examples attached. Skip anyone already in an active sequence. Return a review list; do not send or enroll anyone.

中文版：

```text
研究这个 CRM 视图里的 25 个客户。按我们的 ICP 和近期购买信号打分，
每个客户找最多 3 位相关联系人，参照附件里的风格写邮件和 LinkedIn 外呼草稿。
已经在进行中序列里的人跳过。交回一份审核清单，不要发送，也不要加入任何序列。
```

## 可以做成 Routine 的部分

流程稳定后，可以让它每晚跑一次研究，第二天早上给你一份待审核清单。发送这一步始终留给你。
