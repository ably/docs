# Message history for chat applications

Message history enables users to view messages that have been previously sent to the chat room.

Message history enable users to catch up on any conversations they missed. For example, in a live stream, users can read conversations that happened before they joined. In team chats, users can view previous discussions and decisions, for context, before replying.

Message history is available in [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following components to add message history into a chat application:

* [`ChatClientProvider`](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
* [`ChatRoomProvider`](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
* [`useRoom()`](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [`useMessages()`](https://ably.com/docs/chat/rooms/history?lang=react#get) hook: a hook to retrieve messages that have been previously sent to a room.

Find out more about [message history](https://ably.com/docs/chat/rooms/history?lang=react).

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

4. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-room-history-react
```

7. Try it out by opening two tabs, one to [http://localhost:3000?loadChat=true](http://localhost:3000?loadChat=true) and one to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.
