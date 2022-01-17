const { isArray } = require("lodash");

const DEFAULT_LANGUAGE = 'default';

// Mutation (modifying the languageSet provided) is much easier here
// Should also be safer given the guarantees of a Set()
const filterHtmlLanguageContent = (languageSet, languageToKeep = DEFAULT_LANGUAGE) => (content) => {
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
            languageSet && languageSet.add(lang);
            return null;
        }
        return {
            ...content,   
            data: data.map(filterHtmlLanguageContent(languageSet, languageToKeep)).filter(x => !!x)
        }
    }
    return content;
}

const createLanguagePageVariantsAndModifyContent = (createPage, documentTemplate) => (contentOrderedList, slug) => {
    const languageSet = new Set();
    const filterContentAndFillSet = filterHtmlLanguageContent(languageSet);
    const modifiedContent = contentOrderedList.map(filterContentAndFillSet);
    
    languageSet.forEach(lang => {
        const filterContent = filterHtmlLanguageContent(null, lang);

        createPage({
            path: `/documentation/${slug}/language/${lang}`,
            component: documentTemplate,
            context: {
                // The slug is the canonical slug, not the variant path
                slug,
                language: lang,
                contentOrderedList: contentOrderedList.map(filterContent).filter(x => !!x)
            },
        });
    })
    return modifiedContent;
}

module.exports = {
    DEFAULT_LANGUAGE,
    filterHtmlLanguageContent,
    createLanguagePageVariantsAndModifyContent
}