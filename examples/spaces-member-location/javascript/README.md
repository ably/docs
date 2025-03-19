# Member locations for applications

Track the location of other users within an application.

Track and display the location of users within an application, such as which form field they have selected, the cell they're currently editing in a spreadsheet, or the slide they're viewing on a slide deck.

Member locations are implemented using [Ably Spaces](/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the locations of participants focus in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following components to add member location into an application:

- [`spaces.get()`](/docs/spaces/space#create): creates a new or retrieves an existing `space`.
- [`space.locations.subscribe()`](/docs/spaces/locations#subscribe): subscribes to location on the document by registering a listener.
- [`space.enter()`](/docs/spaces/space#enter): entering a space will register a client as a member and emit an `enter` event to all subscribers.
- [`space.locations.set()`](/docs/spaces/locations#set): a method to emit a location event in realtime that the member has changed their location.
- [`space.locations.getSelf()` and `space.locations.getOthers()`](/docs/spaces/locations#retrieve): a method to retrieve the locations of members currently within the space.

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
yarn run spaces-member-location-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
