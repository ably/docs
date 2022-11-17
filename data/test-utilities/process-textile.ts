import { loadAndAlterHtml } from '../html-parser';
import { postParser } from '../transform/post-parser';
import { compose } from 'lodash/fp';
import textile from 'textile-js';
import { preParser } from '../transform/pre-parser';

export const processTextile = compose(
  (cheerio: cheerio.Cheerio) => cheerio.toArray(),
  loadAndAlterHtml,
  postParser,
  textile,
  preParser,
);
