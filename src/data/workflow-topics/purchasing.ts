import { completeTopic, commonSources, jsonFile, textFile, csv } from './types.ts';

export const invoiceInputs = [
	{ id: 'IN01', invoice_no: 'C100', vendor: '示例云服务', date: '2026-09-10', amount: '120.00', currency: 'CNY', status: 'paid', source: 'mail-A/attachment-1', text: '发票 C100，示例云服务，2026-09-10，CNY 120.00，已付款。' },
	{ id: 'IN02', invoice_no: 'C100', vendor: '示例云服务', date: '2026-09-10', amount: '120.00', currency: 'CNY', status: 'paid', source: 'mail-B/attachment-2', text: '再次转来的发票 C100，示例云服务，CNY 120.00，已付款。' },
	{ id: 'IN03', invoice_no: 'U200', vendor: 'Example Design', date: '2026-09-12', amount: '20.00', currency: 'USD', status: 'paid', source: 'mail-C/attachment-3', text: 'Receipt U200, Example Design, 2026-09-12, USD 20.00, Paid.' },
	{ id: 'IN04', invoice_no: 'C180', vendor: '示例工具箱', date: '2026-09-15', amount: '80.00', currency: 'CNY', status: 'unpaid', source: 'mail-D/attachment-4', text: '账单 C180，CNY 80.00，待付款。' },
	{ id: 'IN05', invoice_no: 'C190', vendor: '示例存储', date: '2026-09-20', amount: null, currency: 'CNY', status: 'paid', source: 'mail-E/attachment-5', text: '收据 C190，日期 2026-09-20，已付款，币种 CNY，但金额文字模糊无法读清。' },
	{ id: 'IN06', invoice_no: 'C150', vendor: '示例文档', date: '2026-09-22', amount: '50.00', currency: 'CNY', status: 'void', source: 'mail-F/attachment-6', text: '发票 C150，CNY 50.00，已作废，不计入有效收据。' },
	{ id: 'IN07', invoice_no: 'C199', vendor: '示例日历', date: '2026-10-02', amount: '99.00', currency: 'CNY', status: 'paid', source: 'mail-G/attachment-7', text: '收据 C199，开具日期 2026-10-02，CNY 99.00，已付款。' },
	{ id: 'IN08', invoice_no: 'C130', vendor: '示例通讯', date: '2026-09-28', amount: '30.00', currency: 'CNY', status: 'paid', source: 'mail-H/attachment-8', text: '收据 C130，示例通讯，2026-09-28，CNY 30.00，已付款。' },
];
const invoiceRows = [
	['IN01', 'C100', 'CNY 120.00', '计入已付汇总', '供应商+票号+币种唯一'],
	['IN02', 'C100', 'CNY 120.00', '重复候选，不再计入', '与 IN01 的关键字段一致'],
	['IN03', 'U200', 'USD 20.00', '计入 USD 汇总', '币种单独计算'],
	['IN04', 'C180', 'CNY 80.00', '待付款队列', '不计入已付款合计'],
	['IN05', 'C190', '金额缺失 / CNY', '人工核对', '不能把未知金额当 0'],
	['IN06', 'C150', 'CNY 50.00', '作废，排除', '保留来源和排除原因'],
	['IN07', 'C199', 'CNY 99.00', '不在本期范围', '票据日期属于 10 月'],
	['IN08', 'C130', 'CNY 30.00', '计入已付汇总', '独立的有效样例收据'],
];
export const monthlySummary = { synthetic: true, period: '2026-09', date_basis: 'invoice_date', paid_unique_count: 3, paid_totals_minor_units: { CNY: 15000, USD: 2000 }, duplicate_count: 1, unpaid_count: 1, needs_review_count: 1, void_count: 1, outside_period_count: 1, foreign_exchange_applied: false };
const filingRules = '本练习统计票据开具日期在 2026-09-01（含）至 2026-10-01（不含）的已付款、未作废、金额明确且去重后的记录。按供应商+票据号+币种识别重复候选；关键字段冲突交人工，不能静默覆盖。保留每份原始材料与来源。不同币种分别汇总，不换汇。待付款、金额不清、作废和跨期分别列队列。CSV 字段需要防止公式注入；写入表格时按原始值处理。';
const report = '9 月票据整理参考摘要｜合成文字摘录\n\n原始材料：8 条。\n本期可计入的独立已付记录：IN01、IN03、IN08，共 3 条。\n币种合计：CNY 150.00；USD 20.00。未换汇，不能合并成 170。\n重复候选：IN02，与 IN01 对应相同票号与关键字段。\n待付款：IN04。\n人工核对：IN05 金额不清，不能写为 0。\n排除并留痕：IN06 作废，IN07 跨期。\n本轮没有读取真实邮箱/PDF，没有 OCR 实测，没有写入 Sheets，也没有付款或用于实际申报。';

