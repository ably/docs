const { TAG_REGEX_STRING } = require('./constants');

/**
 * textile-js wraps capital letters in <span class="caps"></span> tags, we need to check if those are there
 */
const LANG_BLOCK_POST_TEXTILE_REGEX_STRING = `LANG_(?:<span class=["']caps["']>)?BLOCK(?:<\\/span>)?`;
/**
 * TODO: this may not work for complex HTML
 * The correct, but relatively involved, solution will be to use a DOMParser to extract the inner HTML from
 * a more generic inner string, and preserve it that way.
 * */ 
const BLANG_REGEX_STRING = `${ // Replace the outer tag if any
    TAG_REGEX_STRING
}{{${LANG_BLOCK_POST_TEXTILE_REGEX_STRING}\\[([\\w,]+)\\]}}${ // The first capturing group, $1 or p1, as in LANG_BLOCK[myText]
    // And replace the inner tag if any:
        TAG_REGEX_STRING
    }(.*?)${ // The second capturing group, $2 or p1
        TAG_REGEX_STRING 
    }{{\\/${LANG_BLOCK_POST_TEXTILE_REGEX_STRING}}}${
    TAG_REGEX_STRING
}`;

const BLANG_REGEX = new RegExp(BLANG_REGEX_STRING, 'gms');
const convertBlangBlocksToHtml = content => content.replace(
    BLANG_REGEX,
    (_match, p1, p2) => {
        const trimmedLines = p2 ?
            p2.replace(/^\s+/gm, "")
                .replace(/^(?!<p>)(.*)<\/p>$/gm,'$1') :
            '';
        return `\n\n<div lang="${
            p1
        }"><!-- start ${
            p1
        } language block -->\n${
            trimmedLines
        }\n</div><!-- /end ${
            p1
        } language block -->\n\n`
    }
)

module.exports = {
    convertBlangBlocksToHtml
}