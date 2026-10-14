# GrokBotGuide

社区共建的 Grok Bot 实战手册 · The community playbook for Grok Bot

线上地址：<https://grokbotguide.ai>（中文 `/zh/`，英文 `/en/`，根路径按访问者地区自动跳转）

> GrokBotGuide 是独立的社区项目，与 xAI、SpaceXAI、Cursor 无隶属或授权关系。

## 技术栈

| 模块 | 选型 |
| --- | --- |
| 文档框架 | Astro 7 + Starlight 0.42（中英双语、Pagefind 搜索、sitemap） |
| 部署 | Cloudflare Workers 静态资源 + Workers Builds（连接 GitHub 自动部署） |
| 动态接口 | `worker/index.ts`：根路径语言路由、投稿表单、模板复制计数 |
| 数据库 | Cloudflare D1（模板复制次数） |
| 邮件 | Cloudflare Email Routing 转发 + Worker `send_email` 投稿通知 |
| 防刷 | Cloudflare Turnstile |

## 目录结构

```text
site.config.mjs              # 仓库地址、邮箱、Turnstile 公钥、GSC 验证码、GA4 衡量 ID
astro.config.mjs             # Starlight 配置（侧边栏、语言、组件覆盖）
wrangler.jsonc               # Cloudflare Worker / 静态资源 / D1 / 邮件配置
wrangler.redirect.jsonc      # www → 主域名的 301 跳转 Worker 配置
worker/index.ts              # 语言路由 + /api/submit + /api/copy + /api/copies
worker/redirect.ts           # www 跳转，保留路径和查询参数
worker/migrations/           # D1 表结构
src/content/docs/zh|en/      # 中英文内容（两边文件名一一对应）
src/data/resources.yaml      # 外部收录（只存标题、摘要、链接、署名）
src/data/changelog.yaml      # Grok Bot 更新日志
src/data/contributors.yaml   # 贡献者名单
src/data/sponsors.json       # 赞助商（为空时首页不显示赞助区）
src/components/              # 首页、卡片列表、模板复制、资源导航、投稿表单
src/components/overrides/    # 覆盖 Starlight 的标题、页脚、语言切换器
templates/                   # 投稿用的文章 / 角色卡 / 模板 / 收录条目模板
scripts/check-content.mjs    # 内容检查（CI 会跑）
```

## 本地开发

```bash
npm install
npm run dev              # http://localhost:4321/zh/ ，只有静态页面，/api 不可用
npm run check:content    # 检查 frontmatter、双语对照、收录重复
```

要连 Worker 一起测（语言跳转、投稿）：

```bash
cp .dev.vars.example .dev.vars
npm run preview          # 先构建，再用 wrangler dev 在 http://localhost:8787 运行
```

## 上线步骤（GitHub + Cloudflare + Dynadot）

分两步走：第一步只要 Cloudflare 账号就能上线，先跑在 `grokbotguide.<你的子域>.workers.dev`；域名接入后再做第二步。
数据库和邮件绑定在 `wrangler.jsonc` 里默认是注释掉的，没打开时站点照常运行：复制计数不显示，投稿只建 GitHub Issue。

当前部署地址：<https://grokbotguide.ai>，备用地址：<https://grokbotguide.zhuangniuthedev.workers.dev>。站点和 `www` 跳转 Worker 均已连接 Cloudflare Workers Builds，推送到 `main` 会自动构建并部署；预览构建暂未启用。本地运行 `npm run deploy` 部署站点，运行 `npm run deploy:redirect` 部署 `www` 跳转 Worker。

### 第一步：站点上线

