# Member location for applications

Enable users to track the locations of other users in realtime within the web application.

Member location with Ably Spaces allows you to track and display the realtime positions of users within your application. This feature is particularly valuable for creating interactive, collaborative environments where users can see each other's current focus or area of activity.

Member location can greatly enhance various types of applications. In collaborative design tools, it can show which part of the canvas each team member is working on. In educational platforms, it can indicate which section of a document or problem set a student is currently viewing, enabling more effective remote tutoring or group study sessions.

Member location can be implemented using [Ably Spaces](https://ably.com/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting real-time presence features. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add member location into an application:

* [SpacesProvider](https://ably.com/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable real-time spaces functionality across the application.
* [SpaceProvider](https://ably.com/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to real-time interactions within that space via React context.
* [useSpace()](https://ably.com/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
* [useMembers()](https://ably.com/docs/spaces/react#useMembers) hook: a hook to build member location. It retrieves members of the space, including members that have left the space, but have not yet been removed.
* [useLocations()](https://ably.com/docs/spaces/react#useLocations) hook: a hook to subscribe to location events. Location events are emitted whenever a member changes location. Also used to publish the `update` of the location of the member.

Find out more about [member location](https://ably.com/docs/spaces/locations).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following components to add member location into an application:

* [`spaces.get()`](https://ably.com/docs/spaces/space#create) - creates a new or retrieves an existing `space`.
* [`space.locations.subscribe()`](https://ably.com/docs/spaces/locations#subscribe) - subscribes to location on the document by registering a listener.
* [`space.enter()`](https://ably.com/docs/spaces/space#enter) - Entering a space will register a client as a member and emit an `enter` event to all subscribers.
* [`space.locations.set()`](https://ably.com/docs/spaces/locations#set): a method to emit a location event in realtime that the member has changed their location.
* [`space.locations.getSelf()` and `space.locations.getOthers()`](https://ably.com/docs/spaces/locations#retrieve): a method to retrieve the locations of members currently within the space.

Find out more about [member location](https://ably.com/docs/spaces/locations).

// End Javascript brief

## View on Github

// React

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-member-location/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-member-location/react` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// Javascript

The source code for this example can be found in [GitHub](https://github.com/ably/docs).

Once you have cloned the repository:

In the directory `/examples/spaces-member-location/javascript` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-member-location/javascript` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
