---
title: 审批、安全与隐私
description: 哪些动作要审批、Auto Review 怎么设、密码怎么交给 Bot、为什么多个 Bot 不是安全隔离。
sidebar:
  label: '02 · 审批、安全与隐私'
  order: 2
grade: official
needs_testing: true
author: JeffShanCha
sources:
  - title: Approvals, security, and privacy（官方文档）
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
---

**三条底线：敏感动作走审批；密码和验证码只用 Take over 自己输入；记住你所有的 Bot 共用一台电脑。**

## 审批卡片

需要审批时，对话里会显示要执行的操作和参数。先看清目标、范围和值，再选：

- **Allow once**：只执行这一次。
- **Always allow**：保存一条匹配规则，以后同类动作自动放行。
- **Deny**：拒绝。

你正在对话中的审批会一直等你。来自 Routine、触发器或其他 Bot 消息的审批**约 10 分钟后过期**，卡片显示 **Expired**，动作不会执行；过期卡片上选「以后总是允许」只会添加规则，不会补执行，需要让 Bot 重试。

:::caution
批准不会撤销已经完成的工作。看不懂目标或后果的审批不要点，先让 Bot 解释或先出草稿。
:::

## 在任务里写清边界

这些动作建议每次都写明「可以做」还是「必须先问」：发送消息或邀请、发布内容、购买和转账、删除或覆盖数据、修改权限、改生产环境、接受法律条款。

## Auto Review

在 **Settings → General → Auto-review** 开启后，Grok Bot 会在工具调用和电脑操作执行前先做一次自动审查。

| 规则 | 作用 |
| --- | --- |
| Ask first | 匹配的动作一律停下来等你审批 |
| Allow automatically | 匹配的动作在自动审查没发现问题时直接放行 |
| 两条都匹配 | Ask first 优先 |
| 团队规则 | 管理员可以锁定；你的规则只能在其上更严格 |

个人规则保存在当前桌面端并同步到它的云电脑，别的桌面端安装需要单独设置。规则要**窄**，绑定到具体动作和范围；Auto Review 基于模型判断，是最小权限和显式审批的补充，不是替代。

## 密码、验证码和登录

- 密码和一次性验证码**绝不**发在普通聊天里。
- 密码、Passkey、两步验证码、验证码图片、付款确认：在请求上选 **Take over**，或打开电脑选 **Take control**，完成后点 **I'm done**，再让 Bot 继续。
- 支持的连接可以用**安全密钥请求**输入：内容被遮挡、不进对话记录、不给模型看。它不是通用密码管理器。
- 硬件安全密钥需要在 **Settings → General → Security Key** 开启「Use hardware security keys」，每次使用都要你批准（Linux 暂不支持）。

## 本地电脑权限

云电脑和你自己的 Mac / Windows 是两回事。**Settings → General → Bot → Execution on Local Computer** 可选 Ask every time（默认）、Always allow、Never allow。官方建议：除非某个任务确实需要本地文件，否则保持 **Never allow**。

## 共享电脑：不同 Bot 不是安全边界

你的所有 Bot 共用一台云电脑：文件、浏览器登录、命令行凭据对所有 Bot 可见。用不到的服务及时退出登录，敏感临时文件用完就删，不用的连接器在源服务里撤销授权。

## 分享 Bot 之前

公开分享链接只复制 Bot 的配置（身份、描述、Skill、Routine），不包含你的电脑和登录状态。但描述里如果写了 API Key、内部网址、客户数据，就会一起公开——分享前删干净。

## 撤销访问的顺序

1. 暂停或删除相关 Routine
2. 在共享电脑上退出网站登录
3. 卸载连接器，并在源服务里撤销授权
4. 删除 `/workspace` 里的敏感文件
5. 隐藏或删除不再需要的 Bot
6. 需要时通过账号设置删除 Cursor 账号

## 推荐做法

- 每个流程只连接它需要的工具，支持的话用权限受限的服务账号。
- 从只读任务和草稿开始。
- 发送、发布、购买、删除、改生产环境始终放在审批之后。
- 定期检查连接器和运行中的 Routine；源系统变了就先暂停。
- 重要决策保留来源链接和操作记录。

## 相关问题

- [给 Grok Bot 账号权限安全吗？](/zh/answers/is-grok-bot-safe/)
