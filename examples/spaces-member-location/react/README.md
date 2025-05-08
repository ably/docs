# Member locations for applications

Track the location of other users within an application.

Track and display the location of users within an application, such as which form field they have selected, the cell they're currently editing in a spreadsheet, or the slide they're viewing on a slide deck.

Member locations are implemented using [Ably Spaces](/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the locations of participants focus in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following components to add member location into an application:

- [`SpacesProvider`](/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable realtime spaces functionality across the application.
- [`SpaceProvider`](/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to realtime interactions within that space via React context.
- [`useSpace()`](/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
- [`useMembers()`](/docs/spaces/react#useMembers) hook: a hook to build member location. It retrieves members of the space, including members that have left the space, but have not yet been removed.
- [`useLocations()`](/docs/spaces/react#useLocations) hook: a hook to subscribe to location events. Location events are emitted whenever a member changes location. Also used to publish the `update` of the location of the member.

Find out more about [member location](/docs/spaces/locations).

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
  yarn run spaces-member-location-react
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
