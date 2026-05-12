import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { remarkCodeMeta } from './src/plugins/remarkCodeMeta.mjs';
import { remarkIfGate } from './src/plugins/remarkIfGate.mjs';
import { remarkCodeLang } from './src/plugins/remarkCodeLang.mjs';

const resolveHere = (rel) => fileURLToPath(new URL(rel, import.meta.url));
// Path to the Gatsby project tree (parent of astro/).
const GATSBY_SRC = resolveHere('../src');

export default defineConfig({
  site: 'http://localhost:4321',
  trailingSlash: 'never',
  // Passthrough image service — we're not exercising Sharp's optimisation in
  // the PoC and don't want to fight pnpm's postinstall-scripts gate.
  // Swap to the default service in Phase 5 when we measure image handling.
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkCodeMeta, remarkCodeLang, remarkIfGate],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
      // Keep Shiki on — Astro compiles fenced code blocks into an opaque
      // <StaticHtml> wrapper that @ably/ui's CodeSnippet can't walk to
      // detect the language. We render our own visual wrapper in the
      // Code shortcode and use Shiki for highlighting.
      shikiConfig: { theme: 'github-light' },
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  vite: {
    ssr: {
      // @ably/ui ships ESM with extensionless relative imports
      // ("./Icon/utils" rather than "./Icon/utils.js"). Node's native ESM
      // loader rejects those; running the package through Vite's bundler
      // for SSR sidesteps it.
      noExternal: ['@ably/ui', 'lodash', 'es-toolkit'],
    },
    resolve: {
      // pnpm hoisting + @ably/ui's own react peer can leave two copies of
      // React in the module graph, which surfaces as a dev-mode
      // "Invalid hook call" warning at SSR when Icon components render.
      // The warning is noisy but not fatal — pages still return 200.
      // Dedupe forces a single copy where Vite's resolver controls it.
      dedupe: ['react', 'react-dom'],
      alias: [
        // Shim Gatsby + reach-router so the real Header/Footer/LeftSidebar
        // from the docs repo render under Astro without modification.
        { find: 'gatsby', replacement: resolveHere('./src/shims/gatsby.tsx') },
        {
          find: '@reach/router',
          replacement: resolveHere('./src/shims/reach-router.tsx'),
        },
        {
          find: '@gatsbyjs/reach-router',
          replacement: resolveHere('./src/shims/reach-router.tsx'),
        },
        // Gatsby's SVG imports resolve to URL strings; Astro's asset handler
        // returns {src,width,height}. Intercept the logo so Header.tsx's
        // `<img src={Logo}>` works without modification.
        {
          find: '@ably/ui/core/images/logo/ably-logo.svg',
          replacement: resolveHere('./src/shims/ably-logo.ts'),
        },
        // Docs-repo absolute imports like `src/contexts/user-context` resolve
        // through Gatsby's tsconfig baseUrl. Under Astro we rewrite the
        // `src/` prefix to the Gatsby tree — but only when it's a bare
        // specifier (not `./src/` or `/src/`).
        { find: /^src\/(.+)$/, replacement: `${GATSBY_SRC}/$1` },
      ],
    },
  },
});
