---
title: "Grok Bot 用不了怎么办？常见问题排查"
description: "登录不成功、云电脑连不上、Bot 卡住、网站反复要求登录、插件授权失败、Routine 不运行、@bot 没反应——按官方排障顺序逐个解决。"
sidebar:
  order: 3
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Troubleshooting（官方文档）"
    url: https://docs.x.ai/grok-bot/troubleshooting
  - title: "Use the computer and apps（官方文档）"
    url: https://docs.x.ai/grok-bot/computer-and-apps
  - title: "Plans and billing（Cursor 帮助中心）"
    url: https://cursor.com/help/grok-bot/plans
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/grok-bot-not-working/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Grok Bot 用不了怎么办？常见问题排查\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"先做破坏性最小的操作：重试 → 重启应用 → Recover computer → Update Bot’s Computer，最后才考虑 Reset（会丢失最近未同步的工作）。大多数「卡住」其实是 Bot 在等你的审批、登录或验证码，打开电脑视图看一眼就知道。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 的云电脑连不上怎么办？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"依次尝试 Retry、重启应用、Recover computer、Settings → Computer → Update Bot’s Computer，最后才用 Reset。Recover 和 Update 会保留文件和登录。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 一直卡着不动是什么原因？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"最常见的是在等你处理审批、登录、验证码或问题。打开电脑视图查看，必要时发一句话纠正或发 Stop now。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 用量用完了会怎样？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"没开按量计费时会停止工作，直到每周用量重置；开了按量计费则继续，计入每月上限。\"}}]}"
---

先做破坏性最小的操作：**重试 → 重启应用 → Recover computer → Update Bot’s Computer**，最后才考虑 Reset（会丢失最近未同步的工作）。大多数「卡住」其实是 Bot 在等你的审批、登录或验证码，打开电脑视图看一眼就知道。

## 先判断是哪一类

| 症状 | 先看哪里 |
| --- | --- |
| 登录一直不完成 | 浏览器里是否显示 Cursor 登录成功；公司 SSO 要走公司流程 |
| 提示 Legacy Privacy Mode | 改 Cursor 账号的数据设置，或找管理员 |
| 电脑一直在设置中 | 初次设置和更新要几分钟，保持应用打开 |
| 电脑连不上 | 按下面的恢复顺序 |
| Bot 卡住不动 | 打开电脑视图，看有没有待处理的问题、审批、登录、验证码 |
| 网站反复要求登录 | Take over 自己登录，完成后让 Bot 从当前页继续 |
| 插件装不上或授权失败 | Connect apps → Your plugins 检查 Installed，重新授权 |
| Routine 没运行 | 见「怎么设置定时任务」里的检查清单 |
| 用量用完 | 在 Usage & Billing 查看；没开按量计费时会直接停 |
| @bot 没回复 | 地区限制、视频或 GIF、同时 @grok 都会导致不转交 |

## 云电脑连不上：恢复顺序

1. 点 **Retry** 或重新打开对话
2. 重启 Grok Bot 应用
3. 如果出现 **Recover computer**（确认框里叫 Recover Grok Bot’s Computer），点它
4. 没有的话，去 **Settings → Computer** 选 **Update Bot’s Computer**；手机上是 Settings → Bot → Bot Computer → Reset Computer
5. 等新电脑可用
6. 只有恢复和更新都失败、并且能接受丢失最近工作时，才用 **Reset**

Recover 和 Update 会保留文件和登录；Reset 回到上一个快照。Bot 的资料和对话通常不会丢。

## Bot 看起来卡住了

- 看侧边栏和对话里的状态
- 打开电脑视图，看它是不是停在某个页面等待
- 找有没有待处理的问题、审批、登录、验证码或密钥请求
- 方向错了就发一句话纠正；要立刻停下就发「Stop now」
- 同一个 Bot 一次只能在自己的屏幕上做一个电脑操作任务，新任务要等前一个结束

## 审批卡片点不动

读清楚目标和参数；卡片失效了就让 Bot 重新生成操作。总是要求审批的话，检查 **Settings → General → Bot → Auto-review** 里有没有匹配的 Ask first 规则（包括管理员设的团队规则），Ask first 优先于 Allow automatically。来自 Routine 的审批约 10 分钟过期。

## 联系官方支持前准备

版本号、系统版本、准确的报错信息、Bot 或 Routine 名称、大致时间和时区、请求 ID 或对话 ID、重试和重启后是否有变化。不要附上密码、验证码或密钥。官方支持邮箱 support@x.ai，社区 Discord：discord.gg/x-ai。

## 常见追问

### Grok Bot 的云电脑连不上怎么办？

依次尝试 Retry、重启应用、Recover computer、Settings → Computer → Update Bot’s Computer，最后才用 Reset。Recover 和 Update 会保留文件和登录。

### Grok Bot 一直卡着不动是什么原因？

最常见的是在等你处理审批、登录、验证码或问题。打开电脑视图查看，必要时发一句话纠正或发 Stop now。

### Grok Bot 用量用完了会怎样？

没开按量计费时会停止工作，直到每周用量重置；开了按量计费则继续，计入每月上限。

## 相关阅读

- [Grok Bot 怎么设置定时任务？](/zh/answers/how-to-schedule-grok-bot-routines/)
- [审批、安全与隐私](/zh/advanced/approvals-and-security/)
- [Grok Bot × X：@bot 的地区限制](/zh/recipes/x-tag-bot/)
