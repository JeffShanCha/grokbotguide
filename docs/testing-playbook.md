# 旗舰案例实测流程

体验报告里最大的信任缺口是：全站没有一张截图、没有一份真实输出。这一步要用你自己的 SuperGrok 账号跑，下面是先跑哪几篇、每篇要留什么、跑完怎么改页面。

## 先跑这 5 篇

按风险从低到高排列，前一篇跑顺了再跑下一篇。

| 顺序 | 案例 | 为什么选它 | 需要的账号 |
| --- | --- | --- | --- |
| 1 | `recipes/summarize-a-document` | 不碰任何真实账号，最适合截「第一次用长什么样」 | 只要 Grok Bot |
| 2 | `recipes/gmail-inbox-triage` | 搜索意图最强的场景，问题页也在引用它 | 一个测试 Gmail（别用主邮箱） |
| 3 | `recipes/website-daily-check` | 能展示 Routine：定时、下次运行时间、每天的产出 | 一个你自己的网站 |
| 4 | `recipes/x-tag-bot` | Grok Bot 独有的玩法，X 上传播性最好 | 你的 X 账号 |
| 5 | `recipes/slack-daily-standup` | 展示团队场景和审批卡片 | 一个测试 Slack 工作区 |

## 每篇要留的东西

1. **3 张截图**，存到 `src/assets/tests/<案例 slug>/`：
   - `setup.png`：连接应用或创建 Bot 的那一步
   - `approval.png`：Bot 请求审批的卡片（没有审批的案例就截电脑视图）
   - `result.png`：最终产出
2. **一段真实输出**：Bot 最后交付的文字，贴进页面的代码块里。
3. **记录这几项**：测试日期、订阅档位、用到的应用、从派任务到交付的耗时、用量变化（Usage & Billing 里前后各看一次）、和文中步骤不一样的地方。

截图和输出发布前必须打码：邮箱地址、客户名、订单号、Token、Slack 频道里的他人名字。

## 跑完怎么改页面

1. 在案例正文末尾（「注意事项」之后）加实测记录。页面是 `.md` 的（比如 `summarize-a-document.md`），先把扩展名改成 `.mdx`：

   ```mdx
   import TestReport from '~/components/TestReport.astro';

   ## 本站实测

   <TestReport date="2026-10-20" plan="SuperGrok" apps="Gmail" duration="约 12 分钟" usage="每周用量约 3%" result="pass">

   ![整理后的收件箱清单](~/assets/tests/gmail-inbox-triage/result.png)

   和文中不一样的地方：……

   </TestReport>
   ```

   `result` 填 `pass`（照着做就跑通）、`partial`（跑通但有出入）或 `fail`（没跑通）。没跑通也照样发出来，同时把正文改正。

2. frontmatter 改三处：`grade: tested`、`needs_testing: false`、`last_verified: 2026-10-20`。页面顶部的「尚未亲测」提示会自动消失，标签变成「社区亲测」。
3. 英文版同步改，截图可以共用同一份。
4. 首页 Hero 右侧的对话演示，可以换成第 2 篇的真实截图。
