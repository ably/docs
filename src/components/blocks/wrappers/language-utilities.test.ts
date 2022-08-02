import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { assignPrimary } from './language-utilities';

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
