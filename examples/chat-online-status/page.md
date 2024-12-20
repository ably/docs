# Online status for chat applications

Online statuses enable users to view who else is online and ready to chat.

Use online status to display which users are currently online in a chat room. Users can also manually update their status, such as to set themselves as 'Away'.

Online statuses enable users to quickly understand the availability of others to communicate more effectively. For example, in a team chat room, users can quickly see who is available to collaborate with, and who is currently busy, in a meeting, or away from their desks.

Online statuses are implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add an online status implementation into a chat application:

* [`ChatClientProvider`](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
* [`ChatRoomProvider`](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
* [`useRoom()`](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [`usePresence()`](https://ably.com/docs/chat/rooms/presence?lang=react#set) hook: a hook to manage the status updates made by users within a chat room.
* [`usePresenceListener()`](https://ably.com/docs/chat/rooms/presence?lang=react#subscribe) hook: a hook to manage the status updates made by users within a chat room.

Find out more about [online status](https://ably.com/docs/chat/rooms/presence?lang=react).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add an online status implementation into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.presence.subscribe()`](https://ably.com/docs/chat/rooms/presence?lang=javascript#subscribe) - subscribes to users' presence status events by registering a listener. Presence events are emitted when a user chooses a enter or leave the presence set or update their user data.
* [`room.presence.enter`, `room.presence.update`, `room.presence.leave`](https://ably.com/docs/chat/rooms/presence?lang=javascript#set) - Emits a presence event when the user enters or leaves a presence set, or updates their user data.

Find out more about [online status](https://ably.com/docs/chat/rooms/presence?lang=javascript).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/chat-online-status/react/
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

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/chat-online-status/javascript/
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

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
