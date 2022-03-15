import * as fc from 'fast-check';
import alphaNumericString from '../../test-generators.js/alphanumeric';
import { DEFAULT_LANGUAGE } from './constants';

const HtmlDataTypes = require('../types/html');
const { addLanguagesToSet } = require('./createPageVariants');

const simpleHtmlDataObject = {
  data: [],
  type: HtmlDataTypes.tag,
  name: HtmlDataTypes.dl,
  attribs: {
    lang: DEFAULT_LANGUAGE,
  },
};

const makeSimpleHtml = (language) => ({
  ...simpleHtmlDataObject,
  attribs: {
    lang: language,
  },
});

const makeCompoundHtml = (simpleHtmlObject) => ({
  ...simpleHtmlObject,
  data: [simpleHtmlObject, simpleHtmlObject, simpleHtmlObject],
  attribs: {
    lang: DEFAULT_LANGUAGE + simpleHtmlObject.attribs.lang,
  },
});

const genSimpleHtmlDataObject = alphaNumericString.map(makeSimpleHtml);

const genCompoundHtmlDataObject = genSimpleHtmlDataObject.map(makeCompoundHtml);

const set = new Set();

beforeEach(() => set.clear());

describe('Data objects parsed from HTML should have languages added to the set of languages', () => {
  it('A simple single HTML element is not registered', () => {
    addLanguagesToSet(set)(simpleHtmlDataObject);
    expect(set.size).toBe(0);
  });
  it('A simple single HTML element is registered', () => {
    addLanguagesToSet(set)(makeSimpleHtml('javascript'));
    expect(set.size).toBe(1);
    expect(set.has('javascript')).toBe(true);
  });

  it('Any generated simple single HTML elements are correctly filtered and KEPT', () => {
    fc.assert(
      fc
        .property(genSimpleHtmlDataObject, (simpleObject) => {
          addLanguagesToSet(set, simpleObject.attribs.lang)(simpleObject);
          expect(set.size).toBe(0);
        })
        .beforeEach(() => set.clear()),
    );
  });
  it('Any generated simple single HTML elements are correctly filtered and REMOVED', () => {
    fc.assert(
      fc
        .property(genSimpleHtmlDataObject, fc.string({ minLength: 1 }), (simpleObject, str) => {
          addLanguagesToSet(set, `${simpleObject.attribs.lang}${str}`)(simpleObject);
          expect(set.size).toBe(1);
          expect(set.has(simpleObject.attribs.lang)).toBe(true);
        })
        .beforeEach(() => set.clear()),
    );
  });

  it('Any generated compound HTML elements are correctly filtered and REMOVED', () => {
    fc.assert(
      fc
        .property(genCompoundHtmlDataObject, (compoundObject) => {
          addLanguagesToSet(set, compoundObject.attribs.lang)(compoundObject);
          expect(set.size).toBe(1);
          expect(set.has(compoundObject.data[0].attribs.lang)).toBe(true);
        })
        .beforeEach(() => set.clear()),
    );
  });
});
