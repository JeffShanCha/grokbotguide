<p align="center">
  <a href="https://grokbotguide.ai/en/"><img src="./assets/readme/banner.svg" alt="GrokBotGuide: Grok Bot guides, templates and automation workflows" width="920" /></a>
</p>

<h3 align="center">A hands-on handbook for xAI Grok Bot: guides, Bot cards, templates and "Grok Bot × tool" recipes</h3>

<p align="center">
  <a href="https://grokbotguide.ai/en/"><img src="https://img.shields.io/badge/Docs-grokbotguide.ai-c2410c?style=flat-square" alt="Docs"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/stargazers"><img src="https://img.shields.io/github/stars/JeffShanCha/grokbotguide?style=flat-square&color=18181b" alt="Stars"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/network/members"><img src="https://img.shields.io/github/forks/JeffShanCha/grokbotguide?style=flat-square&color=52525b" alt="Forks"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/issues"><img src="https://img.shields.io/github/issues/JeffShanCha/grokbotguide?style=flat-square&color=2563eb" alt="Issues"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/code-MIT-f59e0b?style=flat-square" alt="Code License"></a>
  <a href="./CONTENT_LICENSE.md"><img src="https://img.shields.io/badge/content-CC%20BY--SA%204.0-16a34a?style=flat-square" alt="Content License"></a>
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-14b8a6?style=flat-square" alt="PRs Welcome"></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a>
  ·
  English
  ·
  <a href="https://grokbotguide.ai/en/">Read online</a>
  ·
  <a href="https://grokbotguide.ai/en/guide/">Learning path</a>
  ·
  <a href="https://grokbotguide.ai/en/start/what-is-grok-bot/">Get started</a>
  ·
  <a href="https://grokbotguide.ai/en/advanced/skills-and-routines/">Advanced</a>
  ·
  <a href="https://grokbotguide.ai/en/recipes/">Recipes</a>
  ·
  <a href="https://grokbotguide.ai/en/answers/">How-to & FAQ</a>
</p>

> From your first Bot to one that triages your inbox, checks your website, watches competitors and writes weekly reports every day.
> Every page shows its sources, check date and content grade. If this project saves you time, a Star helps more people find it.

## Read it online

