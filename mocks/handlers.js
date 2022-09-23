import { rest } from 'msw';
import addsearchMock from '../__fixtures__/addsearchMock.json';

export const handlers = [
  rest.get(`https://api.addsearch.com/v1/search/*`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(addsearchMock));
  }),
];
