import type { App, AppApiKey } from '../user-context';

const WEB_API = process.env.GATSBY_ABLY_MAIN_WEBSITE || 'http://localhost:3000';

export const WEB_API_USER_DATA_ENDPOINT = `${WEB_API}/api/me`;
export const WEB_API_KEYS_DATA_ENDPOINT = `${WEB_API}/api/api_keys`;
export const WEB_API_TEMP_KEY_ENDPOINT = `${WEB_API}/ably-auth/api-key/docs`;

const FETCH_OPTIONS: RequestInit = { cache: 'no-cache' };

declare global {
  interface Window {
    ably: {
      docs: {
        DOCS_API_KEY: boolean | string;
        randomChannelName: string;
        onApiKeyRetrieved: () => void;
      };
    };
  }
}

interface ApiKeyValue {
  name: string;
  url: string;
}

interface ApiKeysPayload {
  data?: ApiKeyValue[];
  error?: unknown;
}

const safelyInvokeApiKeyRetrievalTrigger = () => {
  try {
    window.ably.docs.onApiKeyRetrieved();
  } catch (e) {
    console.error(e);
  }
};

const fetchJson = async <T>(url: string, label: string): Promise<T> => {
  const res = await fetch(url, FETCH_OPTIONS);
  if (!res.ok) {
    throw new Error(`${label} endpoint at ${url} returned HTTP ${res.status}`);
  }
  const contentType = res.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await res.text();
    throw new Error(`${label} endpoint at ${url} is not serving JSON, received:\n\n${text}`);
  }
  return res.json() as Promise<T>;
};

const fetchDemoApp = async (): Promise<App> => {
  const res = await fetch(WEB_API_TEMP_KEY_ENDPOINT, FETCH_OPTIONS);
  if (!res.ok) {
    throw new Error(`temp-key endpoint at ${WEB_API_TEMP_KEY_ENDPOINT} returned HTTP ${res.status}`);
  }
  const tempApiKey = await res.text();

  if (window.ably?.docs && !window.ably.docs.DOCS_API_KEY) {
    window.ably.docs.DOCS_API_KEY = tempApiKey;
    safelyInvokeApiKeyRetrievalTrigger();
  }

  return {
    name: 'Demo Only',
    demo: true,
    url: WEB_API_TEMP_KEY_ENDPOINT,
    apiKeys: [{ name: 'Demo Only', whole_key: tempApiKey }],
  };
};

export const fetchApps = async (): Promise<App[]> => {
  // Best-effort: a temp-key outage shouldn't block the signed-in api-key list.
  let demoApp: App | null = null;
  try {
    demoApp = await fetchDemoApp();
  } catch (e) {
    console.warn('Could not fetch demo api key:', e);
  }

  let payload: ApiKeysPayload;
  try {
    payload = await fetchJson<ApiKeysPayload>(WEB_API_KEYS_DATA_ENDPOINT, 'api-keys');
  } catch (e) {
    console.warn('Could not fetch api keys due to error:', e);
    return demoApp ? [demoApp] : [];
  }

  if (payload.error || !Array.isArray(payload.data)) {
    return demoApp ? [demoApp] : [];
  }

  const realApps = await Promise.all(
    payload.data.map(async (entry): Promise<App | null> => {
      try {
        const apiKeysRaw = await fetchJson<AppApiKey[]>(entry.url, 'api-key-retrieval');
        const apiKeys: AppApiKey[] = apiKeysRaw.map(({ name, whole_key }) => ({ name, whole_key }));
        return { ...entry, apiKeys, demo: false };
      } catch (e) {
        console.warn(`Could not fetch api keys for ${entry.url}:`, e);
        return null;
      }
    }),
  );

  const apps = realApps.filter((app): app is App => app !== null);

  // Supporting ad hoc scripts; remove when those scripts are.
  if (window.ably?.docs && apps[0]?.apiKeys[0]?.whole_key) {
    window.ably.docs.DOCS_API_KEY = apps[0].apiKeys[0].whole_key;
    safelyInvokeApiKeyRetrievalTrigger();
  }

  return demoApp ? [demoApp, ...apps] : apps;
};
