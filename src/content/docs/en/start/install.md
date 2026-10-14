---
title: Install and sign in
description: Install the Grok Bot desktop app on macOS, Windows or Linux and sign in.
sidebar:
  order: 3
grade: official
needs_testing: true
author: grokbotguide
sources:
  - title: Get started (official docs)
    url: https://docs.x.ai/grok-bot/get-started
---

**Install the desktop app from the downloads page at [x.ai/bot](https://x.ai/bot), sign in with Cursor, and link SuperGrok if that is your plan.** It takes about five minutes.

## 1. Download and install

| OS | Which build | How to check |
| --- | --- | --- |
| macOS | Apple silicon or Intel | Apple menu → About This Mac: "Chip" means Apple silicon, "Processor" means Intel |
| Windows | x64 or Arm64 | Settings → System → About → System type |
| Linux | x64 or Arm64; `.deb` / `.rpm` / AppImage | Run `uname -m`: `x86_64` is x64, `aarch64` is Arm64 |

- **macOS**: open the disk image and drag Grok Bot to Applications. Choose Open if macOS asks the first time.
- **Windows**: run the installer and open Grok Bot from the Start menu.
- **Linux**: builds are under "More downloads" and ship with stable releases only. Install the package or make the AppImage executable, then open it from your launcher.

The app updates automatically. You can also choose "Check for Updates" in **Settings → Updates**.

## 2. Sign in

1. Select "Sign in" on the welcome screen and finish authentication in your browser.
2. If you use SuperGrok, link it as described in [Which plan](/en/start/plans/).
3. If your organization requires single sign-on, follow its normal process.

## 3. First-run tour

The app introduces Bots, the shared computer and routines, then asks which tools you use. Your answers **only shape suggestions**; nothing gets connected or changed. Computer setup runs in the background and ends on "Meet a future teammate", where you can [create your first Bot](/en/start/first-bot/).
