import { compose } from 'lodash/fp';
import textile from 'textile-js';
import { postParser } from '.';
import { preParser } from '../pre-parser';
import { detokenizeSpans } from './detokenize-spans';

describe('Detokenize spans tests', () => {
  it('Works on a simple example as expected', () => {
    expect(detokenizeSpans('{{span[ class=|custom-class|]}}Content{{/span}}')).toBe(
      `<span class="custom-class">Content</span>`,
    );
  });
  it('Works on a nested example as expected', () => {
    expect(
      detokenizeSpans('{{span[ class="custom-class"]}}Content &amp; {{span[]}}Nested Content{{/span}}{{/span}}'),
    ).toBe(`<span class="custom-class">Content &amp; <span>Nested Content</span></span>`);
    expect(
      detokenizeSpans(
        '{{span[ lang=‘default’]}}Presence Properties{{/span}}{{span[ lang=‘objc,swift’]}}ARTPresence Properties{{/span}}{{span[ lang=‘ruby’]}}Ably::Realtime::Presence Attributes{{/span}}{{span[ lang=‘java’]}}io.ably.lib.realtime.Presence Members{{/span}}{{span[ lang=‘csharp’]}}IO.Ably.Realtime.Presence Properties{{/span}}',
      ),
    ).toMatchInlineSnapshot(
      `"<span lang=‘default’>Presence Properties</span><span lang=‘objc,swift’>ARTPresence Properties</span><span lang=‘ruby’>Ably::Realtime::Presence Attributes</span><span lang=‘java’>io.ably.lib.realtime.Presence Members</span><span lang=‘csharp’>IO.Ably.Realtime.Presence Properties</span>"`,
    );
  });
});

const realWorldExample = `h2(#properties).
default: Presence Properties
objc,swift: ARTPresence Properties
ruby: Ably::Realtime::Presence Attributes
java: io.ably.lib.realtime.Presence Members
csharp: IO.Ably.Realtime.Presence Properties

The @Presence@ object exposes the following public <span lang="default">properties</span><span lang="ruby">attributes</span><span lang="java">members</span>:

h6(#sync-complete).
default: syncComplete
ruby: sync_complete?
csharp: SyncComplete

A @boolean@ field indicating whether the presence member set is synchronized with server after a channel attach.
When a channel is attached, the Ably service immediately synchronizes the presence member set with the client. Typically this process completes in milliseconds, however when the presence member set is very large, bandwidth constraints may slow this synchronization process down.`;

describe('Tokenize and detokenize spans tests', () => {
  it('Works on a real world example', () => {
    expect(compose(postParser, textile, preParser)(realWorldExample)).toMatchInlineSnapshot(`
      "<h2 id=\\"properties\\"><span lang=&#8216;default&#8217;>Presence Properties</span><span lang=&#8216;objc,swift&#8217;>ARTPresence Properties</span><span lang=&#8216;ruby&#8217;>Ably::Realtime::Presence Attributes</span><span lang=&#8216;java&#8217;>io.ably.lib.realtime.Presence Members</span><span lang=&#8216;csharp&#8217;>IO.Ably.Realtime.Presence Properties</span></h2>
      <p>The <code>Presence</code> object exposes the following public <span lang=\\"default\\">properties</span><span lang=\\"ruby\\">attributes</span><span lang=\\"java\\">members</span>:</p>
      <h6 id=\\"sync-complete\\"><span lang=&#8216;default&#8217;>syncComplete</span><span lang=&#8216;ruby&#8217;>sync_complete?</span><span lang=&#8216;csharp&#8217;>SyncComplete</span></h6>
      <p>A <code>boolean</code> field indicating whether the presence member set is synchronized with server after a channel attach.<br />
      <p>When a channel is attached, the Ably service immediately synchronizes the presence member set with the client. Typically this process completes in milliseconds, however when the presence member set is very large, bandwidth constraints may slow this synchronization process down.</p></p>"
    `);
  });
});
