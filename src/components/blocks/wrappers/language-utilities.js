import { isString } from 'lodash';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';

const makeGroup = (lang, index, data) => ({
  start: index,
  end: index,
  index,
  primary: lang,
  languages: [lang],
  data: {
    [lang]: data,
  },
});

const assignPrimary = (group, lang, targetLanguage, data, index) => {
  group.languages.push(lang);
  if (lang === targetLanguage) {
    return {
      ...group,
      index,
      data: null,
      primary: targetLanguage,
    };
  }
  if (lang === DEFAULT_LANGUAGE && group.primary !== targetLanguage) {
    return {
      ...group,
      index,
      data: null,
      primary: DEFAULT_LANGUAGE,
    };
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

const addToFilter = (group, toFilter) => {
  for (let i = 0; group.start + i <= group.end; ++i) {
    toFilter[group.start + i] = group.languages[i] !== group.primary;
  }
};

const isIrrelevantForLanguageDisplay = (data) => !!data && isString(data) && /^\s*$/.test(data);

export { makeGroup, assignPrimary, addToFilter, isIrrelevantForLanguageDisplay };
