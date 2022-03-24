const itemRegex =
  /<% @items\.select \{ \|d\| d\[:section\] == '(.*?)' \}\.sort_by \{ \|d\| d\[:title\] \}\.each do \|item\| %>.* "<%= html_escape\(item\[:title\]\) %>":<%= html_escape\(item\.path\) %><% end %>/gs;

const itemReplacer = (content) => content.replace(itemRegex, '<a data-for="$1">Section</a>');

module.exports = {
  itemReplacer,
};
