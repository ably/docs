# Joining chat rooms and sending messages
Join a chat room to send and receive messages.

Joining chat rooms and sending messages are core features of many applications with chat functionalities. They enable users to connect with others and communicate in real-time.

Chat rooms and messaging can add value to various applications. For example, in customer support platforms, agents and clients can join dedicated rooms to discuss issues and share information. In larger applications, such as social networking or team collaboration tools, users can join multiple rooms based on topics or projects, fostering engagement and facilitating group discussions.

Rooms and messages can be implemented using Ably Chat. The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add rooms and messages into a chat application:

[ChatClientProvider](https://ably.com/docs/chat/setup#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
[ChatRoomProvider](https://ably.com/docs/chat/rooms#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
[useRoom()](https://ably.com/docs/chat/rooms#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
[useMessages()](https://ably.com/docs/chat/rooms/messages#subscribe) hook: a hook to manage and track the messages sent by users within a chat room.

For further information on the rooms and messages feature pleases refer to the [rooms](https://ably.com/docs/chat/rooms) and [messages](https://ably.com/docs/chat/rooms/messages) documentation.

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add rooms and messages into a chat application:

[`rooms.get()`](https://ably.com/docs/chat/rooms#create) - creates a new or retrieves an existing `room`.
[`rooms.messages.subscribe()`](https://ably.com/docs/chat/rooms/messages#subscribe) - subscribes to room messages events by registering a listener. Message events are emitted when a user sends a message.
[`room.messages.send`](https://ably.com/docs/chat/rooms/messages#send) - Emits a message event when the user sends a message to the room.

For further information on the rooms and messages feature pleases refer to the [rooms](https://ably.com/docs/chat/rooms) and [messages](https://ably.com/docs/chat/rooms/messages) documentation.

// End Javascript brief

## View on Github

// React

The full source code and instructions for getting started with can be found in Github.

Once the repository has been cloned, follow the instructions below to run the application.

Rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// Javascript

The full source code and instructions for getting started with can be found in Github.

Once the repository has been cloned, follow the instructions below to run the application.

Rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to have your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to have your Ably API key.
