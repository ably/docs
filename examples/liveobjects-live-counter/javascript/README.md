# Synchronize numeric values with LiveCounter

Enable clients to update and synchronize numeric values in an application in realtime.

[`LiveCounter`](/docs/liveobjects/counter) is a synchronized numeric counter that supports increment and decrement operations. It ensures that all updates are correctly applied and synchronized across users in realtime, preventing inconsistencies when multiple users modify the counter value simultaneously.

`LiveCounter` is useful for tracking values that need to be updated dynamically, such as votes, reaction counts, live leaderboards, game stats, or other numeric data points.

`LiveCounter` is a feature of [LiveObjects](/docs/liveobjects), which provides a serverless, durable, and scalable way to create, update, and subscribe to shared state across large numbers of connected clients at any scale. LiveObjects is built on [channels](/docs/channels) and provides the same [performance guarantees and scaling potential](/docs/platform/architecture).

## Resources

Use the following methods to interact with a `LiveCounter` in your application:

- [`channel.object.get()`](/docs/liveobjects/concepts/path-object): retrieve a [`PathObject`](/docs/liveobjects/concepts/path-object) reference to the [channel object](/docs/liveobjects/concepts/objects#channel-object). Use this `PathObject` to update and subscribe to data via:
  - [`get(key)`](/docs/liveobjects/concepts/path-object#navigate): navigate to child paths within the `PathObject`, such as entries in a [`LiveMap`](/docs/liveobjects/map).
  - [`set(key, value)`](/docs/liveobjects/concepts/path-object#update): assign data, such as a `LiveCounter` instance, to the specified key on a `LiveMap`.
  - [`value()`](/docs/liveobjects/concepts/path-object#read-values): read the current value of the `LiveCounter` instance at the specified path.
  - [`increment()`](/docs/liveobjects/counter#increment): send an [operation](/docs/liveobjects/concepts/operations) to increment the `LiveCounter` at the specified path.
  - [`subscribe()`](/docs/liveobjects/concepts/path-object#subscribe): subscribe to updates at the specified path by registering a listener.
  - [`batch()`](/docs/liveobjects/concepts/path-object#batch-multiple-updates): group multiple operations into a single message for atomic updates.
- [`LiveCounter.create()`](/docs/liveobjects/counter#create): create a new `LiveCounter` instance.

Find out more about [PathObject](/docs/liveobjects/concepts/path-object) and [LiveCounter](/docs/liveobjects/counter).

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
  yarn run liveobjects-live-counter-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
