import cheerio from 'cheerio';
import { liftLangAttributes } from './lift-lang-attributes';

const content = `<dl>
    <dt><div lang='javascript'>Term</div></dt>
    <dd>Definition</dd>
</dl>`;

describe('Lift language attributes into <dt> and <dd> elements', () => {
  it('Lifts language attributes into <dt> and <dd> elements', () => {
    const loadedDom = cheerio.load(content);
    liftLangAttributes(loadedDom);
    const html = loadedDom('body').html() ?? '';
    expect(html.replace(/\s+/g, '')).toEqual(
      `<dl>
        <div lang="javascript">
            <dt><div>Term</div></dt>
            <dd>Definition</dd>
        </div>
    </dl>`.replace(/\s+/g, ''),
    );
  });
});
