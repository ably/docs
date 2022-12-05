const indent = (str, indentAmount, spacer = '\t') => {
  const indent = new Array(indentAmount + 1).join(spacer);
  const result = str.replace(/^(?=.)/gm, indent);
  return result;
};

const flattenContentOrderedList = (contentOrderedList) =>
  contentOrderedList.reduce((acc, { data, type }) => {
    if (Array.isArray(data)) {
      return acc.concat(flattenContentOrderedList(data));
    }
    return acc.concat([{ data, type }]);
  }, []);

module.exports = {
  indent,
  flattenContentOrderedList,
};
