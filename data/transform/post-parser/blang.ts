import { TAG_OPEN_REGEX_STRING, TAG_CLOSE_REGEX_STRING, TAG_OPEN_OR_CLOSE_REGEX_STRINGS } from './constants';

/**
 * textile-js wraps capital letters in <span class="caps"></span> tags, we need to check if those are there
 */
const LANG_BLOCK_POST_TEXTILE_REGEX_STRING = `LANG_(?:<span class=["']caps["']>)?BLOCK(?:<\\/span>)?`;

const BLANG_REGEX_STRING = `${
  // Replace the outer tag if any
  TAG_OPEN_REGEX_STRING
}{{${
  // The first capturing group, $1 or p1, as in LANG_BLOCK[myText]
  LANG_BLOCK_POST_TEXTILE_REGEX_STRING
}\\[([\\w,]+)\\]}}(.*?)${TAG_OPEN_OR_CLOSE_REGEX_STRINGS}{{\\/${LANG_BLOCK_POST_TEXTILE_REGEX_STRING}}}[\\s\\r\\n]*${TAG_CLOSE_REGEX_STRING}`;
const BLANG_REGEX = new RegExp(BLANG_REGEX_STRING, 'gms');

export const convertBlangBlocksToHtml: StringTransformation = (content) => {
  return content.replace(BLANG_REGEX, (_, p1, p2) => {
    return `<div lang="${p1}"><!-- start ${p1} language block -->\n${p2
      .trim()
      // HACK: there is a dangling </p> tag hanging around, we need to remove it, hence `.replace()`
      .replace(/^<\/\s*?p>/, '')}</div><!-- /end ${p1} language block -->`;
  });
};
