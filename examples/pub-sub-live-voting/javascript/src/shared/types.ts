export type PollType = 'list' | 'dpad' | 'suggest';

/** Subset of PollType that renders as a directional controller (positional buttons). */
export type ControllerKind = 'dpad';

/** Slot a poll option occupies on the d-pad layout. The DB column and the
 *  PollOption field are both named `direction` since these are arrow directions. */
export type Direction = 'up' | 'right' | 'down' | 'left';

export const SLOTS_BY_KIND: Record<ControllerKind, Direction[]> = {
  dpad: ['up', 'right', 'down', 'left'],
};

export function isControllerKind(t: PollType): t is ControllerKind {
  return t === 'dpad';
}

export interface PollOption {
  id: string;
  label: string;
  direction?: Direction;
}

export interface PollDefinition {
  id: number;
  question: string;
  type: PollType;
  options: PollOption[];
}

export interface Show {
  id: number;
  name: string;
  polls: PollDefinition[];
}

export interface PollMessage {
  pollId: number;
  question: string;
  type: PollType;
  options: PollOption[];
}

export interface ControlMessage {
  action: 'close' | 'show-qr' | 'end' | 'reset' | 'clear-suggestions';
  pollId?: number;
  voterUrl?: string;
}

// The annotation type that carries a vote. The `unique` summarisation means
// Ably keeps at most one vote per clientId — a built-in "one person, one vote"
// that you'd otherwise have to enforce yourself. See the README.
export const VOTE_ANNOTATION_TYPE = 'vote:unique.v1';
export const SUGGESTION_ANNOTATION_TYPE = 'suggestion';

/** URL search-param key carrying the session id (e.g. `/?s=ab12cd`). */
export const SESSION_KEY = 's';

export type Role = 'admin' | 'voter' | 'presenter';

export type VoterState = 'no-session' | 'invalid-session' | 'enter-name' | 'waiting' | 'voting' | 'voted' | 'results' | 'suggesting' | 'ended';
export type AdminState = 'setup' | 'manage' | 'ready' | 'poll-open' | 'poll-closed' | 'show-qr';
export type PresenterState = 'invalid-session' | 'live' | 'results' | 'show-qr' | 'ended' | 'suggesting';
