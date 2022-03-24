const emojiRegex =
  /<% \[(.*?)\]\.each do \|emoji\| %>\s*<label><input type="radio" name="avatar" value="<%= emoji %>" \/><span class="emoji"><%= emoji %><\/span><\/label>\s*<% end %>/g;

const emojiReplacer = (content) =>
  content.replace(emojiRegex, (_match, emojis) =>
    emojis
      .split(', ')
      .map(
        (emoji) =>
          `<label><input type="radio" name="avatar" value="${emoji.replace(
            /^'(.*)'$/,
            '$1',
          )}" /><span class="emoji">${emoji.replace(/^'(.*)'$/, '$1')}</span></label>`,
      )
      .join('\n'),
  );

module.exports = {
  emojiReplacer,
};
