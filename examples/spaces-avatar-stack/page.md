# Display active users avatars in an application.

Display the online status of users by displaying an avatar for each of them.

Display the status of users within an application with an avatar stack to provide a visual rendering of which users are in the shared workspace.

Avatar stacks are utilized in applications such as online whiteboards, slide shows, spreadsheets and documents to let others know who is currently active in the application.

Avatar stack are implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the state of participants in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add avatar stack into an application:

* [`SpacesProvider`](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable realtime spaces functionality across the application.
* [`SpaceProvider`](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to realtime interactions within that space via React context.
* [`useSpace()`](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [`useMembers()`](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build avatar stacks. It retrieves members of the space, including members that have left the space, but have not yet been removed.

Find out more about [avatar stack](https://ably.com/docs/spaces/avatar).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add avatar stack into an application:

* [`spaces.get()`](https://ably.com/docs/spaces/space#create) - creates a new or retrieves an existing `space`.
* [`space.member.subscribe()`](https://ably.com/docs/spaces/avatar#subscribe) - subscribes to members' online status and profile updates by registering a listener.
* [`space.enter()`](https://ably.com/docs/spaces/space#enter) - Entering a space will register a client as a member and emit an `enter` event to all subscribers.
* [`space.members.getSelf()` and `space.members.getOthers()`](https://ably.com/docs/spaces/avatar#retrieve) - Retrieve list of users currently active in the Space or have recently left but not yet been removed.

Find out more about [avatar stack](https://ably.com/docs/spaces/avatar).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/spaces-avatar-stack/react/
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
cd /examples/spaces-avatar-stack/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install depdencies:

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
