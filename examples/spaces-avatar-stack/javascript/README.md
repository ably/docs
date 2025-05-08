# Display active users avatars in an application

Display the online status of users by displaying an avatar for each of them.

Display the status of users within an application with an avatar stack to provide a visual rendering of which users are in the shared workspace.

Avatar stacks are utilized in applications such as online whiteboards, slide shows, spreadsheets and documents to let others know who is currently active in the application.

Avatar stack are implemented using [Ably Spaces](/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the state of participants in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following methods to add avatar stack into an application:

- [`spaces.get()`](/docs/spaces/space#create): creates a new or retrieves an existing `space`.
- [`space.member.subscribe()`](/docs/spaces/avatar#subscribe): subscribes to members' online status and profile updates by registering a listener.
- [`space.enter()`](/docs/spaces/space#enter): entering a space will register a client as a member and emit an `enter` event to all subscribers.
- [`space.members.getSelf()` and `space.members.getOthers()`](/docs/spaces/avatar#retrieve): retrieves the list of users currently active in the Space or have recently left but not yet been removed.

Find out more about [avatar stack](/docs/spaces/avatar).

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
  yarn run spaces-avatar-stack-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
