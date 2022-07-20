import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { assignPrimary } from './language-utilities';

describe('Assigning primary to language groups works as expected', () => {
  // NB: This test used to test for the opposite behaviour, hence the inclusion
  it('Primary language does not result in null data', () => {
    const result = assignPrimary(
      {
        languages: [],
        start: 0,
        end: 0,
        index: 0,
        primary: '',
        data: {},
      },
      'javascript', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      data: {},
      start: 0,
      end: 0,
      index: 0,
      languages: ['javascript'],
      primary: 'javascript',
    };
    expect(result).toEqual(expected);
  });

  // NB: This test used to test for the opposite behaviour, hence the inclusion
  it('Default language does not result in null data', () => {
    const result = assignPrimary(
      {
        languages: [],
        start: 0,
        end: 0,
        index: 0,
        primary: '',
        data: {},
      },
      DEFAULT_LANGUAGE, // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      data: {},
      start: 0,
      end: 0,
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
        start: 0,
        end: 0,
        index: 0,
        primary: '',
      },
      'csharp', // Current language
      'javascript', // target language
      {}, // Data for React to render, if any
      0,
    );
    const expected = {
      languages: ['csharp'],
      data: null,
      start: 0,
      end: 0,
      index: 0,
      primary: '',
    };
    expect(result).toEqual(expected);
  });
});
