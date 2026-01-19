# Next.js 14+ App Router Migration Guide

This document describes the Next.js migration implementation for the Ably documentation site.

## Files Created

### Core Configuration

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js configuration with MDX support |
| `tsconfig.next.json` | TypeScript config for Next.js (rename to `tsconfig.json` when switching) |
| `tailwind.next.config.js` | Tailwind config with App Router paths (rename to `tailwind.config.js` when switching) |
| `vercel.json` | Vercel deployment configuration |
| `.env.next.example` | Environment variables template |
| `package.next.json` | Dependencies and scripts reference |

### App Router Structure

```
/app
├── layout.tsx           # Root layout with metadata and providers
├── providers.tsx        # Client-side providers (UserContext, PostHog, Insights)
├── globals.css          # Global styles
├── docs/
│   ├── layout.tsx       # Docs layout wrapper
│   ├── DocsLayoutClient.tsx  # Client-side docs layout
│   ├── page.tsx         # /docs index (redirects to /docs/getting-started)
│   ├── not-found.tsx    # 404 page for docs
│   └── [...slug]/
│       ├── page.tsx     # Dynamic MDX page handler
│       └── MDXPageClient.tsx  # Client-side MDX renderer with API key injection
└── examples/
    ├── layout.tsx       # Examples layout
    ├── page.tsx         # Examples list page
    ├── ExamplesListPage.tsx  # Client-side examples list
    └── [id]/
        ├── page.tsx     # Individual example page
        └── ExamplePageClient.tsx  # Client-side example with Sandpack
```

### Library Files

| File | Purpose |
|------|---------|
| `lib/mdx.ts` | MDX utilities (getAllMdxSlugs, getMdxBySlug, extractRedirects) |
| `lib/examples.ts` | Example file loader utilities |
| `lib/user-context.tsx` | Client-side user context with API key fetching |
| `lib/layout-context.tsx` | Layout context for active page/language detection |
| `lib/site-config.ts` | Site configuration (replaces Gatsby siteMetadata) |
| `lib/link.tsx` | Link component adapter (Gatsby→Next.js compatibility) |

### Build Scripts

| File | Purpose |
|------|---------|
| `scripts/generate-redirects.ts` | Generate redirects from MDX frontmatter |
| `scripts/generate-llms-txt.ts` | Generate llms.txt for AI/LLM consumption |

## Migration Steps

### 1. Install Dependencies

```bash
# Install new dependencies
npm install next@^14.2.0 @next/mdx@^14.2.0 @mdx-js/loader@^3.0.1 \
  @mdx-js/react@^3.0.1 next-mdx-remote@^4.4.1 gray-matter@^4.0.3 \
  remark-gfm@^4.0.0 @svgr/webpack@^8.1.0

# Install dev dependencies
npm install -D @types/node@^20.0.0 @types/react@^18.2.0 @types/react-dom@^18.2.0 \
  eslint-config-next@^14.2.0 npm-run-all@^4.1.5 ts-node@^10.9.2
```

### 2. Update Configuration Files

```bash
# Rename configs to use Next.js versions
mv tsconfig.json tsconfig.gatsby.json
mv tsconfig.next.json tsconfig.json

mv tailwind.config.js tailwind.gatsby.config.js
mv tailwind.next.config.js tailwind.config.js
```

### 3. Update package.json Scripts

Replace Gatsby scripts with Next.js scripts from `package.next.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build && npm run postbuild",
    "start": "next start",
    "lint": "next lint",
    "postbuild": "npm-run-all generate:*",
    "generate:llms": "ts-node scripts/generate-llms-txt.ts",
    "generate:redirects": "ts-node scripts/generate-redirects.ts"
  }
}
```

### 4. Update Environment Variables

Copy `.env.next.example` to `.env.local` and configure:

- Replace `GATSBY_*` prefixed vars with `NEXT_PUBLIC_*`
- Update API endpoint URLs if needed

