import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { assignPrimary } from './language-utilities';

describe('Assigning primary to language groups works as expected', () => {
  it('Primary language results in null data, primary language being returned', () => {
    const result = assignPrimary(
      {
        languages: [],
      },
      'javascript', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      data: null,
      index: 0,
      languages: ['javascript'],
      primary: 'javascript',
    };
    expect(result).toEqual(expected);
  });

  it('Default language results in null data, primary language being returned', () => {
    const result = assignPrimary(
      {
        languages: [],
      },
      DEFAULT_LANGUAGE, // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      data: null,
      index: 0,
      languages: [DEFAULT_LANGUAGE],
      primary: DEFAULT_LANGUAGE,
    };
    expect(result).toEqual(expected);
  });

  it("If data is already null, and there's been no override, return the group unchanged (except for added language)", () => {
    const result = assignPrimary(
      {
        languages: [],
        data: null,
      },
      'csharp', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      languages: ['csharp'],
      data: null,
    };
    expect(result).toEqual(expected);
  });
});
