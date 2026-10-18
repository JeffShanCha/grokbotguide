---
# 复制到 src/content/docs/zh/<start|advanced|recipes>/<英文-slug>.md
title: 文章标题（说清楚做成什么）
description: 一句话说明读完能做到什么（会显示在搜索结果里）
sidebar:
  order: 10
# official = 依据官方文档；community = 来自他人公开实测；tested = 亲自按步骤跑通；opinion = 观点/评测
grade: official
needs_testing: true
# 亲测时填写你按步骤跑通的日期和订阅档位（没跑通就不要填 tested）
# 只有实际核验后才取消注释并填写真实日期，不能填编辑日期或复制示例日期。
# last_checked: YYYY-MM-DD
# last_verified: YYYY-MM-DD
# tested_plan: 实际测试时的订阅
# 你的 GitHub 用户名
author: your-github-username
# 实战案例必填
difficulty: beginner
apps: [Gmail]
# 引用的所有外部资料都列在这里
sources:
  - title: 官方文档页面标题
    url: https://docs.x.ai/grok-bot/overview
---

**第一句话直接给结论：这篇文章让你做成什么，用了多久。**

## 测试环境

| 项目 | 内容 |
| --- | --- |
| 订阅 | SuperGrok / Cursor Pro …… |
| 系统 | macOS / Windows / Linux / iOS / Android |
| 用到的应用 | …… |
| 测试日期 | 未核验；实际测试后填写真实日期 |

## 步骤

1. ……
2. ……

## 给 Bot 的完整指令

```text
把你实际发给 Bot 的指令原样贴在这里（删掉客户名、邮箱等敏感信息）
```

## 可自动执行

明确输入、账号与范围内，可以自动读取、整理和交付哪些结果？

## 需要确认

逐项写清写入、发送、付款、删除、权限变更和 Routine 设置的确认点。

## 失败后接管

写清停止位置、需要交付的记录、人工检查入口，以及重试前如何检查已有结果，避免重复执行。

## 来源与核验记录

分别注明资料核验、实操核验的日期、范围、证据和未通过项。没有记录就明确写“未核验”，不把页面编辑或合成练习当成实操核验。
已进入完整案例库的教程须在 `src/data/case-governance.json` 按 slug 维护中英文边界、内容更新日期与两类核验记录。

## 踩坑记录

- ……

## 用量感受

跑一次大概消耗多少用量（如果能看到的话）。
