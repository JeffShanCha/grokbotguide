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
worker/index.ts              # 语言路由 + /api/submit + /api/copy + /api/copies
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

要连 Worker 一起测（语言跳转、复制计数、投稿）：

```bash
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run preview          # 先构建，再用 wrangler dev 在 http://localhost:8787 运行
```

## 上线步骤（GitHub + Cloudflare + Dynadot）

1. **域名**：在 Dynadot 买 `grokbotguide.ai`。
2. **Cloudflare 接管 DNS**：Cloudflare 添加站点（Free 计划即可），把分配的两个 nameserver 填回 Dynadot，等状态变成 Active。
3. **GitHub**：公开仓库为 [JeffShanCha/grokbotguide](https://github.com/JeffShanCha/grokbotguide)，推送到 `main`；`site.config.mjs` 里的 `repo` 和 `wrangler.jsonc` 里的 `GITHUB_REPO` 已配置为该仓库。
4. **D1 数据库**：
   ```bash
   npx wrangler login
   npx wrangler d1 create grokbotguide     # 把返回的 database_id 填进 wrangler.jsonc
   npm run db:migrate                       # 在线上建表
   ```
5. **Email Routing**：Cloudflare → Email → Email Routing 启用（自动加 MX/SPF）→ 添加目标地址 `zhuangniuthedev@gmail.com` 并在 Gmail 点验证 → 新建 `hello@` / `sponsor@` / `takedown@` 三条转发规则。
6. **Turnstile**：Cloudflare → Turnstile 新建站点（域名 `grokbotguide.ai`），把 Site Key 填进 `site.config.mjs` 的 `turnstileSiteKey`，Secret Key 用下一步设置。
7. **Secrets**：
   ```bash
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put GITHUB_TOKEN    # fine-grained token，只给本仓库 Issues: Read and write
   ```
8. **部署**：Cloudflare → Workers & Pages → Create → 导入 GitHub 仓库；构建命令 `npm run build`，部署命令 `npx wrangler deploy`。之后 push 到 `main` 自动上线，其他分支自动生成预览链接。
9. **域名绑定**：Worker → Settings → Domains & Routes 添加 `grokbotguide.ai`；`www` 用重定向规则 301 到主域名。
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
