// textile-js has difficulty adding italicised text in certain circumstances, particularly near (but not wrapped in!) <code> elements.
// NB: this is not just a textile workaround.
export const addItalicisedText: StringTransformation = (content) =>
  content.replace(/__(.*?)__/gm, '<em class="italics">$1</em>');
