# Typing indicators for chat applications

Use typing indicators to make users aware of who is currently typing a message.

Typing indicators enable you to display a message when other users are in the process of typing a message. They are most commonly used to display a message such as **"John is typing…"**, or if more than a certain number of people are typing, then **"Multiple people are typing…"**.

Typing indicators add value in different applications. They can set a user's expectations of when there will be a new interaction, such as in the case of a 1:1 customer support application. In larger chat applications, such as live streaming, they can help to show engagement by displaying how many users are in the process of typing in realtime.

Typing indicators are implemented using [Ably Chat](/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to add typing indicators into a chat application:

- [`rooms.get()`](/docs/chat/rooms?lang=javascript#create): creates a new or retrieves an existing `room`.
- [`rooms.typing.subscribe()`](/docs/chat/rooms/typing#subscribe): subscribes to typing events by registering a listener. Typing events are emitted when a user starts typing, or when they stop typing.
- [`room.typing.current()`](/docs/chat/rooms/typing?lang=javascript#get): retrieves the list of users currently typing by their clientId.
- [`room.typing.keystroke()`](/docs/chat/rooms/typing?lang=javascript#keystroke): emits a typing event that the user is currently typing, initialising the timeout which will call `room.typing.stop()` if no further events are emitted by the user.

Find out more about [typing indicators](/docs/chat/rooms/typing).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

  ```sh
  git clone git@github.com:ably/docs.git
  ```

2. Change directory:

  ```sh
  cd examples/
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
  yarn run chat-typing-indicator-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
