const { fixDuplicateQuoteLinks } = require('./fix-duplicate-quote-links');

describe('Fixes duplicate quoted links for textile-js', () => {
  it('Correctly renders links with long gaps between quotes', () => {
    expect(
      fixDuplicateQuoteLinks(
        `The @Channel@ object can also emit one event that is not a state change: an @update@ event. This happens when there's a change to channel conditions for which the channel state doesn't change. For example, a partial loss of message continuity on a channel (typically after a resume) for which the channel state remains @attached@ would lead to an @update@ event being emitted, with both @current@ and @previous@ set to "@attached@", and the @resumed@ flag set to @false@. So if you get such an event, you'll know there may be messages you've missed on the channel, and if necessary you can use the "History":#history api to retrieve them.`,
      ),
    ).toBe(
      `The @Channel@ object can also emit one event that is not a state change: an @update@ event. This happens when there's a change to channel conditions for which the channel state doesn't change. For example, a partial loss of message continuity on a channel (typically after a resume) for which the channel state remains @attached@ would lead to an @update@ event being emitted, with both @current@ and @previous@ set to "@attached@", and the @resumed@ flag set to @false@. So if you get such an event, you'll know there may be messages you've missed on the channel, and if necessary you can use the <a href="#history">History</a> api to retrieve them.`,
    );
  });
});
