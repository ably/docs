# Joining chat rooms and sending messages

Use rooms and messages to enable users to join rooms, send and receive messages.

Joining chat rooms and sending messages are core features of many applications with chat functionalities. They enable users to connect with others and communicate in real-time.

Chat rooms and messaging add value in different applications. For example, in customer support platforms, agents and clients can join dedicated rooms to discuss issues and share information. In larger applications, such as social networking or team collaboration tools, users can join multiple rooms based on topics or projects, fostering engagement and facilitating group discussions.

Rooms and messages can be implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add rooms and messages into a chat application:

* [ChatClientProvider](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
* [ChatRoomProvider](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
* [useRoom()](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [useMessages()](https://ably.com/docs/chat/rooms/messages?lang=react#subscribe) hook: a hook to manage and track the messages sent by users within a chat room.

Find out more about [rooms](https://ably.com/docs/chat/rooms?lang=react) and [messages](https://ably.com/docs/chat/rooms/messages?lang=react).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add rooms and messages into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.messages.subscribe()`](https://ably.com/docs/chat/rooms/messages?lang=javascript#subscribe) - subscribes to room messages events by registering a listener. Message events are emitted when a user sends a message.
* [`room.messages.send`](https://ably.com/docs/chat/rooms/messages?lang=javascript#send) - Emits a message event when the user sends a message to the room.

Find out more about [rooms](https://ably.com/docs/chat/rooms?lang=javascript) and [messages](https://ably.com/docs/chat/rooms/messages?lang=javascript).

// End Javascript brief

## View on Github

// React

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/chat-rooms-messages/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/chat-rooms-messages/react` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// Javascript

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/chat-rooms-messages/javascript/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/chat-rooms-messages/javascript` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
