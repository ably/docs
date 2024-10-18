# Live cursors for applications

Enable members to see other member's cursors live in realtime within your application

Live Cursors with Ably Spaces enables realtime tracking and display of user cursor positions within your application. This feature significantly enhances the collaborative experience by providing visual cues of other users' activities and focus areas in shared workspaces.

Live Cursors can add value to various collaborative applications. In online whiteboarding tools, they allow team members to see where others are pointing or drawing. In collaborative coding environments, live cursors can show which parts of the code different developers are currently working on, facilitating better coordination and reducing conflicts.

Live cursors can be implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting real-time presence features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add live cursors into an application:

* [SpacesProvider](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable real-time spaces functionality across the application.
* [SpaceProvider](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to real-time interactions within that space via React context.
* [useSpace()](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [useMembers()](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build live cursors. It retrieves members of the space, including members that have left the space, but have not yet been removed.
* [useCursors()](https://ably.com/docs/spaces/react#useCursors) hook: a hook to track a member's cursor position and provide a view of all members' cursors within a space.

Find out more about [live cursors](https://ably.com/docs/spaces/cursors).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following components to add live cursors into an application:

* [`spaces.get()`](https://ably.com/docs/spaces/space#create) - creates a new or retrieves an existing `space`.
* [`space.cursors.subscribe()`](https://ably.com/docs/spaces/cursors#subscribe) - subscribes to members' online status and profile updates by registering a listener.
* [`space.enter()`](https://ably.com/docs/spaces/space#enter) - Entering a space will register a client as a member and emit an `enter` event to all subscribers.
* [space.cursors.set()](https://ably.com/docs/spaces/cursors#set): a method to update this member's cursor location in realtime

Find out more about [live-cursors](https://ably.com/docs/spaces/cursors).

// End Javascript brief

## View on Github

// React

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-live-cursors/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-live-cursors/react` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// Javascript

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-live-cursors/javascript` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-live-cursors/javascript` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
