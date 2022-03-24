const { itemReplacer } = require('./item-select');

describe('Ensure section content menu pages are replaced with an a element to act as a placeholder, hydrated later', () => {
  it('Successfully replaces menu page "item" ERB content with a placeholder', () => {
    const sampleText = `<% @items.select { |d| d[:section] == 'design-patterns' }.sort_by { |d| d[:title] }.each do |item| %>
        * "<%= html_escape(item[:title]) %>":<%= html_escape(item.path) %><% end %>`;
    const expectedResult = `<a data-for="design-patterns">Section</a>`;
    expect(itemReplacer(sampleText)).toBe(expectedResult);
  });
});
