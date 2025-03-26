# Contributing to Examples

This guide explains how to contribute to the Ably examples in the Ably docs repository. Follow these steps to create a new example.

## Example file structure

1. Create a new directory for your example under `/examples`, this should be named after the feature/example you're building, e.g. `chat-typing-indicator`.
2. Inside this directory, create a subdirectory named after the language or framework (e.g., `javascript`, `react`). You can have both `javascript` and `react` subdirectories within the same example directory.

Currently, we support Javascript (Typescript) and React, both using Vite.

## Create the project

To create a new project using Vite, follow the instructions below for either JavaScript/TypeScript or React.

### JavaScript/TypeScript

1. Open your terminal.
2. Navigate to the directory where you want to create your project.
3. Run the following command to create a new Vite project:

```sh
npm create vite@latest javascript -- --template vanilla
```

4. Navigate into your project directory:

```sh
cd javascript
```

### React

1. Open your terminal.
2. Navigate to the directory where you want to create your project.
3. Run the following command to create a new Vite project with React template:

```sh
npm create vite@latest react -- --template react
```

4. Navigate into your project directory:

```sh
cd react
```

After following these steps, you will have a Vite project set up with JavaScript/TypeScript or React, ready for further development.

## README.md

Each example must include a `README.md` file with instructions to get the developer running the example locally as quick as possible. These instructions should follow the structure below:

- **Introduction**: Describe the Ably features used, what problem is this solving for the intended audience?
- **Resources**: List components and functions from the Ably SDKs and their purposes.
- **Getting started**: Provide step-by-step instructions:
  1. Clone the docs repository.
  2. Navigate to the examples directory.
  3. Rename environment variable files. (`.env.example` -> `.env.local`)
  4. Update environment variables.
  5. Install dependencies with `yarn install`.
  6. Run the project.
- **Opening in CodeSandbox**: Instructions for opening the example in CodeSandbox. (At this moment, this heading contains the renaming of the environment variables)

## NPM Workspaces

Add entries for each example to the `/examples/package.json` file under `workspaces` and `scripts`, an example of this is shown below:

```
"workspaces": [
  "chat-typing-indicator/react",
  "chat-typing-indicator/javascript",
],
"scripts": {
  "chat-typing-indicator-javascript": "yarn workspace chat-typing-indicator-javascript dev",
  "chat-typing-indicator-react": "yarn workspace chat-typing-indicator-react dev",
},
```

The intention of the scripts entries is to make the command simpler for the developer to run locally.

## Shared configurations

All examples use config from the examples root directory. Update these files inside your project directory as needed:

- `vite.config.ts`:

  ```typescript
  import { defineConfig } from 'vite';
  import baseConfig from '../../vite.config';

  export default defineConfig({
    ...baseConfig,
    envDir: '../../',
  });
  ```

- `tailwind.config.ts`:

  ```typescript
  import baseConfig from '../../tailwind.config';
  import type { Config } from 'tailwindcss';

  const config: Config = {
    ...baseConfig,
    content: ['./src/**/*.{js,ts,tsx}', './index.html'],
  };

  export default config;
  ```

- `tsconfig.json`:

  ```json
  {
    "extends": "../../tsconfig.json"
  }
  ```

- `vite-env.d.ts` (Javascript only):

  ```typescript
  interface ImportMetaEnv {
    readonly VITE_ABLY_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  ```


## Styling consistency

For styling consistency purposes, each example will need to use [Franken-ui](https://franken-ui.dev/) for components, and any other styling to use tailwindcss.