**GrokBotGuide lives at [grokbotguide.ai](https://grokbotguide.ai/en/).** English is under `/en/` and Chinese under `/zh/`. The root domain first uses your saved language choice, then region and browser language. You can switch any time from the top bar.

<p align="center">
  <a href="https://grokbotguide.ai/en/">
    <img src="./assets/readme/en-home.png" alt="GrokBotGuide homepage: a centered search box, popular questions and two entry buttons" width="920" />
  </a>
</p>

This README gives you the overview. For learning, the website is better: full-text search, dropdown navigation, a sidebar, reading progress, one-click copyable prompts and a language switcher.

New to Grok Bot? Start with the [learning path](https://grokbotguide.ai/en/guide/). Have a use case already? Pick one from the [recipes](https://grokbotguide.ai/en/recipes/) by role.

## Using the current release

### Complete tutorials: practice before connecting real accounts

The [English overview](https://grokbotguide.ai/en/recipes/topics/) and [Chinese overview](https://grokbotguide.ai/zh/recipes/topics/) each contain **25 complete tutorials, 151 prompts and 134 downloadable files**: 50 tutorials, 302 prompts and 268 files across both languages. A separate bilingual [usage audit guide](https://grokbotguide.ai/en/recipes/usage-audit/) supplements the library. Existing recipe URLs still work, and the learning path, FAQ and resources link to the complete versions.

| Topic | Example tasks |
| --- | --- |
| [Office & information](https://grokbotguide.ai/en/recipes/topics/office/) | Gmail triage, meeting briefs, document summaries and Slack updates |
| [Content & growth](https://grokbotguide.ai/en/recipes/topics/content-growth/) | Repurposing content, audience tracking, competitor videos and portrait sites |
| [Engineering & site maintenance](https://grokbotguide.ai/en/recipes/topics/engineering/) | Website checks, GitHub PR monitoring and cloud coding handoffs |
| [Customer operations & support](https://grokbotguide.ai/en/recipes/topics/customer-support/) | Support queues, relationship tracking and sales call reviews |
| [Shopping & receipts](https://grokbotguide.ai/en/recipes/topics/purchasing/) | Invoice filing, price comparisons, marketplace watches and refund reviews |

Try the [complete Gmail tutorial](https://grokbotguide.ai/en/recipes/gmail-inbox-triage/):

1. Download `source-mails.json` and `label-rules.md`. Give the input and rules to your Bot for an independent attempt.
2. Copy each stage's prompt and inspect its deliverable and acceptance check.
3. After your attempt, use the practice tabs to compare the inputs, reference results and report. Download `practice-prompts.txt` to keep the full prompt set; other tutorials list their own files.
4. After the practice, follow the page's connection and permission instructions for a small real-account trial. Review the results before saving a Skill or scheduling a Routine.

Each page identifies synthetic practice, historical real tests and the scope of live-account validation. Practice panels display examples; you run the actual task in your own Grok Bot.

### Search, chapter links and keyword highlights

1. Open search from the homepage or top bar, or press `⌘K` / `Ctrl+K`. Search for an app, body text, a prompt field or a filename, such as `Gmail`, `message_id` or `classification.csv`.
2. Select a tutorial or chapter result. It opens in the current site language with matching words highlighted in the text and prompts.
3. Use **Previous / Next** to move between matches or **Clear highlights** to remove them. Refreshing or sharing the link keeps the query and chapter; copying a prompt still returns its complete text.

[Try the Gmail chapter highlight example](https://grokbotguide.ai/en/recipes/gmail-inbox-triage/?highlight=message_id#read-only-heading). The overview filters the tutorial list, the top-bar search covers full tutorial text and prompts, and the resource directory searches external entries separately.

Desktop dropdowns and the narrow-screen menu provide navigation. Theme and language controls are in the top bar; switching language opens the corresponding page.

### Usage audit: review first, change one thing at a time

Open the [usage audit guide](https://grokbotguide.ai/en/recipes/usage-audit/):

1. Identify your account type and record the time, visible usage and recent work as a baseline.
2. Inventory Bots and Routines: owner, trigger frequency, enabled state, latest useful output and failures.
3. Click **Copy template** for the review prompt. Ask for the inventory and one proposed change first; confirm before pausing, slowing down or narrowing a task.
4. Compare a similar amount of work afterward, including quality, omissions, latency and usage. Then keep the change, restore the setting or save the method as a Skill.

The guide also includes a small-sample checkpoint prompt and a retry boundary. Every Routine run uses allowance, including a quiet check. Source-checking limits are stated on the page; no savings percentage is promised.

## Why this exists

Grok Bot is not another chat box. It is xAI's "AI teammate": each Bot has a name, a job and long-term memory, and works on a cloud computer of its own. It signs in to sites and apps, takes a task from start to finish and only comes back when it needs your approval.

The hard part with a product like this is not learning the buttons. It is deciding what you can safely hand over. GrokBotGuide answers three questions:

- **How to start**: which plan, how to install, what your first Bot should own and how to brief its first task.
- **How to hand work over**: how to write clear requests, which actions must require approval, and how to turn a working flow into a skill and a scheduled routine.
- **How to use it for real work**: Gmail, Slack, X, Notion, GitHub, Stripe, Google Ads and more, each with steps, a copyable prompt and permission boundaries.

## Who it is for

- **First-time users**: five Get started pages take you from plan to first task in about 30 minutes.
- **People who want Bots running on their own**: learn skills, routines and approvals, and put manual work on a schedule.
- **Ops, marketing, support, sales and finance**: start from a recipe for your role and change a couple of lines.
- **Developers and site owners**: PR monitoring on GitHub, working with Cursor cloud agents, daily website checks.

## What you will find

| Section | What it covers |
| --- | --- |
| [Learning path](https://grokbotguide.ai/en/guide/) | Three routes (first time / run on its own / have a use case) with pages to read and reading time |
| [Get started](https://grokbotguide.ai/en/start/what-is-grok-bot/) | What Grok Bot is, which plan, install and sign in, create your first Bot, give it a first task |
| [Advanced](https://grokbotguide.ai/en/advanced/skills-and-routines/) | Skills and routines, approvals and security, teams of Bots |
| [Complete tutorials](https://grokbotguide.ai/en/recipes/topics/) | Five topics and 25 complete tutorials with staged prompts, practice panels, acceptance checks and downloads, plus a [usage audit](https://grokbotguide.ai/en/recipes/usage-audit/) supplement |
| [Bot cards and templates](https://grokbotguide.ai/en/bots/) | Ready-made Bot descriptions and boundaries, plus briefing, skill and routine templates |
| [How-to & FAQ](https://grokbotguide.ai/en/answers/) | Nine common questions: connecting Gmail, scheduling routines, fixing problems and more |
| [Resources](https://grokbotguide.ai/en/resources/) | 100+ official docs, blog posts, videos and X posts, summarized and linked to the original |
| [Changelog](https://grokbotguide.ai/en/news/changelog/) | Product and plan changes, each with an official source |

## A quick tour

### Top navigation: every guide one click away

Five dropdown menus cover the learning path, Get started, Advanced, Recipes and Resources, including popular recipes and counts by role.

<p align="center">
  <img src="./assets/readme/en-menu.png" alt="The Recipes dropdown: by role, popular recipes, Bot cards and templates" width="920" />
</p>

### Complete tutorials: choose a topic and check every stage

Use the [tutorial overview](https://grokbotguide.ai/en/recipes/topics/#all-cases) to search by tool or task and filter by topic. Each card lists its stages, prompts and downloadable files.

The [Gmail tutorial](https://grokbotguide.ai/en/recipes/gmail-inbox-triage/) includes complete inputs, practice tabs, reference outputs, chapter navigation and prompts for each stage. The [highlight example](https://grokbotguide.ai/en/recipes/gmail-inbox-triage/?highlight=message_id#read-only-heading) shows how to find the same keyword in prose and prompts.

### Learning path: pick a goal, then read in order

<p align="center">
  <img src="./assets/readme/en-guide.png" alt="The learning path page with three routes and reading time per page" width="920" />
</p>

### Light, dark and mobile

<p align="center">
  <img src="./assets/readme/en-theme.png" alt="The same guide in light and dark mode" width="920" />
</p>

<p align="center">
  <img src="./assets/readme/en-mobile.png" alt="Mobile: homepage, recipe page and side menu" width="920" />
</p>

## Suggested reading

### 1. First time

Read [What is Grok Bot?](https://grokbotguide.ai/en/start/what-is-grok-bot/), then [Which plan](https://grokbotguide.ai/en/start/plans/), [Install and sign in](https://grokbotguide.ai/en/start/install/), [Create your first Bot](https://grokbotguide.ai/en/start/first-bot/) and [Give it a first task](https://grokbotguide.ai/en/start/first-task/). Then try the [zero-risk recipe: summarize a long document](https://grokbotguide.ai/en/recipes/summarize-a-document/). No apps to connect.

### 2. Make it run on its own

Start with [Skills and routines](https://grokbotguide.ai/en/advanced/skills-and-routines/). Before scheduling anything, read [Approvals, security and privacy](https://grokbotguide.ai/en/advanced/approvals-and-security/). When you need several Bots, see [Teams of Bots](https://grokbotguide.ai/en/advanced/teams-of-bots/).

### 3. You have a use case

Open the [recipe library](https://grokbotguide.ai/en/recipes/) and filter by role, or start here: [Gmail inbox triage](https://grokbotguide.ai/en/recipes/gmail-inbox-triage/), [Slack daily standup](https://grokbotguide.ai/en/recipes/slack-daily-standup/), [Daily website check](https://grokbotguide.ai/en/recipes/website-daily-check/), [Reply @bot on X](https://grokbotguide.ai/en/recipes/x-tag-bot/).

## Quick links

| Page | When you need it |
| --- | --- |
| [Which plan](https://grokbotguide.ai/en/start/plans/) | The X Subscription, SuperGrok or Cursor; prices and what to know before linking |
| [Connect Gmail](https://grokbotguide.ai/en/answers/how-to-connect-grok-bot-to-gmail/) | Authorization, a drafts-only setup, and blocked work accounts |
| [Schedule routines](https://grokbotguide.ai/en/answers/how-to-schedule-grok-bot-routines/) | Time zones, minimum intervals, test runs and a checklist when a routine does not run |
| [Grok Bot not working?](https://grokbotguide.ai/en/answers/grok-bot-not-working/) | Sign-in, cloud computer, plugin and @bot problems, in the order to try |
| [Laptop closed?](https://grokbotguide.ai/en/answers/does-grok-bot-work-when-laptop-is-closed/) | The cloud computer versus your own machine |
| [Is Grok Bot safe?](https://grokbotguide.ai/en/answers/is-grok-bot-safe/) | What a shared cloud computer means and which actions need approval |
| [Five-part request](https://grokbotguide.ai/en/templates/five-part-request/) | A briefing template for any task |
| [Usage audit](https://grokbotguide.ai/en/recipes/usage-audit/) | Record a baseline, review Bots and Routines, and evaluate one proposed change |

## Structure

```text
GrokBotGuide
├─ guide        # Learning path
├─ start        # Get started (5 pages)
├─ advanced     # Advanced (3 pages)
├─ recipes      # 25 complete tutorials + a usage audit supplement
│  └─ topics    # Five topics and the complete tutorial overview
├─ bots         # Bot cards
├─ templates    # Briefing, skill and routine templates
├─ answers      # How-to & FAQ, organised by search intent
├─ resources    # External resources, summarized and linked
├─ news         # Changelog
└─ community    # Contribute, roadmap, about
```

Regular documents and metadata live in `src/content/docs/en/` and `src/content/docs/zh/`, with matching file names. Complete tutorial data mainly lives in `src/data/workflow-en/`, `src/data/workflow-topics/` and `src/data/office-preview.ts`; page and download routes are in `src/pages/en/recipes/` and `src/pages/zh/recipes/`. See the [development and deployment guide](./docs/DEVELOPMENT.md) for hosting configuration.

## Run it locally

Requirements:

- Node.js 22.12 or later (see [`.node-version`](./.node-version))
- npm

```bash
git clone https://github.com/JeffShanCha/grokbotguide.git
cd grokbotguide
npm install
npm run dev
```

Open <http://localhost:4321/en/> for English or <http://localhost:4321/zh/> for Chinese. Edits under `src/content/docs/` reload live. Development search builds its index from rendered pages on first use and refreshes it after source changes. The production build also indexes the full tutorial text and prompts.

After building, `npm run check:search` verifies 50 complete tutorials, their body text, 302 prompts and search results. `npm run check:english` checks English entry points, internal links and untranslated text; `npm run test:search` verifies highlighting and result links.

Build the static site and preview it:

```bash
npm run build
npx astro preview
```

Before sending a pull request, run the content check. It validates frontmatter, the English/Chinese pairing and duplicate resources:

```bash
npm run check:content
```

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), with Pagefind full-text search. The live site is [grokbotguide.ai](https://grokbotguide.ai/en/).

## Principles

- **Official sources first**: features, prices, availability and security follow xAI and Cursor's official docs, with a last-checked date on key pages.
- **Honest grades**: content distinguishes official sources, community reports, original tutorials and site tests. Practice materials and live-account operations have separate verification scopes; only work actually run step by step is marked tested.
- **Beginner-friendly**: an answer you can act on first, then the steps and the why.
- **Real tasks**: fewer concepts, more copyable prompts, inputs, outputs and checks.
- **Clear safety boundaries**: wherever sending, paying, deleting, signing in or the shared cloud computer is involved, we spell out what must require approval.
- **Credit the original**: for external resources we keep only the title, our own summary, a link and the author's name.

## Sources

We cite official material first and list sources at the bottom of every page:

- [Grok Bot docs](https://docs.x.ai/grok-bot/get-started)
- [Grok Bot FAQ](https://docs.x.ai/grok-bot/faq)
- [The X Subscription plans and usage](https://docs.x.ai/x-subscription/pricing)
- [Cursor Help Center: Grok Bot](https://cursor.com/help/grok-bot/plans)
- [Official Grok Bot guides](https://x.ai/bot/guides/getting-started)

## Contributing

Contributions we would love:

- Recipes you ran yourself (with the test date and plan).
- New "Grok Bot × tool" combinations, such as Shopify, Search Console, Linear or Discord.
- Common errors and how to fix them.
- Updates and corrections when the official docs change.

If you use GitHub, open a pull request after reading the [contributing guide](./CONTRIBUTING.md). Otherwise, use the [submission form](https://grokbotguide.ai/en/community/submit/) on the site.

## License

- Site code: [MIT](./LICENSE)
- Content: [CC BY-SA 4.0](./CONTENT_LICENSE.md); credit the source and share under the same license.

## Disclaimer

GrokBotGuide is an independent community project, not affiliated with or endorsed by xAI, SpaceXAI or Cursor. Grok and related names are trademarks of their respective owners. For time-sensitive details such as features, plans, prices and availability, check the official sources.
