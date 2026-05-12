import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $session } from '../../stores/session';
import { $apiKeys } from '../../stores/apiKeys';

interface Props {
  sessionEndpoint?: string;
  apiKeysEndpoint?: string;
}

/**
 * Headless island — renders nothing. On mount, fetches session + API keys
 * and writes them to nanostores. This is the entire Redux replacement:
 *
 *   - Replaces gatsby-browser's createRemoteDataStore + attachStoreToWindow.
 *   - Replaces connectState() subscribers in UserContextWrapper.
 *   - Gives other islands (Header button, <Code> snippet, gate-toggle script)
 *     a single source of truth without a Provider tree.
 *
 * Mount once in DocsLayout with client:load — all pages share one fetch.
 */
const UserProvider = ({ sessionEndpoint, apiKeysEndpoint }: Props) => {
  const session = useStore($session);

  // Mirror signed-in state onto <html data-auth>. This is what
  // styles/gate.css keys off to reveal `<If loggedIn>` blocks.
  useEffect(() => {
    document.documentElement.dataset.auth = session.signedIn ? 'signed-in' : 'anonymous';
  }, [session.signedIn]);

  useEffect(() => {
    if (!sessionEndpoint) return;
    fetch(sessionEndpoint, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) $session.set(data);
      })
      .catch(() => {
        /* anonymous stays anonymous */
      });
  }, [sessionEndpoint]);

  useEffect(() => {
    if (!apiKeysEndpoint) return;
    fetch(apiKeysEndpoint, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) $apiKeys.set(data);
      })
      .catch(() => {
        /* leave empty */
      });
  }, [apiKeysEndpoint]);

  return null;
};

export default UserProvider;
