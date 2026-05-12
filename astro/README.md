# Ably Docs — Astro PoC

Proof-of-concept replacement for the Gatsby docs site. Lives on branch
`astro-poc`. See [`PLAN.md`](./PLAN.md) for scope and phase tracking.

## Run locally

```bash
cd astro
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # writes ./dist
pnpm check    # type-check
```

This subproject uses **pnpm** — independent of the parent Gatsby project's
yarn. The Gatsby project at the worktree root is untouched, and both stacks
can run side-by-side (Gatsby at 8000, Astro at 4321).

## Layout

Self-contained subproject with its own `package.json`, `tsconfig.json`, and
`tailwind.config.js`. Shares content with the Gatsby tree via a content
collection `glob` loader pointed at `../src/pages/docs/**/*.mdx`.

## Key design choices

- **No Redux.** A single `UserProvider` island fetches session + demo keys and
  publishes via `nanostores` + React Context.
- **`<If>` is a remark-time transform**, not a React component. Rewritten to
  `<div data-*-gate>` wrappers; a ~20-line global script toggles visibility
  via CSS. Zero per-gate hydration across ~1,200 call sites.
- **`@ably/ui` is kept for now** — retirement is a separate workstream.
- **Shortcodes (`Aside`, `Tiles`, `MethodSignature`, etc.) are reused** as
  plain React components via MDX's `components` map.
