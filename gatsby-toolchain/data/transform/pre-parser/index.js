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
    addSupportForInlineCodeEditor
} = require('../parser-enhancements/inline-code');

// Newlines before closing tags inhibit textile-js' ability to correctly parse HTML
const removeNewlinesBeforeClosingTags = content => content.replace(/\n+(<\/\w+>)/g,'$1');

//TODO: Everything related to creating its own blocks/datatypes should be put into the parsing stage, which should include parseNanocPartials
// & reduce over the array created by that function.
const preParser = (content) => {
    // Readability/Semantic operations
    let result = stripComments(content);
    result = removeNewlinesBeforeClosingTags(result);
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
    // Inline code editor operations
    // TODO: Move commented out functions to place where they have access to JSBin YAML
    // result = addSupportForInlineCodeEditor(result, path);
    return result;
}

module.exports = {
    preParser
};