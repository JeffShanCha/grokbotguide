---
title: Approvals, security and privacy
description: Which actions need approval, how to set up Auto Review, how to hand credentials to a Bot, and why separate Bots are not a security boundary.
sidebar:
  order: 2
grade: official
needs_testing: true
author: grokbotguide
sources:
  - title: Approvals, security, and privacy (official docs)
    url: https://docs.x.ai/grok-bot/approvals-security-and-privacy
---

**Three ground rules: put sensitive actions behind approval; enter passwords and codes yourself through Take over; remember that all your Bots share one computer.**

## Approval cards

When an action needs approval, the conversation shows the proposed operation and its inputs. Check the target, scope and values, then choose:

- **Allow once**: run this action one time.
- **Always allow**: save a matching rule for similar actions.
- **Deny**: block it.

Approvals in a chat you are in wait for you. Approvals from routines, triggers or other Bots **expire after about 10 minutes**; the card shows **Expired** and the action does not run. Choosing "always allow" on an expired card only adds the rule, so ask the Bot to retry.

:::caution
Approving an action does not undo work already done. If you cannot tell what an approval targets or does, ask the Bot to explain it or produce a draft first.
:::

## Set boundaries in requests

Be explicit about whether the Bot may do, or must ask before: sending messages or invitations, publishing, purchases and transfers, deleting or overwriting data, changing permissions, production changes, accepting legal terms.

## Auto Review

With **Settings → General → Auto-review** on, Grok Bot evaluates tool calls and computer actions before they run.

| Rule | Effect |
| --- | --- |
| Ask first | Matching actions always stop for your approval |
| Allow automatically | Matching actions proceed if the automated review finds no other reason to stop |
| Both match | Ask first wins |
| Team rules | Admins can lock rules; yours can only add stricter behavior |

Personal rules are stored on the current desktop and synced to its cloud computer; other desktop installs need their own. Keep rules **narrow** and tied to a specific action and scope. Auto Review is model-based, so it complements least privilege and explicit approvals rather than replacing them.

## Passwords, codes and sign-ins

- **Never** send passwords or one-time codes in ordinary chat.
- For passwords, passkeys, 2FA codes, CAPTCHAs and payment confirmations, choose **Take over** on the request or open the computer and choose **Take control**, finish the step, choose **I'm done**, then tell the Bot to continue.
- Supported connections offer a **secure secret request**: the value is masked, kept out of the transcript and not shown to the model. It is not a general password manager.
- Hardware security keys need **Use hardware security keys** under **Settings → General → Security Key**, and every use asks for your approval (not yet on Linux).

## Local computer access

The cloud computer and your own Mac or Windows machine are separate. Under **Settings → General → Bot → Execution on Local Computer**, choose Ask every time (default), Always allow or Never allow. The official recommendation is to keep **Never allow** unless a task really needs your local files.

## The shared computer is not a boundary

All your Bots share one cloud computer: files, browser sessions and command-line credentials are visible to every Bot. Sign out of services you no longer need, delete sensitive temporary files, and revoke unused connectors in the source service.

## Before sharing a Bot

A public share link copies only the Bot's configuration (identity, description, skills, routines), not your computer or sign-ins. Anything written in the description, such as API keys, internal URLs or customer data, becomes public too, so remove it first.

## Removing access, in order

1. Pause or delete related routines
2. Sign out of websites on the shared computer
3. Uninstall connectors and revoke authorization in the source service
4. Remove sensitive files from `/workspace`
5. Hide or delete Bots you no longer need
6. Delete your Cursor account through account settings if needed

## Recommendations

- Connect only the tools each workflow needs; use scoped service accounts where supported.
- Start with read-only tasks and drafts.
- Keep sending, publishing, purchasing, deleting and production changes behind approval.
- Review connectors and active routines regularly; pause routines when a source system changes.
- Keep source links and an action log for important decisions.
