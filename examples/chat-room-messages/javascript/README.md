# Sending and receiving messages in a chat room

Enable users to have conversations with each other by sending and receiving messages in a chat room.

All applications that implement a chat component need to be able to send messages to enable communication between users. Messages are separated into different topics using rooms.

In customer support platforms, users join dedicated rooms to communicate with agents. In larger applications, such as social networking or team collaboration tools, users join multiple rooms to discuss different topics, fostering engagement and facilitating group discussions.

Messaging is implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following methods to send and receive messages into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.messages.subscribe()`](https://ably.com/docs/chat/rooms/messages?lang=javascript#subscribe) - subscribes to room messages events by registering a listener. Message events are emitted when a user sends a message.
* [`room.messages.send`](https://ably.com/docs/chat/rooms/messages?lang=javascript#send) - Emits a message event when the user sends a message to the room.

Find out more about [rooms](https://ably.com/docs/chat/rooms?lang=javascript) and [messages](https://ably.com/docs/chat/rooms/messages?lang=javascript).

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
yarn run chat-room-messages-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
