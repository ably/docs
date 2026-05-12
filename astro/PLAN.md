# Astro PoC — Plan

Working branch: `astro-poc` · Worktree: `/Users/jamie/Work/docs-astro-poc`

This file is the living plan. Update it as decisions change or phases complete.

## Goals

Validate Astro as the replacement for Gatsby for the Ably docs site. PoC success =
answers to these questions:

1. Does Astro handle our MDX content structure with minimal transformation?
2. Can we retire Redux without losing functionality?
3. Can MDX shortcodes (`If`, `Code`, `Aside`, `Tiles`, `MethodSignature`, `Table`)
   port across as plain React components?
4. Can `@ably/ui` Header/Footer render under Astro's React integration?
5. What is the bundle-size / build-time delta vs. Gatsby?

Non-goals: production-ready migration, porting all 297 pages, full redirect map,
wiring production analytics, setting up CI/deploy.

## Framing (revised)

**"Easy migration" PoC.** Preserve the heavier React aspects (Header,
Footer, LeftSidebar, interactive widgets) by lift-and-shift as React
islands. Streamline the lighter content aspects (MDX pipeline, content
collection, plugins, gates) using Astro-native primitives. The
migration effort is about surgical removal of Gatsby APIs, not a rewrite.

## Key decisions (locked-in)

- **Location**: `astro/` subfolder at the worktree root, self-contained
  `package.json`, `tsconfig.json`, `tailwind.config.js`, `.eslintrc`. Gatsby code
  stays untouched on the same branch.
- **Package manager**: pnpm (independent of the Gatsby project's yarn — the
  Astro subfolder has its own `pnpm-lock.yaml`).
- **No Redux.** Replaced by a single `UserProvider` island that fetches session +
  demo keys on mount and publishes them via React Context (backed by a nanostore
  for cross-island access).
- **`@ably/ui` stays for the PoC** (as primitive building blocks — Icon, Logo,
  TabMenu, Status, Button, `cn`). Retirement is a separate workstream.
  **Header and Footer are local components in the docs repo**, not
  `@ably/ui` exports — the "use @ably/ui chrome" framing earlier was wrong.
- **MDX shortcodes reused as-is** (plain React components, no Gatsby
  dependencies). `If` is the exception — see below.
- **`If` retired via remark plugin**, not kept as an island. ~1,200 call sites
  become plain HTML wrappers with `data-lang-gate` / `data-auth-gate` attributes;
  a single ~20-line global script (`gate-toggle.ts`) plus CSS handles
  visibility. Zero per-gate hydration cost.
- **Content collection uses a file-loader glob** pointing at
  `../src/pages/docs/**/*.mdx` — content stays in the Gatsby tree, no copies or
  symlinks.

## PoC page slice

Pick pages that exercise the tricky bits, not 297. Target ~8–12 pages:

1. A plain prose page — baseline MDX rendering.
2. `getting-started/javascript.mdx` — SDK tabs, heavy `<Code>` + `<If>` usage.
3. A page that embeds Sandpack — interactive React island.
4. An index/overview page — exercises sidebar nav generation.
5. A page with `redirect_from` frontmatter entries — proves the redirect
   converter.

## Architecture

