const { TAG_REGEX_STRING } = require('./constants');

const LANG_BLOCK_POST_TEXTILE_REGEX_STRING = `LANG_(?:<span class="caps">)?BLOCK(?:<\\/span>)?`;
/**
 * TODO: this may not work for complex HTML
 * The correct, but relatively involved, solution will be to use a DOMParser to extract the inner HTML from
 * a more generic inner string, and preserve it that way.
 * */ 
const BLANG_REGEX_STRING = `${
    TAG_REGEX_STRING
}{{${LANG_BLOCK_POST_TEXTILE_REGEX_STRING}\\[([\\w,]+)\\]}}${
        TAG_REGEX_STRING
    }(.*?)${
        TAG_REGEX_STRING 
    }{{\\/${LANG_BLOCK_POST_TEXTILE_REGEX_STRING}}}${
    TAG_REGEX_STRING
}`;

const BLANG_REGEX = new RegExp(BLANG_REGEX_STRING, 'gms');

const convertBlangBlocksToHtml = content => content.replace(
    BLANG_REGEX,
    '\n\n<div lang="$1"> <!-- start $1 language block -->\n$2\n</div> <!-- /end $1 language block -->\n\n'
)

module.exports = {
    convertBlangBlocksToHtml
}