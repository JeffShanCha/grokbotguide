---
title: 'Grok Bot × 文档：零风险上手，让 Bot 总结一份长文件'
description: '不需要连接任何应用，也不需要登录。最适合第一次用 Grok Bot 时验证效果。'
sidebar:
  order: 1
grade: official
needs_testing: true
author: JeffShanCha
role: assistant
difficulty: beginner
apps: [文件上传]
sources:
  - title: Get started（官方文档）
    url: https://docs.x.ai/grok-bot/get-started
---

**这是官方推荐的第一个测试：上传一份文档，让 Bot 按指定格式总结，并且不修改原文件。** 它不需要任何连接器或登录，也不会对外产生任何动作。

## 准备

- 一份 PDF 或 Word 文档，比如一份会议纪要、合同或产品需求文档。
- 一个已经创建好的 Bot（任意职责都行，见 [创建第一个 Bot](/zh/start/first-bot/)）。

## 步骤

1. 在 Bot 的对话里上传文档。
2. 发送下面这段指令：

```text
总结这份文档，给出 5 条要点。
日期、决策、待解决问题单独列一节。
每条注明出自第几页或哪一节。
不要修改原文件。
```

3. 检查结果：是否正好 5 条？引用的页码是否对得上？是否真的没有改动原文件？

## 可以继续尝试

- 追加一句「以后所有总结都用这个格式」，看 Bot 是否记住这个偏好。
- 让 Bot 「把这个总结流程保存成一个 Skill」，然后在新对话里输入 `/` 调用它。

:::tip[欢迎补充]
你用这个方法总结过什么类型的文档？效果如何？欢迎在页面底部的「编辑此页」补充你的测试结果，补充后这篇文章就可以从「整理自官方文档」升级为「社区亲测」。
:::
