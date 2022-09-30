import cheerio from 'cheerio';

// This is necessary because highlighting code content is made more complicated if a code element contains HTML elements as children.
// Pre-wrapped <code> elements should not usually contain child elements anyway, the code should be plain text.
export const removeChildrenFromPreWrappedCodeElements = (cheerioNodes: cheerio.Selector) => {
  cheerioNodes('pre > code').each((_i, elem) => {
    const textNodeContent: string[] = [];
    cheerioNodes(elem)
      .find('> *')
      .each((_i, el) => {
        const node = cheerioNodes(el);
        node.replaceWith(node.text());
      });
    cheerioNodes(elem).append(textNodeContent.join('\n'));
  });
};
