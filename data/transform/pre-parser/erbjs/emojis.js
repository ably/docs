const emojiRegex =
  /<% \[(.*?)\]\.each do \|emoji\| %>\s*<label><input type="radio" name="avatar" value="<%= emoji %>" \/><span class="emoji"><%= emoji %><\/span><\/label>\s*<% end %>/g;

const emojiReplacer = (content) =>
  content.replace(emojiRegex, (_match, emojis) =>
    emojis
      .split(', ')
      .map(
        (emojiWithQuotes) => {
          const cleanedEmoji = emojiWithQuotes.replace(/^'(.*)'$/, '$1');
          return `<label><input type="radio" name="avatar" value="${cleanedEmoji}" /><span class="emoji">${cleanedEmoji}</span></label>`;
        }
      )
      .join('\n'),
  );

module.exports = {
  emojiReplacer,
};