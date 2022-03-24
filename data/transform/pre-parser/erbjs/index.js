const { compose } = require('lodash/fp');
const { emojiReplacer } = require('./emojis');
const { itemReplacer } = require('./item-select');
const { languageReplacer } = require('./language-map');
const { urlforReplacer } = require('./url-for');

const replaceERB = compose(emojiReplacer, languageReplacer, itemReplacer, urlforReplacer);

module.exports = {
  replaceERB,
};
