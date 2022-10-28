// textile-js, unlike RedCloth, does not interpret @...@ sections as <code> elements
// if they are preceded by a non-space character
export const fixInlineCode: StringTransformation = (content) => content.replace(/@(.+?)@/gm, '<code>$1</code>');
