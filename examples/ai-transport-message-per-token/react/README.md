# AI Transport message per token streaming

Enable realtime streaming of AI/LLM responses by publishing tokens as they arrive from Large Language Model services.

AI Transport token streaming allows applications to provide immediate, responsive AI interactions by streaming tokens in realtime rather than waiting for complete responses. This pattern is essential for creating engaging AI-powered experiences where users can see responses being generated as they happen.

The streaming approach significantly improves perceived performance and user engagement. Instead of waiting 5-10 seconds for a complete AI response, users see tokens appearing progressively, creating a more natural conversation flow similar to watching someone type in realtime.

Token streaming is implemented using [Ably AI Transport](/docs/ai-transport). AI Transport provides purpose-built APIs for realtime AI applications, offering reliable message delivery, automatic ordering, and seamless reconnection handling to ensure no tokens are lost during network interruptions.

## Resources

Use the following components to implement AI Transport token streaming:

- [`AblyProvider`](/docs/getting-started/react-hooks#ably-provider): initializes and manages a shared Ably client instance, passing it down through React context to enable realtime AI Transport functionality across the application.
- [`ChannelProvider`](/docs/getting-started/react-hooks#channel-provider): manages the state and functionality of a specific channel, providing access to AI response tokens and streaming state via React context.
- [`useChannel()`](/docs/getting-started/react-hooks#useChannel) hook: a hook to subscribe to token messages from AI services and manage streaming state.
- [`untilAttach`](/docs/channels/options#attach) history option: enables seamless message recovery during reconnections, ensuring no tokens are lost when connectivity is restored.

Find out more about [AI Transport](/docs/ai-transport) and [message history](/docs/channels/history).

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
  yarn run ai-transport-message-per-token-react
  ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and selecting a prompt to see realtime AI token streaming.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.