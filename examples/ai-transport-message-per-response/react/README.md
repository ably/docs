# AI Transport message per response streaming

Enable realtime streaming of AI/LLM responses using the message-per-response pattern, where all tokens are appended to a single Ably message.

AI Transport message-per-response streaming allows applications to provide immediate, responsive AI interactions by streaming tokens in realtime while maintaining a clean message history. Each complete AI response appears as a single message in channel history, making it easy to retrieve and display multi-response conversation history.

The streaming approach significantly improves perceived performance and user engagement. Instead of waiting 5-10 seconds for a complete AI response, users see tokens appearing progressively, creating a more natural conversation flow similar to watching someone type in realtime.

Token streaming is implemented using [Ably AI Transport](/docs/ai-transport). AI Transport provides purpose-built APIs for realtime AI applications, offering reliable message delivery, automatic ordering, and seamless reconnection handling to ensure no tokens are lost during network interruptions.

## Resources

Use the following components to implement AI Transport message-per-response streaming:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared Ably client instance, passing it down through React context to enable realtime AI Transport functionality across the application.
- [`ChannelProvider`](/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel, providing access to AI response tokens and streaming state via React context.
- [`useChannel()`](/docs/getting-started/react-hooks#useChannel) hook: a hook to subscribe to messages with `message.create`, `message.append`, and `message.update` actions.
- [`rewind`](/docs/channels/options/rewind) channel option: enables seamless message recovery during reconnections, delivering historical messages as `message.update` events.
- [`appendMessage()`](/docs/api/realtime-sdk/channels#append-message): appends tokens to an existing message using its serial.

Find out more about [AI Transport](/docs/ai-transport) and [message-per-response](/docs/ai-transport/token-streaming/message-per-response).

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
  yarn run ai-transport-message-per-response-react
  ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and selecting a prompt to see realtime AI token streaming.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.

## How it works

The message-per-response pattern works by:

1. **Initial message**: When an agent response begins, publish an initial message with `message.create` action to the Ably channel with an empty or the first token as content.
2. **Token streaming**: Append subsequent tokens to the original message by publishing those tokens with the `message.append` action.
3. **Live delivery**: Clients subscribed to the channel receive each appended token in realtime, allowing them to progressively render the response.
4. **Compacted history**: The channel history contains only one message per agent response, which includes all tokens appended to it concatenated together.
