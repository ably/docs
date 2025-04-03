# Room reactions for chat applications

Use room reactions to enable users to express their feelings within a chat application.

Room reactions enable you to render when another chat user send a reaction to the room. They are most commonly used to display emojis such as a thumbs up (👍) or a heart (❤️).

Room reactions add value to different applications. They enable users to quickly express their feelings about what is happening on screen. One such example is in a live streaming application where users can use the 👍 emoji if they're enjoying the content, and watch others react in realtime too.

Room reactions are implemented using [Ably Chat](/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following components to add room reactions into a chat application:

- [`ChatClientProvider`](/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable realtime chat functionality across the application.
- [`ChatRoomProvider`](/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and realtime interactions within that room via React context.
- [`useRoom()`](/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
- [`useRoomReactions()`](/docs/chat/rooms/reactions?lang=react#subscribe) hook: a hook to manage the reactions sent by users within a chat room.

Find out more about [room reactions](/docs/chat/rooms/reactions).

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
yarn run chat-room-reactions-react
```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
