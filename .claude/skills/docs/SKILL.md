---
name: docs
description: Write or improve MDX documentation pages for the Ably docs site. Follows the project's doc principles, page design patterns, writing style guide, and MDX conventions.
---

# Writing Documentation

Write MDX documentation for the Ably docs site (ably.com/docs). This skill covers
creating new doc pages, improving existing ones, and reviewing docs for
consistency with the project's principles and voice.

## Before writing

1. **Read the source code** for whatever you're documenting. Never document
   from memory or assumption - read the implementation, the types, and the
   tests. The code is the source of truth.

2. **Read related existing docs** in `src/pages/docs/` to understand what's
   already covered and avoid contradictions. Check for pages that should
   cross-reference the new content.

3. **Identify the single intent** of the page. Each page answers one question
   or enables one task. If the page covers two distinct developer intents,
   it should be two pages.

4. **Read `writing-style-guide.md`** for tone and language rules.

5. **Read the CLAUDE.md** for MDX formatting conventions (code blocks,
   admonitions, conditional content, frontmatter, navigation).

6. **Load product-specific context** if available. Check
   `.claude/skills/docs/context/` for IA documents, wireframes, and design
   principles specific to the product you're documenting. Read all relevant
   context files before writing.

## Doc principles

### Humans first, agents second

The first one to two folds of every page are designed for humans - what this
is, why it matters, how Ably makes it easier. Technical detail, edge cases,
and API specifics live lower on the page. Humans need the narrative up top.

### Progressive disclosure tiers

Each page has clear tiers. A developer can stop reading at any tier and have
gotten value:

1. **Understand** - what is this, why does it matter, how does it work (1-2 folds)
2. **See it** - minimal code + live example
3. **Build it** - full implementation guide (server, client, framework-specific)
4. **Go deep** - configuration, API reference, internals, edge cases, FAQ

### Feature pages are positive-forward

Feature pages lead with how Ably solves the problem, not with what's broken.
The developer's first impression should be "this is elegant." Traditional
architecture context is a lightweight aside - an `<Aside>` callout, two
sentences, no code, no diagram. Problem-first framing lives on concept pages,
not feature pages.

### Concept pages convey what a layer requires

Concept pages name the technical properties the layer needs and connect each
to why it matters. This builds the picture of why this is a dedicated layer.
The pattern is: problem -> model -> what this requires -> code proof.

### Concept pages don't teach features

Concept pages show what an abstraction *is* and what it requires. Feature
pages show what you *do* with it. The concept page is the stable mental
model; feature pages evolve as capabilities ship.

### Minimal code shows what Ably does, not setup boilerplate

The first code sample on any page is contrived and minimal. It shows the
specific capability with everything else stripped away. No auth setup, no full
app scaffolding. The runnable implementation comes later.

### Atomic pages, duplication is fine

Each page has one clear focus. Duplication across pages is preferred over
forcing developers to mentally unpack a page covering multiple concepts. When
you duplicate, keep the duplicated content minimal and focused on the current
page's intent.

### Link back to concepts, don't require them

Feature pages reference concepts with 1-2 line inline explanations and "learn
more" links. A developer should never need to leave the feature page to
understand it.

### Client and server are distinct concerns

Feature pages should show code for both sides. Server code and client code are
separate concerns and should be presented separately with their own context.

### Honest about status

Be explicit about what's supported, what's partial, and what's planned.
Never claim a feature works if the implementation is incomplete. Mark
unimplemented features clearly.

## Voice and style

### Opening sentence

The first sentence of every page defines the concept or capability in one
direct, declarative statement. No preamble, no "In this guide, we'll..."

### Tone

- **Confident and direct.** State what happens, not what "should" or "might"
  happen. "The stream closes" not "the stream should close."
- **Technical but accessible.** Assume the reader is a competent developer
  but not an Ably expert. Explain Ably-specific concepts briefly on first use.
- **No marketing language.** No "powerful", "seamless", "easy-to-use",
  "robust." The technical explanation IS the value proposition.
- **No hedging.** Don't say "you may want to" or "consider using." Say
  "use X when Y."

### Writing style rules

Follow `writing-style-guide.md` and the key rules in CLAUDE.md:

- Use International English (US spelling, no Americanisms)
- Present tense and active voice
- Second person ("you" not "we")
- Imperative form for headings ("Configure the client" not "Configuring the client")
- No em-dashes, no Latin abbreviations (use "for example" not "e.g."), no slang
- No bold prefixes in bullet points

## Structure patterns

### Feature pages

1. **Opening definition** - one sentence that defines what this is
2. **How it works** - mechanism, positive-forward, how Ably makes this simple
3. **Minimal code** - the simplest example showing the capability
4. **Lightweight aside** - "Traditionally you'd need..." in an `<Aside>` (2 sentences max)
5. **How to implement** - full server and client code, framework-toggled
6. **Configuration and API reference** - options tables, links to reference
7. **Edge cases** - what happens in non-obvious situations
8. **FAQ** - common questions and gotchas
9. **Related features** - links to related pages

### Concept pages

