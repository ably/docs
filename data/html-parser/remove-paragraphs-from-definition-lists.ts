export const removeParagraphsFromDefinitionListsAndMerge = (cheerioNodes: cheerio.Selector) =>
  cheerioNodes('dl').each((_i: number, elem: cheerio.Element) => {
    // As jQuery/Cheerio is stateful and imperative, including comments to clarify
    // Remove empty paragraphs immediately after any dl
    cheerioNodes(elem)
      .siblings('p')
      .filter((elem) => {
        const self = cheerioNodes(elem);
        return self.text().trim() === '';
      })
      .remove();
    // Now merge multiple consecutive dls
    const nextDl = cheerioNodes(elem).nextUntil(':not(dl)');
    cheerioNodes(elem).append(nextDl.children());
    nextDl.remove();
  });
