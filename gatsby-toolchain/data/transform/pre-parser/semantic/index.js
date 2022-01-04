const stripComments = content => content.replace(/<!--[\s\S]*?-->\s*/g, '');

module.exports = {
    stripComments
}