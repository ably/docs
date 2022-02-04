// Essentially jQuery for parsing the DOM
const cheerio = require("cheerio");
const DataTypes = require("../types");
const HtmlDataTypes = require("../types/html");

const cheerioNodeParser = (_i, { type = null, name = '', data = '', attribs = {}, children = [] }) => {
    if(!type || type === HtmlDataTypes.text) {
        return {
            data,
            type: HtmlDataTypes.text,
            name: HtmlDataTypes.text
        }
    }
    const nextItems = children.map((data, i) => cheerioNodeParser(i, data));
    return {
        data: nextItems,
        type: HtmlDataTypes.tag,
        name: HtmlDataTypes[name] ?? DataTypes.Html,
        attribs
    };
};

const cheerioParser = cheerioNodes => {
    const data = cheerioNodes.map(cheerioNodeParser);
    return data.toArray();
}

/** Source: Ably 'docs' repo ./app/assets/javascripts/lang-manager.js ll.61-66 */
const liftLangAttributes = cheerioNodes => cheerioNodes('dl dt > div[lang]').each(() => {
    const lang = cheerioNodes(this).attr('lang');
    cheerioNodes(this).parent('dt').attr('lang', lang);
    cheerioNodes(this).parent('dt').next('dd').attr('lang', lang);
    cheerioNodes(this).removeAttr('lang');
});

const htmlParser = content => {
    const loadedDom = cheerio.load(content, null);
    liftLangAttributes(loadedDom);
    const loadedDomBodyNodes = loadedDom('body').children('*');
    const parsedNodes = cheerioParser(loadedDomBodyNodes);
    return [{
        data: parsedNodes,
        type: DataTypes.Html
    }];
}

module.exports = {
    cheerioNodeParser,
    htmlParser
}