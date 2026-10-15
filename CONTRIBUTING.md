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

- 实战案例、角色卡、模板必须**亲测**，填写 `grade: tested` 和 `last_verified`。
- 截图和指令里不能有邮箱、客户名、Token、内部网址。
- 不搬运别人的原文和图片；参考别人的内容时实质改写，并列在 `sources` 里。
- 外部收录只写标题、自己写的 2–3 句摘要、原文链接和作者。

## 内容分级

| `grade` | 含义 |
| --- | --- |
| `official` | 整理自官方文档，每条事实链接到官方原文 |
| `community` | 整理自他人公开分享的实测，链接原文并署名 |
| `tested` | 作者亲测，写明测试日期、订阅档位、用到的应用 |
| `opinion` | 个人观点或评测 |
