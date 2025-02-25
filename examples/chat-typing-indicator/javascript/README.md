# Typing indicator example with Ably Chat in React

This folder contains the code for the Chat typing indicator (Typescript) - a demo of how you can leverage [Ably Chat](https://ably.com/docs/products/chat) to track people typing in an input.

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

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-typing-indicator-javascript
```

1. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.
