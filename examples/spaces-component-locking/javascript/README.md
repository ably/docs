# Component locking example

This folder contains the code for the Component locking (Typescript) - a demo of how you can leverage [Ably Spaces](https://github.com/ably/spaces) to lock components within a form or web page.

## Getting started

First, in `/examples/spaces-component/locking/javascript/` rename `.env.example` to `.env.local` and enter your Ably API KEY in the `VITE_PUBLIC_ABLY_KEY` environment variable.

Change directory to `/examples/spaces-component-locking/javascript/` and install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

