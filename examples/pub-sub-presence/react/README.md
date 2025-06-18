# Presence updates with Pub/Sub

Presence enables users to see who else is online within an application.

Use presence to display which users are currently 'present' on a channel. Users can also manually update their status, such as to set themselves as 'Away', or write a custom message.

Presence enables users to quickly understand the availability of others to communicate more effectively. For example, on a live video stream users can see who else is currently viewing.

Presence is implemented using [Ably Pub/Sub](/docs/products/channels). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to send and receive messages in a pub/sub application:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
- [`ChannelProvider`](/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel, providing access to messages, presence, and realtime interactions within that channel via React context.
- [`usePresenceListener()`](/docs/getting-started/react-hooks#useChannel) hook: a hook to subscribe to presence events on a channel, notifying users when other users enter or leave a presence set, or updates their member data.
- [`usePresence()`](/docs/getting-started/react-hooks#usePresenceListener) hook: a hook enabling users to enter the presence set.

Find out more about [presence](/docs/presence-occupancy/presence).

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
  yarn run pub-sub-presence-react
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
