const compressMultipleNewlinesInLists = content => content.replace(/^(-.*)\n{2,}/gm, '$1\n');

module.exports = {
    compressMultipleNewlinesInLists
}