import { http, HttpResponse } from 'msw';
import addsearchMock from '../__fixtures__/addsearchMock.json';

export const handlers = [
  http.get(`https://api.addsearch.com/v1/search/*`, () => {
    return HttpResponse.json(addsearchMock);
  }),
];
