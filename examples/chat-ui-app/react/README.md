# Ably Chat UI React Components Example

This example demonstrates how to use the Ably Chat UI React Components to quickly build a full-featured chat application with minimal code.

It showcases the use of the `App` component, which provides a complete chat interface with room management, message handling, and user interactions.

## Resources

This example uses the `App` component from the Ably Chat UI React Components library, and is wrapped with the necessary providers:

- `ThemeProvider`: Manages light/dark mode theming
- `AvatarProvider`: Handles avatar generation and display
- `ChatSettingsProvider`: Manages chat settings
- `ChatClientProvider`: Provides the Ably Chat client to all components

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
  yarn run chat-ui-app
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
