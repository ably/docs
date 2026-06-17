import { http, HttpResponse } from 'msw';

import { server } from '../../../mocks/server';
import { fetchApps, WEB_API_KEYS_DATA_ENDPOINT, WEB_API_TEMP_KEY_ENDPOINT } from './api-keys';

const APP_KEYS_URL = 'https://example.test/apps/a/keys';

beforeEach(() => {
  // Stub the ad hoc window globals the demo-key flow writes to. They're not
  // asserted on directly; the cleanup is so test runs stay isolated.
  (window as unknown as { ably?: unknown }).ably = {
    docs: {
      DOCS_API_KEY: false,
      randomChannelName: '',
      onApiKeyRetrieved: () => undefined,
    },
  };
});

afterEach(() => {
  delete (window as unknown as { ably?: unknown }).ably;
});

describe('fetchApps', () => {
  it('returns the demo app plus any real apps when both endpoints respond', async () => {
    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => HttpResponse.text('DEMO:KEY')),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () => HttpResponse.json({ data: [{ name: 'My App', url: APP_KEYS_URL }] })),
      http.get(APP_KEYS_URL, () => HttpResponse.json([{ name: 'Root', whole_key: 'REAL:KEY' }])),
    );

    const apps = await fetchApps();

    expect(apps).toHaveLength(2);
    expect(apps[0]).toMatchObject({ demo: true, apiKeys: [{ whole_key: 'DEMO:KEY' }] });
    expect(apps[1]).toMatchObject({
      demo: false,
      name: 'My App',
      url: APP_KEYS_URL,
      apiKeys: [{ name: 'Root', whole_key: 'REAL:KEY' }],
    });
  });

  it('still returns real apps when the demo-key endpoint is down', async () => {
    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => new HttpResponse(null, { status: 503 })),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () => HttpResponse.json({ data: [{ name: 'My App', url: APP_KEYS_URL }] })),
      http.get(APP_KEYS_URL, () => HttpResponse.json([{ name: 'Root', whole_key: 'REAL:KEY' }])),
    );

    const apps = await fetchApps();

    expect(apps).toHaveLength(1);
    expect(apps[0]).toMatchObject({ demo: false, apiKeys: [{ whole_key: 'REAL:KEY' }] });
  });

  it('returns the demo app alone when the api-keys endpoint fails', async () => {
    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => HttpResponse.text('DEMO:KEY')),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () => new HttpResponse(null, { status: 500 })),
    );

    const apps = await fetchApps();

    expect(apps).toEqual([
      expect.objectContaining({ demo: true, apiKeys: [expect.objectContaining({ whole_key: 'DEMO:KEY' })] }),
    ]);
  });

  it('returns just the demo app when api-keys payload signals "not-found"', async () => {
    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => HttpResponse.text('DEMO:KEY')),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () => HttpResponse.json({ error: 'not-found' })),
    );

    const apps = await fetchApps();

    expect(apps).toEqual([
      expect.objectContaining({ demo: true, apiKeys: [expect.objectContaining({ whole_key: 'DEMO:KEY' })] }),
    ]);
  });

  it('returns an empty list when both endpoints fail', async () => {
    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => new HttpResponse(null, { status: 500 })),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () => new HttpResponse(null, { status: 500 })),
    );

    const apps = await fetchApps();

    expect(apps).toEqual([]);
  });

  it('drops individual real-app entries whose key URL fails', async () => {
    const FAILING_URL = 'https://example.test/apps/broken/keys';

    server.use(
      http.get(WEB_API_TEMP_KEY_ENDPOINT, () => HttpResponse.text('DEMO:KEY')),
      http.get(WEB_API_KEYS_DATA_ENDPOINT, () =>
        HttpResponse.json({
          data: [
            { name: 'Working', url: APP_KEYS_URL },
            { name: 'Broken', url: FAILING_URL },
          ],
        }),
      ),
      http.get(APP_KEYS_URL, () => HttpResponse.json([{ name: 'Root', whole_key: 'REAL:KEY' }])),
      http.get(FAILING_URL, () => new HttpResponse(null, { status: 404 })),
    );

    const apps = await fetchApps();

    expect(apps).toHaveLength(2); // demo + working only
    expect(apps.map((app) => app.name)).toEqual(['Demo Only', 'Working']);
  });
});
