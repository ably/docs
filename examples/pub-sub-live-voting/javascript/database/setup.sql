CREATE TABLE shows (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL
);

CREATE TABLE polls (
  id         SERIAL PRIMARY KEY,
  show_id    INTEGER NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  type       TEXT NOT NULL DEFAULT 'list'
             CHECK (type IN ('list', 'dpad', 'suggest'))
);

CREATE TABLE poll_options (
  id         SERIAL PRIMARY KEY,
  poll_id    INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  direction  TEXT
             CHECK (direction IS NULL OR direction IN (
               'up', 'right', 'down', 'left'
             ))
);
