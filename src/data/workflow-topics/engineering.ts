import { completeTopic, commonSources, jsonFile, textFile, csv } from './types.ts';

const fixtureBase = '/zh/recipes/website-daily-check/files/';
const html = (title: string, body: string) => `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} · 合成训练站</title><style>body{font:16px/1.9 system-ui,sans-serif;background:#faf9f6;color:#222321;max-width:760px;margin:48px auto;padding:0 22px}a{color:#ad421f}nav{display:flex;gap:24px}img{max-width:100%}.note{padding:16px;border:1px solid #ddd;background:white}</style></head><body><p class="note">shancha 合成巡检训练站：页面中故意保留错误，不是线上业务站点。</p>${body}</body></html>`;
export const siteIndexHtml = html('首页', `<nav><a href="${fixtureBase}site-about.html">关于</a><a href="${fixtureBase}site-pricing-missing.html">价格</a></nav><h1>一个等待巡检的练习站</h1><img width="80" height="80" alt="训练站标志" src="${fixtureBase}site-logo.svg"><section id="features"><h2>功能简介</h2><p>练习发现打不开的链接、缺失的图片与不存在的锚点。</p></section><img alt="这里故意缺失了一张横幅" src="${fixtureBase}site-banner-missing.svg">`);
export const siteAboutHtml = html('关于', `<h1>关于这份练习</h1><p>本页能正常打开，但并不代表所有导航目标都存在。</p><p><a href="${fixtureBase}site-index.html#features">功能介绍（有效锚点）</a></p><p><a href="${fixtureBase}site-index.html#contact">联系表单（故意缺失锚点）</a></p>`);
export const siteFixture = { synthetic: true, base_path: fixtureBase, resources: [
	{ path: 'site-index.html', status: 200, content: siteIndexHtml },
	{ path: 'site-about.html', status: 200, content: siteAboutHtml },
	{ path: 'site-logo.svg', status: 200, content: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="16" fill="#ad421f"/><text x="40" y="50" text-anchor="middle" fill="white" font-family="sans-serif" font-size="26">S</text></svg>' },
	{ path: 'site-pricing-missing.html', status: 404, content: '' },
	{ path: 'site-banner-missing.svg', status: 404, content: '' },
] };
const findings = [
	['C01', '首页', 'HTTP 200', '页面可打开，仍需检查内部目标', '状态正常'],
	['C02', '关于页', 'HTTP 200', '页面可打开，仍需检查锚点', '状态正常'],
	['C03', '首页 → 价格链接', '目标 HTTP 404', 'site-pricing-missing.html 不存在', '待修复链接'],
	['C04', '首页 → 横幅', '资源 HTTP 404', 'site-banner-missing.svg 不存在', '待补图片'],
	['C05', '关于 → 首页 #contact', '页面 200，锚点缺失', '首页没有 id="contact"', '待核对导航'],
];
const report = '网站巡检参考报告｜合成训练站\n\n检查范围：2 个 HTML 页面及其明确引用的目标。\n预设问题：3 处——价格链接 404、横幅资源 404、contact 锚点缺失。\n正常项：两页 HTTP 200、logo 资源存在、features 锚点存在。\n判断：HTTP 成功只说明请求成功，不说明链接、图片和页面内容均正常。\n处理建议：核对价格页地址；补正确横幅或移除引用；修正联系入口。\n本轮不改站点、不部署。修复后要对相同目标复查并记录日期。';

export const engineeringTopic = completeTopic({
	id: 'engineering', number: '03', title: '开发与网站维护', eyebrow: '让检查有证据，让改动有验收', summary: '从网站巡检、PR 状态到原型需求，把“看一下有没有问题”变成能复查的任务。先提供失败证据，再决定要不要修改。',
	guideSlug: 'website-daily-check', guideTitle: '网站巡检：从三处预设问题到可复查报告', guideLead: '用一个有意保留错误的训练站，检查页面状态、链接、图片和锚点。把发现、影响与修复建议分开，最后再安排固定巡检。', scope: '下方训练站与参考报告为本站原创。2026-10-18 另对本站三个公开地址做了单次 HTTP 检查（含预期 404 对照），见页末记录；浏览器呈现、业务后台与 Routine 未测。',
	deskTitle: '站点能打开，细节仍要看。', deskRows: [{ title: '价格入口', detail: '目标页面返回 404', tag: '待修复' }, { title: '首页横幅', detail: '图片资源不存在', tag: '待补图' }, { title: '联系表单', detail: '页面里缺少对应锚点', tag: '待核对' }], flow: ['2 个训练页面', '3 处预设问题', '1 份可复查报告'],
	deliverables: [{ title: '检查清单', description: '逐项注明范围、目标和预期结果。', format: 'JSON' }, { title: '问题证据表', description: '保留来源页、目标、状态与实际观察。', format: 'CSV' }, { title: '巡检报告', description: '正常项、问题、未检查项和修复建议。', format: 'MD' }, { title: '重复运行规则', description: '固定范围、差异通知和复查条件。', format: 'SKILL' }],
	prepare: [{ title: '先检查训练材料', items: ['下载 site-fixture.json，里面包含两页 HTML 与模拟资源状态。', '打开本站训练页，可观察预设的坏链、缺图与锚点。', '原始输入没有附带问题答案，先独立检查再对照。'] }, { title: '真实站点需要另定范围', items: ['指定由你管理或明确允许检查的站点与路径。', '限定只读请求，排除登录、付款、表单提交和破坏性操作。', '云电脑不能直接访问你 Mac 上的 localhost；使用上传材料，或在同一台本地机器检查。'] }],
	lab: { title: '网站巡检练习台', caption: '2 个 HTML 页面 · 3 处预设问题', input: [{ title: '训练站首页 HTML', body: siteIndexHtml }, { title: '训练站关于页 HTML', body: siteAboutHtml }, { title: '访问方式', body: '在本站预览所在机器打开训练页，实际观察坏链与缺图。\n把 site-fixture.json 交给云端 Bot 时，只能做文件与模拟响应检查，不应声称执行了本地 HTTP 请求。' }], columns: ['项目', '检查目标', '观察', '证据', '下一步'], rows: findings, cards: [{ title: 'HTTP 200 的边界', badge: '继续检查', body: '首页和关于页都能返回成功，问题藏在它们引用的链接、图片和锚点里。' }, { title: '检查与修复分开', badge: '只出报告', body: '报告保留三处问题及其来源，修改地址、替换图片或部署是下一次明确的工作。' }], report },
	steps: [
		{ id: 'scope', title: '先列入口、检查范围与停止条件', paragraphs: ['巡检前先说明哪些页面属于范围，预计会看到什么。一个没有明确目标的“全站检查”很容易扩展到后台、外链或不该提交的表单。', '训练站只包含两页 HTML 和少量资源。对真实站点，先从首页和一条核心路径开始，登录与会改变数据的步骤单独处理。'], prompt: '读取 site-fixture.json，只建立检查计划：入口、内部链接、图片资源、页面锚点、预计如何留证据。区分文件内容检查与真实 HTTP 检查。不要访问外部站点、提交表单、尝试登录或修改任何页面。先输出 scope.md。', expected: '一份覆盖页面、引用资源与锚点的检查计划。', check: '范围没有扩展到示例以外的域名或业务动作；说明从哪里获得观察结果。' },
		{ id: 'inspect', title: '先从页面源码里找出全部目标', paragraphs: ['读取链接和图片地址，连同它们所在的页面一起记录。锚点需要同时核对目标页面与对应 id。', '文件里的模拟 status 可以帮助练习判断，但不能替代真实请求结果。两种证据在报告中分开写。'], prompt: '只基于上传的 HTML 和模拟资源清单，逐项列出 href、src 和片段锚点。核对资源是否列在清单中、目标 id 是否存在，记录来源页和原始片段。输出模拟检查结果，不写成已请求网络。暂不读取 expected-findings.csv。', expected: '页面 → 目标 → 依据的映射表。', check: '外部目标不被自动跟随；价格链接、横幅与 contact 锚点都能在源码中定位。' },
		{ id: 'verify', title: '在可访问的环境中验证状态与呈现', paragraphs: ['如果你正在本机运行本站，可以在同一机器用浏览器检查训练页。Grok 云电脑里的 localhost 指向它自己的机器，不能把连接失败当成你的站点故障。', '真实网络检查记录最终 URL、状态、错误原因与时间。遇到鉴权、限流或验证码时标为未检查，不绕过，也不无限重试。'], prompt: '只在已经确认可访问的本地环境中，按范围检查训练站。对每个目标记录请求状态；在浏览器核对缺图和锚点。明确区分 HTTP 404、网络失败、鉴权失败与内容不符。仅做只读请求，结果附 URL 和时间。若无法访问本机训练站，退回上传文件分析并说明限制。', expected: '带观察时间的状态表与页面证据，或明确的访问阻塞。', check: 'HTTP 200 没有被当成全站健康；模拟响应和实际请求结果分开。' },
		{ id: 'report', title: '写清问题、影响和仍未检查的部分', paragraphs: ['一份可用报告应让别人按同一条路径看到同一个问题。每个发现保留来源页、失败目标和复查动作。', '影响程度要跟实际业务路径有关。训练站没有真实转化数据，报告不能声称坏链造成收入损失，也不能从静态页面推断后台服务状况。'], prompt: '把已检查结果写成报告：范围、正常项、问题清单、未检查项、依据与复查方法。对每个问题写来源页、失败目标、观察结果、可能影响和最小修复建议。没有业务数据时不估算收入损失，不把推测写成原因。不修改、不部署。', expected: '包含三处预设问题的报告，未检查项单列。', check: '别人能从报告复查相同目标；每条结论都注明证据类型。' },
		{ id: 'repair', title: '修复建议先经过审阅，再按相同清单复查', paragraphs: ['先确认错误地址应改成什么、横幅应替换为什么、contact 入口是否需要存在。仅删除所有异常引用，并不一定满足原来的产品目的。', '本教程停在报告与修复计划。若之后授权改代码，需要独立分支、具体改动范围和验证结果，部署仍是单独决定。'], prompt: '针对报告里的问题给出最小修复计划：应修改的文件或目标、需要我补充的正确地址或素材、复查清单。证据不足先提缺项，不直接删链接、不改线上内容。仅在后续明确授权具体改动后实施，并在同一组检查项上验证。', expected: '三项修复建议及对应的复查目标。', check: '建议解决原始目的；没有把计划写成已经修好。' },
		{ id: 'repeat', title: '把检查保存为 Skill，用差异减少噪声', paragraphs: ['手动验证后再固定频率、时区与目标。保持一份基线，但不把上次成功当成本次成功。', '没有新问题时可以安静；新故障、持续故障、恢复和未能执行要分别记录。修复部署后再复查，避免每日报告重复堆积。'], prompt: '把验收后的流程写成 site-check Skill：固定站点范围、只读检查项、单次上限、超时与限流处理、证据位置、差异比较和恢复通知。Routine 先给草案，频率每天一次、时区由我确认。无变化保持安静，无法检查要报告。不要自动改站点、提 PR、部署或联系其他 Bot。', expected: '可重用的检查说明与定时草案。', check: '每次有新的检查时间；无变化、失败和恢复能被区分。' },
	],
	quickCases: [
		{ id: 'agent-brief', title: '把需求写到编码代理能验收', apps: '编码代理 · 仓库', summary: '先给目标、输入和验证条件，再安排实现。', input: '需求：给文章列表增加分类筛选。\n约束：沿用现有框架，先在本机查看页面。', output: '输入：分类数据与当前列表。\n验收：筛选结果正确、清除可恢复、手机无溢出。\n交付：改动说明与预览证据。', prompt: '把这段需求整理为实现任务：目标、现状、范围、输入输出、验收步骤、未知项。先不修改代码、不启动云代理，缺少信息明确列出。', check: '验收能由实际操作判断；没有把范围扩展为重写整站。', original: '/zh/recipes/cursor-cloud-agent/' },
		{ id: 'pr-watch', title: 'PR 状态先核对，再写待办', apps: 'GitHub · 可选 Notion', summary: '把评审、CI 和合并状态分开，保留原始链接。', input: 'PR #12：CI 失败；PR #13：检查通过，仍有未处理评审；PR #14：已合并。', output: '#12：待定位 CI。\n#13：待处理评审，不标为可合并。\n#14：已合并，退出进行中列表。', prompt: '只根据提供的 PR 状态快照，输出每项的 CI、评审、合并状态、下一步和缺失证据。快照不够时写待核对，不推送代码、不合并、不关闭 PR。', check: '检查通过没有代替人工评审；已合并状态与待办区分。', original: '/zh/recipes/github-pr-watch/' },
		{ id: 'bookmark-demo', title: '一个书签，先变成一份原型说明', apps: 'X 书签 · 本地原型', summary: '先确认读到了什么，再决定是否值得实现。', input: '书签：一个新图表组件，只读到摘要，示例代码未取得。', output: '已知：组件用途。\n待补：许可、接口、完整示例。\n原型目标：在本地展示一张样例图。', prompt: '依据已提供的书签材料写原型说明：已知能力、未知项、最小展示目标与验收方法。未读取的代码不假装已审查，不安装外部依赖、不调用编码代理。', check: '摘要、原文与代码的读取范围说清；先补材料再动手。', original: '/zh/recipes/x-bookmarks-demo/' },
	],
	checks: ['范围限定为训练站或已授权站点，没有跟随未知外链。', '两页状态成功，价格链接与横幅资源分别得到 404 证据。', 'features 锚点存在，contact 锚点缺失。', '模拟材料分析与实际 HTTP 请求结果明确分开。', '报告列出来源、目标、观察、影响和复查方法。', '没有修改网站、提交表单、部署或自动联系他人。'],
	problems: [['云电脑访问 localhost 失败', 'localhost 属于当前执行环境。上传训练材料做离线检查，或在运行预览的本机操作；不把连接失败写成公网故障。'], ['所有页面都 200，却仍有问题', '继续核对内部链接、图片和页面锚点。内容错误不一定体现为主页面 HTTP 失败。'], ['返回 401、403 或验证码', '记为鉴权或访问限制，说明未检查范围；不重试猜密码或绕过限制。'], ['一次报告出现大量重复问题', '按来源页与目标归并，同一资源被多页引用时保留关联；报告总数说明是问题数还是引用数。'], ['修复后旧报告还在告警', '复查同一个目标并记录恢复时间，保留旧证据，不能直接改写历史结果。']],
	sources: [{ title: 'MDN：HTTP 状态码', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status', note: '区分成功、重定向与客户端/服务端错误；本教程的三处错误来自原创训练材料。' }, ...commonSources],
	files: [jsonFile('site-fixture.json', '原始训练站材料', 'HTML 与模拟资源状态，不含参考答案', siteFixture), { name: 'expected-findings.csv', title: '问题参考答案', description: '两页与三处预设问题的对照表', mime: 'text/csv; charset=utf-8', content: csv(['id', 'target', 'observation', 'evidence', 'next'], findings) }, textFile('inspection-report.md', '巡检报告样例', '范围、问题与复查建议', report), { name: 'site-index.html', title: '训练站首页', description: '打开有意包含坏链与缺图的页面', mime: 'text/html; charset=utf-8', content: siteIndexHtml, inline: true }, { name: 'site-about.html', title: '训练站关于页', description: '包含有效与无效锚点入口', mime: 'text/html; charset=utf-8', content: siteAboutHtml, inline: true }, { name: 'site-logo.svg', title: '训练站标志', description: '存在的资源，用来与缺失横幅对照', mime: 'image/svg+xml', content: siteFixture.resources[2].content, inline: true }],
});
