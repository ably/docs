import cheerio from 'cheerio';

export const duplicateLangAttributes = (cheerioNodes: cheerio.Selector) =>
  cheerioNodes('*[lang]').each((_i, elem) => {
    const maybeLanguages = cheerioNodes(elem).attr('lang');
    if (!maybeLanguages) {
      return;
    }
    if (/^[^,]+$/.test(maybeLanguages)) {
      return;
    }
    const langs = maybeLanguages.split(',');
    langs.forEach((lang) => {
      cheerioNodes(elem).clone().attr('lang', lang).insertAfter(cheerioNodes(elem));
    });
    cheerioNodes(elem).remove();
  });
