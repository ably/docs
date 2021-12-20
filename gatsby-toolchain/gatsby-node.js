const { createPages } = require('./data/createPages');
const { onCreateNode } = require('./data/onCreateNode');

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;