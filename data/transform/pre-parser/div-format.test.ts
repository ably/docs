import { compose } from 'lodash/fp';
import textile from 'textile-js';
import { preParser, recursivelyProcessDivs, removeNewlinesBeforeClosingTags } from '.';
import { fullyParseTextile, processTextile, textileToHtml } from '../../../data/test-utilities/process-textile';
import { replaceERB } from './erbjs';
import {
  addLanguageSupportForBlockQuotes,
  addLanguageSupportForGithubStyleCode,
  addLanguageSupportForHeadings,
  convertBlangBlocksToTokens,
  convertJSAllToNodeAndJavaScript,
  duplicateLanguageBlocks,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
} from './language';
import { removeExternalClassFromLinks } from './remove-external-class-from-links';
import { addMinimizedIndent, addMinimizeForHeadings, stripComments } from './semantic';
import { textileJSCompatibility } from './textile-js-workarounds';

const misbehavingDivFixture = `

bq(definition#subscribe-event).
  default: subscribe(String name, listener("Message":#message))
  java:    void subscribe(String name, "MessageListener":#message-listener listener)
  csharp:  void Subscribe(string name, Action<"Message":#message> handler)
  ruby:    subscribe(String name) → yields "Message":#message
  objc,swift: subscribe(name: String, callback: ("ARTMessage":#message) -> Void) -> ARTEventListener?
  flutter:  StreamSubscription<"ably.Message":#message> subscribe(name: String).listen(("ably.Message":#message) -> void)

Subscribe to messages with a given event @name@ on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the "MessageListener":#message-listener interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.

<div lang="objc,swift,csharp"></div>
<div lang="default">

bq(definition#subscribe-event-array).
  default: subscribe(String[] names, listener("Message":#message))
  java:    void subscribe(String[] names, "MessageListener":#message-listener listener)
  ruby:    subscribe(String *names) → yields "Message":#message
  flutter:  StreamSubscription<"ably.Message":#message> subscribe(names: List<String>).listen(("ably.Message":#message) -> void)

Subscribe a single listener to messages on this channel for multiple event @name@ values.
</div>

`;

