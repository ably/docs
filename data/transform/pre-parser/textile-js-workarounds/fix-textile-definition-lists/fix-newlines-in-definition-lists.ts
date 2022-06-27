const NEWLINE_DL_REGEX = /(-.*?:=.*?)[\n\r]{2,}(-.*?:=.*?)/g;

export const fixNewlinesInDefinitionLists = (content: string) => content.replace(NEWLINE_DL_REGEX, '$1\n$2');
