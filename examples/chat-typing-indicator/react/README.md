# Typing indicator example with Ably Chat in React

This folder contains the code for the Chat typing indicator (React) - a demo of how you can leverage [Ably Chat](https://ably.com/docs/chat) to track people typing in an input.

## Getting started

1. Clone the repository

Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

1. Change directory

```sh
cd /examples/chat-typing-indicator/react/
```

3. Rename the environment file

```sh
mv .env.example .env.local
```

4. Update your API key

In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key

5. Install dependencies

```sh
yarn install
```

6. Run the server

```sh
yarn run dev
```

7. Try it out!

Open two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.
