const { isArray } = require('lodash');
const HtmlDataTypes = require('../types/html');
const { DEFAULT_LANGUAGE } = require('./constants');

const TYPES_TO_ADD_TO_CONTENT_MENU = [HtmlDataTypes.h2, HtmlDataTypes.h3];
const TYPES_TO_LEVEL_MAP = {
  [HtmlDataTypes.h2]: 2,
  [HtmlDataTypes.h3]: 3,
};

const idFromName = (name) =>
  name
    .replace(/([a-z0-9])([A-Z]+)/g, '$1-$2')
    .replace(/\s+/g, '-')
    // Should be more efficient than 2x replace, but pattern shouldn't be expanded beyond [\(\)]:
    // eslint-disable-next-line no-useless-escape
    .replace(/[\(\)]/g, (match) => (match === '(' ? '%28' : '%29'))
    .toLowerCase();

const getTextFromPage = ({ data = '', attribs = {} }, text = [], language = DEFAULT_LANGUAGE) => {
  if (isArray(data)) {
    const count = data.length;
    if (!attribs.lang || attribs.lang === language) {
      for (let i = 0; i < count; ++i) {
        const dataObject = data[i];
        text = getTextFromPage(dataObject, text, language);
      }
    }
    return text;
  }

  text.push(data);
  return text;
};

const createContentMenuDataFromPage = (page, contentMenuData = [], language = DEFAULT_LANGUAGE) => {
  const {
    data = '',
    attribs: { id } = {
      id: null,
    },
    name,
  } = page;
  if (isArray(data)) {
    const count = data.length;
    for (let i = 0; i < count; ++i) {
      const dataObject = data[i];
      if (!dataObject.attribs || !dataObject.attribs.lang) {
        contentMenuData = createContentMenuDataFromPage(dataObject, contentMenuData, language);
      }
    }
  }
  if (TYPES_TO_ADD_TO_CONTENT_MENU.includes(name)) {
    const menuItemName = getTextFromPage(page, [], language).join('');
    let newID = id;
    if (!id) {
      newID = idFromName(menuItemName);
      if (page.attribs) {
        page.attribs.id = newID;
      } else {
        page.attribs = {
          id: newID,
        };
      }
    }
    const contentMenuItem = {
      name: menuItemName,
      id: newID,
      level: TYPES_TO_LEVEL_MAP[name],
    };
    contentMenuData.push(contentMenuItem);
  }
  return contentMenuData.filter((item) => !!item && item.name !== '');
};

module.exports = {
  idFromName,
  getTextFromPage,
  createContentMenuDataFromPage,
};
