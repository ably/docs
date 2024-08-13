const { compose } = require('lodash/fp');
const { emojiReplacer } = require('./emojis');
const { itemReplacer } = require('./item-select');
const { languageReplacer } = require('./language-map');

const replaceERB = compose(emojiReplacer, languageReplacer, itemReplacer);

module.exports = {
  replaceERB,
};
