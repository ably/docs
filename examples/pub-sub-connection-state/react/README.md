# Managing connection states

This folder contains the code for managing connection states (React) - a demo of how you can manage your connection states with [Ably](https://ably.com/docs/connect).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-connection-state/react/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

1. Try it out by opening one tab to [http://localhost:3000](http://localhost:3000/) with your browser to see the result.
