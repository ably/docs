# Request an Ably Token to authenticate clients

Use an Ably Token to securely authenticate your users.

Ably Tokens enable you to grant users access to the Ably platform. They are used to issue time-limited credentials that securely authorize users, and manage which resources each user has access to.

Authentication is the first step for an application to communicate with Ably. The application initializes a client and calls a predefined `authUrl` endpoint on your backend server. This endpoint uses an API key to request a token from Ably and returns it to the requesting client. When the token nears expiry, the `authUrl` is automatically invoked to request a new token.

Authentication is implemented using [Ably Pub/Sub](/docs/auth). The Pub/Sub SDK provides the authentication mechanism that is utilized by all Ably products. It provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

This example uses a frontend and a backend client. The frontend is a React application and the backend is an Express Node.js application. Both of these applications use Ably Pub/Sub.

The server application calls [`auth.requestToken();`](/docs/auth/token#ably-token) to request a token from Ably in order to pass it to the client to be used as authentication. The client calls the server's publicly exposed endpoint `/request-token` to request this token.

Find out more about [authentication](/docs/auth).

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

7. In `.env.local` update the value of `VITE_ABLY_KEY` to be your Ably API key.

8. Install dependencies:

  ```sh
  yarn install
  ```

9. Run the backend server:

  ```sh
  yarn run auth-request-token-server
  ```

10. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
