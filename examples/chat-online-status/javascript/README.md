# Online status for chat applications

Online statuses enable users to view who else is online and ready to chat.

Use online status to display which users are currently online in a chat room. Users can also manually update their status, such as to set themselves as 'Away'.

Online statuses enable users to quickly understand the availability of others to communicate more effectively. For example, in a team chat room, users can quickly see who is available to collaborate with, and who is currently busy, in a meeting, or away from their desks.

Online statuses are implemented using [Ably Chat](/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to add an online status implementation into a chat application:

- [`rooms.get()`](/docs/chat/rooms?lang=javascript#create): creates a new or retrieves an existing `room`.
- [`rooms.presence.subscribe()`](/docs/chat/rooms/presence?lang=javascript#subscribe): subscribes to users' presence status events by registering a listener. Presence events are emitted when a user chooses a enter or leave the presence set or update their user data.
- [`room.presence.enter`, `room.presence.update`, `room.presence.leave`](/docs/chat/rooms/presence?lang=javascript#set): Emits a presence event when the user enters or leaves a presence set, or updates their user data.

Find out more about [online status](/docs/chat/rooms/presence?lang=javascript).

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
yarn run chat-online-status-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
