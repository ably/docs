# Presence updates with Pub/Sub

Presence enables users to see who else is online within an application.

Use presence to display which users are currently 'present' on a channel. Users can also manually update their status, such as to set themselves as 'Away', or write a custom message.

Presence enables users to quickly understand the availability of others to communicate more effectively. For example, on a live video stream users can see who else is currently viewing.

Presence is implemented using [Ably Pub/Sub](/docs/products/channels). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following methods to send and receive messages in a pub/sub application:

- [`channel.get()`](/docs/channels#create): creates a new or retrieves an existing `channel`.
- [`channel.presence.subscribe()`](/docs/channels#subscribe): subscribes to presence events within a specific channel by registering a listener. Presence events are emitted when a user enters or leaves a presence set, or updates their status within the presence set.
- [`channel.presence.get()`](/docs/presence-occupancy/presence#retrieve-members): retrieves a list of the users currently within that presence set.
- [`channel.presence.enter()`, `channel.presence.leave()`, `channel.presence.update()`](/docs/presence-occupancy/presence#trigger-events): emits a presence event when a user enters or leaves a presence set, or updates their status within the the presence set.

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
yarn run pub-sub-presence-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
