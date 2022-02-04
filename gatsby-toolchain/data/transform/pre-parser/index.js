const {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToTokens,
    addLanguageSupportForGithubStyleCode,
    duplicateLanguageBlocks,
    enforceWhiteSpaceLevelsBetweenLanguageElements,
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
} = require('./language');
const {
    stripComments,
    addMinimizeForHeadings,
    addMinimizedIndent
} = require('./semantic');
const { compressMultipleNewlinesInLists, manuallyReplaceHTags } = require('./textile-js-workarounds');

// Newlines before closing tags inhibit textile-js' ability to correctly parse HTML
const removeNewlinesBeforeClosingTags = content => content.replace(/\n+(<\/\w+>)/g,'$1');

const preParser = (content) => {
    // Readability/Semantic operations
    let result = stripComments(content);
    result = removeNewlinesBeforeClosingTags(result);
    result = addMinimizeForHeadings(result);
    result = addMinimizedIndent(result);
    // Language Operations
    result = convertJSAllToNodeAndJavaScript(result);
    result = convertBlangBlocksToTokens(result);
    result = addLanguageSupportForGithubStyleCode(result);
    result = duplicateLanguageBlocks(result);
    result = enforceWhiteSpaceLevelsBetweenLanguageElements(result);
    result = addLanguageSupportForBlockQuotes(result);
    result = addLanguageSupportForHeadings(result);
    // Textile compatibility operations
    result = compressMultipleNewlinesInLists(result)
    result = manuallyReplaceHTags(result);

    return result;
}

module.exports = {
    preParser
};