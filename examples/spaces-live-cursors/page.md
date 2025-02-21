# Tracking users' cursors in an application

Label and track the cursors of users in an application.

Track and display the position of users' cursors within an application to provide visual cues of other users' activities and areas of focus in shared workspaces.

Live cursors are utilized in applications such as online whiteboards to enable users to see where others are pointing or what they are drawing. They are also used in slideshow applications to enable users to see which slide each member is interacting with.

Live cursors are implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the state of participants in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add live cursors into an application:

* [`SpacesProvider`](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable realtime spaces functionality across the application.
* [`SpaceProvider`](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to realtime interactions within that space via React context.
* [`useSpace()`](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [`useMembers()`](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build live cursors. It retrieves members of the space, including members that have left the space, but have not yet been removed.
* [`useCursors()`](https://ably.com/docs/spaces/react#useCursors) hook: a hook to track a member's cursor position and provide a view of all members' cursors within a space.

Find out more about [live cursors](https://ably.com/docs/spaces/cursors).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following components to add live cursors into an application:

* [`spaces.get()`](https://ably.com/docs/spaces/space#create) - creates a new or retrieves an existing `space`.
* [`space.cursors.subscribe()`](https://ably.com/docs/spaces/cursors#subscribe) - subscribes to members' online status and profile updates by registering a listener.
* [`space.enter()`](https://ably.com/docs/spaces/space#enter) - Entering a space will register a client as a member and emit an `enter` event to all subscribers.
* [`space.cursors.set()`](https://ably.com/docs/spaces/cursors#set): a method to update this member's cursor location in realtime

Find out more about [live-cursors](https://ably.com/docs/spaces/cursors).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/spaces-live-cursors/react/
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
cd /examples/spaces-live-cursors/javascript/
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

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