1. **Opening definition** - what this abstraction is and why it exists
2. **Problem framing** - what's missing without this layer
3. **Model** - how the pieces fit together (diagrams)
4. **What this layer requires** - properties table with "why it matters" column
5. **Code proof** - minimal code showing all of that in one line
6. **Capabilities** - links to feature pages this concept enables

### Getting started / quickstart pages

1. **Opening sentence** - what you'll build and which integration path
2. **Prerequisites** - what you need before starting
3. **Numbered steps** - each step with complete code
4. **What's happening** - brief explanation linking to concept pages
5. **Next steps** - links to feature pages

### Framework guide pages

1. **Opening sentence** - what the framework provides and what Ably adds
2. **What each layer does** - side-by-side comparison
3. **How they fit together** - architecture diagram + before/after code
4. **What this unlocks** - problems that go away + new capabilities
5. **What to read next** - routing cards to quickstart, features, concepts

## MDX conventions

This is a Gatsby-based MDX site. Follow the conventions in CLAUDE.md:

### Frontmatter (required)

```yaml
---
title: "Page title"
meta_description: "SEO description"
meta_keywords: "keyword1, keyword2"
---
```

### Code blocks

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

For agent/client SDK variants, use the `agent_` and `client_` prefixes:

```mdx
<Code>
```agent_javascript
// server-side code
```

```agent_python
# server-side code
```
</Code>
```

### Conditional content

Use `<If>` for language-specific prose:

```mdx
<If lang="javascript,swift">
Content shown only for JavaScript and Swift.
</If>
```

For agent/client language conditions:

```mdx
<If agent_lang="javascript">Agent-side JS content</If>
<If client_lang="swift">Client-side Swift content</If>
```

### Admonitions

```mdx
<Aside data-type='note'>
Content here.
</Aside>
```

Use `<Aside>` for the lightweight "traditionally you'd need..." callouts on
feature pages. Available types: `note`, `important`, `further-reading`, `new`,
`updated`, `experimental`.

### Variables in code blocks

- `{{API_KEY}}` - demo API key or user's key selector
- `{{RANDOM_CHANNEL_NAME}}` - generated channel name

### Headings with anchors

```mdx
## Subscribe to messages <a id="subscribe"/>
```

### Internal links

Always start with `/docs`:

```mdx
[messages](/docs/channels/messages)
```

## Adding new pages

When creating a new MDX page in `src/pages/docs/`:

1. Create the MDX file with required frontmatter
2. Add the page to the appropriate navigation file in `src/data/nav/`
3. Read the existing nav file first to understand the structure

## Code examples

- **Complete but minimal.** Every example should make sense on its own.
  Include imports when the import path matters.
- **Show the recommended approach first.** The first code block should be
  the thing most developers will actually write.
- **Real types, real methods.** Use the actual API, not pseudocode.
- **Comments explain the non-obvious.** Don't comment `// cancel the turn`
  above `turn.cancel()`.

## Cross-references

Link densely, not just at the end. Every mention of a concept that is
explained elsewhere should be an inline link at first mention. Don't rely on
a trailing "See also" paragraph.

## Tables

Use tables for structured comparisons - options, event types, error codes,
property tables. Tables are scannable and dense. Prefer a table over a bullet
list when comparing properties across items.

## What NOT to do

- **Don't write "Introduction" sections.** The opening paragraph IS the
  introduction.
- **Don't summarize at the end.** The page is short enough to not need it.
- **Don't add meta-commentary.** No "This is an advanced topic" or "This
  section assumes you've read X."
- **Don't use admonitions excessively.** A page with five callouts has poor
  structure. Restructure so the information flows naturally.
- **Don't document internal implementation details** on feature pages. Feature
  pages explain what happens and how to use it.
- **Don't invent API surface.** Only document what exists in the source code.
- **Don't simplify interface signatures.** Include all parameters and mark
  optional fields with `?`.
- **Don't use concepts without explaining or linking them.** Every technical
  term must be either defined inline or linked at first mention.

## Review checklist

After writing a doc page, verify:

**Content accuracy:**

- [ ] Code examples use real API surface and are copy-pasteable
- [ ] Interface signatures match the source exactly
- [ ] No undocumented or invented API surface
- [ ] `{{API_KEY}}` and `{{RANDOM_CHANNEL_NAME}}` used, no hardcoded values

**Structure and style:**

- [ ] Opening sentence defines the concept in one direct statement
- [ ] Feature pages lead positive-forward (how it works, not what's broken)
- [ ] Progressive disclosure - value at every tier
- [ ] Both client and server sides shown (for feature pages)
- [ ] No marketing language, no hedging, no meta-commentary
- [ ] Tables used for structured comparisons
- [ ] Headers are imperative and work as a scannable table of contents

**MDX conventions:**

- [ ] Frontmatter has title, meta_description, meta_keywords
- [ ] All headings have `<a id="..."/>` anchors
- [ ] Code blocks wrapped in `<Code>` components
- [ ] `<If>` blocks used for language-specific content
- [ ] Internal links start with `/docs/`
- [ ] Navigation updated in `src/data/nav/`

**Cross-references:**

- [ ] Links to related pages at first mention of concepts
- [ ] All link paths are correct and point to existing pages
