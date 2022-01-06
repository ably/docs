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
} = require('../parser-enhancements/spec');
const {
    addCompareTable,
    addCompareNames,
    addCompareUrls,
    addCompareId
} = require('../parser-enhancements/comparison');
const {
    addSupportForInlineCodeEditor
} = require('../parser-enhancements/inline-code');
//TODO: Everything related to creating its own blocks/datatypes should be put into the parsing stage, which should include parseNanocPartials
// & reduce over the array created by that function.
const preParser = (content) => {
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
    // TODO: Move commented out functions to place where they have access to metadata/attributes/frontmatter
    // TODO: add anchor_specs to variables that must be included from frontmatter
    // result = addSpecAnchorLinks(result, attributes);
    // Comparison operations
    // TODO: load compare.yaml into GraphQL
    // result = addCompareTable(result, attributes);
    // result = addCompareNames(result, attributes);
    // result = addCompareUrls(result, attributes);
    // result = addCompareId(result, attributes);
    // Inline code editor operations
    // result = addSupportForInlineCodeEditor(result, path);
    // TODO: Ensure all external links have target="_blank" and rel="noopener (noreferer?)"
    return result;
}

module.exports = {
    preParser
};