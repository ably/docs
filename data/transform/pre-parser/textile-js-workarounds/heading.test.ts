import textile from 'textile-js';
import { preParser } from '..';

describe('Manual override of headings works as expected', () => {
  it('Manually overrides headings when there are classes and IDs and definition lists involved', () => {
    expect(
      textile(
        preParser(`h5. Request parameters

- channels := **mandatory**. One or more channel names, separated by commas (or the @separator@ if specified). Non-url-safe characters should be URL-encoded (for example, @?channels=foo%3Fbar@ will subscribe to the channel @foo?bar@). Alias: @channel@.
- v := **mandatory**. The version of the api you are requesting. The current version of the API is 1.2, so @v=1.2@ is recommended.
- separator := **optional**. A separator, to enable easy subscriptions to channels with commas in their name. For example, @?separator=|&channel=fo,o|ba,r@ will subscribe to the two channels @fo,o@ and @ba,r@.
- key := **optional**. An Ably API key to use, if using basic auth.
- accessToken := **optional** An Ably auth token to use, if using token auth.
- lastEvent := **optional**. An @id@ to resume from. Only required when starting a new SSE connection which resumes from a previous connection.
- rewind := **optional**. An integer which, if specified, will send a backlog of the number of messages specified once the connection opens. For example, @rewind=1@ will give you the most recent message sent on the channel. This is best-effort — only messages from within the last two minutes will be available, and only if the channel has been continuously active since the message was sent; it is not a replacement for the "history API":/rest/history. It only has an effect for new connections; when resuming a previous connection using @lastEvent@, it is ignored in favour of sending you the messages you missed since you were last connected.
- enveloped := **optional**. Default is @true@. If @true@, the @data@ from each event envelope for a @message@ event will be a "Message":/api/realtime-sdk/types#message object. If @false@, it will be the payload from the message directly. See "Envelope format":#envelope-format below.
- heartbeats := **optional**. Default is @false@. if @true@ will use an explicit heartbeat event rather than a newline as a keepalive packet.

h5(#envelope-format). Envelope format

See an example of a "plain event stream":#event-stream below, except instead of a JSON object with @id@, @event@, @data@ members, you get an SSE event.

Keepalive packets are sent as SSE comments (@:keepalive@).`),
      ),
    ).toBe(`<p><h5>Request parameters</h5></p>
<dl>
\t<dt>channels</dt>
\t<dd><strong>mandatory</strong>. One or more channel names, separated by commas (or the <code>separator</code> if specified). Non-url-safe characters should be <span class="caps">URL</span>-encoded (for example, <code>?channels=foo%3Fbar</code> will subscribe to the channel <code>foo?bar</code>). Alias: <code>channel</code>.</dd>
\t<dt>v</dt>
\t<dd><strong>mandatory</strong>. The version of the api you are requesting. The current version of the <span class="caps">API</span> is 1.2, so <code>v=1.2</code> is recommended.</dd>
\t<dt>separator</dt>
\t<dd><strong>optional</strong>. A separator, to enable easy subscriptions to channels with commas in their name. For example, <code>?separator=|&amp;channel=fo,o|ba,r</code> will subscribe to the two channels <code>fo,o</code> and <code>ba,r</code>.</dd>
\t<dt>key</dt>
\t<dd><strong>optional</strong>. An Ably <span class="caps">API</span> key to use, if using basic auth.</dd>
\t<dt>accessToken</dt>
\t<dd><strong>optional</strong> An Ably auth token to use, if using token auth.</dd>
\t<dt>lastEvent</dt>
\t<dd><strong>optional</strong>. An <code>id</code> to resume from. Only required when starting a new <span class="caps">SSE</span> connection which resumes from a previous connection.</dd>
\t<dt>rewind</dt>
\t<dd><strong>optional</strong>. An integer which, if specified, will send a backlog of the number of messages specified once the connection opens. For example, <code>rewind=1</code> will give you the most recent message sent on the channel. This is best-effort — only messages from within the last two minutes will be available, and only if the channel has been continuously active since the message was sent; it is not a replacement for the <a href="/rest/history">history <span class="caps">API</span></a>. It only has an effect for new connections; when resuming a previous connection using <code>lastEvent</code>, it is ignored in favour of sending you the messages you missed since you were last connected.</dd>
\t<dt>enveloped</dt>
\t<dd><strong>optional</strong>. Default is <code>true</code>. If <code>true</code>, the <code>data</code> from each event envelope for a <code>message</code> event will be a <a href="/api/realtime-sdk/types#message">Message</a> object. If <code>false</code>, it will be the payload from the message directly. See <a href="#envelope-format">Envelope format</a> below.</dd>
\t<dt>heartbeats</dt>
\t<dd><strong>optional</strong>. Default is <code>false</code>. if <code>true</code> will use an explicit heartbeat event rather than a newline as a keepalive packet.</dd>
</dl>
<h5 id="envelope-format">Envelope format</h5>
<p>See an example of a <a href="#event-stream">plain event stream</a> below, except instead of a <span class="caps">JSON</span> object with <code>id</code>, <code>event</code>, <code>data</code> members, you get an <span class="caps">SSE</span> event.</p>
<p>Keepalive packets are sent as <span class="caps">SSE</span> comments (<code>:keepalive</code>).</p>`);
  });
});
