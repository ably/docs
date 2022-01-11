const { addLanguageSupportForGithubStyleCode } = require('./support-for-github');
const { duplicateLanguageBlocks } = require('./duplicate-blocks');
const { trimWhiteSpaceBetweenLanguageElements } = require('./white-space');
const { convertJSAllToNodeAndJavaScript, convertBlangBlocksToTokens } = require('./conversions');
const { addLanguageSupportForBlockQuotes, addLanguageSupportForHeadings } = require('./html-support');


module.exports = {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToTokens,
    addLanguageSupportForGithubStyleCode,
    duplicateLanguageBlocks,
    trimWhiteSpaceBetweenLanguageElements,
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
}