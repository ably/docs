# Generate a Ably Token to authenticate clients

This folder contains the code for the authentication (React) - a demo of how you can authenticate with [Ably](https://ably.com/docs/auth) to use any of the products.

## Getting started

. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/
```

3. Install dependencies:

```sh
yarn install
```

4. Run the frontend client:

```sh
yarn run auth-request-token-react
```

5. In a new tab, change directory:

```sh
cd /examples/
```

6. Rename the environment file:

```sh
mv .env.example .env.local
```

7. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

8. Install dependencies:

```sh
yarn install
```

9. Run the backend server:

```sh
yarn run auth-request-token-server
```

10. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.
