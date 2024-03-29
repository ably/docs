// Shared constants between different post-parse operations
/**
 * Any number of opening XML tags, inc. HTML tags, followed by any number of spaces
 */
export const TAG_OPEN_REGEX_STRING = '(?:<[\\w ]+>)*[\\s\\r\\n]*';

/**
 * Any number of closing XML tags, inc. HTML tags, followed by any number of spaces
 */
export const TAG_CLOSE_REGEX_STRING = '(?:</[\\w ]+>)*[\\s\\r\\n]*';

/**
 * Any number of opening or closing XML tags, inc. HTML tags, or spaces
 */
export const TAG_OPEN_OR_CLOSE_REGEX_STRINGS = '(?:(?:<\\/?[\\w ]+>)*|[\\s\\r\\n]*)';
