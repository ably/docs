# Presence updates with Pub/Sub

Presence enable users to view who else is online within the application.

Use presence to display which users are currently online in a channel. Users can also manually update their status, such as to set themselves as 'Away'.

Presence enables users to quickly understand the availability of others to communicate more effectively. For example, in a team chat room, users can quickly see who is available to collaborate with, and who is currently busy, on a video stream, users can see who else is currently viewing the stream.

Presence is implemented using [Ably Pub/Sub](https://ably.com/docs/products/channels). The Ably SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting Pub/Sub features. It is built as Ably's core platform, and so it provides high performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to send and receive messages in a pub/sub application:

* [`AblyProvider`](https://ably.com/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
* [`ChannelProvider`](https://ably.com/docs/getting-started/react#channel-provider): manages the state and functionality of a specific channel, providing access to messages, presence, and realtime interactions within that channel via React context.
* [`usePresenceListener()`](https://ably.com/docs/getting-started/react#useChannel) hook: a hook to subscribe to presence events on a channel, notifying users when other users enter or leave a presence set, or updates their member data.
* [`usePresence()`](https://ably.com/docs/getting-started/react#usePresenceListener) hook: a hook enabling users to enter the presence set.

Find out more about [presence](https://ably.com/docs/presence-occupancy/presence).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to send and receive messages in a pub/sub application:

* [`channel.get()`](https://ably.com/docs/channels#create) - creates a new or retrieves an existing `channel`.
* [`channel.presence.subscribe()`](https://ably.com/docs/channels#subscribe) - subscribes to presence events within a specific channel by registering a listener. Presence events are emitted when a user enters or leaves a presence set, or updates their status within the presence set.
* [`channel.presence.get()`](https://ably.com/docs/presence-occupancy/presence#retrieve-members) - Retrieves a list of the users currently within that presence set.
* [`channel.presence.enter()`, `channel.presence.leave()`, `channel.presence.update()`](https://ably.com/docs/presence-occupancy/presence#trigger-events) - Emits a presence event when a user enters or leaves a presence set, or updates their status within the the presence set.

Find out more about [presence](https://ably.com/docs/presence-occupancy/presence).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-presence/react/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key.

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
cd /examples/pub-sub-presence/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key.

5. Install dependencies:

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

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
