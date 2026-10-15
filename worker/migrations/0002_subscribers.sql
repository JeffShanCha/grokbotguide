-- 邮件订阅（newsletter）
CREATE TABLE IF NOT EXISTS subscribers (
	email TEXT PRIMARY KEY,
	lang TEXT NOT NULL DEFAULT 'en',
	source TEXT,
	token TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'active',
	created_at INTEGER NOT NULL DEFAULT (unixepoch()),
	updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
