-- 模板复制计数
CREATE TABLE IF NOT EXISTS template_copies (
	id TEXT PRIMARY KEY,
	count INTEGER NOT NULL DEFAULT 0,
	updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
