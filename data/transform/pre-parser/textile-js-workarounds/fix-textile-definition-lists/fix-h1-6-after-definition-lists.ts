export const fixH1To6AFterDefinitionLists: StringTransformation = (content) =>
  content.replace(/(\n-(.*?):=(.*?)\n)(h[1-6])/g, '$1\n$2');
