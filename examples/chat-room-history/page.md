# Message storage and history for chat applications

Message storage and history enables users to view load historical messages sent to the chat room.

Message storage and history enable users to maintain context and catch up on conversations they missed. For example, in a live stream chat room, users can quickly see previous discussions, and in team chats they can reference past decisions, and stay informed about earlier conversations - making it easy to join ongoing discussions or review important information shared while they were away.

Message storage and history is implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add an message storage and history implementation into a chat application:

* [`ChatClientProvider`](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
* [`ChatRoomProvider`](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
* [`useRoom()`](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [`useMessages()`](https://ably.com/docs/chat/rooms/history?lang=react#get) hook: a hook to retrieve messages that have been previously sent to a room.

Find out more about [message storage and history](https://ably.com/docs/chat/rooms/history?lang=react).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add an message storage and history implementation into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.messages.subscribe()`](https://ably.com/docs/chat/rooms/history?lang=javascript#subscribe) - subscribes to a room, retrieving previously sent messages while listening for future messages.
* [`room.messages.get`](https://ably.com/docs/chat/rooms/history?lang=javascript#get) - Retrieve messages that have been previously sent to a room.

Find out more about [message storage and history](https://ably.com/docs/chat/rooms/history?lang=javascript).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/chat-room-history/react/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening two tabs, one to [http://localhost:3000?loadChat=true](http://localhost:3000?loadChat=true) and one to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/chat-room-history/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key:

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening two tabs, one to [http://localhost:5173?loadChat=true](http://localhost:5173?loadChat=true) and one to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
