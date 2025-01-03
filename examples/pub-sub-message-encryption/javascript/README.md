# Sending and receiving messages with encryption

This folder contains the code for encryption of messages (Typescript) - a demo of how you can encrypt and decrypt messages with [Ably](https://ably.com/docs/channels/options/encryption).

## Getting started

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/pub-sub-message-encryption/javascript/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_API_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run dev
```

7. Try it out by opening two tabs to [http://localhost:5173/?encrypted=true](http://localhost:5173/?encrypted=true) and [http://localhost:5173/?encrypted=false](http://localhost:5173/?encrypted=false) with your browser to see the result.
