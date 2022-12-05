import { assert, boolean, constant, property, string } from 'fast-check';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from './language-defaults';

const arbitraryDefaultLanguage = constant(DEFAULT_LANGUAGE);
const arbitraryNotDefaultLanguage = string().filter((s) => s !== DEFAULT_LANGUAGE);

describe('getLanguageDefaults', () => {
  it('Returns the language defaults as expected when language is DEFAULT_LANGUAGE and pageLanguage is not DEFAULT_LANGUAGE', () => {
    assert(
      property(arbitraryDefaultLanguage, arbitraryNotDefaultLanguage, (language, pageLanguage) => {
        const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
          language,
          pageLanguage,
        );
        expect(isLanguageDefault).toBe(true);
        expect(isPageLanguageDefault).toBe(false);
        expect(isLanguageActive).toBe(false);
      }),
    );
  });
  it('Returns the language defaults as expected when language is not DEFAULT_LANGUAGE and pageLanguage is DEFAULT_LANGUAGE', () => {
    assert(
      property(arbitraryNotDefaultLanguage, arbitraryDefaultLanguage, (language, pageLanguage) => {
        const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
          language,
          pageLanguage,
        );
        expect(isLanguageDefault).toBe(false);
        expect(isPageLanguageDefault).toBe(true);
        expect(isLanguageActive).toBe(false);
      }),
    );
  });
  it('Returns the language defaults as expected when language is DEFAULT_LANGUAGE and pageLanguage is DEFAULT_LANGUAGE', () => {
    assert(
      property(arbitraryDefaultLanguage, arbitraryDefaultLanguage, (language, pageLanguage) => {
        const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
          language,
          pageLanguage,
        );
        expect(isLanguageDefault).toBe(true);
        expect(isPageLanguageDefault).toBe(true);
        expect(isLanguageActive).toBe(true);
      }),
    );
  });
  it('Returns the language defaults as expected when language is not DEFAULT_LANGUAGE and pageLanguage is not DEFAULT_LANGUAGE but the same', () => {
    assert(
      property(arbitraryNotDefaultLanguage, (languageOrPageLanguage) => {
        const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
          languageOrPageLanguage,
          languageOrPageLanguage,
        );
        expect(isLanguageDefault).toBe(false);
        expect(isPageLanguageDefault).toBe(false);
        expect(isLanguageActive).toBe(true);
      }),
    );
  });
  it('Returns the language defaults as expected when language is not DEFAULT_LANGUAGE and pageLanguage is not DEFAULT_LANGUAGE but different', () => {
    assert(
      property(arbitraryNotDefaultLanguage, arbitraryNotDefaultLanguage, (language, pageLanguage) => {
        const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
          language,
          `${pageLanguage}${language}#`,
        );
        expect(isLanguageDefault).toBe(false);
        expect(isPageLanguageDefault).toBe(false);
        expect(isLanguageActive).toBe(false);
      }),
    );
  });
});

describe('createLanguageHrefFromDefaults', () => {
  it('Returns a string in the format ./?lang=my-language if the language is not DEFAULT_LANGUAGE', () => {
    assert(
      property(boolean(), constant(false), string(), (isPageLanguageDefault, isLanguageDefault, language) => {
        expect(createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language)).toBe(
          `./?lang=${language}`,
        );
      }),
    );
  });
  it('Returns a string in the format ./ if the language is DEFAULT_LANGUAGE and the pageLanguage is not DEFAULT_LANGUAGE', () => {
    assert(
      property(constant(false), constant(true), string(), (isPageLanguageDefault, isLanguageDefault, language) => {
        expect(createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language)).toBe('./');
      }),
    );
  });
});
