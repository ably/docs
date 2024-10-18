# Live cursors example

This folder contains the code for the Live cursors (React) - a demo of how you can leverage [Ably Spaces](https://github.com/ably/spaces) to track other member's cursors in realtime on a page.

## Getting started

First, in `/examples/spaces-live-cursors/react/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `NEXT_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-live-cursors/react/` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:3000](http://localhost:3000) with your browser to see the result.
