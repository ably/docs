const definitionList = `h3(#connection-states). Available connection states

A series of connection states is defined as follows:

- initialized := A @Connection@ object having this state has been initialized but no connection has yet been attempted.

- connecting := A connection attempt has been initiated. The connecting state is entered as soon as the library has completed initialization, and is reentered each time connection is re-attempted following disconnection.

- connected := A connection exists and is active.

- disconnected := A temporary failure condition. No current connection exists because there is no network connectivity or no host is available.<br><br>The disconnected state is entered if an established connection is dropped, or if a connection attempt was unsuccessful. In the disconnected state the library will periodically attempt to open a new connection (approximately every 15 seconds), anticipating that the connection will be re-established soon and thus connection and channel continuity will be possible. <br><br>In this state, developers can continue to publish messages as they are automatically placed in a local queue, to be sent as soon as a connection is reestablished. Messages published by other clients whilst this client is disconnected will be delivered to it upon reconnection, so long as the connection was resumed within 2 minutes. <br><br>After 2 minutes have elapsed, recovery is no longer possible and the connection will move to the @suspended@ state.

- suspended := A long term failure condition. No current connection exists because there is no network connectivity or no host is available.<br><br>The suspended state is entered after a failed connection attempt if there has then been no connection for a period of two minutes. In the suspended state, the library will periodically attempt to open a new connection every 30 seconds. Developers are unable to publish messages in this state. A new connection attempt can also be triggered by an explicit call to "<span lang="default">@connect()@</span><span lang="ruby">@connect@</span><span lang="csharp">@Connect()@:#connect</span>":#connect on the @Connection@ object.<br><br>Once the connection has been re-established, channels will be automatically re-attached. The client has been disconnected for too long for them to resume from where they left off, so if it wants to catch up on messages published by other clients while it was disconnected, it needs to use the "history API":/realtime/history.

- closing := An explicit request by the developer to close the connection has been sent to the Ably service. If a reply is not received from Ably within a short period of time, the connection will be forcibly terminated and the connection state will become @closed@.

- closed := The connection has been explicitly closed by the client.<br><br>In the closed state, no reconnection attempts are made automatically by the library, and clients may not publish messages. No connection state is preserved by the service or by the library. A new connection attempt can be triggered by an explicit call to "<span lang="default">@connect()@</span><span lang="ruby">@connect@</span><span lang="csharp">@Connect()@:#connect</span>":#connect on the @Connection@ object, which will result in a new connection.

- failed := This state is entered if the client library encounters a failure condition that it cannot recover from. This may be a fatal connection error received from the Ably service (e.g. an attempt to connect with an incorrect API key), or some local terminal error (e.g. the token in use has expired and the library does not have any way to renew it).<br><br>In the failed state, no reconnection attempts are made automatically by the library, and clients may not publish messages. A new connection attempt can be triggered by an explicit call to "<span lang="default">@connect()@</span><span lang="ruby">@connect@</span><span lang="csharp">@Connect()@:#connect</span>":#connect on the @Connection@ object.
`;

