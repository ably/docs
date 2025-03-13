# Manage channel states with Pub/Sub

Use channel states to monitor the lifecycle and status of channels.

Manage channel states to monitor and ensure reliable and consistent communication in realtime applications. By monitoring and handling channel states, you can ensure the application behaves as expected for the clients.

Channel states is implemented using [Ably Pub/Sub](/docs/). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to manage the channel state in a pub/sub application:

* [`channel.get()`](/docs/channels#create): creates a new or retrieves an existing `channel`.
* [`channel.on()`](/docs/channels/states?lang=javascript): subscribes to the channel state events of your client by registering a listener.

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

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run pub-sub-channel-state-javascript
```

7. Try it out by opening a tab to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
