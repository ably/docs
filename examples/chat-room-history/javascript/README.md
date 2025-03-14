# Message history for chat applications

Message history enables users to view messages that have been previously sent to the chat room.

Message history enable users to catch up on any conversations they missed. For example, in a live stream, users can read conversations that happened before they joined. In team chats, users can view previous discussions and decisions, for context, before replying.

Message history is available in [Ably Chat](/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to add message history into a chat application:

* [`rooms.get()`](/docs/chat/rooms?lang=javascript#create): creates a new or retrieves an existing `room`.
* [`rooms.messages.subscribe()`](/docs/chat/rooms/history?lang=javascript#subscribe): subscribes to a room, retrieving previously sent messages while listening for future messages.
* [`room.messages.get`](/docs/chat/rooms/history?lang=javascript#get): retrieve messages that have been previously sent to a room.

Find out more about [message history](/docs/chat/rooms/history?lang=javascript).

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

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-room-history-javascript
```

7. Try it out by opening two tabs, one to [http://localhost:5173?loadChat=true](http://localhost:5173?loadChat=true) and one to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
