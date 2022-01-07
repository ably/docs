const addGithubLineBreaks = content => content.replaceAll('{{{github_br}}}', '\n');

const TAG_REGEX_STRING = '(?:<[\\w /]+>)*\s*';
/**
 * TODO: this will not work for complex HTML
 * The correct, but relatively involved, solution will be to use a DOMParser to extract the inner HTML from
 * a more generic inner string, and preserve it that way.
 * */ 
const BLANG_REGEX_STRING = `${
    TAG_REGEX_STRING
}{{LANG_BLOCK\\[([\\w,]+)\\]}}${
        TAG_REGEX_STRING
    }(.*?)${
        TAG_REGEX_STRING 
    }{{/LANG_BLOCK}}${
    TAG_REGEX_STRING
}`;

const BLANG_REGEX = new RegExp(BLANG_REGEX_STRING, 'gs');

const LINK_EXTERNAL_REGEX = /(<a[^>]*)class="external"([^>]*>)/m

const convertBlangBlocksToHtml = content => content.replace(
    BLANG_REGEX,
    '\n\n<div lang="$1"> <!-- start $1 language block -->\n$2\n</div> <!-- /end $1 language block -->\n\n'
)

const convertExternalLinksToBlankTarget = content => content.replace(LINK_EXTERNAL_REGEX, '$1target="_blank" rel="noopener noreferrer"$2');

const postParser = content => {
    let result = addGithubLineBreaks(content);
    result = convertBlangBlocksToHtml(result);
    result = convertExternalLinksToBlankTarget(result);
    return result;
}

module.exports = {
    postParser
}