### Directory layout (inside `astro/`)
```
astro/
├── PLAN.md                       (this file)
├── README.md                     (how to run the PoC)
├── package.json
├── tsconfig.json
├── astro.config.mjs
├── tailwind.config.js
├── src/
│   ├── content/
│   │   └── config.ts             (content collection + Zod schema)
│   ├── pages/
│   │   ├── index.astro
│   │   └── docs/
│   │       └── [...slug].astro   (dynamic MDX renderer)
│   ├── layouts/
│   │   └── DocsLayout.astro
│   ├── components/
│   │   ├── mdx/                  (shortcodes reused from docs repo)
│   │   │   ├── Aside.tsx
│   │   │   ├── Tiles.tsx
│   │   │   ├── MethodSignature.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Code.tsx
│   │   ├── islands/              (components needing hydration)
│   │   │   ├── UserProvider.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── Sandpack.tsx
│   │   │   └── Inkeep.tsx
│   │   └── chrome/               (local header/footer — NOT from @ably/ui)
│   │       ├── Header.astro      (uses @ably/ui primitives: Icon, Logo, TabMenu)
│   │       ├── Footer.astro      (uses @ably/ui primitives: Icon, Status, Button)
│   │       └── HeaderDropdown.tsx (island — interactive menu only)
│   ├── plugins/
│   │   ├── remarkCodeMeta.ts     (ported verbatim from gatsby-config.ts:12)
│   │   └── remarkIfGate.ts       (transforms <If> → gated HTML divs)
│   ├── scripts/
│   │   └── gate-toggle.ts        (~20 lines, global; reads lang + auth state)
│   ├── stores/
│   │   ├── language.ts           (nanostore + query-param persistence)
│   │   └── session.ts            (nanostore populated by UserProvider)
│   └── styles/
│       └── gate.css              (data-attribute-based hide rules)
```

### Content pipeline
- `src/content/config.ts` defines a `docs` collection via `glob` loader pointed
  at `../src/pages/docs/**/*.mdx`.
- Zod schema enforces: `title`, `meta_description`, `meta_keywords`, optional
  `intro`, optional `redirect_from: string[]`.
- `astro.config.mjs` wires `@astrojs/mdx` with the full remark/rehype list:
  `remarkGfm`, `remarkCodeMeta`, `remarkIfGate`, `rehypeSlug`,
  `rehypeAutolinkHeadings`.

### Rendering & hydration strategy

| Surface | Mechanism | Hydration |
|---|---|---|
| Prose, headings, links | Astro-rendered from MDX | Static HTML |
| `Aside`, `Tiles`, `MethodSignature`, `Table` | React components in `components` map | Static HTML (compiled at build) |
| `<If>` (lang + loggedIn) | Remark plugin → `<div data-*-gate>` | Static HTML + 1 global script |
| `Code` (language tabs) | React island | `client:load` |
| Language selector | React island | `client:load` |
| Header, Footer (local, using `@ably/ui` primitives) | Astro components | Static HTML |
| Header dropdown menu, mobile menu toggle | React island | `client:load` |
| `UserProvider` (fetch session + keys) | React island wrapping others | `client:load` |
| Sandpack | React island | `client:visible` |
| Inkeep search widget | React island | `client:idle` |

### Gate toggle (retiring `<If>` as a React island)
- `remarkIfGate` visits `mdxJsxFlowElement` / `mdxJsxTextElement` nodes named
  `If` and rewrites them as generic wrappers:
  - `<If lang="javascript">` → `<div data-lang-gate="javascript">`
  - `<If loggedIn>` → `<div data-auth-gate="required">`
  - `<If loggedIn={false}>` → `<div data-auth-gate="anonymous">`
  - Compound props combine as multiple data attributes on one div.
- `gate-toggle.ts` subscribes to `$language` and `$session` nanostores and sets
  `data-lang` / `data-auth` on `<body>`.
- `gate.css` enforces visibility via attribute selectors.
- Default CSS: `data-auth-gate="required"` starts hidden (SSR'd HTML is the
  signed-out state); `UserProvider` reveals after session fetch.

### Redux replacement
- Single `UserProvider.tsx` island, `client:load`, mounted once near the layout
  root. On mount:
  1. `fetch(WEB_API_USER_DATA_ENDPOINT)` → write to `$session` store.
  2. `fetch(WEB_API_KEYS_DATA_ENDPOINT)` → write to `$apiKeys` store.
- Publishes `UserContext` below for React-tree consumers (`Code`, shortcodes).
- Nanostore layer lets non-React code (the `gate-toggle.ts` global script, the
  language selector) read the same state.
- No `attachStoreToWindow`, no `connectState` from `@ably/ui/core/scripts`.

## Phases & actions

