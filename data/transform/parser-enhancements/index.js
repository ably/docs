// textile workarounds removed
const { addDates } = require('./add-dates');
const { addSpecAnchorLinks } = require('./spec-anchor-links');

const processAfterFrontmatterExtracted = (content, attributes = {}, path = null) => {
  let result = addSpecAnchorLinks(content, attributes);
  result = addDates(result, attributes);
  result = addHyphenListSupport(result);
  return result;
};

module.exports = {
  processAfterFrontmatterExtracted,
};
