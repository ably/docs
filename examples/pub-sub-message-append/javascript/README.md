# Pub/Sub message append

Grow a single Ably message by appending deltas to the existing message content.

A publisher creates an initial message, then appends deltas one-by-one. Subscribing clients receive each appended delta in realtime, while a client that joins late uses `rewind` to load the accumulated message rather than replaying every delta.

If you are building AI token streaming, use the [Ably AI Transport SDK](/docs/ai-transport) instead. AI Transport implements this append pattern for you, along with run lifecycle management, error handling, native integrations for model providers and frameworks, and conversation tree management. See the AI Transport [token streaming](/docs/ai-transport/features/token-streaming) example for the recommended approach.

## Resources

Use the following methods to implement message appending with the Pub/Sub SDK:

- [`client.channels.get()`](/docs/channels#use): creates a new or retrieves an existing channel.
- [`channel.publish()`](/docs/channels#pub-sub): publishes the initial message and captures the serial for appending.
- [`channel.appendMessage()`](/docs/messages/updates-deletes#append): appends each delta to the message as it arrives.
- [`channel.subscribe()`](/docs/channels#pub-sub): subscribes to messages, handling `message.create`, `message.append`, and `message.update` actions.
- [`channel.setOptions()`](/docs/channels/options) with [`rewind`](/docs/channels/options/rewind): recovers history on reconnection, delivering historical messages as `message.update` events.

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
    yarn run pub-sub-message-append-javascript
    ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and starting the stream to see deltas appended to a single message in realtime.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
