# Avatar stack for applications

Display which users are currently online within your application.

Avatar Stack with Ably Spaces enables you to display which users are currently online within your application. This feature is particularly useful for providing a visual representation of active participants in a collaborative environment.

Avatar Stack can add value to many different collaborative applications. One example is in a collaborative document such as a spreadsheet, where agents and clients can see when the other party is online and reading the document.

Avatar Stack can be implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting real-time presence features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add avatar stack into an application:

* [SpacesProvider](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable real-time spaces functionality across the application.
* [SpaceProvider](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to real-time interactions within that space via React context.
* [useSpace()](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [useMembers()](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build avatar stacks. It retrieves members of the space, including members that have left the space, but have not yet been removed.

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

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-avatar-stack/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-avatar-stack/react` and install dependencies:

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

In the directory `/examples/spaces-avatar-stack/javascript` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-avatar-stack/javascript` and install dependencies:

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

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
