const indent = (str, indentAmount, spacer = '\t') => {
    const indent = new Array(indentAmount + 1).join(spacer);
    const result = str.replace(/^(?=.)/gm, indent);
    return result;
}

module.exports = {
    indent
}
  