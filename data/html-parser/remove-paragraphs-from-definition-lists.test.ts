import cheerio from 'cheerio';
import { removeParagraphsFromDefinitionListsAndMerge } from './remove-paragraphs-from-definition-lists';

const consecutiveDls = `<dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
</dl>
<dl>
  <dt>Term Two</dt>
  <dd>Definition Two</dd>
  <dt>Term Two</dt>
  <dd>Definition Three</dd>
</dl>`;

const consecutiveDlsWithPElement = `<dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
</dl>
<p></p>
<dl>
  <dt>Term Two</dt>
  <dd>Definition Two</dd>
  <dt>Term Two</dt>
  <dd>Definition Three</dd>
</dl>`;

describe('Consecutive Dl elements are merged', () => {
  it('Merges consecutive Dl elements', () => {
    const loadedDom = cheerio.load(consecutiveDls);
    removeParagraphsFromDefinitionListsAndMerge(loadedDom);
    expect(loadedDom.html()).toBe(`<html><head></head><body><dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
<dt>Term Two</dt><dd>Definition Two</dd><dt>Term Two</dt><dd>Definition Three</dd></dl>
</body></html>`);
  });
  it('Merges consecutive Dl elements with intervening empty p element', () => {
    const loadedDom = cheerio.load(consecutiveDlsWithPElement);
    removeParagraphsFromDefinitionListsAndMerge(loadedDom);
    expect(loadedDom.html()).toBe(`<html><head></head><body><dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
<dt>Term Two</dt><dd>Definition Two</dd><dt>Term Two</dt><dd>Definition Three</dd></dl>

</body></html>`);
  });
});
