# Room reactions for chat applications

Use room reactions to enable users to express their feelings within a chat application.

Room reactions enable you to render when another chat user send a reaction to the room. They are most commonly used to display emojis such as a thumbs up (👍) or a heart (❤️).

Room reactions add value to different applications. They enable users to quickly express their feelings about what is happening on screen. One such example is in a live streaming application where users can use the 👍 emoji if they're enjoying the content, and watch others react in realtime too.

Room reactions are implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to add room reactions into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.reactions.subscribe()`](https://ably.com/docs/chat/rooms/reactions?lang=javascript#subscribe) - subscribes to room reaction events events by registering a listener. Reaction events are emitted when a user chooses a reaction to send.
* [`room.reactions.send`](https://ably.com/docs/chat/rooms/reactions?lang=javascript#send) - Emits a reaction event when the user chooses a room reaction.

Find out more about [room reactions](https://ably.com/docs/chat/rooms/reactions?lang=javascript).

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

1. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

2. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-room-reactions-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
