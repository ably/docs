# Occupancy with Pub/Sub

Occupancy enables you to retrieve high level metrics about the clients attached to a channel.

Use occupancy to retrieve high level metrics about the clients attached to a channel, such as the number of connections currently attached, or the number of connections attached that are permitted to publish and subscribe to the channel.

Occupancy is implemented using [Ably Pub/Sub](/docs/products/channels). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to access occupancy in a pub/sub application:

- [`channel.get()`](/docs/channels#create): creates a new or retrieves an existing `channel`. By using channel options to enable occupancy, the channel will automatically update occupancy information.
- [`channel.subscribe()`](/docs/channels#subscribe): subscribes to message events within a specific channel by registering a listener. Message events are emitted when a user publishes a message. Whenever the occupancy is updated, the `useChannel()` hook will update the occupancy information.

Find out more about [occupancy](/docs/presence-occupancy/occupancy).

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
  yarn run pub-sub-occupancy-javascript
  ```

7. Try it out by opening a tab to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
