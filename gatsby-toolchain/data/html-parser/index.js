const DataTypes = require("../types")

const htmlParser = content => {
    return [{
        data: content,
        type: DataTypes.Html
    }];
}

module.exports = {
    htmlParser
}