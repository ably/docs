# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Ably documentation site (https://ably.com/docs), a Gatsby-based static site using MDX for content. The site covers multiple Ably products: Pub/Sub, Chat, Spaces, LiveObjects, LiveSync, and AI Transport.

## Development Commands

```bash
# Quick start (handles asdf tools, yarn install, env setup)
bin/dev

# Manual setup
yarn install
yarn develop:env-setup  # First time only, creates .env.development
yarn develop            # Dev server at localhost:8000

# Editor mode with refresh endpoint
yarn edit               # Enables GATSBY_REFRESH_ENDPOINT
curl -X POST http://localhost:8000/__refresh  # Hot refresh

# Build and serve
yarn build              # Production build with prefix paths
yarn serve              # Serve production build

# Testing
yarn test               # Run all tests
yarn test:watch         # Watch mode
yarn test:ETL           # Data transformation tests only (data/)
yarn test:app           # App tests only (src/)
jest path/to/file.test.tsx  # Single test file

# Linting
yarn lint               # ESLint check
yarn lint:fix           # Auto-fix linting issues
```

## Architecture

### Content Organization

- **`src/pages/docs/`**: MDX content pages organized by product (chat/, spaces/, livesync/, platform/, api/, etc.)
- **`examples/`**: Runnable code examples with JavaScript and React implementations

### Key Data Structures

- **`src/data/nav/`**: Navigation config per product (platform.ts, pubsub.ts, chat.ts, spaces.ts, liveobjects.ts, aitransport.ts, livesync.ts)
- **`src/data/languages/`**: Language metadata and SDK versions in `languageData.ts` and `languageInfo.ts`
- **`src/data/content/homepage.ts`**: Homepage content

### Build Pipeline

- **`data/createPages/`**: Gatsby page creation and redirect handling
- **`data/onCreateNode/`**: GraphQL schema customization
- **`data/onPostBuild/`**: Post-build processing (asset compression, markdown transpilation for LLMs, redirect validation)

### Components

- **`src/components/Layout/`**: Main layout, sidebars, header, MDX wrapper
- **`src/components/Layout/mdx/`**: MDX-specific components (Admonition, Table, NestedTable, PageHeader)

## Content Formatting (MDX)

Note: CONTRIBUTING.md describes legacy textile syntax. All content is now MDX. Refer to existing pages for patterns.

### Frontmatter

```yaml
---
title: "Page title"                      # Required
meta_description: "SEO description"      # Required
meta_keywords: "keyword1, keyword2"      # Recommended
intro: "Short intro for page header"     # Optional
redirect_from:                           # Optional
  - /docs/old/path
---
```

### Headings

Use standard markdown headings with HTML anchor tags:
```mdx
## Subscribe to messages <a id="subscribe"/>
```

### Available Languages

See `src/data/languages/languageData.ts` for supported languages per product. Additional syntax languages for code blocks: `shell`, `html`, `json`, `xml`, `sql`

### Codeblocks

Wrap in `<Code>` component. Consecutive code blocks become language tabs:
```mdx
<Code>
```javascript
const channel = realtime.channels.get('channelName');
```

```python
channel = realtime.channels.get('channelName')
```
</Code>
```

For Realtime/REST SDK variants, prefix language with `realtime_` or `rest_`. All blocks must be in a single `<Code>` tag to render together:
```mdx
<Code>
```realtime_javascript
const channel = realtime.channels.get('channelName');
```

```realtime_python
channel = realtime.channels.get('channelName')
```

```rest_javascript
const channel = rest.channels.get('channelName');
```

```rest_python
channel = rest.channels.get('channelName')
```
</Code>
```

### Variables in Codeblocks

- `{{API_KEY}}`: Demo API key or user's key selector
- `{{RANDOM_CHANNEL_NAME}}`: Generated channel name

### Language-specific Content

Use `<If>` component for conditional content:
```mdx
<If lang="javascript,swift">
Content shown only for JavaScript and Swift.
</If>

<If lang="react">
React-specific content here.
</If>
```

### Admonitions

```mdx
<Aside data-type='note'>
Content here.
</Aside>
```

Available `data-type` values:
- `note` - General information
- `important` - Critical information (use sparingly)
- `further-reading` - Links to related content
- `new` - New feature announcement
- `updated` - Updated feature announcement
- `experimental` - Experimental feature warning

### Tiles

Use for navigation grids (for example, getting started pages):
```mdx
<Tiles>
{[
  {
    title: 'JavaScript',
    description: 'Start building with Ably\'s JavaScript SDK',
    image: 'icon-tech-javascript',
    link: '/docs/getting-started/javascript',
  },
  {
    title: 'Python',
    description: 'Start building with Ably\'s Python SDK',
    image: 'icon-tech-python',
    link: '/docs/getting-started/python',
  },
]}
</Tiles>
```

### Nested Tables (API references)

```mdx
<Table id='RoomOptions'>

| Property | Required | Description | Type |
| --- | --- | --- | --- |
| typing | optional | Config for typing | <Table id='TypingOptions'/> |

</Table>

<Table id='TypingOptions' hidden>

| Property | Required | Description | Type |
| --- | --- | --- | --- |
| heartbeatThrottleMs | optional | Min time between events | number |

</Table>
```

The `hidden` attribute prevents the table from rendering directly on the page, but it remains available for nesting via `<Table id='...'/>` references. This keeps type definitions accessible for nested display without duplicating content.

### Links

Internal links should start with `/docs`:
```mdx
[messages](/docs/channels/messages)
[Chat SDK](/docs/chat)
```

## Adding New Pages

When creating a new MDX page in `src/pages/docs/`, you must also add it to the navigation:

1. Create the MDX file with required frontmatter (title, meta_description)
2. Add the page to the appropriate navigation file in `src/data/nav/`:
   - `platform.ts` - Platform, auth, integrations, pricing
   - `pubsub.ts` - Pub/Sub, channels, messages, presence
   - `chat.ts` - Chat product
   - `spaces.ts` - Spaces product
   - `liveobjects.ts` - LiveObjects product
   - `livesync.ts` - LiveSync product
   - `aitransport.ts` - AI Transport product

Navigation entry structure:
```ts
{
  name: 'Section Name',
  pages: [
    {
      name: 'Page title in nav',
      link: '/docs/product/page-slug',
    },
  ],
}
```

## Updating SDK Versions

When an SDK version is bumped, update `src/data/languages/languageData.ts`. This file maps products to their SDK versions per language in the language selector:

```ts
export default {
  platform: {
    javascript: '2.16',
    python: '3.0',
    // ...
  },
  chat: {
    javascript: '1.1',
    react: '1.1',
    // ...
  },
  // ...
}
```

## Writing Style

See `writing-style-guide.md` for full details. Key points:

- Use International English (US spelling, no Americanisms)
- Use present tense and active voice
- Use second person ("you" not "we")
- Use imperative form for headings ("Configure the client" not "Configuring the client")
- Avoid em-dashes, Latin abbreviations (use "for example" not "e.g."), and slang
- Avoid bold prefixes in bullet points

## Testing

Tests use Jest with React Testing Library. Test files are colocated with source files as `*.test.tsx` or `*.test.ts`.

## Custom Skills

Custom slash commands live in `.claude/commands/`. Available commands:

- `/generate-guide` — Generate an AI Transport guide from example code. Usage: `/generate-guide guides/ai-transport/{provider}-{pattern}`

## CI/CD

- CI runs in CircleCI
- Add `review-app` label to PR for review deployment
- Tag `@team-deved` for review
