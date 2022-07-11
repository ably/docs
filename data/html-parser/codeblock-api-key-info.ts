import cheerio from 'cheerio';

export const addAPIKeyInfoToCodeBlock = (cheerioNodes: cheerio.Selector) =>
  cheerioNodes('pre > code').each((_, elem) => {
    const loadedCodeElement = cheerioNodes(elem);
    const content = loadedCodeElement.text();
    if (content.includes('{{API_KEY}}')) {
      cheerioNodes(elem).attr('data-contains-key', 'true');
    }
  });
