const cheerio = require("cheerio");
const { liftLangAttributes } = require(".");

const content = `<dl>
    <dt><div lang='javascript'>Term</div></dt>
    <dd>Definition</dd>
</dl>`;

describe('Lift language attributes into <dt> and <dd> elements', () => {
    it('Lifts language attributes into <dt> and <dd> elements', () => {
        const loadedDom = cheerio.load(content, null);
        liftLangAttributes(loadedDom);
        expect(loadedDom('body').html().replace(/\s+/g,'')).toEqual(`<dl>
        <div lang=\"javascript\">
            <dt><div>Term</div></dt>
            <dd>Definition</dd>
        </div>
    </dl>`.replace(/\s+/g,''));
    });
});
