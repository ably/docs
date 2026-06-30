// Configuration and sandbox detection.
//
// In the hosted docs sandbox the build replaces `import.meta.env.VITE_ABLY_KEY`
// and `import.meta.env.VITE_NAME` with real string literals, so the demo runs
// entirely in the browser with no backend. In a normal clone these are
// undefined, and the app talks to the bundled server instead (see ../../server).
//
// Only reference env vars that the docs build injects (VITE_ABLY_KEY,
// VITE_NAME). Other `import.meta.env` lookups would survive into the sandbox
// bundle and break it — the server-backed config (auth URL, API base) is wired
// through same-origin paths and a Vite dev proxy instead (see vite.config.ts).

export const SANDBOX_ABLY_KEY = import.meta.env.VITE_ABLY_KEY as string | undefined;

// A shared channel seed. In the sandbox both preview panes get the same
// injected value, so the voter and presenter land on the same channel without
// exchanging a session id. In a clone this is undefined and the session id
// comes from the URL (`?s=...`) instead.
export const SANDBOX_CHANNEL_SEED = import.meta.env.VITE_NAME as string | undefined;

/** True only inside the hosted docs sandbox (a raw key was injected). */
export const IS_SANDBOX = Boolean(SANDBOX_ABLY_KEY);
