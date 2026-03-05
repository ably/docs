Generate an AI Transport guide from a running code example.

Argument: `$ARGUMENTS`

The argument is a path to an example directory, optionally followed by `branch:{name}`:

```
guides/ai-transport/openai-message-per-token
guides/ai-transport/anthropic-human-in-the-loop branch:AIT-489-examples
```

## 1. Parse the argument

Split `$ARGUMENTS` on whitespace. The first part is the example path. If a second part starts with `branch:`, extract the branch name.

Extract the provider slug and pattern from the path. The path format is `guides/ai-transport/{provider-slug}-{pattern}`.

Match the provider by checking which provider slug the directory name starts with (try longest match first to handle `lang-graph` before single-word slugs). Everything after `{provider-slug}-` is the pattern (for example `anthropic-human-in-the-loop` → provider=`anthropic`, pattern=`human-in-the-loop`).

Derive a display name from the pattern: replace hyphens with spaces and capitalize the first letter (for example `human-in-the-loop` → `Human-in-the-loop`, `message-per-token` → `Message per token`).

Provider mapping:

| Slug | Display name | API name | API docs | Env var |
|------|-------------|----------|----------|---------|
| openai | OpenAI | Responses API | https://platform.openai.com/docs/api-reference/responses | OPENAI_API_KEY |
| anthropic | Anthropic | Messages API | https://docs.anthropic.com/en/api/messages | ANTHROPIC_API_KEY |
| vercel | Vercel AI SDK | streamText | https://sdk.vercel.ai/docs | (varies) |
| lang-graph | LangGraph | stream | https://langchain-ai.github.io/langgraphjs/ | ANTHROPIC_API_KEY |

If the argument is empty, missing, or the provider prefix doesn't match a known provider, stop and show usage with valid provider slugs.

## 2. Read source files

If a branch was specified, fetch it first with `git fetch origin {branch}` then read files using `git show origin/{branch}:{path}` via Bash. Otherwise read directly from the local filesystem.

Discover and read source files dynamically:

1. List all files in `{path}/javascript/src/` and `{path}/javascript/test/` (use `ls` locally or `git ls-tree origin/{branch}:{path}/javascript/` when using a branch).
2. Read all `.ts` files found in both directories.
3. If no files are found, try `.mjs` and `.js` extensions, and try prefixing with `examples/`. If still nothing, stop and list the paths tried.

Identify agent vs client roles from the discovered source files:

- The file whose Ably connection sets `echoMessages: false` is the **agent** (server-side) code.
- The other source file is the **client** code.
- Common naming pairs: `publisher.ts`/`subscriber.ts`, `agent.ts`/`client.ts`, or other names depending on the pattern.

## 3. Read reference files

- Find and read an existing guide to use as a structural template. Try in order:
  1. Same pattern, different provider: glob `src/pages/docs/guides/ai-transport/*-{pattern}.mdx`
  2. Same provider, any pattern: glob `src/pages/docs/guides/ai-transport/{provider-slug}-*.mdx`
  3. Any existing guide: glob `src/pages/docs/guides/ai-transport/*.mdx` and pick one
- Read `writing-style-guide.md` for tone rules.
- Read `src/data/nav/aitransport.ts` for the current nav structure.
- Read `src/data/languages/languageData.ts` to confirm supported languages for aiTransport.

## 4. Generate the guide

Write to `src/pages/docs/guides/ai-transport/{provider-slug}-{pattern}.mdx`.

If the file already exists, warn and ask before overwriting.

Follow the structure of the existing guide you read in step 3 closely. Do not invent a new structure. Adapt the example source code into a step-by-step tutorial.

### Code blocks

This repo uses a dual language selector for guides. Agent (server-side) and client code have independent language dropdowns.

Agent code blocks use the `agent_` prefix:

```
<Code>
```agent_javascript
```
```agent_python
```
```agent_java
```
</Code>
```

Client code blocks use the `client_` prefix:

