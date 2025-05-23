# Presence for chat applications

Presence powers features including online statuses, which enable users to view who else is online and ready to chat.

Use presence to display which users are currently online in a chat room. Users can also manually update their status, such as to set themselves as 'Away'.

Online statuses enable users to quickly understand the availability of others to communicate more effectively. For example, in a team chat room, users can quickly see who is available to collaborate with, and who is currently busy, in a meeting, or away from their desks.

Online statuses are implemented using [Ably Chat](/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following components to add an online status implementation into a chat application:

- [`ChatClientProvider`](/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable realtime chat functionality across the application.
- [`ChatRoomProvider`](/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and realtime interactions within that room via React context.
- [`useRoom()`](/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
- [`usePresence()`](/docs/chat/rooms/presence?lang=react#set) hook: a hook to manage the status updates made by users within a chat room.
- [`usePresenceListener()`](/docs/chat/rooms/presence?lang=react#subscribe) hook: a hook to manage the status updates made by users within a chat room.

Find out more about [presence](/docs/chat/rooms/presence?lang=react).

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
  yarn run chat-presence-react
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
