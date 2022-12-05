import { isArray } from 'lodash';
import HtmlDataTypes from '../types/html';
import { DEFAULT_LANGUAGE } from './constants';

const TYPES_TO_ADD_TO_CONTENT_MENU = [HtmlDataTypes.h2, HtmlDataTypes.h3, HtmlDataTypes.h6];
const TYPES_TO_LEVEL_MAP = {
  [HtmlDataTypes.h2]: 2,
  [HtmlDataTypes.h3]: 3,
  [HtmlDataTypes.h6]: 3,
};

const httpRESTMethods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];

const shouldItemBeAddedToNav = (name, header) => {
  const isH6 = header === HtmlDataTypes.h6 && name !== '';
  const isRESTful = httpRESTMethods.some((method) => name.startsWith(method));
  const isAblyRESTful = isRESTful && (name.includes('rest.ably.io') || name.includes('realtime.ably.io'));
  const isInvalidH6 = isH6 && isAblyRESTful;
  return !isInvalidH6;
};

export const idFromName = (name) =>
  name
    .replace(/([a-z0-9])([A-Z]+)/g, '$1-$2')
    .replace(/\s+/g, '-')
    // Should be more efficient than 2x replace, but pattern shouldn't be expanded beyond [\(\)]:
    // eslint-disable-next-line no-useless-escape
    .replace(/[\(\)]/g, (match) => (match === '(' ? '%28' : '%29'))
    .toLowerCase();

export const getTextFromPage = ({ data = '', attribs = {} }, text = [], language = DEFAULT_LANGUAGE) => {
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

export const createContentMenuDataFromPage = (page, contentMenuData = [], language = DEFAULT_LANGUAGE) => {
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
    const defaultMenuItemName = getTextFromPage(page).join('');
    const menuItemName = getTextFromPage(page, [], language).join('');
    const menuItemNameToUse = menuItemName ? menuItemName : defaultMenuItemName;
    if (shouldItemBeAddedToNav(menuItemNameToUse, name)) {
      const newID = id ?? idFromName(menuItemNameToUse);

      page.attribs = {
        ...(page.attribs || {}),
        id: newID,
      };

      const contentMenuItem = {
        name: menuItemNameToUse,
        id: newID,
        level: TYPES_TO_LEVEL_MAP[name],
      };

      contentMenuData.push(contentMenuItem);
    }
  }

  return contentMenuData.filter((item) => !!item && item.name !== '');
};
