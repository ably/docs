const { isArray } = require('lodash');
const { LATEST_ABLY_API_VERSION_STRING, DOCUMENTATION_PATH } = require('../transform/constants');
const { DEFAULT_LANGUAGE } = require('./constants');
const { createContentMenuDataFromPage } = require('./createContentMenuDataFromPage');

// Mutation (modifying the languageSet provided) is much easier here
// Should also be safer given the guarantees of a Set()
const addLanguagesToSet =
  (languageSet, languageToKeep = DEFAULT_LANGUAGE) =>
  (content) => {
    const {
      data = '',
      attribs: { lang = languageToKeep } = {
        lang: languageToKeep,
      },
    } = content;
    if (isArray(data)) {
      if (lang !== languageToKeep) {
        languageSet.add(lang.trim());
      }
      data.forEach(addLanguagesToSet(languageSet, languageToKeep));
    }
  };

const getLanguagesFromContent = (contentOrderedList) => {
  const languageSet = new Set();
  contentOrderedList.forEach(addLanguagesToSet(languageSet));
  return Array.from(languageSet);
};

const createLanguagePageVariants = (createPage, documentTemplate) => (contentOrderedList, slug) => {
  const languages = getLanguagesFromContent(contentOrderedList);
  const contentMenus = languages.map((lang) => {
    const contentMenu = contentOrderedList.map((item) => createContentMenuDataFromPage(item, [], lang));
    createPage({
      path: `${DOCUMENTATION_PATH}${slug}/language/${lang}`,
      component: documentTemplate,
      context: {
        // The slug is the canonical slug, not the variant path
        slug,
        version: LATEST_ABLY_API_VERSION_STRING,
        language: lang,
        languages,
        contentOrderedList,
        contentMenu: contentMenu ?? [],
      },
    });
    return { [lang]: contentMenu };
  });
  const contentMenuObject = Object.assign({}, ...contentMenus);
  return [languages, contentMenuObject];
};

module.exports = {
  addLanguagesToSet,
  getLanguagesFromContent,
  createLanguagePageVariants,
};
