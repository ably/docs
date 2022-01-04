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
    stripComments
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
//TODO: Everything related to creating its own blocks/datatypes should be put into the parsing stage, which should include parseNanocPartials
// & reduce over the array created by that function.
const preParser = (content, attributes) => {
    // Readability/Semantic operations
    let result = stripComments(content);
    // TODO: These should be part of React rendering/components
    // result = addMinimizeForHeadings(result);
    // result = addMinimizedIndent(result);
    // Language Operations
    //TODO: This should be part of React rendering/components
    // result = convertJSAllToNodeAndJavaScript(result);
    //TODO: This should not be converted to HTML, but translated to its own block/datatype.
    // result = convertBlangBlocksToHtml(result);
    result = addLanguageSupportForGithubStyleCode(result);
    result = duplicateLanguageBlocks(result);
    result = trimWhiteSpaceBetweenLanguageElements(result);
    //TODO: These (inc. Spec & Comparison operations) should not be converted into HTML, but translated to their own block/datatypes in the contentOrderedList.
    // result = addLanguageSupportForBlockQuotes(result);
    // result = addLanguageSupportForHeadings(result);
    // Spec operations
    // TODO: add anchor_specs to variables that must be included from frontmatter
    // result = addSpecAnchorLinks(result, attributes);
    // Comparison operations
    // TODO: load compare.yaml into GraphQL
    // result = addCompareTable(result, attributes);
    // result = addCompareNames(result, attributes);
    // result = addCompareUrls(result, attributes);
    // result = addCompareId(result, attributes);
    // Date operations
    //TODO: load published date from file system
    result = addPublishedDate(result, attributes);
    // Inline code editor operations
    //TODO: This should not be converted to HTML, but translated to its own block/datatype.
    // result = addSupportForInlineCodeEditor(result, path);
    // TODO: Extract all links so that any external can be processed in React to have target="_blank" and rel="noopener (noreferer?)"
    return result;
}

module.exports = {
    preParser
};