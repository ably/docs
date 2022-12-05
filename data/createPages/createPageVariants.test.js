import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../transform/constants';
import { DEFAULT_LANGUAGE } from './constants';
import { addLanguagesToSet, createLanguagePageVariants } from './createPageVariants';

const simpleData = {
  data: [],
  attribs: {
    lang: 'javascript',
  },
};

const simpleEmptyAttribsData = {
  data: '',
};

describe('addLanguagesToSet adds languages from data into a set', () => {
  const set = new Set();
  beforeEach(() => set.clear());
  const addNonJavaScriptToSet = addLanguagesToSet(set, 'javascript');
  const addNonDefaultToSet = addLanguagesToSet(set, DEFAULT_LANGUAGE);
  it('Empty attributes data does not throw or alter set', () => {
    addNonJavaScriptToSet(simpleEmptyAttribsData);
    expect(set.size).toBe(0);
  });
  it('Non-matching language does alter set', () => {
    addNonDefaultToSet(simpleData);
    expect(set.size).toBe(1);
  });
  it('Matching language does not alter set', () => {
    addNonJavaScriptToSet(simpleData);
    expect(set.size).toBe(0);
  });
});
const createPage = jest.fn();
const documentTemplate = 'mock-path';
const contentOrderedList = [simpleData, simpleEmptyAttribsData];
const slug = 'mock-slug';
const parentSlug = 'mock-parent-slug';
const version = LATEST_ABLY_API_VERSION_STRING;
describe('createLanguagePageVariants successfully creates the page variants', () => {
  let basicResults;
  it('Function does not throw on simple inputs', () => {
    expect(() => {
      basicResults = createLanguagePageVariants(createPage, documentTemplate)(
        contentOrderedList,
        slug,
        parentSlug,
        version,
      );
    }).not.toThrow();
  });
  it('Function returns simple list of non-default language(s)', () => {
    expect(basicResults).toEqual([['javascript'], { javascript: [[], []] }]);
  });
  it('Mock createPage function was called with the relevant data', () => {
    expect(createPage.mock.calls.length).toBeGreaterThan(0);
    expect(createPage.mock.calls).toContainEqual([
      {
        path: `${DOCUMENTATION_PATH}mock-slug/language/javascript`,
        component: 'mock-path',
        context: {
          slug: 'mock-parent-slug',
          version: LATEST_ABLY_API_VERSION_STRING,
          language: 'javascript',
          languages: ['javascript'],
          contentOrderedList: [simpleData, simpleEmptyAttribsData],
          contentMenu: [[], []],
        },
      },
    ]);
  });
});
