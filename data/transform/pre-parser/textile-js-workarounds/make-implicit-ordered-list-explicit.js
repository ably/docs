// Not supporting implicit OLs at different indentation levels because the
// chance of causing unexpected behaviour is too high.
const makeImplicitOrderedListExplicit = (content) => content.replace(/^\d+\.(.+)$/gm, '# $1');

module.exports = {
  makeImplicitOrderedListExplicit,
};
