const cheerio = require("cheerio");
const { liftLangAttributes } = require(".");

const content = `<dl>
    <dt><div lang='javascript'>Term</div></dt>
    <dd>Definition</dd>
</dl>`;

describe('Lift language attributes into <dt> and <dd> elements', () => {
    test('Lifts language attributes into <dt> and <dd> elements', () => {
        const loadedDom = cheerio.load(content, null);
        liftLangAttributes(loadedDom);
        expect(loadedDom.html().replace(/\s+/g,'')).toEqual(`<html><head></head><body><dl>
        <dt lang=\"javascript\"><div>Term</div></dt>
        <dd lang=\"javascript\">Definition</dd>
    </dl></body></html>`.replace(/\s+/g,''));
    });
});
