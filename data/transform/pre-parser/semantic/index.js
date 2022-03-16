const { addMinimizeForHeadings, addMinimizedIndent } = require('./minimize');

const stripComments = content => content.replace(/<!--[\s\S]*?-->\s*/g, '');

module.exports = {
    stripComments,
    addMinimizedIndent,
    addMinimizeForHeadings
}