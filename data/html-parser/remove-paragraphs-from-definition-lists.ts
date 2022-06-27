export const removeParagraphsFromDefinitionListsAndMerge = (cheerioNodes: cheerio.Selector) =>
  cheerioNodes('dl').each((_i: number, elem: cheerio.Element) => {
    // As jQuery/Cheerio is stateful and imperative, including comments to clarify
    // Remove empty paragraphs immediately after any dl
    const siblings = cheerioNodes(elem)
      .siblings('p')
      .filter((_, elem) => {
        const self = cheerioNodes(elem);
        return self.text().trim() === '';
      });
    if (siblings.length) {
      siblings.remove();
    }

    // Now merge multiple consecutive dls
    const nextDl = cheerioNodes(elem).nextUntil(':not(dl)');
    cheerioNodes(elem).append(nextDl.children());
    nextDl.remove();
  });
