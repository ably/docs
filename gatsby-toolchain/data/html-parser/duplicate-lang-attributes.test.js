const cheerio = require("cheerio");
const { duplicateLangAttributes } = require(".");

const content = `<div lang='javascript,csharp,objc'>Content</div>`;

describe('Duplicate language blocks with commas', () => {
    test('Duplicates language blocks with commas', () => {
        const loadedDom = cheerio.load(content, null);
        duplicateLangAttributes(loadedDom);
        expect(loadedDom.html().replace(/\s+/g,'')).toEqual(`<html><head></head><body>
            <div lang=\"objc\">Content</div>
            <div lang=\"csharp\">Content</div>
            <div lang=\"javascript\">Content</div>
        </body></html>`.replace(/\s+/g,''));
    });
});
