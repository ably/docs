const addAPIKeyInfoToCodeBlock = (cheerioNodes) =>
  cheerioNodes('pre > code').each((_, elem) => {
    const loadedCodeElement = cheerioNodes(elem);
    const content = loadedCodeElement.text();
    if (content.includes('{{API_KEY}}')) {
      cheerioNodes(elem).attr('data-contains-key', 'true');
    }
  });

module.exports = {
  addAPIKeyInfoToCodeBlock,
};
