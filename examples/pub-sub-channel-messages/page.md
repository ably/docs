# Sending and receiving messages with Pub/Sub

Enable users to have conversations with each other by sending and receiving messages in a chat room.

All applications that implement a chat component need to be able to send messages to enable communication between users. Messages are separated into different topics using rooms.

In customer support platforms, users join dedicated rooms to communicate with agents. In larger applications, such as social networking or team collaboration tools, users join multiple rooms to discuss different topics, fostering engagement and facilitating group discussions.

Messaging is implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to send and receive messages in a pub/sub application:

* [`AblyProvider`](https://ably.com/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
* [`ChannelProvider`](https://ably.com/docs/getting-started/react#channel-provider): manages the state and functionality of a specific channel, providing access to messages, members, and realtime interactions within that channel via React context.
* [`useChannel()`](https://ably.com/docs/getting-started/react#useChannel) hook: a hook to manage the state and interaction for a channel, allowing users to join, send messages, and listen for messages.
* [`publish()`](https://ably.com/docs/getting-started/react#useChannel) function: a function to publish messages to the specified channel.

Find out more about [channels](https://ably.com/docs/channels) and [messages](https://ably.com/docs/channels/messages).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to send and receive messages in a pub/sub application:

* [`channel.get()`](https://ably.com/docs/channels#create) - creates a new or retrieves an existing `channel`.
* [`channel.subscribe()`](https://ably.com/docs/channels#subscribe) - subscribes to channel messages events by registering a listener. Message events are emitted when a user publishes a message.
* [`channel.publish`](https://ably.com/docs/channels#publish) - Emits a message event when the user publishes a message to the channel.

Find out more about [channels](https://ably.com/docs/channels) and [messages](https://ably.com/docs/channels/messages).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-channel-messages/react/
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
cd /examples/pub-sub-channel-messages/javascript/
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
