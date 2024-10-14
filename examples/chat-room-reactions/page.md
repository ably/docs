# Room reactions for chat applications
Display which users are typing a message within chat applications.

Room reactions enable you to render when another chat user send a reaction to the room. They are most commonly used to display emojis such as a thumbs up (👍) or a heart (❤️).

Room reactions can add value to many different chat applications. One example is in 1:1 customer support applications, where agents and clients can express their emotions or feedback instantly using reactions. In larger chat applications, such as a live streaming application, room reactions can enhance user engagement by allowing viewers to react to content in real-time.

Room reactions can be implemented using Ably Chat. The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

Resources

// React brief (Only visible if viewing the React example)

Use the following components to add typing indicators into a chat application:

[ChatClientProvider](https://ably.com/docs/chat/setup#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
[ChatRoomProvider](https://ably.com/docs/chat/rooms#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
[useRoom()](https://ably.com/docs/chat/rooms#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
[useRoomReactions()](https://ably.com/docs/chat/rooms/reactions#subscribe) hook: a hook to manage and track the reactions sent by users within a chat room.

For further information on the room reactions feature please refer to the [room reactions documentation](https://ably.com/docs/chat/rooms/reactions).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add typing indicators into a chat application:

[`rooms.get()`](https://ably.com/docs/chat/rooms#create) - creates a new or retrieves an existing `room`.
[`rooms.typing.subscribe()`](https://ably.com/docs/chat/rooms/reactions#subscribe) - subscribes to room reaction events events by registering a listener. Reaction events are emitted when a user chooses a reaction to send.
[`room.reactions.send`](https://ably.com/docs/chat/rooms/reactions#send) - Emits a reaction event when the user chooses a room reaction.

For further information on the typing indicator feature please refer to the [room reactions documentation](https://ably.com/docs/chat/rooms/reactions).

// End Javascript brief

View on Github
// React
View the full source code and instructions for getting started with it in Github.
// Javascript
View the full source code available in the Ably docs Github repository.

Open in CodeSandbox
// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to have your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to have your Ably API key.

