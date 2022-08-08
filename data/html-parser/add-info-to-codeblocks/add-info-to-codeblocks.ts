import cheerio from 'cheerio';

export const addInfoToCodeBlock =
  (tokenIdentifier: string, dataAttributeName: string) => (cheerioNodes: cheerio.Selector) =>
    cheerioNodes('pre > code').each((_, elem) => {
      const loadedCodeElement = cheerioNodes(elem);
      const content = loadedCodeElement.text();
      if (content.includes(`{{${tokenIdentifier}}}`)) {
        cheerioNodes(elem).attr(`data-contains-${dataAttributeName}`, 'true');
      }
    });