### 5. Component Migration (Required Updates)

The following existing components need updates to work with Next.js:

#### Header.tsx
- Replace `useStaticQuery` + `graphql` with `siteConfig` import
- Replace `useLocation` from `@reach/router` with `usePathname` from `next/navigation`

#### LeftSidebar.tsx
- Replace `useStaticQuery` + `graphql` with `externalScriptsData` import
- Replace `useLocation` with `usePathname`

#### Link.tsx
- Replace Gatsby's `Link` with `next/link` (use `lib/link.tsx` adapter)

#### Footer.tsx
- Update to work with Next.js page context if needed

#### GlobalLoading.tsx
- Ensure it works with React Suspense boundaries

### 6. Copy Static Assets

```bash
# Copy fonts to public directory
mkdir -p public/fonts
cp -r src/fonts/* public/fonts/

# Copy example images
mkdir -p public/images/examples
cp src/components/Examples/images/* public/images/examples/
```

### 7. Generate Redirects

```bash
npx ts-node scripts/generate-redirects.ts
```

Then import the generated redirects in `next.config.mjs`:

```javascript
import redirects from './generated-redirects.json' assert { type: 'json' };

const nextConfig = {
  // ...
  async redirects() {
    return redirects;
  },
};
```

### 8. Test the Migration

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm start
```

## Architecture Notes

### API Key Injection (Preserved)

The API key injection flow is preserved exactly as it was:

1. Page loads as static HTML (SSG via `generateStaticParams`)
2. `UserContextProvider` mounts client-side
3. Fetches session from `/api/me` and API keys from `/api/api_keys`
4. Falls back to demo key from `/ably-auth/api-key/docs`
5. `WrappedCodeSnippet` replaces `{{API_KEY}}` and `{{RANDOM_CHANNEL_NAME}}` at render time

### Client Components

The following are marked as `'use client'`:

- `app/providers.tsx` - All context providers
- `app/docs/DocsLayoutClient.tsx` - Docs layout with navigation
- `app/docs/[...slug]/MDXPageClient.tsx` - MDX content renderer
- `app/examples/ExamplesListPage.tsx` - Examples listing
- `app/examples/[id]/ExamplePageClient.tsx` - Sandpack sandbox
- `lib/user-context.tsx` - User/API key management
- `lib/layout-context.tsx` - Active page detection
- `lib/link.tsx` - Link component

### Server Components

These remain as server components:

- `app/layout.tsx` - Root layout with metadata
- `app/docs/layout.tsx` - Docs layout wrapper
- `app/docs/[...slug]/page.tsx` - MDX page with static generation
- `app/examples/[id]/page.tsx` - Example page with static generation
- MDX content compilation (via `next-mdx-remote/serialize`)

## Key Differences from Gatsby

| Feature | Gatsby | Next.js |
|---------|--------|---------|
| Data fetching | GraphQL queries | Direct filesystem reads |
| Routing | File-based in `src/pages` | File-based in `app/` |
| Layout | `gatsby-plugin-layout` | Layout components |
| MDX | `gatsby-plugin-mdx` | `@next/mdx` + `next-mdx-remote` |
| Static generation | `createPages` | `generateStaticParams` |
| Images | `gatsby-plugin-image` | `next/image` |
| Link | Gatsby Link | Next.js Link |
| Head/SEO | `react-helmet` | Metadata API |
| Environment vars | `GATSBY_*` prefix | `NEXT_PUBLIC_*` prefix |

## Verification Checklist

- [ ] All MDX pages render correctly
- [ ] Code snippets show API keys when logged in
- [ ] Demo keys appear when logged out
- [ ] Language switching works
- [ ] Navigation sidebar works
- [ ] All examples render with Sandpack
- [ ] Redirects work correctly
- [ ] llms.txt is generated
- [ ] Build completes without errors
- [ ] Lighthouse audit passes
