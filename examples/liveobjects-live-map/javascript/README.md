# Synchronizing key/value map data structures with LiveMap

Enable clients to update and synchronize key/value data in an application in realtime.

LiveMap is a key/value data structure that synchronizes its state across users in realtime. It enables you to store primitive values, such as numbers, strings, booleans and buffers, as well as other objects, enabling you to build complex, hierarchical object structure.

LiveMap can be used to store both predefined and dynamic datasets that need to be updated in realtime. They are ideal for scenarios such as collaborative task management, live leaderboards, multiplayer game state, shared settings, or live dashboards.

LiveMap is implemented using [Ably LiveObjects](/docs/liveobjects). LiveObjects, as a feature of [Ably Pub/Sub](/docs/channels), contains a set of purpose-built APIs that abstract away the complexities of managing shared state between clients in an application. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to interact with a LiveMap in your application:

- [`objects.getRoot()`](/docs/liveobjects/concepts/objects#root-object): retrieves the root object that serves as the starting point for storing and organizing objects on a channel.
- [`objects.createMap()`](/docs/liveobjects/map#create): creates a new LiveMap instance.
- [`liveMap.get(key)`](/docs/liveobjects/map#get): returns the current value associated with a given key in the map.
- [`liveMap.set(key, value)`](/docs/liveobjects/map#set): sends the operation message to the Ably system to assign a value to a key in the map.
- [`liveMap.remove(key)`](/docs/liveobjects/map#remove): sends the operation message to the Ably system to remove a key from the map.
- [`liveMap.subscribe()`](/docs/liveobjects/map#subscribe-data): subscribes to LiveMap updates by registering a listener.

Find out more about [LiveMap](/docs/liveobjects/map).

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
  yarn run liveobjects-live-map-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
