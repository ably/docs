// textile-js has difficulty adding italicised text in certain circumstances, particularly near (but not wrapped in!) <code> elements.
// NB: this is not just a textile workaround.
const addItalicisedText = (content) => content.replace(/__(.*?)__/gm, '<em>$1</em>');

module.exports = { addItalicisedText };
