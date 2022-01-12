// Essentially jQuery for parsing the DOM
const cheerio = require("cheerio");
const DataTypes = require("../types");
const HtmlDataTypes = require("../types/html");

const cheerioParser = cheerioNode => {
    const children = cheerioNode.children('*');
    const data = children.map((i, { type, name = '', data = '', attribs = {} }) => {
        if(type === HtmlDataTypes.Text) {
            return {
                data,
                type: HtmlDataTypes.Text,
                name: HtmlDataTypes.Text
            }
        }

        return {
            data,
            type: HtmlDataTypes.Tag,
            name,
            attribs
        };
    });
    return data.toArray();
}

const htmlParser = content => {
    const loadedDom = cheerio.load(content, null);
    const parsedNodes = cheerioParser(loadedDom('body'));
    console.log(parsedNodes);
    return [{
        data: content,
        type: DataTypes.Html
    }];
}

module.exports = {
    htmlParser
}