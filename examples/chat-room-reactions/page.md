# Room reactions for chat applications

Use room reactions to enable users to express their feelings within a chat application.

Room reactions enable you to render when another chat user send a reaction to the room. They are most commonly used to display emojis such as a thumbs up (👍) or a heart (❤️).

Room reactions can add value to many different chat applications. One example is in 1:1 customer support applications, where agents and clients can express their emotions or feedback instantly using reactions. In larger chat applications, such as a live streaming application, room reactions can enhance user engagement by allowing viewers to react to content in real-time.

Room reactions can be implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add room reactions into a chat application:

* [ChatClientProvider](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
* [ChatRoomProvider](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
* [useRoom()](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [useRoomReactions()](https://ably.com/docs/chat/rooms/reactions?lang=react#subscribe) hook: a hook to manage and track the reactions sent by users within a chat room.

Find out more about [room reactions](https://ably.com/docs/chat/rooms/reactions).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add room reactions into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.reactions.subscribe()`](https://ably.com/docs/chat/rooms/reactions?lang=javascript#subscribe) - subscribes to room reaction events events by registering a listener. Reaction events are emitted when a user chooses a reaction to send.
* [`room.reactions.send`](https://ably.com/docs/chat/rooms/reactions?lang=javascript#send) - Emits a reaction event when the user chooses a room reaction.

Find out more about [room reactions](https://ably.com/docs/chat/rooms/reactions?lang=javascript).

// End Javascript brief

## View on Github

// React

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/chat-room-reactions/react/` rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/chat-room-reactions/react` and install dependencies:

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

In the directory `/examples/chat-room-reactions/javascript` rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/chat-room-reactions/javascript` and install dependencies:

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
