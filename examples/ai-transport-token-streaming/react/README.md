# AI Transport token streaming

Stream AI/LLM responses to clients in realtime using the [Ably AI Transport SDK](/docs/ai-transport).

AI Transport streams a response by appending tokens to a single durable message as the model generates them. A subscribing client receives each token as it arrives, and a client that joins late, refreshes, or reconnects sees the accumulated message rather than replaying every token. The SDK handles the channel, encoding, ordering, and recovery, so your application code stays close to the model and the UI.

This example mirrors the [Core SDK getting started guide](/docs/ai-transport/getting-started/core-sdk). The model is mocked so the example runs without an API key, but the AI Transport SDK code is identical to a production integration. In a real app the agent runs on a server and the token stream comes from your model provider (for example `streamText(...).toUIMessageStream()` from the Vercel AI SDK).

## Resources

Use the following AI Transport SDK methods to implement token streaming:

- [`createAgentSession()`](/docs/ai-transport/getting-started/core-sdk): creates the server-side session that publishes the response to the channel.
- [`session.createRun()`](/docs/ai-transport/concepts/runs) and [`run.start()`](/docs/ai-transport/concepts/runs): start a turn and wait for the triggering input event.
- [`run.pipe()`](/docs/ai-transport/features/token-streaming): reads the model's output stream and appends each token to the channel message.
- [`ClientSessionProvider`](/docs/ai-transport/getting-started/core-sdk) and [`useView()`](/docs/ai-transport/getting-started/core-sdk): subscribe to the conversation and re-render as tokens are appended.

Find out more about [AI Transport](/docs/ai-transport) and [token streaming](/docs/ai-transport/features/token-streaming).

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
    yarn run ai-transport-token-streaming-react
    ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and selecting a prompt to see realtime AI token streaming.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