const processedHtml = processTextile(misbehavingDivFixture);
const cheerioFinal = fullyParseTextile(misbehavingDivFixture);
describe('Ensure that divs show up correctly in all cases', () => {
  it('Ensures that divs show up correctly', () => {
    expect(recursivelyProcessDivs(misbehavingDivFixture)).toMatchInlineSnapshot(`
      "

      bq(definition#subscribe-event).
        default: subscribe(String name, listener("Message":#message))
        java:    void subscribe(String name, "MessageListener":#message-listener listener)
        csharp:  void Subscribe(string name, Action<"Message":#message> handler)
        ruby:    subscribe(String name) → yields "Message":#message
        objc,swift: subscribe(name: String, callback: ("ARTMessage":#message) -> Void) -> ARTEventListener?
        flutter:  StreamSubscription<"ably.Message":#message> subscribe(name: String).listen(("ably.Message":#message) -> void)

      Subscribe to messages with a given event @name@ on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the "MessageListener":#message-listener interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.

      <div lang="objc,swift,csharp"></div>
      <notextile><div lang="default"><blockquote class="definition" id="subscribe-event-array"><p class="definition"><span lang="default">subscribe(String[] names, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String[] names, <a href="#message-listener">MessageListener</a> listener)</span><span lang="ruby">subscribe(String *names) → yields <a href="#message">Message</a></span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(names: List&lt;String&gt;).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p></blockquote><p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</p></div></notextile>

      "
    `);
    const partialPreParser = compose(
      // Textile compatibility must follow all other changes
      textileJSCompatibility,
      recursivelyProcessDivs,
      // Language operations
      addLanguageSupportForHeadings,
      addLanguageSupportForBlockQuotes,
      enforceWhiteSpaceLevelsBetweenLanguageElements,
      duplicateLanguageBlocks,
      addLanguageSupportForGithubStyleCode,
      convertBlangBlocksToTokens,
      convertJSAllToNodeAndJavaScript,
      // Readability/Semantic operations
      addMinimizedIndent,
      addMinimizeForHeadings,
      stripComments,
      removeNewlinesBeforeClosingTags,
      // ERB to JS
      replaceERB,
      removeExternalClassFromLinks,
    );

    expect(partialPreParser(misbehavingDivFixture)).toMatchInlineSnapshot(`
      "

      bq(definition#subscribe-event). <span lang='default'>subscribe(String name, listener(<a href="#message">Message</a>))</span><span lang='java'>void subscribe(String name, <a href="#message-listener">MessageListener</a> listener)</span><span lang='csharp'>void Subscribe(string name, Action<<a href="#message">Message</a>> handler)</span><span lang='ruby'>subscribe(String name) → yields <a href="#message">Message</a></span><span lang='objc,swift'>subscribe(name: String, callback: (<a href="#message">ARTMessage</a>) -> Void) -> ARTEventListener?</span><span lang='flutter'>StreamSubscription<<a href="#message">ably.Message</a>> subscribe(name: String).listen((<a href="#message">ably.Message</a>) -> void)</span>


      Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the <a href="#message-listener">MessageListener</a> interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.

      <div lang="objc,swift,csharp"></div>
      <notextile><div lang="default"><blockquote class="definition" id="subscribe-event-array"><p class="definition"><span lang="default">subscribe(String[] names, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String[] names, <a href="#message-listener">MessageListener</a> listener)</span><span lang="ruby">subscribe(String *names) → yields <a href="#message">Message</a></span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(names: List&lt;String&gt;).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p></blockquote><p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</p></div></notextile>

      "
    `);
    expect(preParser(misbehavingDivFixture)).toMatchInlineSnapshot(`
      "

      bq(definition#subscribe-event). <span lang='default'>subscribe(String name, listener(<a href="#message">Message</a>))</span><span lang='java'>void subscribe(String name, <a href="#message-listener">MessageListener</a> listener)</span><span lang='csharp'>void Subscribe(string name, Action<<a href="#message">Message</a>> handler)</span><span lang='ruby'>subscribe(String name) → yields <a href="#message">Message</a></span><span lang='objc,swift'>subscribe(name: String, callback: (<a href="#message">ARTMessage</a>) -> Void) -> ARTEventListener?</span><span lang='flutter'>StreamSubscription<<a href="#message">ably.Message</a>> subscribe(name: String).listen((<a href="#message">ably.Message</a>) -> void)</span>


      Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the <a href="#message-listener">MessageListener</a> interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.

      <div lang="objc,swift,csharp"></div>
      <notextile><div lang="default"><blockquote class="definition" id="subscribe-event-array"><p class="definition"><span lang="default">subscribe(String[] names, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String[] names, <a href="#message-listener">MessageListener</a> listener)</span><span lang="ruby">subscribe(String *names) → yields <a href="#message">Message</a></span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(names: List&lt;String&gt;).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p></blockquote><p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</p></div></notextile>

      "
    `);
    expect(textile(preParser(misbehavingDivFixture))).toMatchInlineSnapshot(`
      "<blockquote class="definition" id="subscribe-event">
      <p class="definition"><span lang="default">subscribe(String name, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String name, <a href="#message-listener">MessageListener</a> listener)</span><span lang="csharp">void Subscribe(string name, Action&lt;<a href="#message">Message</a>&gt; handler)</span><span lang="ruby">subscribe(String name) → yields <a href="#message">Message</a></span><span lang="objc,swift">subscribe(name: String, callback: (<a href="#message">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(name: String).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the <a href="#message-listener">MessageListener</a> interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.</p>
      <div lang="objc,swift,csharp"></div>
      <div lang="default"><blockquote class="definition" id="subscribe-event-array"><p class="definition"><span lang="default">subscribe(String[] names, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String[] names, <a href="#message-listener">MessageListener</a> listener)</span><span lang="ruby">subscribe(String *names) → yields <a href="#message">Message</a></span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(names: List&lt;String&gt;).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p></blockquote><p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</p></div>"
    `);
    expect(textileToHtml(misbehavingDivFixture)).toMatchInlineSnapshot(`
      "<blockquote class="definition" id="subscribe-event">
      <p class="definition"><span lang="default">subscribe(String name, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String name, <a href="#message-listener">MessageListener</a> listener)</span><span lang="csharp">void Subscribe(string name, Action&lt;<a href="#message">Message</a>&gt; handler)</span><span lang="ruby">subscribe(String name) → yields <a href="#message">Message</a></span><span lang="objc,swift">subscribe(name: String, callback: (<a href="#message">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(name: String).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the <a href="#message-listener">MessageListener</a> interface</span><span lang="ruby">a block</span>, which is called each time one or more matching messages arrives on the channel.</p>
      <div lang="objc,swift,csharp"></div>
      <div lang="default"><blockquote class="definition" id="subscribe-event-array"><p class="definition"><span lang="default">subscribe(String[] names, listener(<a href="#message">Message</a>))</span><span lang="java">void subscribe(String[] names, <a href="#message-listener">MessageListener</a> listener)</span><span lang="ruby">subscribe(String *names) → yields <a href="#message">Message</a></span><span lang="flutter">StreamSubscription&lt;<a href="#message">ably.Message</a>&gt; subscribe(names: List&lt;String&gt;).listen((<a href="#message">ably.Message</a>) &#8594; void)</span></p></blockquote><p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</p></div>"
    `);
    expect(processedHtml).toMatchSnapshot();
    expect(cheerioFinal).toMatchSnapshot();
  });
});
