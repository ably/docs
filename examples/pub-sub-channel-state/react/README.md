# Manage channel states with Pub/Sub

Use channel states to monitor the lifecycle and status of channels.

Manage channel states to monitor and ensure reliable and consistent communication in realtime applications. By monitoring and handling channel states, you can ensure the application behaves as expected for the clients.

Channel states is implemented using [Ably Pub/Sub](/docs/). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to manage the channel state in a pub/sub application:

* [`AblyProvider`](/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
* [`ChannelProvider`](/docs/getting-started/react#channel-provider): initializes and manages a shared channel instance, passing it down through React context to enable realtime pub/sub functionality across the application.
* [`useChannelStateListener`](/docs/getting-started/react#useChannelStateListener): creates a subscriber to be notified of channel state changes.

Find out more about [channel states](/docs/channels/states).

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

4. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run pub-sub-channel-state-react
```

1. Try it out by opening a tab to [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.