const expectedDefinitionList = `<h3 id=\"connection-states\">Available connection states</h3>
<p>A series of connection states is defined as follows:</p>
<dl>
<dt>initialized</dt>
<dd>A <code>Connection</code> object having this state has been initialized but no connection has yet been attempted.</dd>
<dt>connecting</dt>
<dd>A connection attempt has been initiated. The connecting state is entered as soon as the library has completed initialization, and is reentered each time connection is re-attempted following disconnection.</dd>
<dt>connected</dt>
<dd>A connection exists and is active.</dd>
<dt>disconnected</dt>
<dd>A temporary failure condition. No current connection exists because there is no network connectivity or no host is available.<br /><br />The disconnected state is entered if an established connection is dropped, or if a connection attempt was unsuccessful. In the disconnected state the library will periodically attempt to open a new connection (approximately every 15 seconds), anticipating that the connection will be re-established soon and thus connection and channel continuity will be possible. <br /><br />In this state, developers can continue to publish messages as they are automatically placed in a local queue, to be sent as soon as a connection is reestablished. Messages published by other clients whilst this client is disconnected will be delivered to it upon reconnection, so long as the connection was resumed within 2 minutes. <br /><br />After 2 minutes have elapsed, recovery is no longer possible and the connection will move to the <code>suspended</code> state.</dd>
<dt>suspended</dt>
<dd>A long term failure condition. No current connection exists because there is no network connectivity or no host is available.<br /><br />The suspended state is entered after a failed connection attempt if there has then been no connection for a period of two minutes. In the suspended state, the library will periodically attempt to open a new connection every 30 seconds. Developers are unable to publish messages in this state. A new connection attempt can also be triggered by an explicit call to <a href=\"#connect\"><span lang=\"default\"><code>connect()</code></span><span lang=\"ruby\"><code>connect</code></span><span lang=\"csharp\"><code>Connect()</code>:#connect</span></a> on the <code>Connection</code> object.<br /><br />Once the connection has been re-established, channels will be automatically re-attached. The client has been disconnected for too long for them to resume from where they left off, so if it wants to catch up on messages published by other clients while it was disconnected, it needs to use the <a href=\"/realtime/history\">history <span class=\"caps\">API</span></a>.</dd>
<dt>closing</dt>
<dd>An explicit request by the developer to close the connection has been sent to the Ably service. If a reply is not received from Ably within a short period of time, the connection will be forcibly terminated and the connection state will become <code>closed</code>.</dd>
<dt>closed</dt>
<dd>The connection has been explicitly closed by the client.<br /><br />In the closed state, no reconnection attempts are made automatically by the library, and clients may not publish messages. No connection state is preserved by the service or by the library. A new connection attempt can be triggered by an explicit call to <a href=\"#connect\"><span lang=\"default\"><code>connect()</code></span><span lang=\"ruby\"><code>connect</code></span><span lang=\"csharp\"><code>Connect()</code>:#connect</span></a> on the <code>Connection</code> object, which will result in a new connection.</dd>
<dt>failed</dt>
<dd>This state is entered if the client library encounters a failure condition that it cannot recover from. This may be a fatal connection error received from the Ably service (e.g. an attempt to connect with an incorrect <span class=\"caps\">API</span> key), or some local terminal error (e.g. the token in use has expired and the library does not have any way to renew it).<br /><br />In the failed state, no reconnection attempts are made automatically by the library, and clients may not publish messages. A new connection attempt can be triggered by an explicit call to <a href=\"#connect\"><span lang=\"default\"><code>connect()</code></span><span lang=\"ruby\"><code>connect</code></span><span lang=\"csharp\"><code>Connect()</code>:#connect</span></a> on the <code>Connection</code> object.</dd>
</dl>`;

const nestedH1_6String = `<div>
    h1. Lorem ipsum
vos populi vos dei
calamitus calamitabandum
</div>`;

const nestedH1_6Html = `<div><h1>Lorem ipsum</h1>
vos populi vos dei
calamitus calamitabandum
</div>`;

const nestedDiv = `h6(#unsubscribe).
    default: unsubscribe
    csharp: Unsubscribe

<div lang="default">
There are <span lang="jsall">six</span><span lang="default">three</span> overloaded versions of this method:
</div>

bq(definition#unsubscribe-event).
default: unsubscribe(String name, listener)
java:    void unsubscribe(String name, "MessageListener":#message-listener listener)
csharp:  bool Unsubscribe(string eventName, Action<"Message":#message> handler)
ruby:    unsubscribe(String name, &listener_proc)
objc,swift: unsubscribe(name: String, listener: ARTEventListener)

Unsubscribe the given listener for the specified event name. This removes an earlier event-specific subscription.

bq(definition#unsubscribe-listener).
default: unsubscribe(listener)
java:    void unsubscribe("MessageListener":#message-listener listener)
csharp:  bool Unsubscribe(Action<"Message":#message> handler)
ruby:    unsubscribe(&listener_proc)
objc,swift: unsubscribe(listener: ARTEventListener)

Unsubscribe the given listener (for any/all event names). This removes an earlier subscription.

<div lang="jsall">
bq(definition). unsubscribe(String[] names, listener)

Unsubscribe the given listener from all event names in the array.

bq(definition). unsubscribe(String name)

Unsubscribe all listeners for a given event name.

bq(definition). unsubscribe(String[] names)

Unsubscribe all listeners for all event names in the array.
</div>

bq(definition#unsubscribe-all).
default: unsubscribe()
java:    void unsubscribe()
csharp:  void Unsubscribe()
objc,swift: unsubscribe()

Unsubscribes all listeners to messages on this channel. This removes all earlier subscriptions.

h4. Parameters

- name := The event name to unsubscribe from<br>__Type: @String@__
- <div lang="jsall">names</div> := An array of event names to unsubscribe from<br>__Type: @String[]@__
- <div lang="jsall">listener</div> := is the callback listener function that was previously subscribed
- <div lang="java">listener</div> := previously registered listener<br>__Type: "@MessageListener@":#message-listener__
- <div lang="ruby">&listener_block</div> := previously registered listener block
- <div lang="swift,objc">listener</div> := previous return value from a @subscribe@ call
- <div lang="csharp">handler</div> := is the lambda expression that was previously subscribed
<div lang="flutter">
@streamSubscription@ obtained from a subscription can be used to cancel a listener by calling @streamSubscription.cancel@.
</div>

h6(#history).
default: history
csharp: History`;


module.exports = {
    definitionList,
    expectedDefinitionList,
    nestedH1_6String,
    nestedH1_6Html,
    nestedDiv
};
