# Avatar stack for applications
Display which users are currently online within your application.

Avatar Stack with Ably Spaces enables you to display which users are currently online within your application. This feature is particularly useful for providing a visual representation of active participants in a collaborative environment.

Avatar Stack can add value to many different collaborative applications. One example is in a collaborative document such as a spreadsheet, where agents and clients can see when the other party is online and reading the document.

Avatar Stack can be implemented using Ably Spaces. The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting real-time presence features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add typing indicators into a chat application:

[SpacesProvider](https://ably.com/docs/chat/setup#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable real-time chat functionality across the application.
[SpaceProvider](https://ably.com/docs/chat/rooms#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and real-time interactions within that room via React context.
[useSpace()](https://ably.com/docs/chat/rooms#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
[useMembers()](https://ably.com/docs/chat/rooms/typing#subscribe) hook: a hook to manage and track the typing status of users within a chat room.

For further information on the typing indicator feature please refer to the [typing indicator documentation](https://ably.com/docs/chat/rooms/typing).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add typing indicators into a chat application:

[`rooms.get()`](https://ably.com/docs/chat/rooms#create) - creates a new or retrieves an existing `room`.
[`rooms.typing.subscribe()`](https://ably.com/docs/chat/rooms/typing) - subscribes to typing events by registering a listener. Typing events are emitted when a user starts typing, or when they stop typing.
[`room.typing.get()`](https://ably.com/docs/chat/rooms/typing#retrieve) - Retrieve list of users currently typing by their clientId.
[`room.typing.start()`](https://ably.com/docs/chat/rooms/typing#set) - Emit a typing event that the user is currently typing, initialising the timeout which will call `room.typing.stop()` if no further events are emitted by the user.

For further information on the typing indicator feature please refer to the [typing indicator documentation](https://ably.com/docs/chat/rooms/typing).

// End Javascript brief

## View on Github

// React

The full source code and instructions for getting started with can be found in Github.

Once the repository has been cloned, follow the instructions below to run the application.

Rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// Javascript

The full source code and instructions for getting started with can be found in Github.

Once the repository has been cloned, follow the instructions below to run the application.

Rename `.env.example` to `.env.local` and fill in your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to have your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to have your Ably API key.
