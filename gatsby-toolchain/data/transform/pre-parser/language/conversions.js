const { identity } = require("lodash");
const { extractIndented } = require("../shared-utilities/extract-indented");

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
/mx
 */
const JSALL_REGEX = /(?:\[([^\]]+,)?jsall(,[^\]]+)?\])|(?:lang=(["'])([^"']+,)?jsall(,[^"']+)?\3)|(?:(  jsall\: ))/gm;

const jsAllReplacer = (match, langBefore, langAfter, quote, langBefore2, langAfter2) => {
    const langs = [langBefore || langBefore2, langAfter || langAfter2].filter(identity);
    const languageExpandedString = langs.length > 0 ? `,${langs.join(',')}` : '';
    if(quote) {
        return `%(lang="javascript,nodejs${languageExpandedString})`;
    } else if(match === 'jsall:') {
        return 'javascript, nodejs:';
    } else {
        return `[javascript,nodejs${languageExpandedString}]`;
    }
}
const convertJSAllToNodeAndJavaScript = content =>  {
    return content.replace(JSALL_REGEX, jsAllReplacer);
}

const BLANG_REGEX = /^blang\[([\w,]+)\]\.\s*$/m;

const langBlockWrapper = languages => `{{LANG_BLOCK[${languages}]}}\n`;
const langBlockEnd = '\n{{/LANG_BLOCK}}\n';

const convertBlangBlocksToHtml = content => {
    let position = content.search(BLANG_REGEX);
    while(position && position > -1) {
        const languages = content.match(BLANG_REGEX)[1] ?? '';
        const nextContent = content.slice(position);
        const contentToParse = nextContent
            .replace(BLANG_REGEX, '')
            .slice(1); // & remove newline
        const next = position + 1;
        const blangMarkupLength = nextContent.length - contentToParse.length;
        const { onlyIndentedLines, nonIndentedLineLocation } = extractIndented(contentToParse, 'blang[language].');
        // console.log('indented:', onlyIndentedLines, nonIndentedLineLocation);
        
        const replacement = langBlockWrapper(languages) +
            onlyIndentedLines +
        langBlockEnd;

        content = content.substring(0, position) +
            replacement +
        content.substring(position + blangMarkupLength + nonIndentedLineLocation);

        position = content.search(BLANG_REGEX);
    }

    return content;
}

module.exports = {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToHtml
}