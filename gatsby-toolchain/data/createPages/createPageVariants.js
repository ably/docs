const { isArray } = require("lodash");

const DEFAULT_LANGUAGE = 'default';
const TEXT_LANGUAGE = 'text';
const HYPERTEXT_LANGUAGE = 'html';
const YETANOTHERMARKUP_LANGUAGE = 'yaml';
const JSON_LANGUAGE = 'json';

const IGNORED_LANGUAGES = [DEFAULT_LANGUAGE, TEXT_LANGUAGE, HYPERTEXT_LANGUAGE, YETANOTHERMARKUP_LANGUAGE, JSON_LANGUAGE];
const IGNORED_LANGUAGES_FOR_DISPLAY = [TEXT_LANGUAGE, HYPERTEXT_LANGUAGE, YETANOTHERMARKUP_LANGUAGE, JSON_LANGUAGE];

// Mutation (modifying the languageSet provided) is much easier here
// Should also be safer given the guarantees of a Set()
const addLanguagesToSet = (languageSet, languageToKeep = DEFAULT_LANGUAGE) => (content) => {
    const {
        data = '',
        attribs: {
            lang = languageToKeep
        } = {
            lang: languageToKeep
        }
    } = content;
    if(isArray(data)) {
        if(lang !== languageToKeep) {
            languageSet.add(lang);
        }
        data.forEach(addLanguagesToSet(languageSet, languageToKeep))
    }
}

const createLanguagePageVariants = (createPage, documentTemplate) => (contentOrderedList, slug) => {
    const languageSet = new Set();
    contentOrderedList.forEach(addLanguagesToSet(languageSet));
    
    languageSet.forEach(lang => {
        createPage({
            path: `/documentation/${slug}/language/${lang}`,
            component: documentTemplate,
            context: {
                // The slug is the canonical slug, not the variant path
                slug,
                language: lang,
                languages: Array.from(languageSet),
                contentOrderedList
            }
        });
    });
    return Array.from(languageSet);
}

module.exports = {
    DEFAULT_LANGUAGE,
    IGNORED_LANGUAGES,
    IGNORED_LANGUAGES_FOR_DISPLAY,
    addLanguagesToSet,
    createLanguagePageVariants
}