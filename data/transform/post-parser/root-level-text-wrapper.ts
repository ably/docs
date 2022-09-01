export const rootLevelTextWrapper = (content: string) => content.replace(/\n([A-Z].*)\n/g, '\n<p>$1</p>\n');
