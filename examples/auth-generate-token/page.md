# Generate a JWT token to authenticate clients

Use JWT tokens to securely authenticate users within your application.

JWT tokens enable you to grant users access to Ably's real-time messaging services. They are most commonly used to issue time-limited credentials that securely authorize users to connect to Ably channels.

JWT tokens are an essential component of applications that require secure and scalable real-time communication. Before any application can use any of the Ably products whether they be Pub/Sub, Spaces, Chat, or LiveSync, they'll need to first authenticate.

Authentication is implemented using [Ably core Pub/Sub](https://ably.com/docs/auth). The Pub/Sub SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting websocket features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

// React brief (Only visible if viewing the React example)

This example uses a frontend and a backend client. The frontend is a React application and the backend is an Express Node.js application. Both of these applications use the [Ably JS SDK](https://github.com/ably/ably-js).

The server application calls [`auth.requestToken();`](https://ably.com/docs/auth/token#ably-token) to request a token from Ably in order to pass it to the client to be used as authentication. The client calls the server's publicly exposed endpoint `/auth-url` to request this token.

Find out more about [authentication](https://ably.com/docs/auth).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

This example uses a frontend and a backend client. The frontend is a Typescript application and the backend is an Express Node.js application. Both of these applications use the [Ably JS SDK](https://github.com/ably/ably-js).

The server application calls [`auth.requestToken();`](https://ably.com/docs/auth/token#ably-token) to request a token from Ably in order to pass it to the client to be used as authentication. The client calls the server's publicly exposed endpoint `/auth-url` to request this token.

Find out more about [authentication](https://ably.com/docs/auth).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/auth-generate-token/react/
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
cd /examples/auth-generate-token/server/
```

6. Rename the environment file:

```sh
mv .env.example .env.local
```

7. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

8. Install dependencies:

```sh
yarn install
```

9. Run the backend server:

```sh
yarn run dev
```

10. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/auth-generate-token/javascript/
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
cd /examples/auth-generate-token/server/
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
yarn run dev
```

10. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
