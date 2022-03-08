const fm = require('front-matter');
const { isEmpty, pick } = require('lodash');

const NO_MATCH = false;
const ALLOWED_META_FIELDS = ['title', 'meta_description'];

const tryRetrieveMetaData = (metaDataString) => {
  const frontMatter = fm(metaDataString);
  if (isEmpty(frontMatter.attributes)) {
    return NO_MATCH;
  }
  return frontMatter;
};

const filterAllowedMetaFields = (metaObject) => pick(metaObject, ALLOWED_META_FIELDS);

module.exports = {
  tryRetrieveMetaData,
  filterAllowedMetaFields,
  NO_MATCH,
};
