# Retrieve message history with Pub/Sub

This folder contains the code for message history (Typescript) - a demo of how you can leverage [Ably Pub/Sub](https://ably.com/docs/products/channels)'s channels to retrieve previously published messages within that channel.

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-history/javascript/
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