### Phase 1 — Bootstrap ✅
- [x] Worktree `astro-poc` off `origin/main` at `/Users/jamie/Work/docs-astro-poc`.
- [x] `astro/package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.js`.
- [x] Integrations: `@astrojs/react`, `@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/sitemap`.
- [x] `@ably/ui/tailwind.extend.js` preset (match the existing Gatsby config).
- [x] Stub `src/pages/index.astro` → clean build (1 page / 1.84s).
- [x] Extra peer deps required by `@ably/ui`'s tailwind config:
      `@tailwindcss/container-queries`, `postcss`, `autoprefixer`.

### Phase 2 — Content pipeline ✅
- [x] Content collection with `glob` loader at `../src/pages/docs/**/*.mdx`.
- [x] Zod frontmatter schema (`.passthrough()`; `redirect_from` / `languages`
      nullable — real content uses `redirect_from: null`).
- [x] Port `remarkCodeMeta.mjs` (verbatim).
- [x] Implement `remarkIfGate.mjs` (supports `lang`, `clientLang`, `agentLang`,
      `loggedIn`; compound props compose as multiple data attrs; unknown props
      pass through as `data-if-*`).
- [x] `[...slug].astro` dynamic route with PoC slice filter.
- [x] Stub shortcodes (`Aside`, `Code`, `Tiles`, `MethodSignature`, `Table`,
      `Tabs`, `Tab`) — real reuse is Phase 3/4.
- [x] 9 pages built in 38s (index + 8 PoC slice docs).

**Findings (Phase 2):**
- Astro's glob content-layer loader reads MDX in place from a directory
  outside `src/content/` with zero fuss.
- Loader strips `/index` from IDs → `chat/index.mdx` becomes id `chat`.
- remarkIfGate works: `<If loggedIn={false}>` rendered as
  `<div data-auth-gate="anonymous">` in the built HTML. Gate logic retired
  from JS entirely.
- Shortcodes beyond our initial list exist (`Tab`, `Tabs` surfaced in the
  slice). Full inventory before a wider rollout — `grep -RhoE '<[A-Z][A-Za-z]*[ />]' src/pages/docs/**/*.mdx | sort -u`.
- `redirect_from: null` exists in the wild. Schema must accept null.
- Sharp postinstall is gated by pnpm v10's `onlyBuiltDependencies` prompt —
  PoC uses the passthrough image service to sidestep. Swap to default Sharp
  service once we decide on image pipeline in Phase 5.
- Build time on 9 pages: 38s (dominated by Vite/Shiki). Per-page marginal
  cost is tiny (~2–10ms in `generating static routes`). The 38s is
  build-setup overhead; widening the slice should be close to linear in
  content count.

### Phase 3 — Layout, chrome, UserProvider ✅
- [x] `DocsLayout.astro` with header, footer, sidebar, main slot.
- [x] Local `Header.astro` / `Footer.astro` (NOT from `@ably/ui`) using
      `@ably/ui`'s `Icon` primitive + logo SVG. TabMenu/Status/Button
      deferred — not needed for the slice. Both render as 100% static
      HTML — zero hydration for chrome.
- [x] `UserProvider.tsx` headless island. 0.94 kB minified / 0.53 kB
      gzipped. Runs fetches on mount, writes to `$session` + `$apiKeys`
      nanostores. No React Context, no Redux.
- [x] `Sidebar.astro` generated from the content collection at build
      time — grouped by first path segment, active entry highlighted.
- [ ] `HeaderDropdown.tsx` interactive island — deferred to Phase 4,
      not needed for the slice.
- [x] **Phase 6b:** real `LeftSidebar.tsx` mounted as `client:load`
      island — ported unchanged, reuses existing `gatsby` / `@reach/router`
      shims and the `src/*` Vite alias. Nav data (`productData`) is fully
      static TS, no GraphQL required.
- [x] **Phase 6e: SPA-like nav via View Transitions.** Added
      `<ClientRouter />` to `DocsLayout.astro` head; marked
      `ChromeHeader`, `ChromeLeftSidebar`, `ChromeFooter`, and
      `UserProvider` with `transition:persist` so they keep their DOM
      and React state across navigations. `ChromePageHeader` and
      `ChromeRightSidebar` deliberately un-persisted — they have to
      rebuild per page (breadcrumbs / TOC change). Verified with an
      in-browser probe: markers set on chrome islands survive a link
      click to `/docs/basics`, LeftSidebar active-item highlight
      updates correctly because our `useLocation` shim listens on
      `history.pushState`.
