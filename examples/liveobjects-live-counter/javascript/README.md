# Synchronizing numeric values with LiveCounter

Enable clients to update and synchronize numerical values in an application in realtime.

LiveCounter provides a simple way to manage shared numerical state in realtime applications. Each counter represents a numerical value that clients can increment or decrement.

LiveCounters are useful for tracking values that need to be updated dynamically, such as votes, reaction counts, live leaderboards, game stats, or other numeric data points.

LiveCounters are implemented using [Ably LiveObjects](https://ably.com/docs/liveobjects). LiveObjects, as a feature of [Ably Pub/Sub](https://ably.com/docs/products/channels), contains a set of purpose-built APIs that abstract away the complexities of managing shared state between clients in an application. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

Use the following methods to interact with a LiveCounter in your application:

- [`objects.getRoot()`](https://ably.com/docs/liveobjects) - retrieves the root object that serves as the starting point for storing and organizing objects on a channel.
- [`objects.createCounter()`](https://ably.com/docs/liveobjects) - creates a new LiveCounter instance.
- [`liveCounter.value()`](https://ably.com/docs/liveobjects/livecounter) - returns the current value of a counter.
- [`liveCounter.increment()`](https://ably.com/docs/liveobjects/livecounter) - sends the operation message to the Ably system to increase the counter value.
- [`liveCounter.decrement()`](https://ably.com/docs/liveobjects/livecounter) - sends the operation message to the Ably system to decrease the counter value.
- [`liveCounter.subscribe()`](https://ably.com/docs/liveobjects/livecounter) - subscribes to LiveCounter updates by registering a listener.

Find out more about [LiveCounter](https://ably.com/docs/liveobjects/livecounter).

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
yarn run liveobjects-live-counter-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
