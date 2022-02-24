const { isArray } = require('lodash');
const { LATEST_ABLY_API_VERSION_STRING } = require('../transform/constants');
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
        languageSet.add(lang);
      }
      data.forEach(addLanguagesToSet(languageSet, languageToKeep));
    }
  };

const createLanguagePageVariants =
  (createPage, documentTemplate) =>
  (contentOrderedList, slug, parentSlug = null, version = null) => {
    const languageSet = new Set();
    contentOrderedList.forEach(addLanguagesToSet(languageSet));

    languageSet.forEach((lang) => {
      const contentMenu = contentOrderedList.map((item) => createContentMenuDataFromPage(item, [], lang));
      createPage({
        path: `/documentation/${slug}/language/${lang}`,
        component: documentTemplate,
        context: {
          // The slug is the canonical slug, not the variant path
          slug: parentSlug ?? slug,
          version: version ?? LATEST_ABLY_API_VERSION_STRING,
          language: lang,
          languages: Array.from(languageSet),
          contentOrderedList,
          contentMenu: contentMenu ?? [],
        },
      });
    });
    return Array.from(languageSet);
  };

module.exports = {
  addLanguagesToSet,
  createLanguagePageVariants,
};
