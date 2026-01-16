# AI Transport message per response streaming

Enable realtime streaming of AI/LLM responses by appending tokens to a single message over Ably.

AI Transport message-per-response streaming allows applications to provide immediate, responsive AI interactions by streaming tokens in realtime. Unlike the message-per-token pattern, all tokens for a response are appended to a single message, which appears as one entry in channel history. This makes it easy to retrieve and display conversation history while still delivering live tokens in realtime.

The streaming approach significantly improves perceived performance and user engagement. Instead of waiting 5-10 seconds for a complete AI response, users see tokens appearing progressively, creating a more natural conversation flow similar to watching someone type in realtime.

Token streaming is implemented using [Ably AI Transport](/docs/ai-transport). AI Transport provides purpose-built APIs for realtime AI applications, offering reliable message delivery, automatic ordering, and seamless reconnection handling to ensure no tokens are lost during network interruptions.

## Resources

Use the following methods to implement AI Transport message-per-response streaming:

- [`client.channels.get()`](/docs/channels#create): creates a new or retrieves an existing channel for AI Transport token streaming.
- [`channel.publish()`](/docs/channels#publish): publishes the initial message and captures the serial for token appending.
- [`channel.appendMessage()`](/docs/messages#append): appends individual tokens to the message as they arrive from the LLM service.
- [`channel.subscribe()`](/docs/channels#subscribe): subscribes to messages, handling `message.create`, `message.append`, and `message.update` actions.
- [`channel.setOptions()`](/docs/channels/options) with [`rewind`](/docs/channels/options/rewind): enables seamless message recovery during reconnections, delivering historical messages as `message.update` events.

Find out more about [AI Transport](/docs/ai-transport) and [message appending](/docs/ai-transport/token-streaming/message-per-response).

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
  yarn run ai-transport-message-per-response-javascript
  ```

7. Try it out by opening [http://localhost:5173/](http://localhost:5173/) with your browser and selecting a prompt to see realtime AI token streaming.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
