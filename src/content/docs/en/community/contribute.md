---
title: How to contribute
description: Two ways to contribute, content grades, review criteria and credit.
sidebar:
  order: 1
---

**If you use GitHub, open a pull request. If not, use the [submission form](/en/community/submit/).** Both end up in the same repository. Content is licensed CC BY-SA 4.0 and code is MIT.

## Option 1: pull request

1. Fork the repo and copy `templates/article.md` (`templates/bot.md` for Bot cards, `templates/template.md` for templates).
2. Put it at `src/content/docs/en/<section>/<slug>.md`.
3. Open a pull request. Writing in just one language is fine; maintainers add the other.
4. CI checks frontmatter, the build and links.
5. Once merged, it deploys automatically with your name at the top and "Edit page" at the bottom.

## Option 2: submission form

Prefer not to use Git? [Submit here](/en/community/submit/). The form creates a GitHub issue and maintainers publish it under your name.

## Content grades

| Label | Meaning | Requirement |
| --- | --- | --- |
| From official docs | Based on docs.x.ai and other official sources | Every fact links to the official source |
| From community reports | Someone else's published hands-on report (blog, video, X post) | Link and credit the original; upgraded to Community tested once reproduced |
| Community tested | The author ran it | State the test date, plan tier and apps used |
| Opinion / review | Personal judgment | Clearly marked as opinion |

## Review criteria

- Tested by the author (required for recipes, Bot cards and templates)
- Permission settings and usage notes included
- No emails, customer names or tokens in screenshots
- Not a duplicate of existing content
- If based on someone else's work, substantially rewritten and listed in `sources`

Maintainers aim to respond within 72 hours.

## Re-verification

Every page has a `last_verified` date. After 60 days it is flagged for re-verification; anyone can rerun the steps, update the date and open a pull request.

## Credit

- Your name at the top of the page, linked to your GitHub
- The contributor wall on the homepage (add yourself to `src/data/contributors.yaml`)
