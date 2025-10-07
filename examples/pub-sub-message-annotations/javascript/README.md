# Adding annotations to messages with Pub/Sub

Enable users to annotate messages with additional data, such as reactions, flags, or other contextual information without modifying the original message content.

Message annotations provide a powerful way to extend messages with additional information. Unlike editing a message, annotations allow multiple clients to add their own metadata while preserving the original message. This is ideal for implementing features like reactions, content categorization, moderation flags, or any other metadata that enhances message context.

Message annotations are implemented using [Ably Pub/Sub](/docs/channels). The Pub/Sub SDK with annotations provides a way to add structured metadata to messages, with support for different annotation types and automatic summarization.

## Resources

Use the following methods to work with message annotations in a pub/sub application:

- [`channels.get()`](/docs/channels#create) - creates a new or retrieves an existing `channel`. Specify the `ANNOTATION_PUBLISH` and `ANNOTATION_SUBSCRIBE` modes to publish and subscribe to message annotations.
- [`channel.subscribe()`](/docs/pub-sub#subscribe) - subscribes to message events within a specific channel by registering a listener. Message events with a `message.create` action are received when a user publishes a message. Message events with a `message.summary` action are received when a user publishes or deletes an annotation.
<!-- TODO links -->
- `channel.annotations.publish()` - publishes an annotation for a specific message
- `channel.annotations.subscribe()` - subscribes to receive individual annotation events
- `channel.annotations.delete()` - deletes a previously published annotation

<!-- TODO link -->
Find out more about annotations.

## Annotation Types

This example demonstrates five common annotation types, each suited to different use cases:

<!-- TODO -->

## Features

This example demonstrates:

1. Publishing regular messages to a channel
2. Adding different types of annotations to messages
3. Viewing both summarized and raw annotation data
4. Deleting annotations

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

6. Enable the "Annotations, updates and deletes" channel rule that matches the channel name you'll be using (by default we use a channel name of `annotation:pub-sub-message-annotations`, so if using this, create this rule for the "annotation" channel namespace).

7. Run the server:

  ```sh
  yarn run pub-sub-message-annotations-javascript
  ```

8. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## How to use this example

1. Enter a message in the input field and click "Publish" to send it to the channel
2. Click on a message to expand it and reveal the annotation interface
3. Select an annotation type, enter a value, and click "Publish" to add an annotation
4. Switch between the "Summary" and "Raw Annotations" tabs to see different views
5. Open the example in multiple browser tabs with different client IDs (e.g., `?clientId=user1` and `?clientId=user2`) to see how annotations from different clients are handled and summarized
6. Delete annotations by clicking the trash icon in the raw annotations view and see how the summary is updated

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
