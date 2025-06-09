# Rewind channel option with Pub/Sub

Rewind is a channel option that enables users to choose where to begin a channel attachment from.

Use rewind to choose at which point in the past a client attaches to a room. This enables them to receive previously published messages upon attaching and provide context as to what has been happening. Rewind can be by a set number of messages in the past, or within a certain timeframe. Note that [message storage](https://ably.com/docs/storage-history/storage) needs to be enabled to retrieve messages older than 2 minutes.

Rewind can be used to retrieve the history of how odds for a football game changed over the past 5 minutes, or provide the most recent 50 events that occurred in a realtime dashboard.

Rewind is a channel option which is implemented using [Ably Pub/Sub](https://ably.com/docs/basics). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following methods to specify where to start an attachment from when attaching to a channel in a pub/sub application:

- [`AblyProvider`](https://ably.com/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
- [`ChannelProvider`](https://ably.com/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel, providing access to messages, history, presence, and realtime interactions within that channel via React context. Using the `rewind` channel option retrieves the set number of historical messages published to the channel when the channel is attached.
- [`useChannel()`](https://ably.com/docs/getting-started/react-hooks#useChannel) hook: a hook enabling users to subscribe to a channel and receive its messages.

Find out more about [rewind](https://ably.com/docs/channels/options/rewind).

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
  yarn run pub-sub-rewind-react
  ```

7. Try it out by opening a tab to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
