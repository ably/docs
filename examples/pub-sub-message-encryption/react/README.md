# Sending and receiving encrypted messages with Pub/Sub

Enable clients to send and receive encrypted messages on a channel.

Messaging enables instant, scalable communication through publishing and subscribing to channels. Messages represent data payloads that clients publish and subscribe to. They are the basis of realtime communication in all applications.

TLS (Transport Layer Security) is enabled by default in Ably SDKs to ensure data is sent and received securely. However, messages are not encrypted by default. Encryption can be configured on a channel-by-channel basis to make message payloads opaque, so that they can only be decrypted by other clients sharing a secret key.

Message encryption is implemented using [Ably Pub/Sub](/docs/auth). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to send and receive messages in a pub/sub application:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
- [`ChannelProvider`](/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel, providing access to messages, members, and realtime interactions within that channel via React context. Options are optional with `ChannelProvider`, options such as `cipher` to enable encryption.
- [`useChannel()`](/docs/getting-started/react-hooks#useChannel) hook: a hook to manage the state and interaction for a channel, allowing users to join, send messages, and listen for messages.
- [`publish()`](/docs/getting-started/react-hooks#useChannel) function: a function to publish messages to the specified channel.

Find out more about [channels](/docs/channels), [messages](/docs/channels/messages), and [encryption](/docs/channels/options/encryption).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

  ```sh
  git clone git@github.com:ably/docs.git
  ```

2. Change directory:

  ```sh
  cd examples/
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
  yarn run pub-sub-message-encryption-react
  ```

7. Try it out by opening two tabs to [http://localhost:3000/?encrypted=true](http://localhost:3000/?encrypted=true) and [http://localhost:3000/?encrypted=false](http://localhost:3000/?encrypted=false) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
