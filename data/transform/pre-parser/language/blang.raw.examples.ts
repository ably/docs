export const riskyBlangExample = `blang[jsall].
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

export const brokenBlangExample = `
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

export const brokenBlangExpectedResult = `
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

export const brokenBlangTokenExpectedResult = `
h4.
default: Properties
java:    Members
ruby:    Attributes<div lang="default"><!-- start default language block -->- <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="jsall,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__</div><!-- /end default language block --><div lang="jsall,java,swift,objc,csharp"><!-- start jsall,java,swift,objc,csharp language block -->- <span lang="jsall,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang='jsall,objc,csharp,swift'>@JSON Object@</span>__
- <span lang="jsall,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="jsall,java,ruby,php"> or <span lang="jsall">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__</div><!-- /end jsall,java,swift,objc,csharp language block -->
`;

export const brokenBlangTokenAfterJSConversionExpectedResult = `
h4.
      default: Properties
      java:    Members
      ruby:    Attributes
    blang[default].
        - <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="javascript,nodejs,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="javascript,nodejs,java,ruby,php"> or <span lang="javascript,nodejs">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__
    blang[javascript,nodejs,java,swift,objc,csharp].
      - <span lang="javascript,nodejs,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang="javascript,nodejs,objc,csharp,swift">@JSON Object@</span>__
      - <span lang="javascript,nodejs,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/realtime/encryption#cipher-params<span lang="javascript,nodejs,java,ruby,php"> or <span lang="javascript,nodejs">an options object</span><span lang="java">a @Param[]@ list</span><span lang="ruby">an options hash</span><span lang="php">an Associative Array</span> containing at a minimum a @key@</span>__`;

export const brokenCodeInsideBlangExample = `blang[jsall].
  \`\`\`[jsall]
    realtime.connection.on('connected', function(stateChange) {
      console.log('Ably is connected');
    });
  \`\`\`

`;
export const brokenCodeAlternativesInsideBlangExample = `h2(#authentication). Authentication

blang[kotlin,javascript].
  The client requires authentication in order to establish a connection with Ably. There are three methods that can be used:

  1. Basic authentication
  2. Token authentication
  3. JWT authentication

  Usually a client will use either token or JWT authentication, as basic authentication would require exposing the API keys on the client.

  Examples of establishing a connection using the three methods are given in the following sections. While the examples shown are for either the Publishing or Subscribing SDK, you can use the same approach for both SDKs.

  h3(#basic-authentication). Basic Authentication

  The following example demonstrates establishing a connection using basic authentication:

  \`\`\`[kotlin]
  val publisher = Publisher.publishers() // get the Publisher builder in default state
    .connection(ConnectionConfiguration(Authentication.basic(CLIENT_ID, ABLY_API_KEY)))
  \`\`\`

  \`\`\`[javascript]
  const subscriber = new Subscriber({ key: 'ABLY_API_KEY' })
  \`\`\`

  This method should not be used on a client however, as it exposes the API key.

  You can read more about basic authentication in our "documentation":/core-features/authentication#basic-authentication.

  h3(#token-authentication). Token Authentication

  The following example demonstrates establishing a connection using token authentication:

  \`\`\`[kotlin]
  val publisher = Publisher.publishers() // get the Publisher builder in default state
      .connection(ConnectionConfiguration(Authentication.tokenRequest(CLIENT_ID) { requestParameters ->
          // get TokenRequest from your server
          getTokenRequestFromAuthServer(requestParameters); // customer implements this function
          }))
  \`\`\`

  \`\`\`[javascript]
  /* authURL is the endpoint for your authentication server. It returns either
    a \`TokenRequest\` or a \`Token\` */
  const subscriber = new Subscriber({
    authUrl: 'http://my.website/auth',
    clientId: 'CLIENT_ID'
  })
  \`\`\`

  You can read more about token authentication in our "documentation":/core-features/authentication#token-authentication.

  h3(#jwt-authentication). JWT Authentication

  The following example demonstrates establishing a connection using JWT authentication:

  \`\`\`[kotlin]
  val publisher = Publisher.publishers() // get the Publisher builder in default state
    .connection(ConnectionConfiguration(Authentication.jwt(CLIENT_ID) { tokenParameters ->
          // get JWT from your server
          getJWTFromAuthServer(tokenParameters); // customer implements this function
          }))
  \`\`\`

  \`\`\`[javascript]
  // authURL is the endpoint for your authentication server. It returns a JWT
  const subscriber = new Subscriber({
    authUrl: 'http://my.website/auth',
    clientId: 'CLIENT_ID'
  })
  \`\`\`

  You can read more about JWT authentication in our "documentation":/core-features/authentication#ably-jwt-process.

blang[swift].
  The client requires authentication in order to establish a connection with Ably. Currently, the Swift SDK only supports "basic authentication":/key-concepts#authentication: you authenticate with your Ably API key (available in "your account dashboard":https://ably.com/accounts) and can optionally "identify the client with a client ID":/realtime/authentication#identified-clients. The following example demonstrates how to achieve this:

  \`\`\`[swift]
  let publisher = try PublisherFactory.publishers() // get a Publisher builder
  .connection(ConnectionConfiguration(apiKey: ABLY_API_KEY,
                                      clientId: CLIENT_ID))
  /* Any additional configuration */
  .start()
  \`\`\``;
