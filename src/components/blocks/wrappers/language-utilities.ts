import { isArray, isString } from 'lodash';
import { HtmlComponentPropsData } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';

export type LanguageGroup = {
  start: number;
  end: number;
  index: number;
  primary: string;
  languages: string[];
  data: Record<string, Record<string, unknown>> | null;
};

const makeGroup = (lang: string, index: number, data: Record<string, Record<string, unknown>>): LanguageGroup => ({
  start: index,
  end: index,
  index,
  primary: lang,
  languages: [lang],
  data: {
    [lang]: data,
  },
});

const assignPrimary = (
  group: LanguageGroup,
  lang: string,
  targetLanguage: string,
  data: Record<string, Record<string, unknown>>,
  index: number,
) => {
  group.languages.push(lang);
  if (lang === targetLanguage) {
    group.index = index;
    group.primary = targetLanguage;
  }
  if (lang === DEFAULT_LANGUAGE && group.primary !== targetLanguage) {
    group.index = index;
    group.primary = DEFAULT_LANGUAGE;
  }
  if (group.data === null) {
    return group;
  }
  return {
    ...group,
    data: Object.assign(group.data, {
      [lang]: data,
    }),
  };
};

const addToFilter = (group: LanguageGroup, toFilter: boolean[]) => {
  for (let i = 0; group.start + i <= group.end; ++i) {
    toFilter[group.start + i] = group.languages[i] !== group.primary;
  }
};

const matchesLanguageOrDefault = (pageLanguage: string, language?: string) =>
  !language || pageLanguage === language || DEFAULT_LANGUAGE === language;

const childMatchesLanguageOrDefault = (pageLanguage: string, data: HtmlComponentPropsData) => {
  if (!isArray(data) || data.length !== 1 || !data[0].attribs?.lang) {
    return true;
  }
  return matchesLanguageOrDefault(pageLanguage, data[0].attribs?.lang);
};

const childOrSelfHasLanguageMatchingPageLanguageOrDefault = (
  pageLanguage: string,
  data: HtmlComponentPropsData,
  language?: string,
) => matchesLanguageOrDefault(pageLanguage, language) && childMatchesLanguageOrDefault(pageLanguage, data);

const isIrrelevantForLanguageDisplay = (data: HtmlComponentPropsData): boolean =>
  !!data && isString(data) && /^\s*$/.test(data);

export {
  makeGroup,
  assignPrimary,
  addToFilter,
  isIrrelevantForLanguageDisplay,
  matchesLanguageOrDefault,
  childMatchesLanguageOrDefault,
  childOrSelfHasLanguageMatchingPageLanguageOrDefault,
};
