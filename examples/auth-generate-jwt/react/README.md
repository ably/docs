# Generate a Ably JWT to authenticate clients

This folder contains the code for the authentication (React) - a demo of how you can authenticate with [Ably JWT](https://ably.com/docs/auth/token?lang=javascript#standard) to use any of the products.

## Getting started

. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/auth-generate-jwt/react/
```

3. Install dependencies:

```sh
yarn install
```

4. Run the frontend client:

```sh
yarn run dev
```

5. In a new tab, change directory:

```sh
cd /examples/auth-generate-jwt/server/
```

6. Rename the environment file:

```sh
mv .env.example .env.local
```

7. In `.env.local` update the value of `ABLY_API_KEY` to be your Ably API key.

8. Install dependencies:

```sh
yarn install
```

9. Run the backend server:

```sh
yarn run dev
```

10. Try it out by opening a tab to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.