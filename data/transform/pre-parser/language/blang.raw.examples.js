const riskyBlangExample = `blang[jsall].
  @ConnectionState@ is a String with a value matching any of the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[javascript]
    var ConnectionStates = [
      'initialized',
      'connecting',
      'connected',
      'disconnected',
      'suspended',
      'closing',
      'closed',
      'failed'
    ]
  \`\`\`

blang[java].
  @io.ably.lib.realtime.ConnectionState@ is an enum representing all the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[java]
    public enum ConnectionState {
      initialized,   // 0
      connecting,    // 1
      connected,     // 2
      disconnected,  // 3
      suspended,     // 4
      closing,       // 5
      closed,        // 6
      failed         // 7
    }
  \`\`\`

blang[csharp].
  @IO.Ably.Realtime.ConnectionState@ is an enum representing all the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[csharp]
    public enum ConnectionState
    {
        Initialized,    //0
        Connecting,     //1
        Connected,      //2
        Disconnected,   //3
        Suspended,      //4
        Closing,        //5
        Closed,         //6
        Failed          //7
    };
  \`\`\`

blang[ruby].
  @Ably::Realtime::Connection::STATE@ is an enum-like value representing all the "@Realtime Connection@ states":/realtime/connection#connection-states. @STATE@ can be represented interchangeably as either symbols or constants.

  h4. Symbol states

  \`\`\`[ruby]
    :initialized # =>  0
    :connecting # =>   1
    :connected # =>    2
    :disconnected # => 3
    :suspended # =>    4
    :closing # =>      5
    :closed # =>       6
    :failed # =>       7
  \`\`\`

  h4. Constant states

  \`\`\`[ruby]
    Connection::STATE.Initialized # =>  0
    Connection::STATE.Connecting # =>   1
    Connection::STATE.Connected # =>    2
    Connection::STATE.Disconnected # => 3
    Connection::STATE.Suspended # =>    4
    Connection::STATE.Closing # =>      5
    Connection::STATE.Closed # =>       6
    Connection::STATE.Failed # =>       7
  \`\`\`

  h4. Example usage

  \`\`\`[ruby]
    # Example with symbols
    client.connection.on(:connected) { ... }

    # Example with constants
    client.connection.on(Ably::Realtime::Connection::STATE.Connected) { ... }

    # Interchangeable
    Ably::Realtime::Connection::STATE.Connected == :connected # => true
  \`\`\`

blang[objc,swift].
  @ARTRealtimeConnectionState@ is an enum representing all the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[objc]
    typedef NS_ENUM(NSUInteger, ARTRealtimeConnectionState) {
        ARTRealtimeInitialized,
        ARTRealtimeConnecting,
        ARTRealtimeConnected,
        ARTRealtimeDisconnected,
        ARTRealtimeSuspended,
        ARTRealtimeClosing,
        ARTRealtimeClosed,
        ARTRealtimeFailed
    };
  \`\`\`

  \`\`\`[swift]
    public enum ARTRealtimeConnectionState : UInt {
        case Initialized
        case Connecting
        case Connected
        case Disconnected
        case Suspended
        case Closing
        case Closed
        case Failed
    }
  \`\`\`

blang[go].
  @ConnectionState@ is an enum representing all the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[go]
    const (
      StateConnInitialized = 1
      StateConnConnecting = 2
      StateConnConnected = 4
      StateConnDisconnected = 8
      StateConnSuspended = 16
      StateConnClosing = 32
      StateConnClosed = 64
      StateConnFailed = 128
    )
  \`\`\`

blang[flutter].
  @ably.ConnectionState@ is an enum representing all the "@Realtime Connection@ states":/realtime/connection#connection-states.

  \`\`\`[flutter]
    enum ConnectionState {
      initialized,
      connecting,
      connected,
      disconnected,
      suspended,
      closing,
      closed,
      failed
    }
  \`\`\`
`;

const brokenBlangExample = `
h4.
  default: Properties
  java:    Members
  ruby:    Attributes

blang[default].
    - <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="jsall,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__

blang[jsall,java,swift,objc,csharp].
  - <span lang="jsall,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang='jsall,objc,csharp,swift'>@JSON Object@</span>__
  - <span lang="jsall,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__
`;

const brokenBlangExpectedResult = `
h4.
default: Properties
java:    Members
ruby:    Attributes
{{LANG_BLOCK[default]}}
- <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="jsall,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__
{{/LANG_BLOCK}}
{{LANG_BLOCK[jsall,java,swift,objc,csharp]}}
- <span lang="jsall,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang='jsall,objc,csharp,swift'>@JSON Object@</span>__
- <span lang="jsall,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__
{{/LANG_BLOCK}}
`;

const brokenBlangTokenExpectedResult = `
h4.
default: Properties
java:    Members
ruby:    Attributes<div lang="default"><!-- start default language block -->- <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="jsall,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__</div><!-- /end default language block --><div lang="jsall,java,swift,objc,csharp"><!-- start jsall,java,swift,objc,csharp language block -->- <span lang="jsall,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang='jsall,objc,csharp,swift'>@JSON Object@</span>__
- <span lang="jsall,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__</div><!-- /end jsall,java,swift,objc,csharp language block -->
`;

const brokenBlangTokenAfterJSConversionExpectedResult = `
h4.
      default: Properties
      java:    Members
      ruby:    Attributes
    blang[default].
        - <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="javascript,nodejs,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="javascript,nodejs,java,ruby,php"> or <span lang="javascript,nodejs">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__
    blang[javascript,nodejs,java,swift,objc,csharp].
      - <span lang="javascript,nodejs,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang="javascript,nodejs,objc,csharp,swift">@JSON Object@</span>__
      - <span lang="javascript,nodejs,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="javascript,nodejs,java,ruby,php"> or <span lang="javascript,nodejs">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__`;

const brokenCodeInsideBlangExample = `blang[jsall].
  \`\`\`[jsall]
    realtime.connection.on('connected', function(stateChange) {
      console.log('Ably is connected');
    });
  \`\`\`

`;

module.exports = {
  riskyBlangExample,
  brokenBlangExample,
  brokenBlangExpectedResult,
  brokenBlangTokenExpectedResult,
  brokenBlangTokenAfterJSConversionExpectedResult,
  brokenCodeInsideBlangExample,
};
