# Occupancy with Pub/Sub

This folder contains the code for occupancy (Typescript) - a demo of how you can leverage [Ably Pub/Sub](https://ably.com/docs/presence-occupancy/occupancy)'s occupancy to retrieve high level metrics about the clients attached to a channel.

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-occupancy/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening a tab to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.
