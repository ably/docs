# Manage connection states with Pub/Sub

Use connection states to monitor the lifecycle and status of client connections.

Manage connection state to monitor and ensure reliable and consistent communication in realtime applications. By monitoring and handling connection states, clients can gracefully manage disconnections, reconnections, and other network-related events. Connection state is also preserved by Ably during periods of brief disconnection to provide message continuity to clients.

Connection states is implemented using [Ably Pub/Sub](/docs/auth). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to manage the connection state in a pub/sub application:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.

Find out more about [connection states](/docs/connect/states).

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
  yarn run pub-sub-connection-state-react
  ```

7. opening one tab to [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
