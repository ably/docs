# Member location example

This folder contains the code for the member location (Typescript) - a demo of how you can leverage [Ably Spaces](https://github.com/ably/spaces) to show a list of currently online users.

## Getting started

First, in `/examples/spaces-member-location/javascript/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `VITE_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-member-location/javascript/` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

