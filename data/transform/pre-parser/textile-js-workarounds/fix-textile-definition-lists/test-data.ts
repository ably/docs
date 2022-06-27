export const failingDefinitionList = `h4. Parameters

- name := The event name to subscribe to<br>__Type: @String@__

<div lang="objc,swift,csharp"></div>
<div lang="default">
- names := An <span lang="ruby">argument</span> array of event names to subscribe to<br>__Type: <span lang="default">@String[]@ </span><span lang="ruby">@*argument@</span>__
</div>

- <div lang="jsall">listener</div> := is a function of the form @function(message)@ to be called for each message
- <div lang="java">"MessageListener":#message-listener listener</div> := Message listener to be notified for matching messages
- <div lang="ruby">&block</div> := yields each matching message when received on the channel
- <div lang="swift,objc">callback</div> := called with each matching "@message@":#message when received on the channel
- <div lang="csharp">handler</div> := called with each matching "@message@":#message when received on the channel`;
