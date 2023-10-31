import { http, HttpResponse } from 'msw';
import addsearchMock from '../__fixtures__/addsearchMock.json';

import {
  WEB_API_USER_DATA_ENDPOINT,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_TEMP_KEY_ENDPOINT,
} from 'src/redux/api-key/constants';

export const handlers = [
  http.get(`https://api.addsearch.com/v1/search/*`, () => {
    return HttpResponse.json(addsearchMock);
  }),

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
