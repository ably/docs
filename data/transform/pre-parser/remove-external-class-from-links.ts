export const removeExternalClassFromLinks: StringTransformation = (content) =>
  content.replace(/"\(external\) (.*?)"/, '"$1"');
