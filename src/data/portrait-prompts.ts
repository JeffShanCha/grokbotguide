import type { Lang } from '../i18n/ui';

export type PortraitStage = 'setup' | 'intake' | 'live' | 'evidence' | 'brief' | 'build' | 'review' | 'revise';

export const portraitPrompts: Record<Lang, Record<PortraitStage, string>> = {
	zh: {
		setup: `我们要做一个有文字依据的个人介绍页。先用我附上的合成 source.csv 演练。
在 /workspace/portrait-lab/ 建立独立项目，不覆盖已有文件；目录已存在时先告诉我。
本次分四个岗位：素材编辑、证据编辑、内容设计、网页制作。
交接文件依次为 source.csv、claims.json、site-brief.md、site/index.html。
每段只处理指定输入，完成后给我文件附件、绝对路径、检查结果和待确认问题，等我确认再继续。
所有输出注明数据是合成样例。先不读取账号、不新建其他 Bot、不发消息、不发布网站。
先确认文件已收到并列出项目目录，不开始后续阶段。`,
		intake: `现在以素材编辑身份处理附件 source.csv。
校验列 id,date,text,url，检查重复 id、空正文和日期格式，逐字保留素材，不补写缺失原文。
把通过检查的记录保存到项目目录的 source.csv，返回实际条数、被排除的 id 和原因。
合成样例的 url 必须留空，不能生成看起来真实的 X 链接。
本阶段只整理输入，暂不归纳特点或制作网页。`,
		live: `我准备把样例替换为自己的公开 X 内容。目标账号是【你的账号】，范围是【起止日期】，上限 24 条。
先告诉我你当前可用的读取方式，并让我核对账号，再开始读取；不要读取其他账号或私信。
只纳入本人原创及有本人文字的回复/引用，排除纯转发和重复项。
输出 source.csv：id,date,text,url，保留真实原文链接，并报告实际覆盖范围、条数和读取失败项。
如果无法读取，就停在这里说明原因；我会提供自己整理的 CSV。不要抓取其他站点来补足数量。`,
		evidence: `以证据编辑身份读取项目里的 source.csv，生成 claims.json。
只提出 2—4 个能由这些文字支持的表达主题。每项包含 id、title、observation、evidence（source.csv 的 id 数组）。
observation 描述样本里出现了什么，不下完整人格结论，不推测职业、收入、健康或经历，也不生成百分比评分。
逐个检查 evidence 确实存在；证据薄弱就删除主题或注明局限，不为了凑数补造依据。
返回文件，并列出最需要我确认的一条观察。本阶段不写网页。`,
		brief: `以内容设计身份读取已确认的 claims.json 和 source.csv，保存 site-brief.md。
目标读者第一次访问时，能看懂“这些文字关注什么”和“依据在哪里”。
列出一句导语、主题卡片的顺序、每张卡片展示的证据 id、来源区和手机端布局。
让每个主题能跳到对应素材。合成输入必须在首屏显著标注；不要添加姓名、联系方式、履历、成绩或性格分数。
本轮只交内容和排版说明，等我确认后再制作网页。`,
		build: `以网页制作身份读取项目中的 source.csv、claims.json 和已确认的 site-brief.md。
在 site/index.html 制作可独立打开的单页，只用 HTML/CSS 和系统字体，不加载外部脚本、字体或图片，不安装依赖。
页面包括样例标识、导语、主题卡片和完整来源区。每个证据 id 是能跳转到对应原文片段的页内链接。
保留输入数据的实际出处；演示数据必须写“合成样例，非真人分析”，不要制造真人署名。
先返回 HTML 附件及文件路径。可以打开预览就检查桌面和手机并提供截图；打不开时如实说明。不要部署。`,
		review: `以页面检查者身份核对本项目的 site/index.html、claims.json 和 source.csv。
检查：所有主题有依据；证据 id 均能跳转；原文片段未被改写；没有虚构个人资料；手机没有页面级横向溢出。
实际打开桌面和手机预览，再分别截图，报告使用的视口宽度、发现的问题和已修复项。
如果不能打开浏览器，区分“静态检查通过”和“浏览器未验证”，不要交付模拟截图充当实测结果。
返回可打开的预览入口或 HTML 附件，保持网站未发布。`,
		revise: `请修改这次个人介绍页：
需要更正的主题 id：【填写 id】；原因：【我的补充或要撤回的推断】。
先更新 claims.json 中这项观察及证据，再同步 site-brief.md 和 site/index.html。
不要改动无关素材，也不要补造新的推文或个人经历。
重新检查证据跳转和手机布局，列出改动，返回新预览和截图。继续保持未发布。`,
	},
	en: {
		setup: `Build an evidence-based personal introduction page, starting with the attached synthetic source.csv.
Create a separate project at /workspace/portrait-lab/. If it already exists, tell me before changing it.
Use four roles: source editor, evidence editor, content designer and web builder.
Handoffs are source.csv, claims.json, site-brief.md and site/index.html.
After each stage, return the file attachment, absolute path, check results and open questions. Wait for my review before continuing.
Label all outputs as synthetic. Do not read accounts, create other Bots, send messages or publish.
First confirm receipt and the project directory; do not start later stages.`,
		intake: `Act as the source editor and check the attached source.csv.
Validate id,date,text,url; find duplicate ids, empty text and malformed dates. Preserve the supplied text exactly.
Save accepted rows as source.csv in the project directory. Report the actual count and any excluded ids with reasons.
Synthetic rows must keep url empty. Do not invent realistic X links.
Only organize the input at this stage; do not infer themes or build a site.`,
		live: `I want to replace the sample with my own public X writing. Account: [your account]. Date range: [start/end]. Maximum: 24 posts.
Explain the reading method currently available and let me confirm the account before collecting. Do not read other accounts or DMs.
Include original posts and replies/quotes containing my own writing; exclude pure reposts and duplicates.
Return source.csv with id,date,text,url, preserving real source links. Report actual coverage, row count and failures.
If access fails, stop and explain. I can provide my own CSV. Do not fill gaps from other websites.`,
		evidence: `Act as the evidence editor. Read source.csv and produce claims.json.
Propose only 2–4 themes supported by the supplied writing. Each has id,title,observation,evidence (an array of source ids).
Describe patterns in this sample, not a complete personality. Do not infer occupation, income, health or biography, and do not invent percentage scores.
Check every evidence id. Remove weak claims or state their limits instead of filling a quota.
Return the file and the observation most in need of my review. Do not write a webpage yet.`,
		brief: `Act as the content designer. Read the approved claims.json and source.csv, then save site-brief.md.
Help a first-time reader understand what this writing focuses on and where the evidence is.
Specify an introduction, theme-card order, evidence ids, a source section and mobile layout.
Each theme must link to its evidence. Clearly label synthetic input near the top. Do not add names, contact details, biography, achievements or personality scores.
Return only the content and layout brief. Wait for my review before implementation.`,
		build: `Act as the web builder. Read source.csv, claims.json and the approved site-brief.md.
Create a standalone site/index.html using HTML/CSS and system fonts. Use no external scripts, fonts or images, and install no dependencies.
Include a synthetic-data notice, introduction, theme cards and full source section. Evidence ids must link to matching source fragments on the page.
Preserve real source attribution. Demo data must say “Synthetic sample, not a real-person analysis”; invent no personal identity.
Return the HTML attachment and path. If you can open a browser, check desktop and mobile and provide screenshots; otherwise say so. Do not deploy.`,
		review: `Review site/index.html against claims.json and source.csv.
Check that claims have evidence, every source link resolves, excerpts are unchanged, no personal facts are invented, and mobile has no page-level horizontal overflow.
Actually open desktop and mobile previews and capture both. Report viewport widths, issues and fixes.
If browser access is unavailable, distinguish static checks from unverified rendering. Never present a mock screenshot as a real test.
Return a usable preview or HTML attachment, keeping the site unpublished.`,
		revise: `Revise this personal introduction page.
Theme id to correct: [id]. Reason: [my clarification or inference to withdraw].
Update that observation and evidence in claims.json first, then synchronize site-brief.md and site/index.html.
Leave unrelated source text unchanged. Do not invent new posts or biographical details.
Recheck evidence links and mobile layout. List changes and return a fresh preview and screenshots. Keep it unpublished.`,
	},
};
