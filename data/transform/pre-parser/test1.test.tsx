import textile from 'textile-js';
import { preParser } from '.';
import { postParser } from '../post-parser';

const toTest = `There are overloaded versions of this method:

bq(definition#subscribe-listener).
  default:  subscribe(listener("Message":#message))
  java:     void subscribe("MessageListener":#message-listener listener)
  csharp:   void Subscribe(Action<"Message":#message> handler)
  ruby:     subscribe → yields "Message":#message
  objc,swift: subscribe(callback: ("ARTMessage":#message) -> Void) -> ARTEventListener?
  flutter:  StreamSubscription<"ably.Message":#message> subscribe().listen(("ably.Message":#message) -> void)

Subscribe to messages on this channel. The caller supplies <span lang="default">a listener function</span><span lang="csharp">a lambda expression</span><span lang="java">an implementation of the "MessageListener":#message-listener interface</span><span lang="ruby">a block</span>, which is called each time one or more messages arrives on the channel.

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

h4. Parameters

- name := The event name to subscribe to<br>__Type: @String@__
`;

const preParsed = preParser(toTest);
const textiled = textile(preParsed);
const postParsed = postParser(textiled);

describe('check dls', () => {
  it('check', () => {
    expect(preParsed).toMatchInlineSnapshot(`
      "There are overloaded versions of this method:

      bq(definition#subscribe-listener). <span lang='default'>subscribe(listener(<a href=\\"#message\\">Message</a>))</span><span lang='java'>void subscribe(<a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang='csharp'>void Subscribe(Action<<a href=\\"#message>\\">Message</a> handler)</span><span lang='ruby'>subscribe → yields <a href=\\"#message\\">Message</a></span><span lang='objc,swift'>subscribe(callback: (<a href=\\"#message\\">ARTMessage</a>) -> Void) -> ARTEventListener?</span><span lang='flutter'>StreamSubscription<<a href=\\"#message>\\">ably.Message</a> subscribe().listen((<a href=\\"#message\\">ably.Message</a>) -> void)</span>


      Subscribe to messages on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more messages arrives on the channel.

      bq(definition#subscribe-event). <span lang='default'>subscribe(String name, listener(<a href=\\"#message\\">Message</a>))</span><span lang='java'>void subscribe(String name, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang='csharp'>void Subscribe(string name, Action<<a href=\\"#message>\\">Message</a> handler)</span><span lang='ruby'>subscribe(String name) → yields <a href=\\"#message\\">Message</a></span><span lang='objc,swift'>subscribe(name: String, callback: (<a href=\\"#message\\">ARTMessage</a>) -> Void) -> ARTEventListener?</span><span lang='flutter'>StreamSubscription<<a href=\\"#message>\\">ably.Message</a> subscribe(name: String).listen((<a href=\\"#message\\">ably.Message</a>) -> void)</span>


      Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more matching messages arrives on the channel.

      <div lang=\\"objc,swift,csharp\\"></div>
      <div lang=\\"default\\">
      bq(definition#subscribe-event-array). <span lang='default'>subscribe(String[] names, listener(<a href=\\"#message\\">Message</a>))</span><span lang='java'>void subscribe(String[] names, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang='ruby'>subscribe(String *names) → yields <a href=\\"#message\\">Message</a></span><span lang='flutter'>StreamSubscription<<a href=\\"#message>\\">ably.Message</a> subscribe(names: List<String>).listen((<a href=\\"#message\\">ably.Message</a>) -> void)</span>


      Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.</div>

      <h4>Parameters</h4>

      - name := The event name to subscribe to<br><em class=\\"italics\\">Type: <code>String</code></em>
      "
    `);
    expect(textiled).toMatchInlineSnapshot(`
      "<p>There are overloaded versions of this method:</p>
      <blockquote class=\\"definition\\" id=\\"subscribe-listener\\">
      <p class=\\"definition\\"><span lang=\\"default\\">subscribe(listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(<a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"csharp\\">void Subscribe(Action&lt;<a href=\\"#message&gt;\\">Message</a> handler)</span><span lang=\\"ruby\\">subscribe → yields <a href=\\"#message\\">Message</a></span><span lang=\\"objc,swift\\">subscribe(callback: (<a href=\\"#message\\">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe().listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more messages arrives on the channel.</p>
      <blockquote class=\\"definition\\" id=\\"subscribe-event\\">
      <p class=\\"definition\\"><span lang=\\"default\\">subscribe(String name, listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(String name, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"csharp\\">void Subscribe(string name, Action&lt;<a href=\\"#message&gt;\\">Message</a> handler)</span><span lang=\\"ruby\\">subscribe(String name) → yields <a href=\\"#message\\">Message</a></span><span lang=\\"objc,swift\\">subscribe(name: String, callback: (<a href=\\"#message\\">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe(name: String).listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more matching messages arrives on the channel.</p>
      <div lang=\\"objc,swift,csharp\\"></div>
      <p>&lt;div lang=&#8220;default&#8221;&gt;<br />
      bq(definition#subscribe-event-array). <span lang=\\"default\\">subscribe(String[] names, listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(String[] names, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"ruby\\">subscribe(String *names) → yields <a href=\\"#message\\">Message</a></span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe(names: List&lt;String&gt;).listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      <p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.&lt;/div&gt;</p>
      <p><h4>Parameters</h4></p>
      <dl>
      	<dt>name</dt>
      	<dd>The event name to subscribe to<br /><em class=\\"italics\\">Type: <code>String</code></em></dd>
      </dl>"
    `);
    expect(postParsed).toMatchInlineSnapshot(`
      "<p>There are overloaded versions of this method:</p>
      <blockquote class=\\"definition\\" id=\\"subscribe-listener\\">
      <p class=\\"definition\\"><span lang=\\"default\\">subscribe(listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(<a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"csharp\\">void Subscribe(Action&lt;<a href=\\"#message&gt;\\">Message</a> handler)</span><span lang=\\"ruby\\">subscribe → yields <a href=\\"#message\\">Message</a></span><span lang=\\"objc,swift\\">subscribe(callback: (<a href=\\"#message\\">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe().listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more messages arrives on the channel.</p>
      <blockquote class=\\"definition\\" id=\\"subscribe-event\\">
      <p class=\\"definition\\"><span lang=\\"default\\">subscribe(String name, listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(String name, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"csharp\\">void Subscribe(string name, Action&lt;<a href=\\"#message&gt;\\">Message</a> handler)</span><span lang=\\"ruby\\">subscribe(String name) → yields <a href=\\"#message\\">Message</a></span><span lang=\\"objc,swift\\">subscribe(name: String, callback: (<a href=\\"#message\\">ARTMessage</a>) &#8594; Void) -&gt; ARTEventListener?</span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe(name: String).listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      </blockquote>
      <p>Subscribe to messages with a given event <code>name</code> on this channel. The caller supplies <span lang=\\"default\\">a listener function</span><span lang=\\"csharp\\">a lambda expression</span><span lang=\\"java\\">an implementation of the <a href=\\"#message-listener\\">MessageListener</a> interface</span><span lang=\\"ruby\\">a block</span>, which is called each time one or more matching messages arrives on the channel.</p>
      <div lang=\\"objc,swift,csharp\\"></div>
      <p>&lt;div lang=&#8220;default&#8221;&gt;<br />
      bq(definition#subscribe-event-array). <span lang=\\"default\\">subscribe(String[] names, listener(<a href=\\"#message\\">Message</a>))</span><span lang=\\"java\\">void subscribe(String[] names, <a href=\\"#message-listener\\">MessageListener</a> listener)</span><span lang=\\"ruby\\">subscribe(String *names) → yields <a href=\\"#message\\">Message</a></span><span lang=\\"flutter\\">StreamSubscription&lt;<a href=\\"#message&gt;\\">ably.Message</a> subscribe(names: List&lt;String&gt;).listen((<a href=\\"#message\\">ably.Message</a>) &#8594; void)</span></p>
      <p>Subscribe a single listener to messages on this channel for multiple event <code>name</code> values.&lt;/div&gt;</p>
      <p><h4>Parameters</h4></p>
      <dl>
      	<dt>name</dt>
      	<dd>The event name to subscribe to<br /><em class=\\"italics\\">Type: <code>String</code></em></dd>
      </dl>"
    `);
  });
});
