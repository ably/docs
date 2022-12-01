import { rootLevelTextWrapper } from '../../../data/transform/post-parser/root-level-text-wrapper';
import { addGithubLineBreaks, convertExternalLinksToBlankTarget } from '../../../data/transform/post-parser';
import { convertBlangBlocksToHtml } from '../../../data/transform/post-parser/blang';
import { Step } from './pre-parser';

export const postParserSteps: Step[] = [
  {
    fn: convertExternalLinksToBlankTarget,
    description: 'Detects links to non-Ably destintations and adds a rel blank',
  },
  {
    fn: convertBlangBlocksToHtml,
    description:
      'A blang block is defined as blang[language]. followed by some indented lines. It is encoded as a set of tokens that are ultimately rendered as divs, in an attempt to survive the textile process. This is the point where we hydrate the div from the blang tokens.',
  },
  {
    fn: addGithubLineBreaks,
    description:
      'Adds line breaks for github-style code blocks back in, after they were turned into tokens in the pre-parser stage',
  },
  {
    fn: rootLevelTextWrapper,
    description:
      'Wraps any root level elements that are not wrapped in a paragraph tag, to avoid text nodes being missed by the Cheerio loaded in the next, html-parser stage',
  },
];
