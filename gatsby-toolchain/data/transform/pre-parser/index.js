const {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToHtml,
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
const {
    addSpecAnchorLinks
} = require('./spec');
const {
    addCompareTable,
    addCompareNames,
    addCompareUrls,
    addCompareId
} = require('./comparison');
const {
    addPublishedDate
} = require('./date');
const {
    addSupportForInlineCodeEditor
} = require('./inline-code');

const preParser = (content, path, attributes) => {
    // Readability/Semantic operations
    let result = stripComments(content);
    result = addMinimizeForHeadings(result);
    result = addMinimizedIndent(result);
    // Language Operations
    result = convertJSAllToNodeAndJavaScript(result);
    result = convertBlangBlocksToHtml(result);
    result = addLanguageSupportForGithubStyleCode(result);
    result = duplicateLanguageBlocks(result);
    result = trimWhiteSpaceBetweenLanguageElements(result);
    result = addLanguageSupportForBlockQuotes(result);
    result = addLanguageSupportForHeadings(result);
    // Spec operations
    result = addSpecAnchorLinks(result, attributes);
    // Comparison operations
    result = addCompareTable(result, attributes);
    result = addCompareNames(result, attributes);
    result = addCompareUrls(result, attributes);
    result = addCompareId(result, attributes);
    // Date operations
    result = addPublishedDate(result, attributes);
    // Inline code editor operations
    result = addSupportForInlineCodeEditor(result, path);
    return result;
}

module.exports = {
    preParser
};