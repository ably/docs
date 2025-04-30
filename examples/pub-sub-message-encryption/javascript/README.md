# Sending and receiving encrypted messages with Pub/Sub

Enable clients to send and receive encrypted messages on a channel.

Messaging enables instant, scalable communication through publishing and subscribing to channels. Messages represent data payloads that clients publish and subscribe to. They are the basis of realtime communication in all applications.

TLS (Transport Layer Security) is enabled by default in Ably SDKs to ensure data is sent and received securely. However, messages are not encrypted by default. Encryption can be configured on a channel-by-channel basis to make message payloads opaque, so that they can only be decrypted by other clients sharing a secret key.

Message encryption is implemented using [Ably Pub/Sub](/docs/auth). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following methods to send and receive messages in a pub/sub application:

- [`channel.get()`](/docs/channels#create): creates a new or retrieves an existing `channel`. Options are optional with `channel.get()`, options such as `cipher` to enable encryption.
- [`channel.subscribe()`](/docs/channels#subscribe): subscribes to channel messages events by registering a listener. Message events are emitted when a user publishes a message.
- [`channel.publish`](/docs/channels#publish): emits a message event when the user publishes a message to the channel.

Find out more about [channels](/docs/channels), [messages](/docs/channels/messages), and [encryption](/docs/channels/options/encryption).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

  ```sh
  git clone git@github.com:ably/docs.git
  ```

2. Change directory:

  ```sh
  cd /examples/
  ```

3. Rename the environment file:

  ```sh
  mv .env.example .env.local
  ```

4. In `.env.local` update the value of `VITE_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

  ```sh
  yarn install
  ```

6. Run the server:

  ```sh
  yarn run pub-sub-message-encryption-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/?encrypted=true](http://localhost:5173/?encrypted=true) and [http://localhost:5173/?encrypted=false](http://localhost:5173/?encrypted=false) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
