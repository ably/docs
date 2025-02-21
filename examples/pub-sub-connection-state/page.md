# Manage connection states with Pub/Sub

Use connection states to monitor the lifecycle and status of client connections.

Manage connection state to monitor and ensure reliable and consistent communication in realtime applications. By monitoring and handling connection states, clients can gracefully manage disconnections, reconnections, and other network-related events. Connection state is also preserved by Ably during periods of brief disconnection to provide message continuity to clients.

Connection states is implemented using [Ably Pub/Sub](https://ably.com/docs/auth). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to manage the connection state in a pub/sub application:

* [`AblyProvider`](https://ably.com/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.

Find out more about [connection states](https://ably.com/docs/connect/states).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following components to manage the connection state in a pub/sub application:

* [`client.connection.on()`](https://ably.com/docs/connect/states#listen) - subscribes to the connection state events of your client by registering a listener.

Find out more about [connection states](https://ably.com/docs/connect/states).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-connection-state/react/
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

1. Try it out by opening a tab to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-connection-state/javascript/
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
yarn run dev
```

1. Try it out by opening a tab to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
