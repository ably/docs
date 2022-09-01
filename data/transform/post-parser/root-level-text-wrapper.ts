/**
 * This regex finds:
 * (<\/[A-Za-z]+>)\n - closing HTML tag, followed by newline.
 * ([A-Z].*)\n - a capital letter preceding any information, up to a newline.
 *
 * The overall effect is to find capitalised text that immediately follows on
 * from a closing tag at the end of a line, which will always be plain text
 * that is supposed to be wrapped in <p> elements but has been missed by the
 * textile-js parser.
 *
 * Regex101: https://regex101.com/r/j4BLqX/1
 */
const rootLevelTextFinder = /(<\/[A-Za-z]+>)\n([A-Z].*)\n/g;
export const rootLevelTextWrapper = (content: string) => content.replace(rootLevelTextFinder, '$1\n<p>$2</p>\n');