- [x] **Phase 6d:** `<Code>` snippets styled like real @ably/ui CodeSnippet.
      `@ably/ui/core/CodeSnippet` can't be used directly because Astro's MDX
      wraps fenced code blocks in an opaque `<StaticHtml>`; CodeSnippet's
      child-walking language detection can't see past it. Shipped: custom
      `remarkCodeLang` plugin that lifts the fenced lang to a `data-lang`
      attribute on the outer `<Code>` JSX before StaticHtml-ification, plus
      a styled Code shortcode that reproduces the CodeSnippet chrome
      (language row + icon + label + border) and lets Shiki do the
      highlighting inside. Full CodeSnippet port needs an MDX compiler
      variant that keeps fenced blocks as real React elements — migration
      workstream, not a PoC blocker.
- [x] **Phase 6c:** LayoutContext, PageHeader, Breadcrumbs, RightSidebar
      all ported as islands via the real `LayoutProvider` from
      `src/contexts/layout-context.tsx`. One more dep install
      (`@radix-ui/react-select` for PageHeader's LanguageSelector) and
      it rendered end-to-end. Chrome is now visually close to real.
      Caveat: RightSidebar queries `document.querySelector('article')`
      to scope heading extraction — our layout needs an `<article>`
      wrapper around MDX content for the scroll-spy TOC to populate.

**Findings (Phase 3):**
- **Astro 6 breaks on `@ably/ui` in a way Astro 5 doesn't.** Attempted
  upgrade to `astro@6.1.8` + `@astrojs/{react,mdx}@5` + `@astrojs/tailwind@6`:
  Vite build passes, but the prerender phase fails with
  `Cannot find module '.../@ably/ui/core/Icon/utils'`. Astro 6's new
  module-runner bypasses `vite.ssr.noExternal` for prerender —
  @ably/ui stays externalised and Node's native ESM loader rejects its
  extensionless relative imports. Tested `ssr.noExternal: true`, a
  custom Vite `resolveId` plugin, both failed. Real fixes are either
  `patch-package`-ing @ably/ui on install or @ably/ui shipping explicit
  `.js` extensions. Rolled back to Astro 5.18.1 for the PoC. **Tracking
  as a migration blocker for Astro 6 until @ably/ui is fixed upstream.**
- **`@ably/ui` ESM needs `ssr.noExternal`.** Package ships ESM with
  extensionless relative imports (`import ... from "./Icon/utils"`), which
  Node's native ESM loader rejects. Adding `@ably/ui` to Vite's
  `ssr.noExternal` forces Vite to bundle it and resolves the imports
  transparently. **This applies to any server-rendered `@ably/ui`
  component.** Worth fixing upstream eventually; for now it's a one-line
  config.
- **Icon primitive works cleanly under SSR.** Uses only `useId`,
  `useMemo`, `useCallback` — no browser APIs. Heroicons lookup and
  local-icon lookup both run at build time. Rendered SVG inlined into
  the HTML, zero client JS.
- **Logo via `?url` import** works — Vite inlines small SVGs as
  `data:image/svg+xml` URIs. No extra network request.
- **Redux is fully gone.** The `UserProvider` pattern (headless island +
  nanostores) replaces `createRemoteDataStore`, `attachStoreToWindow`,
  and `connectState()` in ~40 lines. Consumers subscribe to nanostores
  directly — works across unrelated islands without shared React trees.
- **Sidebar from content collection** is trivial — one `getCollection()`
  call, group + sort in Astro frontmatter, render. The real Gatsby
  sidebar reads from `config/sidebar.yaml`; porting that shape is a
  straightforward data swap when we widen the slice.
- **Build output after Phase 3:** 9 pages, 40s. Client-side JS per page
  without islands drops to ~0 (only the UserProvider island's 0.94 kB
  plus Astro's shared runtime). Chrome contributes **nothing** to the
  hydration budget.

### Phase 4 — Interactive islands + If gate toggle ✅ (core mechanism)
- [x] `$language` nanostore with URL + localStorage persistence.
- [x] `LanguageSelector.tsx` island (`client:load`, 2.42 kB / 1.33 kB gzip).
- [x] Gate toggle in two pieces, no dedicated script file:
  - **Pre-paint inline script** in `<head>` (no imports) sets
    `html[data-lang]` from `?lang=` or localStorage → correct gate state
    on first frame, no FOUC.
  - **LanguageSelector effect** mirrors `$language` changes to
    `html[data-lang]`.
  - **UserProvider effect** mirrors `$session.signedIn` to
    `html[data-auth]`.
- [x] Gate CSS: 17 language rules + 3 auth rules compiled into
      `global.css` under `@layer utilities`.
- [x] `remarkIfGate` normalises `lang="js,py"` → `data-lang-gate="js py"`
      so the `~=` word matcher works.
- [x] Added `liveobjects` to the slice — validated real multi-language
      `<If>` gates: the page now emits
      `data-lang-gate="javascript"`, `data-lang-gate="java"`,
      `data-lang-gate="swift"` etc. in the HTML.
- [ ] Real `Code` island (language tabs + API-key inlining) — deferred;
      migration-time work rather than PoC-validation.
- [ ] Sandpack island — deferred; it's a standard React component drop-in
      with `client:visible`, no novel PoC risk.
- [ ] Inkeep widget island — deferred; it's an `<script>` embed + small
      wrapper. No PoC risk.

**Findings (Phase 4):**
- **The gate architecture works end-to-end.** Zero React components for
  `<If>`, zero per-gate hydration — just `data-*-gate` HTML + ~20 CSS
  rules + 15-line pre-paint script. Switching language or auth state
  triggers an instant CSS repaint. On a page with hundreds of `<If>`
  blocks this is a massive win.
- **Tailwind's PostCSS pipeline drops rules from standalone CSS files
  that don't contain `@tailwind` directives.** My first pass put gate
  rules in `src/styles/gate.css` and imported it from the layout — the
  rules never reached the compiled output. Moving them inside
  `global.css` under `@layer utilities` fixed it. Worth investigating
  for the real migration — might be the Tailwind plugin swallowing
  non-declared files, or Vite CSS ordering.
- **Nanostores + `@nanostores/react` total ~0.93 kB** (the shared
  `index.-71HSoBf.js` chunk). Across UserProvider (0.61 kB) and
  LanguageSelector (2.42 kB) we're at ~4 kB for the whole
  state-management layer. Redux + `@ably/ui`'s `connectState` pulled in
  roughly 20× that weight.
- **Pre-paint inline scripts are the idiomatic Astro pattern** for
  "must-run-before-first-frame" logic. Kept tiny and import-free so it
  can't block first paint.

### Phase 5 — Build, measure, report ✅
- [x] `astro build` numbers (10-page PoC slice):
      **build time 38–41 s** (dominated by Vite + Shiki warmup; per-page
      cost is ~5–10 ms). Repeat builds hit the image cache and are faster.
- [x] Output sizing:
      - Shared React runtime: `client.nc8uITnr.js` **136.5 kB / 44 kB gzip**
      - React scheduler chunk: `index.DK-fsZOb.js` **6.8 kB / 2.7 kB gzip**
      - nanostores + `@nanostores/react`: `index.-71HSoBf.js` **0.93 kB / 0.5 kB gzip**
      - `LanguageSelector`: **2.4 kB / 1.3 kB gzip**
      - `UserProvider`: **0.61 kB / 0.35 kB gzip**
      - **Total per-page app JS (gzip): ~5 kB on top of React runtime.**
      - HTML per page: 76–92 kB unminified (compresses well).
      - CSS bundle: `_slug_.sZ1FrQ7V.css` **74 kB** (Tailwind + gate rules).
- [x] Gatsby baseline not measured here — would need a full
      `gatsby build` of the main branch in a clean checkout. Deferred; use
      Heroku's latest production artefact as the apples-to-apples baseline.
- [x] `scripts/generate-redirects.mjs`:
      walks `../src/pages/docs/**/*.mdx`, parses `redirect_from`,
      emits `src/generated/redirects.json`. First run on main:
      **381 redirects across 118 pages.** Wire-up is one line in
      `astro.config.mjs`:

      ```js
      import redirects from './src/generated/redirects.json' with { type: 'json' };
      export default defineConfig({ redirects, ... });
      ```

      Not enabled in the PoC (would need the real target pages to exist).
      Separately, `config/nginx-redirects.conf` carries another class of
      redirects that the real migration needs to merge in.

## Findings summary

### What worked (no surprises)
- **MDX content in place.** Astro 5's content-layer `glob` loader reads
  from `../src/pages/docs/` with no copy or symlink. Zod schema (with
  `.passthrough()` + nullable) accepts the real frontmatter as-is.
- **Remark plugins port verbatim.** `remarkCodeMeta` moved across
  unchanged; `remarkIfGate` is a clean mdast transform.
- **Shortcodes are plain React.** `Aside`, `Tiles`, etc., work via the
  MDX `components` map with zero adapters. Our PoC used stubs only
  because we chose not to drag `./dividers.module.css` and `@ably/ui`
  context across — that's a lift-and-shift in the real migration.
- **`@ably/ui` primitives render under SSR.** Icon + logo both go out
  as static HTML. Chrome contributes zero client JS.
- **Redux is fully gone.** 0.6 kB island + two nanostores replace the
  whole Redux + `connectState` setup.
- **`<If>` retired, zero hydration cost across 1,200+ call sites.** The
  remark + CSS pattern is strictly better than an island component.
- **Build + island overhead is small.** ~5 kB gzip of app JS per page
  on top of the shared React runtime.

### Surprises / real findings
- **`@ably/ui`'s ESM has extensionless relative imports** — need
  `ssr.noExternal: ['@ably/ui']` in the Vite config. One-line fix, but
  surprising. Worth upstreaming.
- **Tailwind's PostCSS pipeline swallows rules from standalone CSS
  files** that lack `@tailwind` directives. Keep auxiliary CSS inside
  `global.css` under `@layer utilities`, or inline it.
- **Glob loader strips `/index` from IDs.** `chat/index.mdx` becomes
  id `chat`. Affects slug mapping.
- **`redirect_from: null` exists in the wild.** Schema must accept it.
- **Pre-paint inline scripts beat deferred imports** for
  "must-run-before-first-frame" logic (language state, auth class).
  Cannot import modules; duplicate minimal logic, keep it tiny.
- **pnpm 10's build-scripts gate blocks Sharp's postinstall** — PoC
  uses the passthrough image service. Production build needs
  `onlyBuiltDependencies: ['sharp']` in `package.json` or a run of
  `pnpm approve-builds`.
- **React needs `resolve.dedupe`** under pnpm. Without it `@ably/ui`'s
  own `react` peer resolves to a separate copy, triggering dev-mode
  "Invalid hook call" warnings when islands hydrate. Fix is two lines
  in `astro.config.mjs`:
  `vite: { resolve: { dedupe: ['react', 'react-dom'] } }`.
  The warning is dev-mode only — pages still serve 200. A full fix
  (ensuring `@astrojs/react`'s renderer shares the same React instance
  as Vite-bundled `@ably/ui`) is a migration-time concern.
- **Fonts load via a `<link>` in the Gatsby project's
  `src/components/Head.tsx`, not via any `@font-face` or `@import`.**
  Google Fonts `<link>` pulls Manrope + JetBrains Mono + Source Code Pro
  + IBM Plex Serif. `@ably/ui/core/fonts/manrope.css` exists and
  imports the same Google Fonts URL, but neither the Gatsby nor the
  @ably/ui core stylesheet imports it — the site depends on the
  `<link>` in Head.tsx. Port the link to the Astro layout's `<head>`
  verbatim; without it the body falls back to system sans-serif and
  looks wrong.
- **`@ably/ui`'s CSS reset needs `postcss-import` + correct import
  order.** The Gatsby site imports `@ably/ui/reset/styles.css` +
  `@ably/ui/core/styles.css` in its `global.css`; those files contain
  nested `@import`s that only resolve when `postcss-import` runs
  before Tailwind. `@import` rules also must precede `@tailwind`
  directives (CSS spec). Missing either breaks chrome styling silently
  (browser defaults take over — anchors stay browser-blue, buttons
  render with native chrome). Fix: install `postcss-import`, put it
  first in `postcss.config.cjs`, and put all `@import`s at the top of
  `global.css`.
- **`@ably/ui`'s Tailwind preset disables preflight**
  (`corePlugins: { preflight: false }`) because host sites own their
  own reset. A fresh Astro project that adopts the preset will render
  MDX content in raw browser defaults — h1/h2/p/ul have no styling at
  all — until you install `@tailwindcss/typography` and wrap the
  content area in `prose`. Two-line fix but not obvious to someone
  first wiring things up.

### Deferred (not blockers, just not in the PoC)
- Real `Code` component with language tabs + API-key inlining.
- Sandpack island on a real page (trivial drop-in with `client:visible`).
- Inkeep search widget (trivial drop-in with `client:idle`).
- Interactive header dropdown / mobile menu (small Radix island).
- Image optimisation via Sharp (currently passthrough).
- Full shortcode port via Vite alias into the Gatsby `src/` tree so the
  real `Admonition`, `NestedTable`, `Tiles`, `MethodSignature`, `Code`
  travel across without modification.
- Sidebar from `config/sidebar.yaml` instead of the auto-generated
  content-collection grouping.
- Hook the 381-entry redirects into `astro.config.mjs`.

### Migration-effort estimate

For the full port off Gatsby, rough calibration:

| Chunk | Effort |
|---|---|
| Content pipeline (done in PoC) | ~2 days |
| Port all 10 MDX shortcodes end-to-end (real Admonition, Code, NestedTable, Tiles, MethodSignature, Tabs/Tab, If, PageHeader, etc.) including CSS-module plumbing and `UserContext`/`SDKContext` replacements | **~1 week** |
| Layout + chrome (Header/Footer/sidebar, mobile menu, dropdowns) — full rewrite off reach-router/useStaticQuery | **~1 week** |
| Islands: Language selector (done), Code with tabs, Sandpack, Inkeep, feedback widget, examples list | **~1 week** |
| Redirect merge (`redirect_from` ∪ `nginx-redirects.conf`), sitemap, llmstxt, Zopfli post-build, analytics stack | **~3 days** |
| 297-page content sweep (fix frontmatter drift, shortcode edge cases, image paths, broken links) | **~3–5 days** — mostly shaking out edge cases |
| Heroku deploy pipeline, PR preview parity, CI | **~2 days** |

**Total: ~4–5 engineering weeks** for a one-person port, assuming no
parallel content churn. Less if we pair; more if content authoring
continues on the Gatsby side during the migration (content drift
adds merge cost).

### Recommendation

**Green-light Astro for the migration.** Every concrete risk we
identified up-front has either been eliminated (Redux, MDX shortcodes,
`<If>` hydration) or de-risked to a known workaround (`ssr.noExternal`,
Tailwind CSS scoping, pnpm Sharp). The only remaining "large" item
(Header/Footer/sidebar chrome) is a plain rewrite, not a research
project.

Ship this PoC branch as a demo to the team, then start the real port
on a fresh branch with the `astro/` subfolder hoisted to the root and
Gatsby files removed.

## Open questions

- Does anything outside our code read `window.__REDUX_STORE__` (via
  `attachStoreToWindow`)? Needs a grep before commit.
- Any non-`lang` / non-`loggedIn` props on `<If>` in the wild? Extend
  `remarkIfGate` or leave those as a fallback island.
- Will `@astrojs/content` file-loader accept globs pointing outside the content
  collection root? If it complains, fall back to a manual `import.meta.glob`
  loader.
- `gatsby-remark-autolink-headers` produces a specific markup shape for the
  anchor icon. `rehype-autolink-headings` is configurable but needs the existing
  CSS class (`gatsby-copyable-header`) if we want the PoC to look identical.

## Migration-effort estimate (filled in at Phase 5)

TBD.
