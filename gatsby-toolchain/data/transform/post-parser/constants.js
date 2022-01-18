// Shared constants between different post-parse operations
/**
 * Any number of opening or closing XML tags, inc. HTML tags, followed by any number of spaces
 */
const TAG_REGEX_STRING = '(?:<[\\w \\/]+>)*[\\s\\r\\n]*';

module.exports = {
    TAG_REGEX_STRING
}