import { completeTopic, commonSources, jsonFile, textFile, csv } from './types.ts';

export const sourceArticle = `# 先把结果定义清楚，再安排自动化
作者：shancha｜合成练习文章｜2026-10-17

[F01] 本次练习使用 8 封合成邮件，涉及需求确认、等待反馈、账单、收据、订阅、资料和上下文不足的询问。它们不来自生产邮箱。
[F02] 分类规则采用 6 个业务标签，并用 Review 留下需要人工判断的例外。一封邮件在本流程中只选一个主标签。
[F03] 练习交付包含一张分类表、两份回复草稿和一页每日简报。草稿只展示在练习页面，没有写入 Gmail，也没有发送。
[F04] 会议时间、报价和交付日期没有得到确认时，回复只能说明待核对，不能替用户承诺。
[F05] 建议先用少量样例验证规则，再单独核对真实邮箱中的工具能力和写入范围，最后才考虑保存 Skill 或设置 Routine。
[F06] 这次没有测量节省时间、分类准确率或收入变化；真实邮箱自动化尚未验证。不能从练习结果推导效率提升数字。

这篇文章希望传达的是一种工作顺序：先确定交付物和验收条件，把不确定的信息留下来，然后再决定哪部分值得重复运行。内容改写也沿用这条原则：每个具体判断都能追到原文，排期与发布由作者决定。`;
export const xPosts = [
	'1/ 我用 8 封合成邮件练习了一套收件箱整理流程：先定义分类规则，再看分类表、回复草稿和每日简报。这里分享练习方法，真实邮箱流程仍待验证。',
	'2/ 规则是 6 个业务标签，再加 Review 处理不确定项。上下文不够时，先留下问题；一封邮件只选一个本流程主标签。',
	'3/ 这组样例有两份回复草稿。会议时间、报价和交付日期尚未确定时，草稿只说明待核对，保留给人做决定。',
	'4/ 下一步的顺序：样例校准 → 核对真实连接能力 → 小批试跑 → 验收后保存 Skill → 再考虑 Routine。每个阶段单独看结果。',
	'5/ 本次没有测量节省时间或准确率，也没有写入真实 Gmail。先把输入、预期结果和例外说清楚，再判断自动化是否值得继续。',
];
export const linkedinPost = `这次用 8 封合成邮件做了一个流程练习，重点放在“交付物是否说得清楚”。

输出是一张分类表、两份回复草稿和一页每日简报。6 个业务标签之外，保留 Review 处理上下文不足的邮件。

我特别关注两件事：一是每条判断能回到原邮件，二是未知的时间、报价和交付日期不会被草稿擅自确认。

练习之后，仍需要核对真实 Gmail 连接能力、小批试跑与人工验收，才能讨论 Skill 和 Routine。本次未测量节省时间或准确率，也没有写入真实邮箱。

你的重复工作里，哪一份交付物最值得先定义清楚？`;
export const draftPayload = { draft_title: '邮件整理练习：先定义结果', share: false, platforms: { x: { enabled: true, posts: xPosts.map(text => ({ text })) }, linkedin: { enabled: true, posts: [{ text: linkedinPost }] } } };
const draftRows = [...xPosts.map((post, i) => [`X-${i + 1}`, 'X 串文', ['F01 F03 F06', 'F02', 'F03 F04', 'F05', 'F06'][i], post]), ['LI-01', 'LinkedIn', 'F01—F06', linkedinPost]];

