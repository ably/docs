const { identity } = require("lodash");
const { addLanguageSupportForGithubStyleCode } = require('./support-for-github');
const { duplicateLanguageBlocks } = require('./duplicate-blocks');
const { trimWhiteSpaceBetweenLanguageElements } = require('./white-space');

const convertJSAllToNodeAndJavaScript = identity;
const convertBlangBlocksToHtml = identity;


const addLanguageSupportForBlockQuotes = identity;
const addLanguageSupportForHeadings = identity;

module.exports = {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToHtml,
    addLanguageSupportForGithubStyleCode,
    duplicateLanguageBlocks,
    trimWhiteSpaceBetweenLanguageElements,
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
}