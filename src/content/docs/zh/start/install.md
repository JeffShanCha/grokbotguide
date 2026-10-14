---
title: 安装与登录
description: 在 macOS、Windows、Linux 上安装 Grok Bot 桌面端并完成登录。
sidebar:
  order: 3
grade: official
needs_testing: true
author: grokbotguide
sources:
  - title: Get started（官方文档）
    url: https://docs.x.ai/grok-bot/get-started
---

**从 [x.ai/bot](https://x.ai/bot) 的下载页安装桌面端，用 Cursor 账号登录，SuperGrok 用户再关联订阅即可。** 全程约 5 分钟。

## 1. 下载安装

| 系统 | 选哪个安装包 | 怎么确认 |
| --- | --- | --- |
| macOS | Apple silicon 或 Intel | 苹果菜单 → 关于本机：显示「芯片」是 Apple silicon，显示「处理器」是 Intel |
| Windows | x64 或 Arm64 | 设置 → 系统 → 系统信息 → 系统类型 |
| Linux | x64 或 Arm64；`.deb` / `.rpm` / AppImage | 终端运行 `uname -m`：`x86_64` 是 x64，`aarch64` 是 Arm64 |

- **macOS**：打开 dmg，把 Grok Bot 拖进「应用程序」；首次打开如果系统询问，选「打开」。
- **Windows**：运行安装程序，从开始菜单打开。
- **Linux**：在下载页的「More downloads」里，只随稳定版发布。安装包或给 AppImage 加执行权限后从启动器打开。

应用会自动检查更新，也可以在 **Settings → Updates** 手动「Check for Updates」。

## 2. 登录

1. 欢迎页点「Sign in」，在浏览器里完成 Cursor 账号认证后回到应用。
2. 用 SuperGrok 的话，按 [订阅怎么选](/zh/start/plans/) 里的步骤关联订阅。
3. 公司要求单点登录的，按公司的正常流程登录。

## 3. 首次引导

第一次打开时，应用会介绍 Bot、共享电脑和 Routine，并问你平时用哪些工具。这些回答**只影响推荐**，不会连接或改动任何工具。云电脑在后台初始化，结束时会进入「Meet a future teammate」页面，这时就可以 [创建第一个 Bot](/zh/start/first-bot/) 了。