export const contentTopic = completeTopic({
	id: 'content-growth', number: '02', title: '内容创作与增长', eyebrow: '让一份内容，留下多种可审阅的成果',
	summary: '把长文改成不同平台的草稿，再用受众记录、竞品观察和投放复盘形成反馈。每个版本保留事实依据，发布节奏由你决定。',
	guideSlug: 'typefully-repurpose', guideTitle: '长文改写成多平台草稿：从事实清单到 Typefully', guideLead: '拿一篇完整的合成文章，拆出 5 条 X 串文和 1 篇 LinkedIn 帖子。先核对事实、语气与账号，再考虑把确认过的内容存成草稿。',
	scope: '页面展示原创合成文章与参考草稿；本轮没有连接 Typefully、写入草稿、排期或发布。',
	deskTitle: '让每条草稿，都有事实依据。', deskRows: [{ title: 'X 串文 · 5 条', detail: '每条对应原文事实编号', tag: '待审阅' }, { title: 'LinkedIn · 1 篇', detail: '保留“合成练习”的范围', tag: '待审阅' }, { title: '下一次发布', detail: '账号、时间、渠道由你确认', tag: '未排期' }],
	flow: ['1 篇原文', '2 个平台', '先审稿，再决定发布'],
	deliverables: [{ title: '事实清单', description: 'F01—F06 标出事实、建议与尚未验证的结论。', format: 'MD' }, { title: '多平台草稿', description: '5 条 X 串文和 1 篇 LinkedIn，逐条对照来源。', format: 'DRAFT' }, { title: '写入请求样例', description: '仅草稿字段，保留 share: false，不安排发布。', format: 'JSON' }, { title: '审阅清单', description: '事实、语气、账号、链接与发布状态逐项检查。', format: 'CHECK' }],
	prepare: [{ title: '先在文件里改写', items: ['下载原文与编辑要求，第一次不看参考草稿。', '选定两个目标渠道，并准备自己允许参考的语气样例。', '把不可改动的数字、日期、结论与限定语单独列出。'] }, { title: '接入 Typefully 前', items: ['确认自己的 social set 与 X、LinkedIn 账号。', '核对实际可用的草稿创建、读取与发布工具。', 'API 密钥通过安全输入提供，先验证连接，不在提示词或下载文件中填入密钥。'] }],
	lab: { title: '多平台改写练习台', caption: '1 篇合成文章 · 6 个事实编号', input: [{ title: '原始长文', body: sourceArticle }, { title: '编辑要求', body: '渠道：X 串文 5 条、LinkedIn 1 篇。\n语气：具体、克制，保留“合成练习”和“尚未实测”。\n每条草稿附来源编号；未知的效果数字不补写。\n本轮只在文件中交付，发布动作留给作者。' }], columns: ['草稿', '渠道', '事实依据', '参考正文'], rows: draftRows, cards: [{ title: '草稿包状态', badge: '未写入', body: '当前页面和下载包中的文字是参考答案，没有对应的 Typefully draft_id。' }, { title: '请求边界', badge: '仅草稿', body: 'JSON 样例仅包含内容、标题和 share: false；publish_at、plan_at 等排期字段均省略。' }], report: '审稿摘要｜合成样例\n\n输入：1 篇文章，F01—F06。\n交付：X 串文 5 条、LinkedIn 1 篇。\n来源：具体数字均来自原文；保留合成练习与未验证限制。\n待你确认：语气、目标账号、链接、平台长度与格式。\n未完成：真实草稿写入、排期、发布与发布后数据。\n任何“提升效率 XX%”之类原文没有的数字，都应退回修改。' },
	steps: [
		{ id: 'facts', title: '先提取事实，保留原文的限定语', paragraphs: ['把这篇文章当作唯一事实来源。先做 F01—F06 对照表，区分已经发生的样例练习、对后续流程的建议，以及尚未测量的效果。', '“两份草稿”不能变成“两封已发送邮件”；合成练习也不能改成真实客户案例。先核对这些边界，再进入文案改写。'], prompt: '只读 source-article.md。输出事实清单：编号、原文依据、类型（样例事实/建议/未验证）、可用于文案的表达、必须保留的限定语。不得补查外部数据，不改写成真实邮箱实测，不生成节省时间或准确率数字。先交付 facts.md。', expected: '一张可回查到 F01—F06 的事实清单，明确没有生产邮箱实测。', check: '数字 8、6、2 的含义没有变化；F06 里的未测量信息仍然存在。' },
		{ id: 'brief', title: '把渠道、读者和语气写成编辑要求', paragraphs: ['同一事实可以用不同结构表达：X 串文每条只讲一个要点；LinkedIn 用完整段落交代背景、方法和问题。', '本练习不要求复用平台界面，也不写死每个平台的最新限制。发布前在当前编辑器核对字数、链接、分段和预览。'], prompt: '根据 editorial-brief.json 和 facts.md，写出两种内容大纲：X 5 条串文、LinkedIn 1 篇。每段标事实编号。语气具体克制；第一段交代是合成练习。先展示大纲，不连接账号，不排期。', expected: '两份结构不同、事实一致的大纲。', check: '原文里的“建议”没有升级为“已经实现”，每个段落都有来源编号。' },
		{ id: 'rewrite', title: '生成草稿，再逐条做事实与语气审阅', paragraphs: ['把一次完整的改写分成生成和审阅两轮。审阅时先看内容是否准确，再看有没有重复、夸张、无法理解的缩写或突然改变的口吻。', '参考草稿是一种可用答案。你可以调整开头、结尾和叙述顺序，但不能改变样例状态或凭空增加业务结果。'], prompt: '按已确认大纲生成 X 串文和 LinkedIn 草稿。正文之外附“草稿 id → 事实编号”表。再独立检查：新增数字、遗漏的限定语、把计划写成完成、重复论点、未经确认的承诺。发现问题直接修订，并列出改动。只写 drafts.md。', expected: '5 条 X 文本、1 篇 LinkedIn 文本和事实对照表。', check: '每条具体判断均能回到原文；两个版本都保留合成练习和未验证范围。' },
		{ id: 'connect', title: '先核对账号与工具，再准备草稿请求', paragraphs: ['Typefully 官方 API 说明支持 X 与 LinkedIn 的内容草稿。这里提供的 draft-payload.json 是按已公开字段编写的请求体样例，未执行。', '确认 social set、平台账号和请求范围后，才允许创建草稿。样例省略发布与排期字段，share 为 false；正式使用前仍需对照当时的 API 和账号能力。'], prompt: '先只读检查我的 Typefully 连接与目标 social set：<填写>，列出对应的 X、LinkedIn 账号以及可用工具。检查 draft-payload.json 只用于创建普通草稿：没有 publish_at、plan_at 或即时发布参数，share 为 false。仅展示核对结果和拟执行请求，不调用写入工具。密钥不得回显。', expected: '可核对的目标账号清单与请求预览。', check: '没有把社交账号显示名当作唯一身份；不包含排期、即时发布或公开分享参数。' },
		{ id: 'save', title: '只保存明确批准的草稿，并回读验证', paragraphs: ['你确认正文和账号后，先保存一个草稿检查格式。成功创建应有实际返回的 draft_id，再回读标题、平台、正文和状态。', '请求超时不代表创建失败。先查已经出现的草稿，再决定是否重试。页面里的参考答案不能当成账号里已经创建成功的证据。'], prompt: '只在我确认具体账号与请求后，创建这一个普通草稿；不排期、不发布、不生成公开分享链接。记录返回的 draft_id 并回读核对正文、平台和草稿状态。工具不可用则保留文件，写明未写入。结果不明时先查重，不重复创建，不覆盖已有草稿。', expected: '实际草稿 id 与回读结果，或明确的未写入说明。', check: '平台和账号正确，内容没有丢段；状态仍为草稿，没有发布记录。' },
		{ id: 'reuse', title: '保存改写方法，发布作为独立决策', paragraphs: ['验收后可以把原文要求、事实表、改写结构和审阅规则存为 Skill。每篇新文章都要重新建立事实清单，不沿用旧样例的数字。', '发布或排期需要你再次确认具体内容、渠道和时间。可以先把时间建议写在文档里，不把建议直接变成平台任务。'], prompt: '把验收后的改写方法写成 content-repurpose Skill：输入原文与编辑要求，提取事实，生成渠道大纲，改写，自查，交付草稿与来源表。写入 Typefully、公开分享、排期和发布都是独立阶段，默认停在本地文件。不创建定时发布任务，不跨 Bot 委派。', expected: '一份能用于新文章的 Skill 草案和人工审稿清单。', check: '下一篇换输入后仍先核对事实；没有自动继承旧账号、时间或发布授权。' },
	],
	quickCases: [
		{ id: 'audience', title: '把受众变化记到一张表', apps: 'Google Sheets · 平台主页', summary: '记录观察时间、平台与原始口径，保留无法取得的数据。', input: '上周：X 1000、YouTube 500。\n本周：X 1040、YouTube 未取得。', output: 'X：1040，较上周 +40。\nYouTube：未取得；不沿用 500 冒充本周值。', prompt: '只依据我提供的两期数据，按平台输出本期值、上期值、变化、采集时间与缺失原因。不同指标不相加；无法取得写缺失，不补数。先返回表格，不连接平台或修改 Sheets。', check: '缺失值和零分开；变化只在两期口径相同且都有值时计算。', original: '/zh/recipes/sheets-audience-tracker/' },
		{ id: 'competitor', title: '从竞品更新里挑值得研究的主题', apps: 'YouTube · 公开内容', summary: '先记可见事实，再写你的选题判断。', input: '视频 A：标题“定价页改版”，发布日期 10 月 10 日。\n视频 B：只有标题和链接，字幕未取得。', output: 'A：可研究定价页结构，需查看正文。\nB：仅标题可见，不写成已读视频总结。', prompt: '按我给的资料列选题候选，分开写可见事实、自己的判断、仍缺的材料。没有字幕或正文时只做标题层面的线索整理，不编视频内容，不发布。', check: '转述范围对应实际读到的材料；候选附原链接。', original: '/zh/recipes/youtube-competitor-watch/' },
		{ id: 'ads', title: '投放复盘先统一口径', apps: 'Google Ads · 表格', summary: '在同一时间窗口里比较花费与结果，异常项留给人判断。', input: '合成周报：活动 A 花费 100 元、转化 5；活动 B 花费 80 元、转化 0。', output: 'A：每次转化成本 20 元。\nB：无转化，成本指标不计算；待检查追踪与流量。', prompt: '只读这份合成周报，核对日期、币种、转化口径；计算可计算的指标，零分母标不可计算。输出观察与待核查项，不建议自动改预算，不操作账户。', check: '不把零转化写成零成本；观察与原因推断分开。', original: '/zh/recipes/google-ads-scoreboard/' },
		{ id: 'positioning', title: '定位文案每轮只改一个重点', apps: 'Google Docs · 文档评论', summary: '先统一读者与价值，再用评论解释修改理由。', input: '原句：我们的工具非常强大。\n受众：每周要整理客户邮件的小团队。', output: '改写：把客户邮件整理成待办和回复草稿。\n待补：真实效果数据与使用条件。', prompt: '针对指定读者重写这段定位文案，保留可证实的能力，删除空泛形容词。列原句、建议句、理由和待补证据。先返回建议，不覆盖文档、不提交评论。', check: '没有新增无法证明的效果承诺；每个改动有理由。', original: '/zh/recipes/google-docs-positioning-brief/' },
		{ id: 'portrait', title: '把公开短文整理成有证据的个人网站', apps: 'X · 静态网站', summary: '继续阅读已有的完整画像教程，按主题、证据、设计与实现逐阶段交付。', input: '一份带日期与原链接的短文资料。\n目标：看见常写的主题与表达特点。', output: '主题与证据表 → 页面设计 → 本地静态页面 → 核对记录。', prompt: '先核对我提供的短文来源、范围和缺失情况，再把主题与证据逐项对应。每个主题附不同原帖作为依据；证据不足单列。先交付证据表，不急于生成页面或部署。', check: '每个展示结论都能回到原文；查看已有教程的实际验证范围。', original: '/zh/recipes/x-personal-portrait-site/', guide: true },
	],
	checks: ['每个具体数字和判断均能回到 F01—F06。', 'X 有 5 条串文、LinkedIn 有 1 篇，语气不同但事实一致。', '合成练习、未写入 Gmail 和未测量效果的范围没有丢失。', 'Typefully 写入前核对 social set 与平台账号。', '草稿请求没有 publish_at、plan_at，share 为 false。', '保存结果可回读；不明状态先查重，未排期、未发布。'],
	problems: [['改写里突然出现效率提升数字', '退回事实表逐句核对。原文未测量的效果只写未测量，不能由模型补出。'], ['X 串文最后一条缺少上下文', '检查每条是否能独立理解，第一条明确练习范围，必要限定语在相关条目重复保留。'], ['草稿保存失败或超时', '先查目标账号是否已经创建，核对 draft_id。权限或套餐不支持时保留文件，不重复发送创建请求。'], ['保存后变成排期内容', '检查请求字段与工具行为，停止继续写入。先由你核查平台状态，再处理；不要用一次“存草稿”确认推导发布授权。'], ['平台预览和本地文本不一致', '在实际编辑器核对链接、分段、长度和媒体，先人工修订；本页没有验证平台最终渲染。']],
	sources: [{ title: 'Typefully API 官方概览', url: 'https://support.typefully.com/en/articles/8718287-typefully-api', note: '支持的平台、认证与草稿工作流；本页未调用 API。' }, { title: 'Typefully API 参考', url: 'https://typefully.com/docs/api', note: '字段参考公开的创建草稿说明；未验证全部端点，也未执行创建与回读。' }, ...commonSources],
	files: [textFile('source-article.md', '原始合成文章', 'F01—F06 事实来源，先独立练习', sourceArticle), jsonFile('editorial-brief.json', '编辑要求', '渠道、语气和事实约束', { synthetic: true, channels: { x_posts: 5, linkedin_posts: 1 }, tone: '具体、克制', preserve: ['合成练习', '真实邮箱未验证', '未测量节省时间与准确率'], action: 'local_drafts_only' }), textFile('expected-drafts.md', '参考草稿', '5 条 X 串文与 1 篇 LinkedIn', xPosts.join('\n\n') + '\n\n## LinkedIn\n\n' + linkedinPost), jsonFile('draft-payload.json', '普通草稿请求体样例', '无密钥、无发布或排期字段；未经 API 实测', draftPayload), { name: 'fact-map.csv', title: '事实对照表', description: '6 份草稿与原文编号对应', mime: 'text/csv; charset=utf-8', content: csv(['draft_id', 'channel', 'facts', 'text'], draftRows) }],
});
