# 参与贡献 / Contributing

完整说明见站内页面：[如何投稿](https://grokbotguide.ai/zh/community/contribute/) · [How to contribute](https://grokbotguide.ai/en/community/contribute/)

## 快速开始

1. Fork 本仓库，从 `templates/` 复制对应模板：
   - 教程 / 实战案例：`templates/article.md` → `src/content/docs/zh/<start|advanced|recipes>/<slug>.md`
   - 角色卡：`templates/bot.md` → `src/content/docs/zh/bots/<slug>.md`
   - 模板：`templates/template.md` → `src/content/docs/zh/templates/<slug>.mdx`
   - 外部收录：把 `templates/resource.yaml` 的内容加到 `src/data/resources.yaml` 最上面
2. 只写一种语言也可以，维护者会补另一种。中英文件名必须一致。
3. 本地运行 `npm run check:content`，然后提 PR。
4. 合并后把自己加到 `src/data/contributors.yaml`。

## 必须遵守

- **如实标注分级**：只有亲自按步骤跑通的才填 `grade: tested`，同时填 `last_verified` 和 `tested_plan`（订阅档位）；依据官方文档的填 `official` 和核对日期 `last_checked`，来自他人公开实测的填 `community`，都要在 `sources` 里附来源。没有实测过的页面绝不能标成 `tested`。
- 截图和指令里不能有邮箱、客户名、Token、内部网址。
- 不搬运别人的原文和图片；参考别人的内容时实质改写，并列在 `sources` 里。
- 外部收录只写标题、自己写的 2–3 句摘要、原文链接和作者。

## 内容分级

| `grade` | 含义 |
| --- | --- |
| `official` | 依据官方文档，每条事实链接到官方原文；页面显示「依据官方文档 · 核对于 {last_checked}」 |
| `community` | 来自原作者公开分享的实测，链接原文并署名；页面显示「来自社区实测 · 原作者 …」 |
| `tested` | 本站或投稿者按步骤亲自跑通，写明测试日期（`last_verified`）、订阅档位（`tested_plan`）、用到的应用；页面显示「✓ 本站实测」 |
| `opinion` | 个人观点或评测 |

`needs_testing` 只用于内部跟踪；完整案例页面另外明确展示资料与实操的核验状态。`npm run check:content` 会打印还没实测的页面清单。

## 完整案例的边界与核验记录

完整交互案例由 `src/data/workflow-topics/`、`src/data/workflow-en/` 与 Gmail 专用组件生成，手册案例位于 `src/content/docs/{zh,en}/recipes/`。在 `src/data/case-governance.json` 为每个案例 slug 单独维护以下记录；不要把日期写进通用组件：

- `boundaries`：中英文的可自动执行、需要确认、失败后接管；写明具体对象、停止位置、人工检查和防重复执行方法。
- `updatedOn`：该案例内容实际编辑的日期，与核验日期分开。
- `documentation`：确实查阅来源并核对本案例后才填写 `checkedOn: YYYY-MM-DD`，同时在双语 `note` 中写清核对范围；未核验填 `null`。新核验记录填写 `status`（`unverified`、`partial` 或 `verified`）及公开脱敏的 `evidenceUrl`；有日期但没有明确状态的旧记录只显示为历史记录。没有逐篇记录的旧模板日期不能沿用。
- `execution`：未实操填 `status: unverified`、`verifiedOn: null`；部分核验填 `partial` 并列出未通过项；只有记录范围内通过才填 `verified`。实际核验后填写日期、双语范围说明和公开脱敏的 `evidenceUrl`，不能用合成练习、页面自查或来源核验代替。
- 实操尝试被阻塞时，可记录 `execution.lastAttemptOn` 和证据，仍保留 `unverified` 与 `verifiedOn: null`。尝试日期、Bot 自报完成、工具目录显示已连接，都不代表真实数据读取或整篇流程通过。资料核验、独立检查、Bot 原始执行、人工复核分别注明；缺失或截断的工具记录要明说。不要公开账号内容、凭据、无关私聊或思考过程。

已有历史日期仅表示当时记录的范围；翻译或编辑页面不算重新核验。新增案例必须同时补齐记录。运行 `npm run check:content` 检查元数据，构建后运行 `node scripts/check-case-governance.mjs --built` 检查中英文实际页面是否完整展示边界和核验状态。

手册案例标 `format: handbook`，在第一段操作内容前插入 `CaseBoundaries`，文末用 `CaseVerification` 展示核验记录；英文传入 `english`。两种组件的 `slug` 必须对应本案例记录。手册已有 `last_checked` 时须与该记录一致；更正日期需要同时更新来源范围说明。

发布后运行 `node scripts/check-case-governance.mjs --live https://grokbotguide.ai`，逐页确认生产环境的边界、日期和核验状态与本次提交一致。
