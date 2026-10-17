<p align="center">
  <a href="https://grokbotguide.ai/zh/"><img src="./assets/readme/banner.svg" alt="GrokBotGuide：Grok Bot 中文教程、角色模板与自动化工作流" width="920" /></a>
</p>

<h3 align="center">面向中文用户的 xAI Grok Bot 实战手册：教程、角色卡、模板和「Grok Bot × 工具」实战案例</h3>

<p align="center">
  <a href="https://grokbotguide.ai/zh/"><img src="https://img.shields.io/badge/Docs-grokbotguide.ai-c2410c?style=flat-square" alt="Docs"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/stargazers"><img src="https://img.shields.io/github/stars/JeffShanCha/grokbotguide?style=flat-square&color=18181b" alt="Stars"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/network/members"><img src="https://img.shields.io/github/forks/JeffShanCha/grokbotguide?style=flat-square&color=52525b" alt="Forks"></a>
  <a href="https://github.com/JeffShanCha/grokbotguide/issues"><img src="https://img.shields.io/github/issues/JeffShanCha/grokbotguide?style=flat-square&color=2563eb" alt="Issues"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/code-MIT-f59e0b?style=flat-square" alt="Code License"></a>
  <a href="./CONTENT_LICENSE.md"><img src="https://img.shields.io/badge/content-CC%20BY--SA%204.0-16a34a?style=flat-square" alt="Content License"></a>
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-14b8a6?style=flat-square" alt="PRs Welcome"></a>
</p>

<p align="center">
  简体中文
  ·
  <a href="./README_en.md">English</a>
  ·
  <a href="https://grokbotguide.ai/zh/">在线阅读</a>
  ·
  <a href="https://grokbotguide.ai/zh/guide/">学习路线</a>
  ·
  <a href="https://grokbotguide.ai/zh/start/what-is-grok-bot/">快速上手</a>
  ·
  <a href="https://grokbotguide.ai/zh/advanced/skills-and-routines/">进阶教程</a>
  ·
  <a href="https://grokbotguide.ai/zh/recipes/">实战案例</a>
  ·
  <a href="https://grokbotguide.ai/zh/answers/">常见问题</a>
</p>

> 从装好第一个 Bot，到让它每天替你整理收件箱、巡检网站、盯竞品、写周报。
> 每篇都标注来源、核对日期和内容分级。如果这个项目帮你省下了摸索时间，欢迎点亮 Star，让更多人看到它。

## 在线网站

