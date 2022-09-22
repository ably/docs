import { HtmlComponentPropsData } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { assignPrimary, childMatchesLanguageOrDefault, matchesLanguageOrDefault } from './language-utilities';

const createLanguageGroupWithDefaults = (
  data: Record<string, Record<string, unknown>> | null = null,
  primary = '',
  languages: string[] = [],
) => ({
  start: 0,
  end: 0,
  index: 0,
  primary,
  data,
  languages,
});

describe('Assigning primary to language groups works as expected', () => {
  // NB: This test used to test for the opposite behaviour, hence the inclusion
  it('Primary language does not result in null data', () => {
    const result = assignPrimary(
      createLanguageGroupWithDefaults({}),
      'javascript', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = createLanguageGroupWithDefaults({ javascript: {} }, 'javascript', ['javascript']);
    expect(result).toEqual(expected);
  });

  // NB: This test used to test for the opposite behaviour, hence the inclusion
  it('Default language does not result in null data', () => {
    const result = assignPrimary(
      createLanguageGroupWithDefaults({}),
      DEFAULT_LANGUAGE, // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = createLanguageGroupWithDefaults({ [DEFAULT_LANGUAGE]: {} }, DEFAULT_LANGUAGE, [DEFAULT_LANGUAGE]);
    expect(result).toEqual(expected);
  });

  it("If data is already null, and there's been no override, return the group unchanged (except for added language)", () => {
    const result = assignPrimary(
      createLanguageGroupWithDefaults(),
      'csharp', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = createLanguageGroupWithDefaults(null, '', ['csharp']);
    expect(result).toEqual(expected);
  });
});

describe('Checking that languages match the page language (or default) works as expected', () => {
  const languageMatches = 'javascript';
  const languageDoesNotMatch = 'java';
  const pageLanguage = 'javascript';
  it('Checks to see if the language matches the page language', () => {
    const undefinedLanguageElement = matchesLanguageOrDefault(pageLanguage);
    const simpleMatch = matchesLanguageOrDefault(pageLanguage, languageMatches);
    const noSimpleMatch = matchesLanguageOrDefault(pageLanguage, languageDoesNotMatch);
    expect(undefinedLanguageElement).toBe(true);
    expect(simpleMatch).toBe(true);
    expect(noSimpleMatch).toBe(false);
  });
  const undefinedLangAttribProps: HtmlComponentPropsData = [
    {
      data: [],
      attribs: {},
    },
  ];
  const tooManyItemsInArray: HtmlComponentPropsData = [
    {
      data: [],
      attribs: {
        lang: languageDoesNotMatch,
      },
    },
    {
      data: [],
      attribs: {
        lang: languageDoesNotMatch,
      },
    },
  ];
  const matchesLangAttribsProps: HtmlComponentPropsData = [
    {
      data: [],
      attribs: {
        lang: languageMatches,
      },
    },
  ];
  const doesNotMatchLangAttribsProps: HtmlComponentPropsData = [
    {
      data: [],
      attribs: {
        lang: languageDoesNotMatch,
      },
    },
  ];
  it('Checks to see if the child language matches the page language', () => {
    const emptyArrayCountsAsMatching = childMatchesLanguageOrDefault(pageLanguage, []);
    const tooManyItemsCountsAsMatching = childMatchesLanguageOrDefault(pageLanguage, tooManyItemsInArray);
    const undefinedChildLanguageElementCountsAsMatching = childMatchesLanguageOrDefault(
      pageLanguage,
      undefinedLangAttribProps,
    );

    expect(emptyArrayCountsAsMatching).toBe(true);
    expect(tooManyItemsCountsAsMatching).toBe(true);
    expect(undefinedChildLanguageElementCountsAsMatching).toBe(true);

    const singleChildMatches = childMatchesLanguageOrDefault(pageLanguage, matchesLangAttribsProps);
    const singleChildDoesNotMatch = childMatchesLanguageOrDefault(pageLanguage, doesNotMatchLangAttribsProps);

    expect(singleChildMatches).toBe(true);
    expect(singleChildDoesNotMatch).toBe(false);
  });
});