1. **连接仓库**：Cloudflare → Workers & Pages → Create → Import a repository → 选 [JeffShanCha/grokbotguide](https://github.com/JeffShanCha/grokbotguide)。
   - Project name：`grokbotguide`（要和 `wrangler.jsonc` 的 `name` 一致）
   - Build command：`npm run build`
   - Deploy command：`npx wrangler deploy`
   - 之后 push 到 `main` 自动上线；如启用 Preview builds，其他分支也可以自动生成预览链接。
2. **域名**：`grokbotguide.ai` 已在 Dynadot 注册，域名继续由 Dynadot 管理。
3. **Cloudflare 接管 DNS**：已添加域名并选择 Free 计划。Dynadot 的 nameserver 已改为 `luciane.ns.cloudflare.com` 和 `vern.ns.cloudflare.com`，Cloudflare 状态已变成 Active。
4. **域名路由**：`wrangler.jsonc` 配置 `grokbotguide.ai/*` 的 Workers Route，由站点 Worker 处理所有页面和 API；`workers.dev` 地址也保留。`wrangler.redirect.jsonc` 将 `www.grokbotguide.ai/*` 交给独立的跳转 Worker，以 301 跳转到主域名并保留路径和查询参数。
   - 跳转 Worker `grokbotguide-www` 已单独连接同一 GitHub 仓库，Production branch 为 `main`，Build command 留空，Deploy command 为 `npm run deploy:redirect`。两个 Worker 使用各自的构建流程，保持 Cloudflare 对部署目标的校验。

### 第二步：投稿、通知与计数

5. **Email Routing**：Cloudflare → 域名 → Email → Email Routing 启用（自动加 MX/SPF）→ 添加目标地址 `zhuangniuthedev@gmail.com` 并在 Gmail 点验证 → 新建 `hello@` / `sponsor@` / `takedown@` 三条转发规则。
6. **D1 数据库**：Cloudflare → Storage & Databases → D1 → Create，名字填 `grokbotguide`，复制 Database ID。表会在第一次使用时自动创建，不需要跑迁移。
7. **打开绑定**：在 `wrangler.jsonc` 里去掉 `d1_databases` 和 `send_email` 两段的注释，填入 Database ID，并在 `vars` 的右花括号后加一个逗号，提交并推送。
8. **Turnstile**：Cloudflare → Turnstile → Add widget（域名 `grokbotguide.ai`），把 Site Key 填进 `site.config.mjs` 的 `turnstileSiteKey`，提交并推送。
9. **Secrets**：Worker → Settings → Variables and Secrets → Add，类型选 Secret：
   - `TURNSTILE_SECRET`：Turnstile 的 Secret Key
   - `GITHUB_TOKEN`：GitHub → Settings → Developer settings → Fine-grained tokens，只选本仓库，权限 Issues: Read and write
10. **收尾**：在 GitHub 仓库建 `submission`、`article`、`bot`、`template`、`resource`、`fix`、`good first article`、`topic`、`takedown`、`broken-links` 标签；按下文接入 GSC 和 GA4。

## 搜索收录（GSC）

2026-10-15 已为 `grokbotguide.ai` 创建网域资源并通过 Cloudflare DNS TXT 验证，`sitemap-index.xml` 已提交并成功处理。[打开本站 GSC](https://search.google.com/search-console?resource_id=sc-domain%3Agrokbotguide.ai)。当前采用 DNS 验证，代码中的 `googleSiteVerification` 留空。

在 [Google Search Console](https://search.google.com/search-console/) 添加站点，有两种验证方式：

- **网域资源（推荐）**：填 `grokbotguide.ai`，将 Google 提供的 TXT 记录添加到 Cloudflare → 域名 → DNS。记录名称填 `@`，内容使用完整的 `google-site-verification=…`。回到 GSC 点击验证；这种方式不需要填写代码中的 `googleSiteVerification`，可覆盖所有协议与子域名。
- **URL 前缀资源**：填 `https://grokbotguide.ai/`，选择「HTML 标记」，将 `<meta name="google-site-verification" content="…">` 中的 **content 值**填进 `site.config.mjs` 的 `googleSiteVerification`，不要粘贴整个标签。部署后中英文首页和文章页都会输出验证标签；根路径会跳转到对应语言首页，验证标签也在跳转后的页面中。回到 GSC 点击验证。HTML 标记不能验证网域资源。

验证通过后，在 GSC → 站点地图提交 `https://grokbotguide.ai/sitemap-index.xml`。站点构建时自动生成中英文页面的 sitemap，`public/robots.txt` 也已声明该地址。用「网址检查」检查 `/zh/`、`/en/` 和重要文章页；可请求编入索引，但提交 sitemap 不保证立即收录。验证完成后保留 DNS 记录或 HTML 验证码，Google 会定期重新检查。

官方说明：[所有权验证](https://support.google.com/webmasters/answer/9008080?hl=zh-Hans) · [站点地图报告](https://support.google.com/webmasters/answer/7451001?hl=zh-Hans)。

## 访问统计（GA4）

本站媒体资源为 `grokbotguide.ai`（ID `559001353`），网站数据流为 `GrokBotGuide Web`（ID `16129367479`），衡量 ID 为 `G-MJ72CNWDZD`，报告时区为中国时间（UTC+8）。[打开本站 GA4](https://analytics.google.com/analytics/web/?authuser=0#/a290268825p559001353/reports/intelligenthome)。

1. 在 [Google Analytics](https://analytics.google.com/) 新建媒体资源 → 添加「网站」数据流，网址填 `https://grokbotguide.ai`，保持「增强型衡量」开启（自动统计页面浏览、滚动、外链点击）。
2. 在 GA4 → 管理 → 数据流 → 对应网站数据流，复制衡量 ID（`G-` 开头），填进 `site.config.mjs` 的 `ga4MeasurementId`，提交并推送。使用衡量 ID，不是数字形式的媒体资源 ID / 数据流 ID，也不是 `GTM-` 开头的容器 ID。留空则不加载 GA4；格式错误会阻止构建。
3. 在 GA4 → 管理 → 自定义定义里，把下面三个事件参数注册为「事件范围」的自定义维度，报表里才能按它们拆分：`template_id`、`submission_type`、`language`。

站点额外上报的事件：

| 事件 | 触发时机 | 参数 |
| --- | --- | --- |
| `copy_template` | 点击模板的「复制模板」按钮 | `template_id` |
| `submit_contribution` | 投稿表单提交成功 | `submission_type`（article / bot / template / resource / fix） |
| `switch_language` | 顶栏手动切换语言 | `language`（zh / en） |

隐私设置：广告相关存储全部关闭，不开启 Google 信号；来自欧洲经济区、英国和瑞士的访问默认不写入统计 Cookie（GA4 的 Consent Mode），见 `astro.config.mjs`。

部署后访问中英文首页和文章页，通过 [Tag Assistant](https://tagassistant.google.com/) 检查 Google tag 是否加载，再到 GA4「实时」报告确认 `page_view`。复制一次模板可检查 `copy_template`；切换语言可检查 `switch_language`。普通报表处理较慢，以实时报告和 DebugView 为初次验证依据。站点根路径只负责语言跳转，不额外上报一次页面浏览。

官方说明：[Google tag 安装](https://developers.google.com/tag-platform/gtagjs) · [页面浏览统计](https://developers.google.com/analytics/devguides/collection/ga4/views) · [自定义事件](https://developers.google.com/analytics/devguides/collection/ga4/events)。

## 语言路由规则

只有访问根路径 `/` 时才跳转（302），文章页永远不自动跳转：

1. Cookie `lang`（用户在顶栏手动切换过）
2. 访问者地区为 CN / HK / MO / TW → 中文
3. 浏览器首选语言以 `zh` 开头 → 中文
4. 其他 → 英文

## 多平台资料采集

2026-10-15 首轮及应用 / Skill 补充批次共新增 19 条资料，资源总数 23 条；覆盖官方、GitHub、YouTube、Reddit、LINUX DO、arXiv、作者博客与供应商教程。4 条待核验、1 条重复、1 条无关内容保留在批次报告中。新增中文 / 英文教程、Notion / DataCamp 集成、写作与 Routine 检查 Skill；支持关键词、平台、分类和原文语言组合筛选，显示关联应用，各栏目自动引用相关收录。

检索与摘要由当前 Codex 对话执行，入库脚本负责 URL / 内容去重、分类校验、日期与出处检查。每条保存原创双语短摘要和核验范围，不将外部分享标为本站实测。

```bash
npm run collect -- data/collection/batches/<批次>.json          # 预览
npm run collect -- data/collection/batches/<批次>.json --write  # 入库并记录报告
npm run test:collection                                       # 去重与质量门槛测试
```

运行规范见 [docs/collection.md](./docs/collection.md)，来源见 [sources.json](./data/collection/sources.json)。按用户要求，首轮发布后在当前 Codex 对话启用每天北京时间 09:00 的定时采集；本地任务需要电脑开机、Codex 运行。Cloudflare 负责自动部署，不执行资料检索。

## 贡献

见 [CONTRIBUTING.md](./CONTRIBUTING.md) 或站内的「如何投稿」页面。

## 许可

- 站点代码：[MIT](./LICENSE)
- 文章内容：[CC BY-SA 4.0](./CONTENT_LICENSE.md)
