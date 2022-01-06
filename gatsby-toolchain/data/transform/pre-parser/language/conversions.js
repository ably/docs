const { identity } = require("lodash")

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

const convertBlangBlocksToHtml = identity;

module.exports = {
    convertJSAllToNodeAndJavaScript,
    convertBlangBlocksToHtml
}