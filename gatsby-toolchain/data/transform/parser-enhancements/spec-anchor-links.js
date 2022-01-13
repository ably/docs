const addSpecAnchorLinks = (content, attributes) => {
    if(attributes.anchor_specs) {
        return content.replace(/\* @\((\w+)\)@/,
            "* <a id='$1' name='$1' href='#$1'>@($1)@</a>");
    }
    return content;
};

module.exports = {
    addSpecAnchorLinks
}