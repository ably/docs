const { convertBlangBlocksToHtml } = require('./blang');
const { convertCollapsibleMarkupToHtml } = require('./collapsible');

const addGithubLineBreaks = content => content.replaceAll('{{{github_br}}}', '\n');

const LINK_EXTERNAL_REGEX = /(<a[^>]*)class="external"([^>]*>)/m

const convertExternalLinksToBlankTarget = content => content.replace(LINK_EXTERNAL_REGEX, '$1target="_blank" rel="noopener noreferrer"$2');

const postParser = content => {
    let result = addGithubLineBreaks(content);
    result = convertBlangBlocksToHtml(result);
    result = convertExternalLinksToBlankTarget(result);
    result = convertCollapsibleMarkupToHtml(result);
    return result;
}

module.exports = {
    postParser
}