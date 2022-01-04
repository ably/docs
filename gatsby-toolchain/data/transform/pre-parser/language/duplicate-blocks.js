/**
 * Full regex (for Regex101.com etc.):
 * /(bc|p|h[1-6])\[([^\]]+)\](?:\(([^\)]+)\))?\.\s([\s\S]*?\S+?[\s\S]*?$)(?:[\n\r]\s*[\n\r]|\Z)/gm
 */
const CAPTURE_CODE_OR_LANGUAGE_TAG = '(bc|p|h[1-6])';
const LANGUAGE_SELECTOR = '\\[([^\\]]+)\\]';
const CAPTURE_OPTIONAL_CLASSES = '(?:\\(([^\\)]+)\\))?';
const ENDS_WITH_PERIOD = '\\.\\s';
const CAPTURE_BODY = '([\\s\\S]*?\\S+?[\\s\\S]*?$)'; // Compare with Ruby/Perl regex; without an 'x' flag JS must specify spaces.
const EMPTY_LINE_BREAK_OR_EOF = '(?:[\\n\\r]\\s*[\\n\\r]|\\Z)';

const MULTI_LANG_BLOCK_REGEX_STRING = `${CAPTURE_CODE_OR_LANGUAGE_TAG}${LANGUAGE_SELECTOR}${CAPTURE_OPTIONAL_CLASSES}${ENDS_WITH_PERIOD}${CAPTURE_BODY}${EMPTY_LINE_BREAK_OR_EOF}`;

const MULTI_LANG_BLOCK_REGEX = new RegExp(MULTI_LANG_BLOCK_REGEX_STRING, 'gm');

const duplicateLanguageBlocks = (content) => {
    const replacer = (match, block, languages, classes, content) => {
        const langs = languages.split(/\s*,/);
        if(langs.length > 1) {
            return langs
                .map(lang => `${block}[${lang}]${ classes ? `(${classes})` : '' }. ${content}`)
                .join('\n\n') + '\n\n';

        }
        return match;
    }
    return content.replace(MULTI_LANG_BLOCK_REGEX, replacer);
}

module.exports = {
    duplicateLanguageBlocks
}