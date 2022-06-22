// Essentially jQuery for parsing the DOM server side
const cheerio = require('cheerio');
const DataTypes = require('../types');
const HtmlDataTypes = require('../types/html');
const { addAPIKeyInfoToCodeBlock } = require('./codeblock-api-key-info');

const cheerioNodeParser = (_i, { type = null, name = '', data = '', attribs = {}, children = [] }) => {
  if (!type || type === HtmlDataTypes.text) {
    return {
      data,
      type: HtmlDataTypes.text,
      name: HtmlDataTypes.text,
    };
  }
  const nextItems = children.map((data, i) => cheerioNodeParser(i, data));
  return {
    data: nextItems,
    type: HtmlDataTypes.tag,
    name: HtmlDataTypes[name] ?? DataTypes.Html,
    attribs,
  };
};

const cheerioParser = (cheerioNodes) => {
  const data = cheerioNodes.map(cheerioNodeParser);
  return data.toArray();
};

/** Source: Ably 'docs' repo ./app/assets/javascripts/lang-manager.js ll.61-66 */
const liftLangAttributes = (cheerioNodes) =>
  cheerioNodes('dl dt > div[lang]').each((_i, elem) => {
    const lang = cheerioNodes(elem).attr('lang');
    cheerioNodes(elem).parent('dt').nextUntil('dt').addBack().wrapAll(`<div lang="${lang}">`);
    cheerioNodes(elem).removeAttr('lang');
  });

const duplicateLangAttributes = (cheerioNodes) =>
  cheerioNodes('*[lang]').each((_i, elem) => {
    const maybeLanguages = cheerioNodes(elem).attr('lang');
    if (/^[^,]+$/.test(maybeLanguages)) {
      return;
    }
    const langs = maybeLanguages.split(',');
    langs.forEach((lang) => {
      cheerioNodes(elem).clone().attr('lang', lang).insertAfter(cheerioNodes(elem));
    });
    cheerioNodes(elem).remove();
  });

const htmlParser = (content) => {
  const loadedDom = cheerio.load(content, null);
  liftLangAttributes(loadedDom);
  duplicateLangAttributes(loadedDom);
  addAPIKeyInfoToCodeBlock(loadedDom);
  const loadedDomBodyNodes = loadedDom('body').children('*');
  const parsedNodes = cheerioParser(loadedDomBodyNodes);
  return [
    {
      data: parsedNodes,
      type: DataTypes.Html,
    },
  ];
};

module.exports = {
  liftLangAttributes,
  duplicateLangAttributes,
  cheerioNodeParser,
  htmlParser,
};
