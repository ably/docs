import { isEmpty } from 'lodash';

/**
 * Breakdown;
 *  1st capturing group; ensure we are part of a textile definition list
 *    - preceded by a line of - dt := dd followed by any number of spaces
 *    - OR part of an ongoing chain indicated by a closing tag followed by a newline.
 *  non-capturing group: a <div> with a lang attribute, closed by a </div
 *  2nd capturing group: the lang attribute
 *  3rd capturing group: the first section of a textile <dt><dd> pair, if it exists
 *  non-capturing group: :=\s
 *  4th capturing group: the second section of a textile <dt><dd> pair, if it exists
 *  Next div, that matches the exact same pattern as above
 */
const DIV_DL_REGEX =
  /(-.*?:=.*?\n\n)(?:(?:<div)[^>]*lang="([^"]+?)")[^>]*>(?:[\n\r]+- ([^:=]*? ))?(?::=\s+)?(.*?)<\/div>\s*(?:(?:<div)[^>]*lang="([^"]+?)")[^>]*>(?:[\n\r]+- ([^:=]*? ))?(?::=\s+)?(.*?)<\/div>/gs;

/**
 * Identify sequence of one or more divs within dl sequence
 * To be altered, the div must have a lang attribute.
 * If a div with a lang attribute is empty, it is an alternative div in a definition list. It must be replaced with actual textile markup.
 * If a div with a lang attribute has no second portion, it is the end of the definition list; it must be left unchanged.
 * If a div has both a first & second portion, it can be adjusted to.
 */
export const fixDivsInDefinitionLists = (content: string) =>
  content.replace(
    DIV_DL_REGEX,
    (match, textilePreamble, lang, maybeFirstDt, maybeFirstDd, secondLang, maybeSecondDt, maybeSecondDd) => {
      if (isEmpty(lang) || isEmpty(secondLang)) {
        return match;
      }
      const firstEntry = isEmpty(maybeFirstDt)
        ? `- <div lang="${lang}"> </div> := `
        : `- <div lang="${lang}">${maybeFirstDt.replace(/^-/g, '').trim()}</div> := ${maybeFirstDd}`;
      const secondEntry = isEmpty(maybeSecondDt)
        ? `- <div lang="${lang}"> </div> := `
        : `- <div lang="${secondLang}">${maybeSecondDt.replace(/^-/g, '').trim()}</div> := ${maybeSecondDd}`;
      return `${textilePreamble}${firstEntry}
${secondEntry}`;
    },
  );