export const purchasingTopic = completeTopic({
	id: 'purchasing', number: '05', title: '生活采购与票据', eyebrow: '把选择依据和原始凭证一起留下', summary: '采购时比较同一口径的商品与成本，整理票据时保留来源、币种和例外。让 Bot 准备材料，最终选择与付款由你完成。',
	guideSlug: 'invoice-register', guideTitle: '发票与收据整理：去重、分币种汇总和人工核对', guideLead: '用 8 条合成票据文字练习月份归属、重复识别、金额缺失和多币种汇总。先得到可对照的登记表，再考虑连接邮箱和表格。', scope: '票据来自原创合成文字摘录，未进行 PDF/OCR 或真实财务系统实测。本轮没有读邮箱、上传凭证、写表或付款。',
	deskTitle: '合计之前，先把例外挑出来。', deskRows: [{ title: '本期已付', detail: '3 条独立记录，按币种分别统计', tag: '可核对' }, { title: '重复与模糊金额', detail: '保留原始来源，进入单独队列', tag: '待复核' }, { title: '作废、跨期、待付款', detail: '记录原因，不混入已付合计', tag: '已区分' }], flow: ['8 条原始材料', '3 条独立已付', 'CNY / USD 分别汇总'],
	deliverables: [{ title: '原始材料索引', description: '每条文字摘录都保留来源与原编号。', format: 'JSON' }, { title: '登记与去重表', description: '金额、币种、状态、月份与重复关系。', format: 'CSV' }, { title: '分币种汇总', description: 'CNY 150.00、USD 20.00，不做混币加总。', format: 'JSON' }, { title: '人工核对队列', description: '缺值、重复、待付款与排除项有清楚原因。', format: 'MD' }],
	prepare: [{ title: '从文字摘录练习', items: ['下载 8 条原始材料与归档规则，独立提取后再对答案。', '本期按票据日期归属 2026 年 9 月，不按收件日期。', '本练习没有提供可验真的票据原件，金额与有效性仍需人工核对。'] }, { title: '连接真实来源时', items: ['先明确邮箱、时间范围、附件类型和单次上限。', '核对附件读取、文件保存与 Sheets 追加能力，缺失时输出本地 CSV。', '凭证含财务信息，确认共享目录和第三方表格的可见范围后再保存。'] }],
	lab: { title: '票据整理练习台', caption: '8 条合成文字摘录 · 两种币种', input: [{ title: '原始票据文字', body: invoiceInputs.map(i => `${i.id}｜来源 ${i.source}\n${i.text}`).join('\n\n') }, { title: '月份与登记规则', body: filingRules }], columns: ['材料', '票据号', '金额与币种', '处理结果', '依据'], rows: invoiceRows, cards: [{ title: '本期 CNY', badge: '150.00', body: 'IN01 的 120.00 + IN08 的 30.00。重复、待付款、模糊金额、作废与跨期不进入这项合计。' }, { title: '本期 USD', badge: '20.00', body: '仅 IN03。没有汇率来源与换汇规则，因此独立展示，不能与 CNY 相加。' }], report },
	steps: [
		{ id: 'scope', title: '先确定统计期间和日期口径', paragraphs: ['先约定按票据日期、付款日期还是邮件收到日期归属月份。本练习采用票据开具日期，9 月 1 日含、10 月 1 日不含。', '收据、未付账单、作废票据和退款凭证也要分开。没有原件与完整业务记录时，这张表只能整理资料，不验证票据真伪或替代专业审核。'], prompt: '只读取 source-invoices.json 和 filing-rules.md，先复述统计期间、日期口径、可计入条件、重复规则和缺失处理。不要读取真实邮箱、连接表格、付款或上传材料。输出材料索引，保留所有 8 条原始编号与来源。', expected: '8 条输入索引与明确的期间边界。', check: 'IN07 因票据日期属于 10 月而不进入本期，不能只看收件时间。' },
		{ id: 'extract', title: '提取字段，未知值保持未知', paragraphs: ['每条材料提取供应商、票据号、日期、金额、币种、付款/作废状态和来源。金额看不清时保留空值并说明，不能用 0 代替。', '本页使用文字摘录，PDF 分页、扫描件旋转、税额和 OCR 识别都还没有验证。真实附件需要回到原文件人工抽查。'], prompt: '为 8 条文字摘录提取字段：source_id、供应商、票据号、票据日期、金额字符串、币种、付款状态、作废状态、来源、缺失项。未知保持 null 并写原因，不推断汇率或税额，不修补模糊数字。先输出 extracted.json，不看参考答案。', expected: '字段齐全且保留来源的结构化材料。', check: 'IN05 金额仍为空；IN04 与 IN06 的状态没有被改成有效已付。' },
		{ id: 'dedupe', title: '识别重复候选，原始材料全部保留', paragraphs: ['文件名相同不一定是同一张票据，文件名不同也可能是转发副本。先按供应商、票据号和币种建立候选关系，再核对金额与日期。', '关键字段矛盾时交人工，不把后来的文件静默覆盖前一份。缺少票据号时单列待核查，不能仅凭同一金额自动删除。'], prompt: '依据归档规则识别重复候选，列主记录、重复材料、对照字段与置信依据。IN01 与 IN02 应建立关系，原始两条都保留。遇到同键不同金额或日期时标冲突，不自动覆盖，不删除任何附件。输出 dedupe.csv。', expected: 'IN02 是 IN01 的重复候选，不重复进入合计。', check: '8 条原始材料仍然存在；去重后的统计与保留原件数量分别说明。' },
		{ id: 'reconcile', title: '按币种汇总，并把例外对回原始材料', paragraphs: ['先筛选本期、已付、未作废、金额明确的独立记录，再按币种汇总。使用最小货币单位或可靠的十进制运算，避免浮点误差。', '本练习的可计入记录为三条，CNY 与 USD 分开显示。待付款、金额不清、作废、跨期和重复各有去向，合计数字必须能逐项解释。'], prompt: '对符合条件的独立记录按币种汇总，金额以分为单位计算后格式化显示。输出每个币种的记录 id、数量与合计，另列待付款、需核对、作废、跨期和重复队列。不得换汇，不合并币种，不把未知金额当 0。核对 8 条输入均有处理结果。', expected: 'CNY 150.00、USD 20.00，3 条独立已付，5 条其他处理结果。', check: '不能出现“合计 170”；各队列加上已付记录能覆盖全部 8 条材料。' },
		{ id: 'write', title: '先验收 CSV，再决定是否追加到表格', paragraphs: ['下载的登记表先在本地审阅。导出 CSV 时将可能被表格软件执行的文本按文本处理；供应商名或备注也可能以公式字符开头。', 'Google Sheets 的 append 会追加值，并不会替你完成业务去重。真实写入前核对目标表、工作表和已有业务键；写入后回读新行，结果不明时先查重。'], prompt: '先生成本地登记 CSV，清理会触发表格公式的文本字段，保留原始值的可回查记录。若之后我批准指定表格和行范围，先查已有业务键，再追加新的确认记录；按原始值模式写入，记录实际写入范围并回读。没有写权限则交 CSV，不上传 Drive、不改历史行、不付款。', expected: '本地登记表；获新授权时才有真实追加与回读证据。', check: '重复运行不会多一行同票据；未写入时明确说明，没有把本地文件当作在线表格成功。' },
		{ id: 'repeat', title: '留好核对队列，再安排下个月', paragraphs: ['人工核对队列比一个看起来完整的总数更有用。保留金额不清的来源、重复关系和排除原因，复核后再产生修订版本。', '月度 Routine 需要写清时区、期间计算、补发票据和重跑规则。新到的旧月份票据单列补录，不静默修改已确认历史表。'], prompt: '把验收的方法存为 invoice-register Skill：月份边界、字段、去重、分币种计算、缺值处理、输出、复核与修订规则。默认停在本地文件。月度 Routine 先给草案，明确延迟到达票据如何补录；写表、上传、付款与对外发送不自动授权，不联系其他 Bot。', expected: '可复用说明与仍待人工核对的清单。', check: '重跑和补录有记录，不覆盖原始材料或已确认的历史结果。' },
	],
	quickCases: [
		{ id: 'compare', title: '同一规格，才有可比的总价', apps: '购物网站 · 清单', summary: '把单价、数量、运费和可比性一起列出，缺少费用不强行排名。', input: '合成报价 A：2 件，每件 50 元，运费 10。\n报价 B：每件 48 元，规格不同，运费未知。', output: 'A：已知总额 110 元。\nB：规格和运费待核对，不能认定更便宜。', prompt: '只比较我提供的合成报价，核对规格、数量、单价、运费、税费和配送条件，分开已知金额与未知项。不可比或费用缺失不排名，不加购物车、不下单、不付款。', check: '没有把不同规格或缺失运费的报价写成同口径最低价。', original: '/zh/recipes/shopping-compare/' },
		{ id: 'marketplace', title: '二手监控留下候选和待问问题', apps: '二手平台 · 浏览器', summary: '按明确条件筛选，卖家自述和实际验证分开。', input: '合成商品 A：300 元、同城，卖家写“正常使用”。\n条件：预算 350、需确认配件齐全。', output: '价格与地点符合。\n配件未说明，列待问；成色尚未验证。', prompt: '按提供条件筛选这份合成商品清单，保留原编号、价格、地点、卖家自述和未知项。候选按链接或编号去重，列需要人工问的问题，不联系卖家、不出价、不付款。', check: '“卖家称可用”没有写成已检测可用；重复候选不重复通知。', original: '/zh/recipes/marketplace-watch/' },
	],
	checks: ['全部 8 条输入保留来源并有明确处理结果。', 'IN02 不重复计入，IN05 未知金额不是 0。', 'IN04 待付款、IN06 作废、IN07 跨期均单列。', '本期合计为 CNY 150.00 与 USD 20.00，未换汇。', 'CSV 文本按安全的文本格式处理；真实追加先查业务键，回读写入范围。', '没有付款、上传凭证、覆盖历史数据或对外发送。'],
	problems: [['同一票号出现不同金额', '标记冲突并回查原件、供应商与票据版本，不能自动选择较新文件覆盖。'], ['金额或币种看不清', '保留空值、来源和待核对原因，先不进入合计。'], ['出现多种币种', '分别汇总；如业务确实需要换汇，另定汇率来源、日期与精度，本练习不换汇。'], ['追加超时后担心漏写', '先按业务键回读目标表，不把超时直接当失败，也不盲目再次追加。'], ['旧月份发票现在才收到', '按既定日期口径进入补录队列，留修订版本；不要静默改写已确认总数。']],
	sources: [{ title: 'Gmail API：读取指定邮件附件', url: 'https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages.attachments/get', note: '核对附件读取对象；本练习只使用文字摘录，未实际读取附件。' }, { title: 'Google Sheets：追加值', url: 'https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append', note: '核对追加语义，业务去重与回读仍需流程实现。' }, ...commonSources],
	files: [jsonFile('source-invoices.json', '原始合成材料', '8 条文字摘录，不含参考处理结果', { synthetic: true, period: '2026-09', invoices: invoiceInputs }), textFile('filing-rules.md', '归档与统计规则', '期间、去重、币种和例外口径', filingRules), { name: 'expected-register.csv', title: '登记参考答案', description: '8 条材料的处理去向', mime: 'text/csv; charset=utf-8', content: csv(['source_id', 'invoice_no', 'amount_currency', 'decision', 'reason'], invoiceRows) }, jsonFile('monthly-summary.json', '分币种汇总参考', '使用最小货币单位保存金额', monthlySummary), textFile('review-queue.md', '人工核对与例外摘要', '原始材料覆盖与缺项', report)],
});
