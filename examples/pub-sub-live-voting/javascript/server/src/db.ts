import pg from 'pg';
import type { OptionInput, ShowStore } from './showStore.js';

// Lazily constructed so that static (SHOWS_FILE) deployments never open — or
// even configure — a database connection.
let _pool: pg.Pool | null = null;
function pool(): pg.Pool {
  if (!_pool) {
    _pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost/ably_voting',
    });
  }
  return _pool;
}

async function getShows() {
  const { rows } = await pool().query(`
    SELECT s.id, s.name, COUNT(p.id)::int AS poll_count
    FROM shows s
    LEFT JOIN polls p ON p.show_id = s.id
    GROUP BY s.id
    ORDER BY s.id
  `);
  return rows;
}

async function createShow(name: string) {
  const { rows } = await pool().query(
    'INSERT INTO shows (name) VALUES ($1) RETURNING id, name',
    [name],
  );
  return rows[0];
}

async function updateShow(id: number, name: string) {
  const { rowCount } = await pool().query(
    'UPDATE shows SET name = $1 WHERE id = $2',
    [name, id],
  );
  return rowCount! > 0;
}

async function deleteShow(id: number) {
  const { rowCount } = await pool().query('DELETE FROM shows WHERE id = $1', [id]);
  return rowCount! > 0;
}

async function getShowPolls(showId: number) {
  const showResult = await pool().query('SELECT id, name FROM shows WHERE id = $1', [showId]);
  if (showResult.rows.length === 0) return null;

  const pollRows = await pool().query(
    'SELECT id, question, type, sort_order FROM polls WHERE show_id = $1 ORDER BY sort_order, id',
    [showId],
  );

  const optionRows = await pool().query(
    `SELECT po.id, po.poll_id, po.label, po.direction, po.sort_order
     FROM poll_options po
     JOIN polls p ON p.id = po.poll_id
     WHERE p.show_id = $1
     ORDER BY po.sort_order, po.id`,
    [showId],
  );

  const optionsByPoll = new Map<number, Array<{ id: number; label: string; direction: string | null; sort_order: number }>>();
  for (const opt of optionRows.rows) {
    if (!optionsByPoll.has(opt.poll_id)) optionsByPoll.set(opt.poll_id, []);
    optionsByPoll.get(opt.poll_id)!.push({
      id: opt.id, label: opt.label, direction: opt.direction, sort_order: opt.sort_order,
    });
  }

  const polls = pollRows.rows.map((p) => ({
    id: p.id,
    question: p.question,
    type: p.type,
    sort_order: p.sort_order,
    options: optionsByPoll.get(p.id) ?? [],
  }));

  return { show: showResult.rows[0], polls };
}

async function createPoll(showId: number, type: string, question: string, options: OptionInput[]) {
  const client = await pool().connect();
  try {
    await client.query('BEGIN');

    const maxOrder = await client.query(
      'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM polls WHERE show_id = $1',
      [showId],
    );

    const pollResult = await client.query(
      'INSERT INTO polls (show_id, question, type, sort_order) VALUES ($1, $2, $3, $4) RETURNING id',
      [showId, question, type, maxOrder.rows[0].next],
    );
    const pollId = pollResult.rows[0].id;

    for (let i = 0; i < options.length; i++) {
      await client.query(
        'INSERT INTO poll_options (poll_id, label, direction, sort_order) VALUES ($1, $2, $3, $4)',
        [pollId, options[i].label, options[i].direction ?? null, i],
      );
    }

    await client.query('COMMIT');
    return pollId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function updatePoll(pollId: number, type: string, question: string, options: OptionInput[]) {
  const client = await pool().connect();
  try {
    await client.query('BEGIN');

    await client.query('UPDATE polls SET question = $1, type = $2 WHERE id = $3', [question, type, pollId]);
    await client.query('DELETE FROM poll_options WHERE poll_id = $1', [pollId]);

    for (let i = 0; i < options.length; i++) {
      await client.query(
        'INSERT INTO poll_options (poll_id, label, direction, sort_order) VALUES ($1, $2, $3, $4)',
        [pollId, options[i].label, options[i].direction ?? null, i],
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function deletePoll(pollId: number) {
  const { rowCount } = await pool().query('DELETE FROM polls WHERE id = $1', [pollId]);
  return rowCount! > 0;
}

async function reorderPolls(showId: number, pollIds: number[]) {
  const client = await pool().connect();
  try {
    await client.query('BEGIN');
    for (let i = 0; i < pollIds.length; i++) {
      await client.query(
        'UPDATE polls SET sort_order = $1 WHERE id = $2 AND show_id = $3',
        [i, pollIds[i], showId],
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export const pgStore: ShowStore = {
  readOnly: false,
  getShows,
  getShowPolls,
  createShow,
  updateShow,
  deleteShow,
  createPoll,
  updatePoll,
  deletePoll,
  reorderPolls,
};
