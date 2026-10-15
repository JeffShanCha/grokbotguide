---
title: "电脑关机后 Grok Bot 还能工作吗？"
description: "能。Grok Bot 在属于你的云电脑上运行，关掉应用、合上电脑或手机都不会停止后台任务和 Routine。只有本地电脑权限是另一回事。"
sidebar:
  order: 7
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: "Grok Bot FAQ（官方文档）"
    url: https://docs.x.ai/grok-bot/faq
  - title: "Use the computer and apps（官方文档）"
    url: https://docs.x.ai/grok-bot/computer-and-apps
  - title: "Approvals, security, and privacy（官方文档）"
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"inLanguage\": \"zh-CN\", \"url\": \"https://grokbotguide.ai/zh/answers/does-grok-bot-work-when-laptop-is-closed/\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"电脑关机后 Grok Bot 还能工作吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"能。 Grok Bot 的工作在云端的持久电脑上运行，关掉应用、合上笔记本或锁屏手机，都不会停止正在进行的后台任务和 Routine。\"}}, {\"@type\": \"Question\", \"name\": \"合上电脑后 Grok Bot 的 Routine 还会运行吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"会。Routine 在 Grok Bot 的云电脑上运行，和你本地电脑是否开机无关。\"}}, {\"@type\": \"Question\", \"name\": \"Grok Bot 会操作我自己的电脑吗？\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"只有你开启本地电脑执行权限并批准时才会。默认每次询问，官方建议不需要时保持 Never allow。\"}}]}"
---

**能。** Grok Bot 的工作在云端的持久电脑上运行，关掉应用、合上笔记本或锁屏手机，都不会停止正在进行的后台任务和 Routine。

## 云电脑和你的电脑是两回事

- **云电脑**：每个用户一台，你所有的 Bot 共用，带浏览器、文件系统和终端。合上你的电脑不影响它。
- **你自己的 Mac 或 Windows**：只有在你开启并批准「本地电脑执行」权限时，Bot 才会在上面运行命令。设置在 **Settings → General → Bot → Execution on Local Computer**，默认每次询问，官方建议保持 Never allow。

## 关机期间要注意什么

- 需要你审批的动作会等你；来自 Routine 的审批卡片约 10 分钟后过期，过期就不执行。
- 遇到登录、验证码，Bot 会停下来等你接管。可以在手机上打开电脑视图处理。
- 长时间不打开应用时，Grok Bot 可能会询问是否继续运行 Routine，不回复可能会被暂停。
- 打开 Bot 的 **Notifications**，有结果、问题或审批时手机会提醒你。

## 常见追问

### 合上电脑后 Grok Bot 的 Routine 还会运行吗？

会。Routine 在 Grok Bot 的云电脑上运行，和你本地电脑是否开机无关。

### Grok Bot 会操作我自己的电脑吗？

只有你开启本地电脑执行权限并批准时才会。默认每次询问，官方建议不需要时保持 Never allow。

## 相关阅读

- [Grok Bot 是什么](/zh/start/what-is-grok-bot/)
- [Grok Bot 怎么设置定时任务？](/zh/answers/how-to-schedule-grok-bot-routines/)
- [Grok Bot × 手机：出门在外派活](/zh/recipes/mobile-voice/)
