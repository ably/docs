const { extractIndented } = require('../shared-utilities/extract-indented');

/**
 * JSALL_REGEX with comments:
/
(?:
    \[         # language enclosure [lang]
    ([^\]]+,)? # additional optional languages
    jsall      # indicates this applies to node.js and javascript
    (,[^\]]+)? # additional optional languages
    \]         # language closure [lang]
)
|
(?:
    lang=(["']) # language enclosure lang=""
    ([^"']+,)? # additional optional languages
    jsall       # indicates this applies to node.js and javascript
    (,[^"']+)? # additional optional languages
    \3          # language closure lang=""
)
|
(?:
    (  jsall\: ) # Indicates this applies to node.js and javascript
)
/gm
 */
const JSALL_REGEX = /(?:\[([^\]]+,)?jsall(,[^\]]+)?\])|(?:lang=(["'])([^"']+,)?jsall(,[^"']+)?\3)|(?:( {2}jsall: ))/gm;

const jsAllReplacer = (match, langBefore, langAfter, quote, langBefore2, langAfter2) => {
  const langs = [langBefore || langBefore2, langAfter || langAfter2].filter((x) => !!x);
  if (quote) {
    const languageExpandedString = langs.length > 0 ? `${langs.join(',')}` : '';
    return `lang="javascript,nodejs${languageExpandedString}"`;
  } else if (match === '  jsall: ') {
    return '  javascript,nodejs: ';
  } else {
    const languageExpandedString =
      langs.length > 0
        ? `,${langs
            .map((lang) => {
              return lang.split(',');
            })
            .flat()
            .filter((x) => !!x)
            .join(',')}`
        : '';
    return `[javascript,nodejs${languageExpandedString}]`;
  }
};
const convertJSAllToNodeAndJavaScript = (content) => {
  return content.replace(JSALL_REGEX, jsAllReplacer);
};

const BLANG_REGEX = /^blang\[([\w,]+)\]\.\s*$/m;

const langBlockWrapper = (languages) => `\n{{LANG_BLOCK[${languages}]}}\n`;
const langBlockEnd = '{{/LANG_BLOCK}}\n';

const convertBlangBlocksToTokens = (content) => {
  let position = content.search(BLANG_REGEX);
  while (position > -1) {
    const languages = content.match(BLANG_REGEX)[1] ?? '';
    const nextContent = content.slice(position);
    const contentToParse = nextContent.replace(BLANG_REGEX, '').slice(1); // & remove newline
    const blangMarkupLength = nextContent.length - contentToParse.length;
    const { onlyIndentedLines, nonIndentedLineLocation } = extractIndented(contentToParse, 'blang[language].', true);

    const replacement = langBlockWrapper(languages) + onlyIndentedLines + langBlockEnd;

    content =
      content.substring(0, position) +
      replacement +
      content.substring(position + blangMarkupLength + nonIndentedLineLocation);

    position = content.search(BLANG_REGEX);
  }

  return content;
};

module.exports = {
  convertJSAllToNodeAndJavaScript,
  convertBlangBlocksToTokens,
};
