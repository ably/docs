// Data layer behind the admin API. Two implementations: a Postgres store
// (db.ts) for full read/write, and a read-only static store (staticStore.ts)
// backed by a JSON file for DB-less demo deployments. The server picks one at
// startup based on the SHOWS_FILE env var.

export type Slot = 'up' | 'right' | 'down' | 'left';

export interface OptionInput {
  label: string;
  direction?: Slot | null;
}

export interface ShowSummary {
  id: number;
  name: string;
  poll_count: number;
}

export interface StoredOption {
  id: number;
  label: string;
  direction: string | null;
  sort_order: number;
}

export interface StoredPoll {
  id: number;
  question: string;
  type: string;
  sort_order: number;
  options: StoredOption[];
}

export interface ShowPolls {
  show: { id: number; name: string };
  polls: StoredPoll[];
}

export interface ShowStore {
  /** When true, the write methods are unavailable and the admin UI is read-only. */
  readonly readOnly: boolean;

  getShows(): Promise<ShowSummary[]>;
  getShowPolls(showId: number): Promise<ShowPolls | null>;

  createShow(name: string): Promise<{ id: number; name: string }>;
  updateShow(id: number, name: string): Promise<boolean>;
  deleteShow(id: number): Promise<boolean>;

  createPoll(showId: number, type: string, question: string, options: OptionInput[]): Promise<number>;
  updatePoll(pollId: number, type: string, question: string, options: OptionInput[]): Promise<void>;
  deletePoll(pollId: number): Promise<boolean>;
  reorderPolls(showId: number, pollIds: number[]): Promise<void>;
}
