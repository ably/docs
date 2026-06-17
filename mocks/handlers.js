import { http, HttpResponse } from 'msw';

import {
  WEB_API_USER_DATA_ENDPOINT,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_TEMP_KEY_ENDPOINT,
} from 'src/contexts/user-context/api-keys';

export const handlers = [
  http.get(WEB_API_USER_DATA_ENDPOINT, () => {
    return HttpResponse.json({ error: 'not-found' });
  }),

  http.get(WEB_API_KEYS_DATA_ENDPOINT, () => {
    return HttpResponse.json({ error: 'not-found' });
  }),

  http.get(WEB_API_TEMP_KEY_ENDPOINT, () => {
    return HttpResponse.text('DEMO:API-KEY');
  }),
];
