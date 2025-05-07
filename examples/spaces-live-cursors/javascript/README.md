# Tracking users' cursors in an application

Label and track the cursors of users in an application.

Track and display the position of users' cursors within an application to provide visual cues of other users' activities and areas of focus in shared workspaces.

Live cursors are utilized in applications such as online whiteboards to enable users to see where others are pointing or what they are drawing. They are also used in slideshow applications to enable users to see which slide each member is interacting with.

Live cursors are implemented using [Ably Spaces](/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the state of participants in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following components to add live cursors into an application:

- [`spaces.get()`](/docs/spaces/space#create): creates a new or retrieves an existing `space`.
- [`space.cursors.subscribe()`](/docs/spaces/cursors#subscribe): subscribes to members' online status and profile updates by registering a listener.
- [`space.enter()`](/docs/spaces/space#enter): entering a space will register a client as a member and emit an `enter` event to all subscribers.
- [`space.cursors.set()`](/docs/spaces/cursors#set): a method to update this member's cursor location in realtime

Find out more about [live-cursors](/docs/spaces/cursors).

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
  yarn run spaces-live-cursors-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
