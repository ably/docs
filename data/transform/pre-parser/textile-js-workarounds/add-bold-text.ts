// textile-js has difficulty adding bolded text in certain circumstances, particularly near (but not wrapped in!) <code> elements.
// NB: this is not just a textile workaround.
export const addBoldText = (content: string): string => content.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
