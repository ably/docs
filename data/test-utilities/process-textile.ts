import { cheerioParser, loadAndAlterHtml } from '../html-parser';
import { postParser } from '../transform/post-parser';
import { compose } from 'lodash/fp';
import textile from 'textile-js';
import { preParser } from '../transform/pre-parser';

export const textileToHtml = compose(postParser, textile, preParser);

export const textileToCheerio = compose(loadAndAlterHtml, textileToHtml);

export const processTextile = compose((cheerio: cheerio.Cheerio) => cheerio.toArray(), textileToCheerio);

export const fullyParseTextile = compose(cheerioParser, textileToCheerio);
