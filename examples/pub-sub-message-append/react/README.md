# Pub/Sub message append

Grow a single Ably message by appending deltas to the existing message content.

A publisher creates an initial message, then appends deltas one-by-one. Subscribing clients receive each appended delta in realtime, while a client that joins late uses `rewind` to load the accumulated message rather than replaying every delta.

If you are building AI token streaming, use the [Ably AI Transport SDK](/docs/ai-transport) instead. AI Transport implements this append pattern for you, along with run lifecycle management, error handling, native integrations for model providers and frameworks, and conversation tree management. See the AI Transport [token streaming](/docs/ai-transport/features/token-streaming) example for the recommended approach.

## Resources

Use the following components to implement message appending with the Pub/Sub SDK:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared Ably client instance, passing it down through React context.
- [`ChannelProvider`](/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel via React context.
- [`useChannel()`](/docs/getting-started/react-hooks#useChannel) hook: subscribes to messages with `message.create`, `message.append`, and `message.update` actions.
- [`rewind`](/docs/channels/options/rewind) channel option: recovers history on reconnection, delivering historical messages as `message.update` events.
- [`appendMessage()`](/docs/messages/updates-deletes#append): appends data to an existing message using its serial.

Find out more about [message appending](/docs/messages/updates-deletes#append) and [AI Transport token streaming](/docs/ai-transport/features/token-streaming).

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
    yarn run pub-sub-message-append-react
    ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and starting the stream to see deltas appended to a single message in realtime.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.

## How it works

The message append pattern works by:

1. A publisher creates an initial message on the channel with the `message.create` action.
2. The publisher appends each subsequent delta to that message with the `message.append` action.
3. Clients subscribed to the channel receive each appended delta in realtime and progressively render the growing message.
4. Channel history stores a single compacted message with all appended deltas concatenated together.
