const { addLanguageSupportForGithubStyleCode } = require('./support-for-github');
const { duplicateLanguageBlocks } = require('./duplicate-blocks');
const { enforceWhiteSpaceLevelsBetweenLanguageElements } = require('./white-space');
const { convertJSAllToNodeAndJavaScript, convertBlangBlocksToTokens } = require('./conversions');
const { addLanguageSupportForBlockQuotes, addLanguageSupportForHeadings } = require('./html-support');


module.exports = {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToTokens,
    addLanguageSupportForGithubStyleCode,
    duplicateLanguageBlocks,
    enforceWhiteSpaceLevelsBetweenLanguageElements,
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
}