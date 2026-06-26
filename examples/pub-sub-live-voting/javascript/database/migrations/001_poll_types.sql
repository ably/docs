ALTER TABLE polls
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'list'
  CHECK (type IN ('list', 'dpad'));

ALTER TABLE poll_options
  ADD COLUMN IF NOT EXISTS direction TEXT
  CHECK (direction IS NULL OR direction IN ('up', 'right', 'down', 'left'));
