import * as Ably from 'ably';
import { Role } from './types';
import { showError, clearError } from './errors';
import { IS_SANDBOX, SANDBOX_ABLY_KEY } from '../config';

export function createAblyClient(
  clientId: string,
  sessionId: string,
  role: Role,
  extraParams?: Record<string, string>,
): Ably.Realtime {
  // ── Authentication ──
  //
  // Real app: the client never sees an API key. It calls the server's `/auth`
  // endpoint, which returns a short-lived JWT scoped to exactly this role's
  // capabilities — a voter token can publish annotations but cannot publish
  // messages or read other voters' raw annotations (see server/src/server.ts).
  // This is the pattern you should use in production.
  //
  // Hosted docs sandbox ONLY: there is no server to call, so we fall back to a
  // raw API key embedded in the page. Do not do this with a real app, it's used here
  // purely so the live demo can run without a backend.
  const client = new Ably.Realtime(
    IS_SANDBOX
      ? { key: SANDBOX_ABLY_KEY, clientId }
      : {
          authUrl: '/auth',
          authParams: { clientId, sessionId, role, ...extraParams },
          clientId,
        },
  );

  client.connection.on('failed', (change) => {
    const reason = change.reason;
    const detail = reason?.cause?.message || reason?.message || 'unknown error';
    showError(`Connection failed: ${detail}`);
  });

  client.connection.on('connected', () => {
    clearError();
  });

  return client;
}

// Channel modes are the client's declared intent, enforced by Ably. They're
// the second layer of least-privilege after the token capabilities: a voter
// attaches with annotation_publish only, so it can cast votes but never
// receive the (much higher-volume) individual annotation stream the presenter
// consumes, nor publish poll messages.
const MODES_BY_ROLE: Record<Role, Ably.ChannelMode[]> = {
  // Admin publishes poll/control messages and subscribes for echo + summaries.
  // Also subscribes to per-annotation events to render the live suggest list.
  admin: ['publish', 'subscribe', 'annotation_subscribe'],
  // Voter only publishes annotations (votes, suggestions) and subscribes for
  // poll/control messages.
  voter: ['subscribe', 'annotation_publish'],
  // Presenter is read-only on both messages and per-annotation events.
  presenter: ['subscribe', 'annotation_subscribe'],
};

// The channel a session runs on. Always namespaced under `voting:` so the
// channel rules this app needs, such as Message annotations and serverside batching, can
// be configured against the `voting` namespace. In the sandbox `sessionId` is the
// injected channel name; in the real app it's the admin-generated session id.
export function votingChannelName(sessionId: string): string {
  return `voting:${sessionId}`;
}

export function getChannel(client: Ably.Realtime, sessionId: string, role: Role): Ably.RealtimeChannel {
  // `rewind: 1` means a client that attaches mid-poll immediately receives the
  // current poll message (and its latest annotation summary), so late joiners
  // and page refreshes catch up without the admin re-publishing.
  const channel = client.channels.get(votingChannelName(sessionId), {
    params: { rewind: '1' },
    modes: MODES_BY_ROLE[role],
  });

  channel.on('failed', (change) => {
    const reason = change.reason;
    const detail = reason?.cause?.message || reason?.message || 'unknown error';
    showError(`Channel error: ${detail}`);
  });

  return channel;
}