```
<Code>
```client_javascript
```
```client_swift
```
```client_java
```
</Code>
```

Shell blocks stay as plain `shell` but wrap them in `<If>` blocks per language.

### Conditional content

Use `<If>` with these props for language-specific prose:

- `<If agent_lang="javascript">` / `<If agent_lang="python">` / `<If agent_lang="java">`
- `<If client_lang="javascript">` / `<If client_lang="swift">` / `<If client_lang="java">`
- `<If client_or_agent_lang="javascript">` when something applies if either side uses that language

### Language translation

The source examples are JavaScript only. Translate to:

- Agent languages: JavaScript, Python, Java
- Client languages: JavaScript, Swift, Java

Follow SDK patterns from the existing guide you read. For Ably SDK specifics:

Python: `from ably import AblyRealtime`, `message.client_id`, `transport_params={'echo': 'false'}`
Swift: `import Ably`, `ARTRealtime(key:)`, actions are `.create`, `.messageAppend`, `.update`
Java: `import io.ably.lib.realtime.AblyRealtime`, `options.echoMessages = false`, actions are `MESSAGE_CREATE`, `MESSAGE_APPEND`, `MESSAGE_UPDATE`

For provider SDK translations (OpenAI/Anthropic/etc. in Python and Java), follow official SDK conventions. Check the existing guides for reference.

### Transformations from source code

- Strip TypeScript types
- Replace hardcoded API keys with `{{API_KEY}}`
- Replace hardcoded channel names with `{{RANDOM_CHANNEL_NAME}}`. Preserve any channel name prefix from the source code (for example if the source uses `ai:some-channel`, replace with `ai:{{RANDOM_CHANNEL_NAME}}`)
- Set `echoMessages: false` on the agent (server-side) connection, not on the client connection
- Use `.mjs` file extension for JavaScript files
- Separate agent and client into `ably-{provider}-agent/` and `ably-{provider}-client/` directories

### MDX conventions

- Frontmatter: title, meta_description, meta_keywords (all required)
- Title format: `Guide: {Provider} {pattern display name}` — derive from the pattern and source code purpose. Use the reference guide's title as a structural example.
- Headings: imperative form with anchors, for example `## Subscribe to tokens <a id="subscribe"/>`
- Code blocks wrapped in `<Code>` components
- Shell blocks in separate `<Code>` tags
- Admonitions: `<Aside data-type="note|important|further-reading">`
- Internal links start with `/docs/`

### Writing style

- Present tense, active voice, second person
- Imperative headings
- No em-dashes, no Latin abbreviations (use "for example" not "e.g."), no slang
- No bold prefixes in bullet points
- Single quotes for JS/TS strings (not JSON)
- Explain the why, not just the what

## 5. Update navigation

Edit `src/data/nav/aitransport.ts`. The Guides section uses nested provider groups:

```ts
{
  name: '{Provider display name}',
  pages: [
    { name: '{Pattern display name}', link: '/docs/guides/ai-transport/{provider-slug}-{pattern}' },
  ],
},
```

Use the pattern display name derived in step 1 (for example `Human-in-the-loop`, `Message per token`).

If a group for the provider already exists, add the page to it. If the group doesn't exist, create it. If the nav entry already exists, skip the update.

## 6. Verify

After generating, check:

- Frontmatter has title, meta_description, meta_keywords
- All headings are imperative with `<a id="..."/>` anchors
- Agent code uses `agent_` prefix, client code uses `client_` prefix
- `<If>` blocks use `client_lang`/`agent_lang`/`client_or_agent_lang` correctly
- Prerequisites split into "Agent setup" and "Client setup" subsections
- Shell commands wrapped in `<If>` blocks per language
- `{{API_KEY}}` and `{{RANDOM_CHANNEL_NAME}}` used, no hardcoded keys
- Agent (server-side) connection uses `echoMessages: false`, client does not
- Nav updated with correct link path
