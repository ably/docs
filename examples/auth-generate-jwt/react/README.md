# Request an Ably JWT to authenticate clients

Use a JWT (JSON Web Token) to securely authenticate your users.

Ably [JWTs](https://jwt.io/) enable you to grant users access to the Ably platform. They are used to issue time-limited credentials that securely authorize users, and manage which resources each user has access to. You can use a JWT-compliant library to create an Ably JWT without needing to request a token from Ably.

Authentication is the first step for an application to communicate with Ably. The application initializes a client and calls a predefined `authUrl` endpoint on your backend server. This endpoint uses an API key to request a JWT from Ably and returns it to the requesting client. When the JWT nears expiry, the `authUrl` is automatically invoked to request a new JWT.

Authentication is implemented using [Ably Pub/Sub](https://ably.com/docs/auth). The Pub/Sub SDK provides the authentication mechanism that is utilized by all Ably products. It provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

This example uses a frontend and a backend client. The frontend is a React application and the backend is an Express Node.js application. Both of these applications use Ably Pub/Sub.

The server application generates an Ably JWT using the Ably API key with the key name part of the API key as `kid` in the headers. The API secret part is used to encrypt the JWT. The Ably JWT that is returned is then used by the frontend client as authentication with Ably.

Find out more about [authentication](https://ably.com/docs/auth/token?lang=javascript#jwt).

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
yarn run auth-generate-jwt-react
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
yarn run auth-generate-jwt-server
```

10. Try it out by opening a tab to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
