export const brokenCodeAlternativesInsideBlangExample = `<h2 id="authentication">Authentication</h2>
      <div lang="kotlin,javascript"><!-- start kotlin,javascript language block -->

      <p>The client requires authentication in order to establish a connection with Ably. There are three methods that can be used:</p>
      <ol>
      	<li>Basic authentication</li>
      	<li>Token authentication</li>
      	<li><span class="caps">JWT</span> authentication</li>
      </ol>
      <p>Usually a client will use either token or <span class="caps">JWT</span> authentication, as basic authentication would require exposing the <span class="caps">API</span> keys on the client.</p>
      <p>Examples of establishing a connection using the three methods are given in the following sections. While the examples shown are for either the Publishing or Subscribing <span class="caps">SDK</span>, you can use the same approach for both SDKs.</p>
      <h3 id="basic-authentication">Basic Authentication</h3>
      <p>The following example demonstrates establishing a connection using basic authentication:</p>
      <pre lang="kotlin"><code lang="kotlin">
      val publisher = Publisher.publishers() // get the Publisher builder in default state
        .connection(ConnectionConfiguration(Authentication.basic(CLIENT_ID, ABLY_API_KEY)))

      </code></pre>
      <pre lang="javascript"><code lang="javascript">
      const subscriber = new Subscriber({ key: 'ABLY_API_KEY' })

      </code></pre>
      <p>This method should not be used on a client however, as it exposes the <span class="caps">API</span> key.</p>
      <p>You can read more about basic authentication in our <a href="/core-features/authentication#basic-authentication">documentation</a>.</p>
      <h3 id="token-authentication">Token Authentication</h3>
      <p>The following example demonstrates establishing a connection using token authentication:</p>
      <pre lang="kotlin"><code lang="kotlin">
      val publisher = Publisher.publishers() // get the Publisher builder in default state
          .connection(ConnectionConfiguration(Authentication.tokenRequest(CLIENT_ID) { requestParameters -&gt;
              // get TokenRequest from your server
              getTokenRequestFromAuthServer(requestParameters); // customer implements this function
              }))

      </code></pre>
      <pre lang="javascript"><code lang="javascript">
      /* authURL is the endpoint for your authentication server. It returns either
        a \`TokenRequest\` or a \`Token\` */
      const subscriber = new Subscriber({
        authUrl: 'http://my.website/auth',
        clientId: 'CLIENT_ID'
      })

      </code></pre>
      <p>You can read more about token authentication in our <a href="/core-features/authentication#token-authentication">documentation</a>.</p>
      <h3 id="jwt-authentication"><span class="caps">JWT</span> Authentication</h3>
      <p>The following example demonstrates establishing a connection using <span class="caps">JWT</span> authentication:</p>
      <pre lang="kotlin"><code lang="kotlin">
      val publisher = Publisher.publishers() // get the Publisher builder in default state
        .connection(ConnectionConfiguration(Authentication.jwt(CLIENT_ID) { tokenParameters -&gt;
              // get JWT from your server
              getJWTFromAuthServer(tokenParameters); // customer implements this function
              }))

      </code></pre>
      <pre lang="javascript"><code lang="javascript">
      // authURL is the endpoint for your authentication server. It returns a JWT
      const subscriber = new Subscriber({
        authUrl: 'http://my.website/auth',
        clientId: 'CLIENT_ID'
      })

      </code></pre>
      <p>You can read more about <span class="caps">JWT</span> authentication in our <a href="/core-features/authentication#ably-jwt-process">documentation</a>.</p></div><!-- /end kotlin,javascript language block --><div lang="swift"><!-- start swift language block -->

      <p>The client requires authentication in order to establish a connection with Ably. Currently, the Swift <span class="caps">SDK</span> only supports <a href="/key-concepts#authentication">basic authentication</a>: you authenticate with your Ably <span class="caps">API</span> key (available in <a href="https://ably.com/accounts">your account dashboard</a> and can optionally <a href="/realtime/authentication#identified-clients">identify the client with a client ID</a>. The following example demonstrates how to achieve this:</p>
      <p>\`\`\`[swift]<br />
      let publisher = try PublisherFactory.publishers() // get a Publisher builder<br />
      .connection(ConnectionConfiguration(apiKey: ABLY_API_<span class="caps">KEY</span>,
                                         clientId: CLIENT_ID))<br />
      /* Any additional configuration */<br />
      .start()<br /></div><!-- /end swift language block -->\`\`\``;
