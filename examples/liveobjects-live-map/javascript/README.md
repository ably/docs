# Synchronize key/value map data structures with LiveMap

Enable clients to update and synchronize key/value data in an application in realtime.

[`LiveMap`](/docs/liveobjects/map) is a key/value data structure that synchronizes its state across users in realtime. It enables you to store primitive values, such as numbers, strings, booleans, binary data, JSON-serializable objects or arrays and other live [object types](/docs/liveobjects/concepts/objects#object-types), enabling you to build complex, hierarchical channel objects.

`LiveMap` can be used to store both predefined and dynamic datasets that need to be updated in realtime. It is ideal for scenarios such as collaborative task management, live leaderboards, multiplayer game state, shared settings, or live dashboards.

`LiveMap` is a feature of [LiveObjects](/docs/liveobjects), which provides a serverless, durable, and scalable way to create, update, and subscribe to shared state across large numbers of connected clients at any scale. LiveObjects is built on [channels](/docs/channels) and provides the same [performance guarantees and scaling potential](/docs/platform/architecture).

## Resources

Use the following methods to interact with a `LiveMap` in your application:

- [`channel.object.get()`](/docs/liveobjects/concepts/path-object): retrieve a [`PathObject`](/docs/liveobjects/concepts/path-object) reference to the [channel object](/docs/liveobjects/concepts/objects#channel-object). Use this `PathObject` to update and subscribe to data via:
  - [`get(key)`](/docs/liveobjects/concepts/path-object#navigate): navigate to child paths within the `PathObject`, such as entries in a `LiveMap`.
  - [`set(key, value)`](/docs/liveobjects/concepts/path-object#update): assign a value to a key in the `LiveMap`.
  - [`remove(key)`](/docs/liveobjects/concepts/path-object#delete): send an [operation](/docs/liveobjects/concepts/operations) to remove a key from the `LiveMap`.
  - [`value()`](/docs/liveobjects/concepts/path-object#read-values): read the current value at the specified path.
  - [`entries()`](/docs/liveobjects/concepts/path-object#iterate): iterate over key-value pairs in the `LiveMap`.
  - [`subscribe()`](/docs/liveobjects/concepts/path-object#subscribe): subscribe to updates at the specified path by registering a listener.
  - [`batch()`](/docs/liveobjects/concepts/path-object#batch-multiple-updates): group multiple operations into a single message for atomic updates.
- [`LiveMap.create()`](/docs/liveobjects/map#create): create a new `LiveMap` instance.

Find out more about [PathObject](/docs/liveobjects/concepts/path-object) and [LiveMap](/docs/liveobjects/map).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

  ```sh
  git clone git@github.com:ably/docs.git
  ```

2. Change directory:

  ```sh
  cd examples/
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
