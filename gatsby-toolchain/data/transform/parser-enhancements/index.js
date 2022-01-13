const { addDates } = require('./add-dates');
const { addSpecAnchorLinks } = require('./spec-anchor-links');

const enhancedParse = (content, attributes = {}, path = null) => {
    let result = addSpecAnchorLinks(content, attributes);
    result = addDates(result, attributes);
    return result;
}

module.exports = {
    enhancedParse
}