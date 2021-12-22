const { identity } = require("lodash");

const stripComments = identity;
const addMinimizeForHeadings = identity;
const addMinimizedIndent = identity;

module.exports = {
    stripComments,
    addMinimizeForHeadings,
    addMinimizedIndent
}