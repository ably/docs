export const fixIndentedDefinitionLists: StringTransformation = (content) =>
  content.replace(/^[^\S\n]+(-.*?:=.*)$/gm, '$1');
