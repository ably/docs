const {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToTokens,
    addLanguageSupportForGithubStyleCode,
    duplicateLanguageBlocks,
    trimWhiteSpaceBetweenLanguageElements,
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
} = require('./language');
const {
    stripComments,
    addMinimizeForHeadings,
    addMinimizedIndent
} = require('./semantic');

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
    result = trimWhiteSpaceBetweenLanguageElements(result);
    result = addLanguageSupportForBlockQuotes(result);
    result = addLanguageSupportForHeadings(result);
    // TODO: Move commented out functions to place where they have access to metadata/attributes/frontmatter
    // Inline code editor operations
    // result = addSupportForInlineCodeEditor(result, path);
    return result;
}

module.exports = {
    preParser
};