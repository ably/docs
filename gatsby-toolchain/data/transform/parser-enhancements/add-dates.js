const addDates = (content, attributes) => {
    if(attributes.published_date) {
        return content.replace(/(\{\{PUBLISHED_DATE\}\})/gi,attributes.published_date);
    }
    return content;
}

module.exports = {
    addDates
}