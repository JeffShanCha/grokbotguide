---
title: 派第一个任务
description: 用「结果、来源、约束、交付物、检查点」五要素写任务，先从不需要登录任何应用的小任务开始。
sidebar:
  label: '05 · 派第一个任务'
  order: 5
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Get started（官方文档）
    url: https://docs.x.ai/grok-bot/get-started
  - title: Approvals, security, and privacy（官方文档）
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
---

**一个好任务包含五个要素：要什么结果、用哪些来源、有什么限制、交付什么、在哪一步停下来等你。**

## 五要素

| 要素 | 问自己 | 例子 |
| --- | --- | --- |
| 结果 | 做完是什么样子？ | 本周所有未回复客户邮件的清单 |
| 来源 | 用哪些应用、网站、文件？ | Gmail 收件箱、CRM 里的客户列表 |
| 约束 | 哪些事不能做，或要先问？ | 不回复任何邮件，不改 CRM |
| 交付物 | 交回什么格式？ | 表格：客户、主题、截止日期、建议回复 |
| 检查点 | 什么时候停下来等你？ | 草稿写完先给我看 |

现成的指令模板见 [模板库：派活五要素](/zh/templates/five-part-request/)。

## 先做一个零风险测试

不需要连接任何应用、也不需要登录：上传一份文档，让 Bot 总结。

```text
总结这份文档，给出 5 条要点。
日期、决策、待解决问题单独列一节。
每条注明出自第几页或哪一节。
不要修改原文件。
```

## 输入方式

- 直接在输入框打字。
- 语音输入：桌面端点「Start voice input」或按 `Cmd/Ctrl+D`；手机端点「Start dictation」。
- 「Start voice chat」可以实时语音对话。

## 需要登录应用时

Bot 碰到需要登录的网站，会请你接管电脑：点 **Take over**，自己输入账号密码或完成验证码，然后点 **I'm done**。

:::danger[不要在聊天里发密码]
密码、短信验证码、两步验证码一律通过 Take over 自己输入，不要发在对话里。
:::

登录状态会保存在共享云电脑上，你的其他 Bot 在合适的时候也能用。对于有官方插件的服务，可以在侧边栏 **Connect apps** 里安装并在浏览器中授权。

## 迭代

结果不对就直接让 Bot 改，并把长期偏好说清楚（比如「以后都用表格」）。同一个流程跑稳了，就让 Bot [保存成 Skill 或做成 Routine](/zh/advanced/skills-and-routines/)。
