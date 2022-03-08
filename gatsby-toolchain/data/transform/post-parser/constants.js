// Shared constants between different post-parse operations
/**
 * Any number of opening XML tags, inc. HTML tags, followed by any number of spaces
 */
const TAG_OPEN_REGEX_STRING = '(?:<[\\w ]+>)*[\\s\\r\\n]*';

/**
 * Any number of closing XML tags, inc. HTML tags, followed by any number of spaces
 */
const TAG_CLOSE_REGEX_STRING = '(?:</[\\w ]+>)*[\\s\\r\\n]*';

module.exports = {
  TAG_OPEN_REGEX_STRING,
  TAG_CLOSE_REGEX_STRING,
};
