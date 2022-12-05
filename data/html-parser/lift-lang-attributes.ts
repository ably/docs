import cheerio from 'cheerio';

type FixedCheerio =
  | cheerio.Cheerio & {
      wrapAll(content: string): cheerio.Cheerio;
      wrapAll(content: unknown): cheerio.Cheerio;
      wrapAll(content: cheerio.Cheerio): cheerio.Cheerio;
    };

/** Source: Ably 'docs' repo ./app/assets/javascripts/lang-manager.js ll.61-66 */
export const liftLangAttributes = (cheerioNodes: cheerio.Selector) =>
  cheerioNodes('dl dt > div[lang]').each((_i: number, elem: cheerio.Element) => {
    const lang = cheerioNodes(elem).attr('lang');
    // Workaround for missing types
    const singleDtWithDds: FixedCheerio = <FixedCheerio>cheerioNodes(elem).parent('dt').nextUntil('dt').addBack();
    singleDtWithDds.wrapAll(`<div lang="${lang}">`);
    cheerioNodes(elem).removeAttr('lang');
  });
