const { emojiReplacer } = require('./emojis');

describe('Makes sure that the emoji type of ERB is correctly replaced', () => {
  it('replaces an ERB attempting to render emoji with specific HTML', () => {
    const sampleText = `      <p class="emoji-radios">
      Avatar:
      <% ['👦', '👧', '👨', '👩', '😺'].each do |emoji| %>
        <label><input type="radio" name="avatar" value="<%= emoji %>" /><span class="emoji"><%= emoji %></span></label>
      <% end %>
    </p>
    <p id="avatar-tip" style="display: none;">Tip: select a new avatar at any time to change it. This will update your presence data.</p>
`;
    const expectedResult = `      <p class="emoji-radios">
      Avatar:
      <label><input type="radio" name="avatar" value="👦" /><span class="emoji">👦</span></label>
<label><input type="radio" name="avatar" value="👧" /><span class="emoji">👧</span></label>
<label><input type="radio" name="avatar" value="👨" /><span class="emoji">👨</span></label>
<label><input type="radio" name="avatar" value="👩" /><span class="emoji">👩</span></label>
<label><input type="radio" name="avatar" value="😺" /><span class="emoji">😺</span></label>
    </p>
    <p id="avatar-tip" style="display: none;">Tip: select a new avatar at any time to change it. This will update your presence data.</p>
`;
    expect(emojiReplacer(sampleText)).toBe(expectedResult);
  });
});
