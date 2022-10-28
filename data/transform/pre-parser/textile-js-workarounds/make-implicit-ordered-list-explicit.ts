// Not supporting implicit OLs at different indentation levels because the
// chance of causing unexpected behaviour is too high.
export const makeImplicitOrderedListExplicit: StringTransformation = (content) =>
  content.replace(/^\d+\.(.+)$/gm, '# $1');
