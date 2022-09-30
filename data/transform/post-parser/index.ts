import { compose } from 'lodash/fp';
import { convertBlangBlocksToHtml } from './blang';
import { rootLevelTextWrapper } from './root-level-text-wrapper';

/**
 * Added by the pre-parser in order to survive textile parsing
 */
const addGithubLineBreaks: StringTransformation = (content) => content.replaceAll('{{{github_br}}}', '\n');

const LINK_EXTERNAL_REGEX = /(<a[^>]*)class="external"([^>]*>)/m;

const convertExternalLinksToBlankTarget: StringTransformation = (content) =>
  content.replace(LINK_EXTERNAL_REGEX, '$1target="_blank" rel="noopener noreferrer"$2');

export const postParser = compose(
  convertExternalLinksToBlankTarget,
  convertBlangBlocksToHtml,
  addGithubLineBreaks,
  rootLevelTextWrapper,
);
