# Message history with Pub/Sub

History enables users to retrieve historical messages published to an application.

Use history to retrieve messages previously published to a channel within an application. Users can retrieve the history for messages such as a bidding history, or status updates.

History enables users to retrieve historically published messages within an application, allowing them to understand how the current state has been achieved. For example, in an auction site the user can see the history of bids as well as a see the current active bid. Within a sports application with live statistics the user will be able to see how the game has progressed so far.

History is implemented using [Ably Pub/Sub](https://ably.com/docs/products/channels). The Ably SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting Pub/Sub features.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to retrieve message history in a pub/sub application:

* [`AblyProvider`](https://ably.com/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
* [`ChannelProvider`](https://ably.com/docs/getting-started/react#channel-provider): manages the state and functionality of a specific channel, providing access to messages, history, presence, and realtime interactions within that channel via React context.
* [`useChannel()`](https://ably.com/docs/getting-started/react#useChannel) hook: a hook enabling users to subscribe to a channel and receive its messages.
* [`channel.history()`](https://ably.com/docs/storage-history/history#retrieve-channel): retrieve paginated message event history.

Find out more about [history](https://ably.com/docs/storage-history/history).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to retrieve message history in a pub/sub application:

* [`channel.get()`](https://ably.com/docs/channels#create) - creates a new or retrieves an existing `channel`.
* [`channel.subscribe()`](https://ably.com/docs/channels#subscribe) - subscribes to message events within a specific channel by registering a listener. Message events are emitted when a user publishes a message.
* [`channel.history()`](https://ably.com/docs/storage-history/history#retrieve-channel): retrieve paginated message event history.

Find out more about [history](https://ably.com/docs/storage-history/history).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-history/react/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-history/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
