import { atom } from 'nanostores';

export interface SessionState {
  signedIn: boolean;
  account?: { id: string; name: string } | null;
  organization?: { id: string; name: string } | null;
}

/**
 * Session nanostore. Populated by the UserProvider island on mount.
 * Replaces the `reducerSessionData` slice of the old Redux store.
 *
 * Readers:
 *  - `<If loggedIn>` blocks via the `gate-toggle.ts` global script
 *  - `Code` island (Phase 4) for API-key inlining
 *  - Header island for sign-in / dashboard affordance
 */
export const $session = atom<SessionState>({
  signedIn: false,
  account: null,
  organization: null,
});
