import textile from 'textile-js';
import { fixDuplicateQuoteLinks, fixHtmlElementsInLinks, fixLinkElementsInBrackets } from './fix-links';

describe('Fixes duplicate quoted links for textile-js', () => {
  it('Correctly renders links with long gaps between quotes', () => {
    expect(
      textile(
        fixDuplicateQuoteLinks(
          `The @Channel@ object can also emit one event that is not a state change: an @update@ event. This happens when there's a change to channel conditions for which the channel state doesn't change. For example, a partial loss of message continuity on a channel (typically after a resume) for which the channel state remains @attached@ would lead to an @update@ event being emitted, with both @current@ and @previous@ set to "@attached@". and the @resumed@ flag set to @false@. So if you get such an event, you'll know there may be messages you've missed on the channel, and if necessary you can use the "History":#history api to retrieve them.`,
        ),
      ),
    ).toBe(
      `<p>The <code>Channel</code> object can also emit one event that is not a state change: an <code>update</code> event. This happens when there&#8217;s a change to channel conditions for which the channel state doesn&#8217;t change. For example, a partial loss of message continuity on a channel (typically after a resume) for which the channel state remains <code>attached</code> would lead to an <code>update</code> event being emitted, with both <code>current</code> and <code>previous</code> set to <code>attached</code> and the <code>resumed</code> flag set to <code>false</code>. So if you get such an event, you&#8217;ll know there may be messages you&#8217;ve missed on the channel, and if necessary you can use the <a href="#history">History</a> api to retrieve them.</p>`,
    );
  });
});

describe('Fixes HTML elements in links for textile-js', () => {
  it('Correctly renders links with HTML elements in the URL portion', () => {
    expect(
      textile(
        fixHtmlElementsInLinks(
          `"Lorem ipsum":lorem-ipsum-ad-loquitur<span>"Alternative Lorem Ipsum":per-ardua-ad-astra</span>`,
        ),
      ),
    ).toBe(
      `<p><a href="lorem-ipsum-ad-loquitur">Lorem ipsum</a><span><a href="per-ardua-ad-astra">Alternative Lorem Ipsum</a></span></p>`,
    );
  });

  it('Correctly renders links inside the  code block', () => {
    expect(
      textile(
        fixLinkElementsInBrackets(
          `subscribe(String[] "actions":#presence-action, listener("PresenceMessage":#presence-message))`,
        ),
      ),
    ).toMatchInlineSnapshot(
      `"<p>subscribe(String[] <a href=\\"#presence-action\\">actions</a>, listener(<a href=\\"#presence-message\\">PresenceMessage</a>)</p>"`,
    );
  });
});
