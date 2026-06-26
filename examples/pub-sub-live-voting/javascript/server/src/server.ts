import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import type { OptionInput, ShowStore } from './showStore.js';
import { pgStore } from './db.js';
import { createStaticStore } from './staticStore.js';

// The backend has two jobs:
//   1. Issue short-lived, role-scoped Ably tokens (GET /auth). This is the
//      important bit for the tutorial — a voter token can publish annotations
//      and nothing else.
//   2. Serve the poll definitions to the admin (GET /api/shows...), from either
//      a static JSON file (SHOWS_FILE) or Postgres.
// It never touches votes — those live entirely as Ably annotations.

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ABLY_API_KEY = process.env.ABLY_API_KEY;
if (!ABLY_API_KEY) {
  console.error('ABLY_API_KEY environment variable is required');
  process.exit(1);
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.error('ADMIN_PASSWORD environment variable is required');
  process.exit(1);
}

const [keyName, keySecret] = ABLY_API_KEY.split(':');

// Data source: a JSON file (read-only, no database) when SHOWS_FILE is set,
// otherwise Postgres. Resolved relative to the working directory.
const SHOWS_FILE = process.env.SHOWS_FILE;
let store: ShowStore;
try {
  store = SHOWS_FILE ? createStaticStore(path.resolve(SHOWS_FILE)) : pgStore;
} catch (err: any) {
  console.error(err.message);
  process.exit(1);
}
console.log(store.readOnly
  ? `Using read-only static show data from ${SHOWS_FILE}`
  : 'Using Postgres show store');

const app = express();

// The client is a separate Vite app. In production it can be served from the
// same origin (see the static block below); in development it runs on Vite's
// dev server and reaches the API through Vite's proxy. CORS keeps direct
// cross-origin calls working too.
app.use(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());

function fail(res: express.Response, label: string, err: any) {
  console.error(`${label} failed:`, err);
  const message = err?.message || err?.code || String(err);
  res.status(500).json({ error: message });
}

// Basic auth middleware for admin routes. Only the password half is checked —
// the client sends `Basic base64("admin:<password>")`.
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Admin"');
    res.status(401).send('Authentication required');
    return;
  }
  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const password = decoded.split(':').slice(1).join(':');
  if (password !== ADMIN_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="Admin"');
    res.status(401).send('Invalid password');
    return;
  }
  next();
}

// Reject writes when the active store is read-only (static demo data).
function requireWritable(_req: express.Request, res: express.Response, next: express.NextFunction) {
  if (store.readOnly) {
    res.status(403).json({ error: 'This is a read-only demo — editing is disabled.' });
    return;
  }
  next();
}

// Lets the admin client discover whether editing is available (static vs db).
app.get('/api/config', (_req, res) => {
  res.json({ readOnly: store.readOnly });
});

// Admin API — all behind basic auth
app.get('/api/shows', requireAdmin, async (_req, res) => {
  try {
    res.json(await store.getShows());
  } catch (err: any) {
    fail(res, 'GET /api/shows', err);
  }
});

app.post('/api/shows', requireAdmin, requireWritable, async (req, res) => {
  const { name } = req.body;
  if (!name) { res.status(400).json({ error: 'Missing name' }); return; }
  try {
    res.json(await store.createShow(name));
  } catch (err: any) {
    fail(res, 'POST /api/shows', err);
  }
});

app.put('/api/shows/:id', requireAdmin, requireWritable, async (req, res) => {
  const { name } = req.body;
  if (!name) { res.status(400).json({ error: 'Missing name' }); return; }
  try {
    const ok = await store.updateShow(Number(req.params.id), name);
    if (!ok) { res.status(404).json({ error: 'Not found' }); return; }
    res.json({ ok: true });
  } catch (err: any) {
    fail(res, `PUT /api/shows/${req.params.id}`, err);
  }
});

app.delete('/api/shows/:id', requireAdmin, requireWritable, async (req, res) => {
  try {
    const ok = await store.deleteShow(Number(req.params.id));
    if (!ok) { res.status(404).json({ error: 'Not found' }); return; }
    res.json({ ok: true });
  } catch (err: any) {
    fail(res, `DELETE /api/shows/${req.params.id}`, err);
  }
});

// Polls within a show — read endpoint is public (presenter needs it)
app.get('/api/shows/:showId/polls', async (req, res) => {
  try {
    const result = await store.getShowPolls(Number(req.params.showId));
    if (!result) { res.status(404).json({ error: 'Show not found' }); return; }
    // Convert numeric option IDs to strings for Ably annotation compatibility
    const polls = result.polls.map((p) => ({
      ...p,
      options: p.options.map((o) => ({
        id: String(o.id),
        label: o.label,
        ...(o.direction ? { direction: o.direction } : {}),
      })),
    }));
    res.json({ show: result.show, polls });
  } catch (err: any) {
    fail(res, `GET /api/shows/${req.params.showId}/polls`, err);
  }
});

const DPAD_SLOTS = new Set(['up', 'right', 'down', 'left']);

const VALID_TYPES = new Set(['list', 'dpad', 'suggest']);
const ALL_SLOTS = new Set<string>(DPAD_SLOTS);

