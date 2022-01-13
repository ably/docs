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

const htmlParser = content => {
    const loadedDom = cheerio.load(content, null);
    const parsedNodes = cheerioParser(loadedDom('body').children('*'));
    return [{
        data: parsedNodes,
        type: DataTypes.Html
    }];
}

module.exports = {
    cheerioNodeParser,
    htmlParser
}