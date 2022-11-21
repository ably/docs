import cheerio from 'cheerio';

export const duplicateLangAttributes = (cheerioNodes: cheerio.Selector) => {
  const cheerioNodesToRemove: cheerio.Cheerio[] = [];
  cheerioNodes('*[lang]').each((_, elem) => {
    const maybeLanguages = cheerioNodes(elem).attr('lang');
    if (!maybeLanguages || /^[^,]+$/.test(maybeLanguages)) {
      return;
    }
    const langs = maybeLanguages.split(',');
    const node = cheerioNodes(elem);
    duplicateLangAttributes(node.find.bind(node));
    langs.forEach((lang) => {
      cheerioNodes(elem).clone().attr('lang', lang).insertAfter(cheerioNodes(elem));
    });
    cheerioNodesToRemove.push(node);
  });
  cheerioNodesToRemove.forEach((node) => node.remove());
};