function validatePollInput(body: any): { type: string; question: string; options: OptionInput[] } | string {
  const { question } = body;
  const type = body.type ?? 'list';
  if (!VALID_TYPES.has(type)) return 'Invalid poll type';
  if (!question || typeof question !== 'string') return 'Missing question';

  if (type === 'suggest') {
    return { type, question, options: [] };
  }

  const options = body.options;
  if (!Array.isArray(options) || options.length === 0) return 'Missing options';

  const normalized: OptionInput[] = [];
  const seenDirections = new Set<string>();
  for (const o of options) {
    if (typeof o === 'string') {
      normalized.push({ label: o });
    } else if (o && typeof o.label === 'string') {
      const direction = o.direction ?? null;
      if (direction !== null) {
        if (!ALL_SLOTS.has(direction)) return `Invalid direction: ${direction}`;
        if (seenDirections.has(direction)) return `Duplicate direction: ${direction}`;
        seenDirections.add(direction);
      }
      normalized.push({ label: o.label, direction });
    } else {
      return 'Invalid option entry';
    }
  }

  if (type === 'dpad') {
    if (normalized.some((o) => !o.direction)) return 'Every d-pad option needs a slot';
    if (normalized.some((o) => o.direction && !DPAD_SLOTS.has(o.direction))) {
      return 'Invalid slot for d-pad poll';
    }
    if (normalized.length > DPAD_SLOTS.size) return `A d-pad poll has at most ${DPAD_SLOTS.size} options`;
  }

  return { type, question, options: normalized };
}

app.post('/api/shows/:showId/polls', requireAdmin, requireWritable, async (req, res) => {
  const parsed = validatePollInput(req.body);
  if (typeof parsed === 'string') { res.status(400).json({ error: parsed }); return; }
  try {
    const pollId = await store.createPoll(Number(req.params.showId), parsed.type, parsed.question, parsed.options);
    res.json({ id: pollId });
  } catch (err: any) {
    fail(res, `POST /api/shows/${req.params.showId}/polls`, err);
  }
});

app.put('/api/shows/:showId/polls/reorder', requireAdmin, requireWritable, async (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) {
    res.status(400).json({ error: 'Missing order array' });
    return;
  }
  try {
    await store.reorderPolls(Number(req.params.showId), order);
    res.json({ ok: true });
  } catch (err: any) {
    fail(res, `PUT /api/shows/${req.params.showId}/polls/reorder`, err);
  }
});

app.put('/api/shows/:showId/polls/:pollId', requireAdmin, requireWritable, async (req, res) => {
  const parsed = validatePollInput(req.body);
  if (typeof parsed === 'string') { res.status(400).json({ error: parsed }); return; }
  try {
    await store.updatePoll(Number(req.params.pollId), parsed.type, parsed.question, parsed.options);
    res.json({ ok: true });
  } catch (err: any) {
    fail(res, `PUT /api/shows/${req.params.showId}/polls/${req.params.pollId}`, err);
  }
});

app.delete('/api/shows/:showId/polls/:pollId', requireAdmin, requireWritable, async (req, res) => {
  try {
    const ok = await store.deletePoll(Number(req.params.pollId));
    if (!ok) { res.status(404).json({ error: 'Not found' }); return; }
    res.json({ ok: true });
  } catch (err: any) {
    fail(res, `DELETE /api/shows/${req.params.showId}/polls/${req.params.pollId}`, err);
  }
});

// ── Ably token auth ──
//
// The heart of the security model. Each role gets a JWT whose capabilities are
// scoped to exactly what that role needs on this one channel:
//   - voter:     annotation-publish only (cast votes; can't read others' votes
//                or publish poll messages)
//   - presenter: annotation-subscribe + subscribe (read-only)
//   - admin:     publish + subscribe + annotation-subscribe (drives the show)
// The clientId baked into the token is what makes `vote:unique.v1` enforce one
// vote per person.
app.get('/auth', (req, res) => {
  const clientId = req.query.clientId as string;
  const sessionId = req.query.sessionId as string;
  const role = req.query.role as string;

  if (!clientId || !sessionId || !role) {
    res.status(400).json({ error: 'Missing clientId, sessionId, or role' });
    return;
  }

  if (role === 'admin') {
    const password = req.query.password as string;
    if (password !== ADMIN_PASSWORD) {
      res.status(403).json('Invalid admin password');
      return;
    }
  }

  const channelName = `voting:${sessionId}`;
  const capsByRole: Record<string, string[]> = {
    admin: ['publish', 'subscribe', 'annotation-subscribe'],
    voter: ['subscribe', 'annotation-publish'],
    presenter: ['subscribe', 'annotation-subscribe'],
  };
  const caps = capsByRole[role];
  if (!caps) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }
  const capabilities: Record<string, string[]> = { [channelName]: caps };

  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      'x-ably-capability': JSON.stringify(capabilities),
      'x-ably-clientId': clientId,
      iat: now,
      exp: now + 3600,
    },
    keySecret,
    {
      header: {
        typ: 'JWT',
        alg: 'HS256',
        kid: keyName,
      },
    },
  );

  res.set('Content-Type', 'application/jwt');
  res.send(token);
});

// Optionally serve the built client (../../dist, i.e. the javascript/ project
// root) from the same origin, so a production deploy needs only this one
// server. In development you'd run the Vite dev server instead and let it proxy
// the API here.
const clientDist = path.resolve(__dirname, '../../dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