**GrokBotGuide 的在线阅读地址是 [grokbotguide.ai](https://grokbotguide.ai/zh/)。** 中文在 `/zh/`，英文在 `/en/`，打开根域名会优先使用你上次选择的语言，再根据地区和浏览器语言跳转，也可以在右上角随时切换。

<p align="center">
  <a href="https://grokbotguide.ai/zh/">
    <img src="./assets/readme/zh-home.png" alt="GrokBotGuide 中文首页：居中搜索框、常搜问题和两个入口按钮" width="920" />
  </a>
</p>

README 适合快速了解项目，真正学习时更推荐打开网站：网站有站内搜索、顶部下拉导航、侧边栏目录、阅读进度、可一键复制的指令模板和中英文切换。

第一次接触 Grok Bot，直接从 [学习路线](https://grokbotguide.ai/zh/guide/) 开始；已经有具体场景，就去 [实战案例](https://grokbotguide.ai/zh/recipes/) 按岗位挑一个。

## 网站怎么用

直接打开网站即可阅读教程、查资料和复制模板。复制后的指令在你自己的 Grok Bot 中使用；本地开发和部署方法在下文。

### 从你的目标开始

| 你现在想做什么 | 从这里进入 | 使用方法 |
| --- | --- | --- |
| 第一次用 Grok Bot | [学习路线](https://grokbotguide.ai/zh/guide/#start) | 依次了解产品、选择订阅、安装登录、创建 Bot、派第一个任务，再试着[总结一份长文件](https://grokbotguide.ai/zh/recipes/summarize-a-document/) |
| 让任务定时运行 | [进阶路线](https://grokbotguide.ai/zh/guide/#advanced) | 按顺序阅读 Skills 与 Routines、审批与安全、多 Bot 协作 |
| 找一个具体场景 | [完整版教程总览](https://grokbotguide.ai/zh/recipes/topics/) | 按工具、任务或五个专题筛选，下载材料，按阶段练习并验收 |
| 配置一个专职 Bot | [角色卡](https://grokbotguide.ai/zh/bots/) | 选择角色，参考职责描述、权限边界和开场指令配置自己的 Bot |
| 直接套用指令 | [模板库](https://grokbotguide.ai/zh/templates/) | 选择指令、Skill 或 Routine 模板，点击「复制模板」，替换自己的数据来源、交付格式和审批检查点 |
| 看别人怎么用 | [资源导航](https://grokbotguide.ai/zh/resources/) | 搜索应用或主题，组合筛选分类、平台、原文语言，阅读摘要后打开原文 |
| 复盘额度与任务安排 | [用量审计](https://grokbotguide.ai/zh/recipes/usage-audit/) | 留下基线，排查重复或空跑任务，一次提出一项调整再比较结果 |
| 解决问题、跟进变化 | [常见问题](https://grokbotguide.ai/zh/answers/) · [更新日志](https://grokbotguide.ai/zh/news/changelog/) | 按问题查连接、定时任务、订阅和使用限制，或从更新日志查看官方公告 |

### 完整版教程：从材料练习到真实任务

[中文总览](https://grokbotguide.ai/zh/recipes/topics/)和[英文总览](https://grokbotguide.ai/en/recipes/topics/)各有 **25 篇完整版教程、151 段提示词、134 份下载材料**，共 50 篇、302 段提示词和 268 份文件。另有一篇双语[用量审计补充指南](https://grokbotguide.ai/zh/recipes/usage-audit/)。原案例地址继续可用，学习路线、FAQ 和资源页也已接到对应教程。

| 专题 | 适合的任务 |
| --- | --- |
| [办公与信息整理](https://grokbotguide.ai/zh/recipes/topics/office/) | Gmail 分类、日历简报、文档总结、Slack 信息整理 |
| [内容创作与增长](https://grokbotguide.ai/zh/recipes/topics/content-growth/) | 内容改写、粉丝记录、竞品视频、个人画像网站 |
| [开发与网站维护](https://grokbotguide.ai/zh/recipes/topics/engineering/) | 网站巡检、GitHub PR 跟踪、云端编码协作 |
| [客户经营与客服](https://grokbotguide.ai/zh/recipes/topics/customer-support/) | 客服队列、人脉整理、销售通话复盘 |
| [生活采购与票据](https://grokbotguide.ai/zh/recipes/topics/purchasing/) | 发票整理、比价、二手商品观察、退款审核 |

以 [Gmail 完整版](https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/)为例：

1. 先下载 `source-mails.json` 和 `label-rules.md`，把输入与规则交给 Bot，独立完成练习。
2. 按页面阶段复制提示词，检查每一步的交付物和验收点。
3. 完成后，用练习台切换输入、参考结果和报告进行对照，也可下载 `practice-prompts.txt` 留作复用。其他教程使用各自列出的材料文件。
4. 练习通过后，再按页面的连接与权限说明尝试自己的小批量任务，确认结果后再保存 Skill 或设置 Routine。

每篇会区分合成练习、历史实测和真实账号操作的验证范围；页面练习台用于查看示例，实际任务在你自己的 Grok Bot 中执行。

### 搜索、章节跳转与关键词高亮

1. 点击首页或顶栏搜索，也可按 `⌘K` / `Ctrl+K`。输入应用名、正文词组、提示词字段或文件名，例如 `Gmail`、`message_id`、`classification.csv`。
2. 点击结果中的教程或章节链接，进入对应语言的页面；关键词会在正文和提示词中高亮。
3. 用高亮栏的「上一处 / 下一处」逐个查看，或点击「清除高亮」。刷新和分享链接会保留关键词及章节位置；复制提示词仍得到完整原文。

[打开 Gmail 章节高亮示例](https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/?highlight=message_id#read-only-heading)。总览页的筛选用于缩小教程列表；顶栏全文搜索可以查正文和提示词，资源导航则单独搜索外部收录。

桌面端可通过顶栏菜单进入各栏目，窄屏可展开「菜单」；顶栏可切换主题和语言，语言切换会打开当前页面的对应版本。

### 用量审计：先复盘，一次只调整一项

打开[用量审计指南](https://grokbotguide.ai/zh/recipes/usage-audit/)：

1. 识别自己的账号类型，记录检查时间、可见用量和近期工作，留下可比较的基线。
2. 按指南列出 Bot 和 Routine 的负责人、触发频率、启用状态、最近有效结果及失败记录。
3. 点击「复制模板」，使用复盘提示词先列清单并提出一项调整建议；确认后再暂停、降频或缩小任务范围。
4. 用另一段相近工作量比较质量、遗漏、耗时和用量，再决定保留调整、恢复设置或保存为 Skill。

指南另附小样本验证与重试停点提示词。每次 Routine 运行都会使用额度，安静结束不代表检查免费；文中保留来源核验范围，不承诺节省比例。

### 复制一个模板试试

以[派活五要素](https://grokbotguide.ai/zh/templates/five-part-request/)为例：

1. 打开模板页，点击代码块上方的「复制模板」。
2. 将尖括号占位内容替换为你的结果、来源、约束、交付物和检查点。
3. 粘贴到 Grok Bot，先运行一次并检查结果；需要复用或定时执行时，再参考 [Skills 与 Routines](https://grokbotguide.ai/zh/advanced/skills-and-routines/)。

角色卡提供 Bot 职责与权限的写法，实战案例提供场景步骤和指令，模板库提供可复用的文本；可以围绕同一个任务搭配使用。

### 筛选外部资源

资源导航的搜索与站内全文搜索分开：这里可以按标题、应用、作者、标签和摘要查外部收录，再叠加「分类」「平台」「原文语言」筛选。例如，搜索 `Gmail` 后选择「实战案例」和 `X`，可以缩小到相关分享。

每条资源保留作者署名、原文链接、关联应用、日期和「核验范围」。点击标题打开原文，展开「核验范围」查看实际核对了什么。原文语言指来源页面的语言；切换本站语言会切换摘要语言。也可以直接打开[实战类资源](https://grokbotguide.ai/zh/resources/?category=recipes)或[模板类资源](https://grokbotguide.ai/zh/resources/?category=templates)。

### 查看来源与反馈

教程和案例会标注「依据官方文档」「来自社区实测」「本站实测」等来源分级，并提供参考来源及相应的核对、更新或测试信息。外部资源的「来源核验」记录核对原文的范围。具体分级规则见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

推荐链接、分享案例或反馈过时内容，可以使用[投稿表单](https://grokbotguide.ai/zh/community/submit/)，选择相应类型；推荐链接和纠错需填写对应网址。提交成功后可通过返回的 GitHub Issue 跟踪处理进度，联系方式为选填且不包含在公开 Issue 中。直接改文档请按[贡献说明](./CONTRIBUTING.md)提交 PR。新内容与资料收录经过审核后发布。

持续关注：[更新日志](https://grokbotguide.ai/zh/news/changelog/) · [作者的 X](https://x.com/shancha103) · [GitHub](https://github.com/JeffShanCha/grokbotguide)（可 Watch 仓库）。

## 项目愿景

Grok Bot 不是又一个聊天框。它是 xAI 推出的「AI 同事」：每个 Bot 有自己的名字、职责和长期记忆，在一台属于你的云端电脑上登录网站和应用，把一件事从头做到尾，只在需要审批时回来找你。

这类产品最难的不是「会不会用」，而是「敢不敢交给它」。GrokBotGuide 想回答三个问题：

- **怎么开始**：选哪个订阅、怎么装、第一个 Bot 该负责什么、第一个任务怎么派。
- **怎么交给它**：怎样写清楚要求，哪些动作必须设成审批，怎么把跑通的流程存成 Skill 和定时 Routine。
- **怎么用到真实工作里**：Gmail、Slack、X、Notion、GitHub、Stripe、Google Ads……每个组合都给出步骤、可复制的指令和权限边界。

## 适合谁

- **第一次用 Grok Bot 的新手**：跟着 5 篇快速上手，约 30 分钟跑通从订阅到第一个任务的完整闭环。
- **想让 Bot 每天自动干活的人**：学会 Skills、Routines 和审批设置，把手动流程变成定时任务。
- **运营、市场、客服、销售、财务**：按岗位找现成方案，复制指令改两行就能用。
- **开发者和独立站站长**：GitHub PR 巡检、Cursor 云端 Agent 协作、每日网站巡检。
- **中国用户**：订阅、付款、网络环境和 X 上的 @grok 有什么区别，有一页专门讲清楚。

## 你会在这里看到什么

| 内容 | 说明 |
| --- | --- |
| [学习路线](https://grokbotguide.ai/zh/guide/) | 按「第一次用 / 想让它自动跑 / 有具体场景」分三条路，每条列出要读的页面和阅读时间 |
| [快速上手](https://grokbotguide.ai/zh/start/what-is-grok-bot/) | Grok Bot 是什么、订阅怎么选、安装登录、创建第一个 Bot、派第一个任务 |
| [进阶教程](https://grokbotguide.ai/zh/advanced/skills-and-routines/) | Skills 与 Routines、审批与安全、多 Bot 协作 |
| [完整版教程](https://grokbotguide.ai/zh/recipes/topics/) | 五个专题、25 篇完整教程，附阶段提示词、练习台、验收和下载；另有[用量审计](https://grokbotguide.ai/zh/recipes/usage-audit/)补充指南 |
| [角色卡与模板](https://grokbotguide.ai/zh/bots/) | 写好的 Bot 职责描述、权限边界，以及派活指令、Skill、Routine 模板 |
| [常见问题](https://grokbotguide.ai/zh/answers/) | 怎么连接 Gmail、怎么设置定时任务、用不了怎么办、国内能不能用等 9 个高频问题 |
| [资源导航](https://grokbotguide.ai/zh/resources/) | 100 多条官方文档、作者博客、视频和 X 帖子，只写摘要并链接原文 |
| [更新日志](https://grokbotguide.ai/zh/news/changelog/) | Grok Bot 产品与订阅变化，每条附官方来源 |

## 网站一览

### 顶部导航：所有教程一步直达

五个下拉菜单把学习路线、快速上手、进阶教程、实战案例、资源与社区都收在顶部，热门案例和按岗位的篇数也在里面。

<p align="center">
  <img src="./assets/readme/zh-menu.png" alt="顶部「实战案例」下拉菜单：按岗位、热门案例、角色卡和模板" width="920" />
</p>

### 完整版教程：按专题挑选，按阶段验收

[教程总览](https://grokbotguide.ai/zh/recipes/topics/#all-cases)可以按工具或任务搜索，也可以按五个专题筛选。每张卡片列出阶段、提示词和下载文件数。

打开 [Gmail 教程](https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/)后，可以查看完整输入、切换练习台的参考结果、按目录跳转，并复制每个阶段的指令。[搜索高亮示例](https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/?highlight=message_id#read-only-heading)演示如何在正文与提示词之间定位同一关键词。

### 学习路线：先选目标，再按顺序读

<p align="center">
  <img src="./assets/readme/zh-guide.png" alt="学习路线页：三条路线、每篇的阅读时间" width="920" />
</p>

### 浅色、深色和手机端

<p align="center">
  <img src="./assets/readme/zh-theme.png" alt="同一篇教程的浅色和深色模式对比" width="920" />
</p>

<p align="center">
  <img src="./assets/readme/zh-mobile.png" alt="手机端：首页、案例文章和侧边菜单" width="920" />
</p>

## 推荐阅读路径

### 1. 第一次上手

先读 [Grok Bot 是什么](https://grokbotguide.ai/zh/start/what-is-grok-bot/)，再看 [订阅怎么选](https://grokbotguide.ai/zh/start/plans/)、[安装与登录](https://grokbotguide.ai/zh/start/install/)、[创建第一个 Bot](https://grokbotguide.ai/zh/start/first-bot/) 和 [派第一个任务](https://grokbotguide.ai/zh/start/first-task/)。读完先跑一遍 [零风险案例：让 Bot 总结一份长文件](https://grokbotguide.ai/zh/recipes/summarize-a-document/)，不需要连接任何应用。

### 2. 想让它每天自动跑

从 [Skills 与 Routines](https://grokbotguide.ai/zh/advanced/skills-and-routines/) 开始，设定时任务之前一定先读 [审批、安全与隐私](https://grokbotguide.ai/zh/advanced/approvals-and-security/)，需要多个 Bot 配合时再看 [多 Bot 协作](https://grokbotguide.ai/zh/advanced/teams-of-bots/)。

### 3. 有具体场景

打开 [实战案例库](https://grokbotguide.ai/zh/recipes/) 按岗位筛选，或者直接从这几篇开始：[Gmail 每天整理收件箱](https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/)、[Slack 每日站会摘要](https://grokbotguide.ai/zh/recipes/slack-daily-standup/)、[每天早上巡检网站](https://grokbotguide.ai/zh/recipes/website-daily-check/)、[在 X 帖子下 @bot](https://grokbotguide.ai/zh/recipes/x-tag-bot/)。

## 快速入口

| 页面 | 适合解决什么问题 |
| --- | --- |
| [订阅怎么选](https://grokbotguide.ai/zh/start/plans/) | X 订阅、SuperGrok 还是 Cursor；各档价格和关联前必须知道的事 |
| [中国用户须知](https://grokbotguide.ai/zh/answers/grok-bot-in-china/) | 国内能不能用、怎么付款、和 X 上的 @grok 有什么区别 |
| [怎么连接 Gmail](https://grokbotguide.ai/zh/answers/how-to-connect-grok-bot-to-gmail/) | 授权步骤、只出草稿的权限设置、公司邮箱被拦怎么办 |
| [怎么设置定时任务](https://grokbotguide.ai/zh/answers/how-to-schedule-grok-bot-routines/) | 时区、最小间隔、Test run，以及 Routine 没运行的排查清单 |
| [用不了怎么办](https://grokbotguide.ai/zh/answers/grok-bot-not-working/) | 登录、云电脑、插件授权、@bot 没反应等常见问题的处理顺序 |
| [关掉电脑还能运行吗](https://grokbotguide.ai/zh/answers/does-grok-bot-work-when-laptop-is-closed/) | 云端电脑和本地电脑的区别 |
| [Grok Bot 安全吗](https://grokbotguide.ai/zh/answers/is-grok-bot-safe/) | 共享云电脑意味着什么，哪些动作一定要审批 |
| [派活五要素](https://grokbotguide.ai/zh/templates/five-part-request/) | 任何任务都能套用的指令模板 |
| [用量审计](https://grokbotguide.ai/zh/recipes/usage-audit/) | 记录基线、复盘 Bot 与 Routine、检查一次调整是否值得保留 |

## 内容框架

```text
GrokBotGuide
├─ guide        # 学习路线
├─ start        # 快速上手（5 篇）
├─ advanced     # 进阶教程（3 篇）
├─ recipes      # 25 篇完整版教程 + 用量审计补充指南
│  └─ topics    # 五个专题与完整版总览
├─ bots         # 角色卡
├─ templates    # 派活指令、Skill、Routine 模板
├─ answers      # 常见问题（按搜索意图组织）
├─ resources    # 资源导航（外部资料只写摘要并链接原文）
├─ news         # 更新日志
└─ community    # 投稿、路线图、关于
```

常规文档和元数据在 `src/content/docs/zh/` 与 `src/content/docs/en/`，两边文件名一一对应。完整版教程的数据主要在 `src/data/workflow-topics/`、`src/data/office-preview.ts` 和 `src/data/workflow-en/`，页面及下载入口在 `src/pages/zh/recipes/` 与 `src/pages/en/recipes/`。部署配置见 [开发与部署说明](./docs/DEVELOPMENT.md)。

## 本地预览

环境要求：

- Node.js 22.12 及以上（版本见 [`.node-version`](./.node-version)）
- npm

```bash
git clone https://github.com/JeffShanCha/grokbotguide.git
cd grokbotguide
npm install
npm run dev
```

打开 <http://localhost:4321/zh/> 就能看到中文站，<http://localhost:4321/en/> 是英文站。改动 `src/content/docs/` 下的文章会实时刷新。

开发模式也支持全文搜索：首次打开搜索时，按当前页面生成索引，包含中英文共 50 篇完整版教程的正文与提示词；后续修改内容后刷新页面再搜索，索引会自动更新。构建版本生成同样的教程全文索引，并与 Starlight 的 Pagefind 结果合并。中文词组、提示词和文件名使用全文匹配，结果直接指向原案例地址及对应章节。

从搜索结果进入页面后，正文与提示词会高亮命中的关键词，可用“上一处 / 下一处”切换或清除高亮。刷新和分享链接会保留关键词与章节位置；高亮不会改变复制出的提示词。

构建后可运行 `npm run check:search`，检查中英文共 50 篇教程、全部正文段落、302 段提示词和搜索结果；`npm run check:english` 检查英文入口、站内链接和中文残留，`npm run test:search` 检查高亮与跳转逻辑。

构建静态站点并本地预览：

```bash
npm run build
npx astro preview
```

提交前可以跑一遍内容检查，它会检查 frontmatter、中英文对照和外部资料是否重复：

```bash
npm run check:content
```

本站使用 [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) 构建，内置 Pagefind 全文搜索。线上版本发布在 [grokbotguide.ai](https://grokbotguide.ai/zh/)。

## 设计原则

- **官方优先**：功能、价格、可用性、安全策略以 xAI 和 Cursor 官方资料为准，关键页面标注最后核对日期。
- **如实分级**：内容区分官方依据、社区作者分享、本站原创教程和本站实测；练习材料与真实账号操作分别说明验证范围，只有真正按步骤跑通的内容才标本站实测。
- **新手友好**：先给能直接照做的答案，再展开步骤和原因。
- **真实任务导向**：少讲概念，多给可复制的指令、输入、输出和检查方式。
- **安全边界清晰**：涉及发送、付款、删除、登录和共享云电脑时，明确写出哪些动作必须设成审批。
- **尊重原作者**：外部资料只写标题、自己写的摘要、原文链接和署名，不搬运原文和图片。

## 事实来源

本站优先引用官方资料，并在页面底部列出每篇的参考来源：

- [Grok Bot 官方文档](https://docs.x.ai/grok-bot/get-started)
- [Grok Bot FAQ](https://docs.x.ai/grok-bot/faq)
- [The X Subscription 套餐与用量](https://docs.x.ai/x-subscription/pricing)
- [Cursor 帮助中心：Grok Bot](https://cursor.com/help/grok-bot/plans)
- [Grok Bot 官方使用指南](https://x.ai/bot/guides/getting-started)

## 参与贡献

欢迎提交：

- 你亲自跑通的实战案例（写明测试日期和订阅档位）。
- 新的「Grok Bot × 工具」组合，比如 Shopify、Search Console、飞书、Linear。
- 常见错误和解决方法。
- 官方文档变更后的内容更新和纠错。

会用 GitHub 就提 PR，先读 [贡献指南](./CONTRIBUTING.md)；不想碰 Git，用站内的 [投稿表单](https://grokbotguide.ai/zh/community/submit/)。

## 开源协议

- 站点代码：[MIT](./LICENSE)
- 文章内容：[CC BY-SA 4.0](./CONTENT_LICENSE.md)，转载请署名并以相同协议分享。

## 声明

GrokBotGuide 是社区维护的独立项目，与 xAI、SpaceXAI、Cursor 无隶属或授权关系。Grok 及相关名称是其各自所有者的商标。涉及功能、套餐、价格和可用性等时间敏感信息时，请以官方资料为准。
