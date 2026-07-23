import { readFileSync } from 'fs';
import type {
  ShowStore, ShowSummary, ShowPolls, StoredPoll, StoredOption,
} from './showStore.js';

// JSON authoring format (see ../../data/demo-shows.json):
//   { "shows": [ { "id", "name", "polls": [
//       { "id", "question", "type", "options": [ { "id", "label", "direction"? } ] }
//   ] } ] }
interface RawOption { id: number; label: string; direction?: string | null; }
interface RawPoll { id: number; question: string; type: string; options?: RawOption[]; }
interface RawShow { id: number; name: string; polls?: RawPoll[]; }

const VALID_TYPES = new Set(['list', 'dpad', 'suggest']);

function readonlyWrite(): never {
  throw new Error('Static show store is read-only; editing is disabled.');
}

function parseShows(filePath: string): RawShow[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err: any) {
    throw new Error(`Failed to read SHOWS_FILE "${filePath}": ${err.message}`);
  }

  const shows = (parsed as { shows?: unknown })?.shows;
  if (!Array.isArray(shows)) {
    throw new Error(`SHOWS_FILE "${filePath}" must contain a top-level "shows" array.`);
  }

  for (const show of shows as RawShow[]) {
    if (typeof show.id !== 'number' || typeof show.name !== 'string') {
      throw new Error('Each show needs a numeric "id" and a string "name".');
    }
    for (const poll of show.polls ?? []) {
      if (typeof poll.id !== 'number' || typeof poll.question !== 'string') {
        throw new Error(`Show ${show.id}: each poll needs a numeric "id" and a string "question".`);
      }
      if (!VALID_TYPES.has(poll.type)) {
        throw new Error(`Show ${show.id}, poll ${poll.id}: invalid type "${poll.type}".`);
      }
      for (const opt of poll.options ?? []) {
        if (typeof opt.id !== 'number' || typeof opt.label !== 'string') {
          throw new Error(`Show ${show.id}, poll ${poll.id}: each option needs a numeric "id" and a string "label".`);
        }
      }
    }
  }

  return shows as RawShow[];
}

export function createStaticStore(filePath: string): ShowStore {
  const shows = parseShows(filePath);
  const byId = new Map<number, RawShow>(shows.map((s) => [s.id, s]));

  return {
    readOnly: true,

    async getShows(): Promise<ShowSummary[]> {
      return shows.map((s) => ({ id: s.id, name: s.name, poll_count: (s.polls ?? []).length }));
    },

    async getShowPolls(showId: number): Promise<ShowPolls | null> {
      const show = byId.get(showId);
      if (!show) return null;
      const polls: StoredPoll[] = (show.polls ?? []).map((p, pi) => ({
        id: p.id,
        question: p.question,
        type: p.type,
        sort_order: pi,
        options: (p.options ?? []).map((o, oi): StoredOption => ({
          id: o.id,
          label: o.label,
          direction: o.direction ?? null,
          sort_order: oi,
        })),
      }));
      return { show: { id: show.id, name: show.name }, polls };
    },

    createShow: readonlyWrite,
    updateShow: readonlyWrite,
    deleteShow: readonlyWrite,
    createPoll: readonlyWrite,
    updatePoll: readonlyWrite,
    deletePoll: readonlyWrite,
    reorderPolls: readonlyWrite,
  };
}
