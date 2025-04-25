# Rewind channel option with Pub/Sub

Rewind is a channel option that enables users to choose where to begin a channel attachment from.

Use rewind to choose at which point in the past a client attaches to a room. This enables them to receive previously published messages upon attaching and provide context as to what has been happening. Rewind can be by a set number of messages in the past, or within a certain timeframe. Note that [message storage](https://ably.com/docs/storage-history/storage) needs to be enabled to retrieve messages older than 2 minutes.

Rewind can be used to retrieve the history of how odds for a football game changed over the past 5 minutes, or provide the most recent 50 events that occurred in a realtime dashboard.

Rewind is a channel option which is implemented using [Ably Pub/Sub](https://ably.com/docs/basics). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following methods to specify where to start an attachment from when attaching to a channel in a pub/sub application:

* [`channel.get()`](https://ably.com/docs/channels#create) - creates a new or retrieves an existing `channel`. Using the `rewind` channel option retrieves the set number of historical messages published to the channel when the channel is attached.
* [`channel.subscribe()`](https://ably.com/docs/channels#subscribe) - subscribes to message events within a specific channel by registering a listener. Message events are emitted when a user publishes a message.

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
yarn run pub-sub-rewind-javascript
```

7. Try it out by opening a tab to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
