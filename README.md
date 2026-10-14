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
site.config.mjs              # 仓库地址、知识星球链接、邮箱、Turnstile 公钥：上线前改这里
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
10. **收尾**：在 GitHub 仓库建 `submission`、`article`、`bot`、`template`、`resource`、`fix`、`good first article`、`topic`、`takedown`、`broken-links` 标签；在 Cloudflare Web Analytics 创建站点，把 token 填进 `astro.config.mjs` 里注释掉的统计脚本。

## 语言路由规则

只有访问根路径 `/` 时才跳转（302），文章页永远不自动跳转：

1. Cookie `lang`（用户在顶栏手动切换过）
2. 访问者地区为 CN / HK / MO / TW → 中文
3. 浏览器首选语言以 `zh` 开头 → 中文
4. 其他 → 英文

## 贡献

见 [CONTRIBUTING.md](./CONTRIBUTING.md) 或站内的「如何投稿」页面。

## 许可

- 站点代码：[MIT](./LICENSE)
- 文章内容：[CC BY-SA 4.0](./CONTENT_LICENSE.md)
