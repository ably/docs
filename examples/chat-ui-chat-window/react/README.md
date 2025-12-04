# Ably Chat UI React Kit - ChatWindow Example

This example demonstrates how to use the `ChatWindow` component from the Ably Chat UI React Kit to build a focused chat interface for a single room.

The `ChatWindow` component provides the main chat interface for a room, including message display, input, and custom header/footer content.

## Resources

This example uses the `ChatWindow` component from the Ably Chat UI React Kit, and is wrapped with the necessary providers:

- `ThemeProvider`: Manages light/dark mode theming
- `AvatarProvider`: Handles avatar generation and display
- `ChatSettingsProvider`: Manages chat settings
- `ChatClientProvider`: Provides the Ably Chat client to all components
- `ChatRoomProvider`: Manages the state and functionality of a specific chat room

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
  yarn run chat-ui-chat-window
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
