# Component locking for applications

Enable users to lock components within a form or web application while they're using it.

Component locking with Ably Spaces enables you to manage concurrent access to shared resources within your application. This feature is particularly useful for preventing conflicts in collaborative environments, ensuring that only one user can modify a specific component at a time.

Component locking can enhance various collaborative applications. For example, in document editing tools, it can prevent simultaneous edits to the same section. In project management software, it can ensure that task details are updated by one team member at a time, maintaining data integrity and preventing conflicting changes.

Component locking can be implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting real-time presence features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add component locking into an application:

* [SpacesProvider](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable real-time spaces functionality across the application.
* [SpaceProvider](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to real-time interactions within that space via React context.
* [useSpace()](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [useMembers()](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build component locking. It retrieves members of the space, including members that have left the space, but have not yet been removed.
* [space.locks.acquire()](https://ably.com/docs/spaces/locking#acquire): a method to attempt to acquire a lock with a given unique ID.

Find out more about [component locking](https://ably.com/docs/spaces/locking).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following components to add component locking into an application:

* [`spaces.get()`](https://ably.com/docs/spaces/space#create) - creates a new or retrieves an existing `space`.
* [`space.member.subscribe()`](https://ably.com/docs/spaces/locking#subscribe) - subscribes to members' online status and profile updates by registering a listener.
* [`space.enter()`](https://ably.com/docs/spaces/space#enter) - Entering a space will register a client as a member and emit an `enter` event to all subscribers.
* [space.locks.acquire()](https://ably.com/docs/spaces/locking#acquire): a method to attempt to acquire a lock with a given unique ID.

Find out more about [component locking](https://ably.com/docs/spaces/locking).

// End Javascript brief

## View on Github

// React

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-component-locking/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-component-locking/react` and install dependencies:

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

In the directory `/examples/spaces-component-locking/javascript` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-component-locking/javascript` and install dependencies:

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
