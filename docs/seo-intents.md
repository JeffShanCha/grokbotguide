# 搜索意图问题页（待验证）

`src/content/docs/{zh,en}/answers/` 下的每一页对应一个**候选搜索意图**。这些意图是根据产品功能和新手常见卡点推测的，**还没有用搜索数据确认过搜索量**。上线后要用 Google Search Console（GSC）的数据逐个验证，保留有效的，合并或删掉无效的。

## 候选意图与页面

| # | 候选意图（英文查询） | 中文对应 | 页面 slug | 来源 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 1 | how to connect grok bot to gmail | Grok Bot 怎么连接 Gmail | how-to-connect-grok-bot-to-gmail | 用户提出 | 待验证 |
| 2 | how to schedule grok bot routines | Grok Bot 怎么设置定时任务 | how-to-schedule-grok-bot-routines | 用户提出 | 待验证 |
| 3 | grok bot not working | Grok Bot 用不了怎么办 | grok-bot-not-working | 用户提出 | 待验证 |
| 4 | best grok bot templates for seo | Grok Bot SEO 模板 | grok-bot-templates-for-seo | 用户提出 | 待验证 |
| 5 | grok bot vs cursor plan | Grok Bot 订阅怎么选 | grok-bot-vs-cursor-plans | 用户提出 | 待验证 |
| 6 | how to connect grok bot to slack | Grok Bot 怎么连接 Slack | how-to-connect-grok-bot-to-slack | 补充 | 待验证 |
| 7 | does grok bot work when laptop is closed | 关掉电脑还能运行吗 | does-grok-bot-work-when-laptop-is-closed | 补充 | 待验证 |
| 8 | is grok bot safe | Grok Bot 安全吗 | is-grok-bot-safe | 补充 | 待验证 |

## 页面写法约定

- title 用用户会搜的问句；正文第一段是 2～3 句能直接执行的答案（加粗关键操作），方便被摘要和 AI 搜索引用。
- 之后是步骤、排障、常见追问（同时写进 FAQPage 结构化数据）、相关阅读。
- 每页都列来源，`needs_testing: true`，本站亲测后改成 `grade: tested` 并填 `last_verified`。
- 首批页面是批量生成的，之后以 `.md` 文件本身为准，直接编辑即可。

## 怎么验证（上线约 4 周后）

1. GSC → 效果 → 网页，筛选 URL 包含 `/answers/`，看每页的展示次数、点击次数、平均排名。
2. 点进单个页面 → 查询，看实际带来展示的搜索词：
   - 查询和页面意图一致：保留，按真实查询词微调 title 和第一段。
   - 带来展示的是别的问题：考虑新建一页，或把内容挪到更合适的页面。
   - 4～8 周展示几乎为零：合并进相关教程页，旧 URL 做 301 跳转。
3. GSC 查询里出现、但还没有页面的问题，加到上表，状态标「新发现」。
4. 每次验证后更新上表的「状态」列：已验证 / 调整中 / 已合并。
