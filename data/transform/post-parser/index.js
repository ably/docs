const { compose } = require('lodash/fp');
const { convertBlangBlocksToHtml } = require('./blang');

/**
 * Added by the pre-parser in order to survive textile parsing
 */
const addGithubLineBreaks = (content) => content.replaceAll('{{{github_br}}}', '\n');

const LINK_EXTERNAL_REGEX = /(<a[^>]*)class="external"([^>]*>)/m;

const convertExternalLinksToBlankTarget = (content) =>
  content.replace(LINK_EXTERNAL_REGEX, '$1target="_blank" rel="noopener noreferrer"$2');

const postParser = compose(convertExternalLinksToBlankTarget, convertBlangBlocksToHtml, addGithubLineBreaks);

module.exports = {
  postParser,
};
