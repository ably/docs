# Using message annotations with Pub/Sub

This example demonstrates how to use Ably's message annotations feature to add additional metadata to messages in a pub/sub system. Message annotations allow clients to add reactions, flags, or other metadata to messages without modifying the original message content.

## Resources

- [Ably Documentation](https://ably.com/docs)
- [Message Annotations Documentation](https://ably.com/docs/messages/annotations)

The channel name must be in a mutable message namespace, which is why we're using `mutable:pub-sub-message-annotations` in this example.

## Features

In this example, you can:

1. Publish messages to a channel
2. Add annotations to messages using different annotation types:
   - **distinct.v1**: Track different values with client IDs that created them
   - **unique.v1**: Similar to distinct, but only the first client ID is recorded
   - **multiple.v1**: Track counts of values by different clients
   - **flag.v1**: Simple flags with client IDs
   - **total.v1**: Count the total annotations

3. View annotation summaries showing:
   - How many of each annotation type exist
   - Which clients contributed annotations
   - The values of annotations
   - Expandable/collapsible sections for detailed information

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
  yarn run pub-sub-message-annotations-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## How to use this example

1. Enter a message in the input field and click "Publish" to send it to the channel.
2. After publishing a message, you'll see it appear in the message list with an expandable annotation interface.
3. To add an annotation, select an annotation type from the dropdown menu, enter a value, and click "Publish".
4. Open the example in multiple browser tabs with different URL parameters (e.g., `?clientId=user1` and `?clientId=user2`) to see how annotations from different clients are handled.
5. Experiment with different annotation types:
   - For reactions, try using the "multiple.v1" type with values like "👍" or "❤️"
   - For flagging content, use the "flag.v1" type
   - For tracking unique entries, use "distinct.v1" or "unique.v1"

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
