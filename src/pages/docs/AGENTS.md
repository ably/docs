# Writing and reviewing Ably docs pages

Guidance for any agent creating, refreshing, or reviewing documentation pages
under `src/pages/docs/`. This file is auto-loaded when you edit pages here. For
MDX mechanics, navigation, and SDK versions see the repo-root `CLAUDE.md`; for
prose style see `writing-style-guide.md`. The `docs-execute-plan`, `docs-plan-pr`,
and `docs-review-*` skills apply and check this guidance.


## Docs Structure Guidance

## Why structure matters

Developers use docs to answer three questions, roughly in this order:

1. **Should I use this?** They need to understand what the product does and why it matters to them -- from the docs alone, without a landing page or sales conversation.
2. **How do I do the thing I came here to do?** They're looking for a page that matches their intent ("cancel a stream", "set up auth"), not one that matches our internal feature taxonomy.
3. **How do I handle this specific detail?** They need to go deep on one topic without wading through others.

Docs structure should serve all three. Navigation organised by developer intent, pages scoped to a single focus, and variant handling that doesn't multiply pages are the main tools for doing that.

---

## Principles

### 1. Docs stand alone for the buying decision

A developer arriving anywhere in the docs should understand why the product exists, what it enables, and be able to decide to use it. Don't assume they've seen a landing page, blog post, or demo. Technical explanation and value proposition are the same thing -- showing how something works IS the sales pitch.

### 2. Lead with what Ably guarantees

Ably's core value is infrastructure-level guarantees that developers would otherwise have to build themselves: low-latency delivery, guaranteed delivery (no silent message loss), and guaranteed ordering. These aren't background features -- they're the reason developers choose Ably over rolling their own. Every product page should make clear which of these guarantees apply and how the product upholds them. Don't bury them in a footnote or assume the reader already knows.

### 3. Simplicity is the product

Every page should reinforce that the product makes things simpler. The framing is always "you have this problem, and it disappears." The guarantees above are a key part of that: complexity the developer no longer has to handle.

### 4. One focus per page, structured by developer intent

Each page answers one question a developer actually asks: "how do I do X?", "how does Y work?", "what happens when Z?". Keep pages atomic -- don't bundle multiple concepts with conditional logic ("if you want X then do Y"). Separate pages are simpler, more findable, and easier to maintain.

A flat list of focused, atomic pages is a feature of the IA, not a problem to be solved by grouping. Resist the urge to nest pages into deep hierarchies -- if pages are well-titled and scoped to a single intent, a long flat list is more navigable than a deep tree. Some duplication across atomic pages is fine and expected; don't try to eliminate it by bundling or replacing content with cross-references.

At every decision point, default to the most common choice. Never present two equal options where one should be the default.

### 5. Variants are toggles, not navigation splits

Feature pages are variant-agnostic. Code examples adapt via client-side language, server-side language, and framework toggles. Don't create per-variant copies of feature pages -- this causes duplication and drift.

### 6. Self-contained product sections

Docs for a product should work without constantly navigating to other sections. Developers should be able to learn about pricing, limits, authentication, and key concepts within the product's docs section. Link out for deep dives where appropriate, but don't require it for core understanding.

### 7. Concepts before action, internals at the end

Developers need a mental model to make sense of features. Foundational concepts (how sessions work, what a turn is, how auth fits in) sit above getting-started and feature pages in the nav. Implementation internals (wire protocols, transport patterns) sit at the bottom for curious engineers. The ordering is: concepts → getting started → features → deep internals.

### 8. Inbound through excellence, not pollution

Docs serve the developer who has arrived. Don't distort page structure to rank for search terms. Problem-first inbound content (blog posts, tutorials) lives outside docs and drives developers to them.

### 9. Ship and iterate

Publishing and showing direction is more important than polish. Be explicit about what's shipped, what's partial, and what's planned. Stub pages are fine if they're honest about being stubs.

---

## Page structure for feature pages

The organising principle is **result first, code fast, detail later**. Pages use progressive disclosure in three tiers: understand → implement → detail. Developers who just need to see what the feature does and how to use it shouldn't have to scroll past implementation detail or edge cases.

### Tier 1: Understand (above the fold)

1. **Benefit statement with problem framing** -- one or two sentences. Lead with what the feature gives you; weave in what breaks or what's hard without it. This replaces a standalone "problem framing" section.
2. **Visual / demo** -- embedded GIF, interactive sandbox, or diagram showing the feature in action. Place it prominently -- at or near the top, not tucked below the code.
3. **Minimal code snippet** -- the "this is all you write" TL;DR. 3-10 lines with framework/language toggles. This serves evaluators ("is this simple?") and returning developers ("remind me of the API").

### Tier 2: Implement (one scroll down)

4. **Full implementation guide** -- server setup, client setup, and any integration steps. Working code for each supported language/framework with variant toggles.
5. **Customisation options** -- optional configuration, modes, and parameters.

### Tier 3: Detail (progressive disclosure)

6. **How it works** -- brief explanation of underlying mechanics. If a feature depends on another concept (e.g. turns, sessions), give a 1-2 sentence inline explanation with a link -- don't treat it as a prerequisite the reader must go and read first.
7. **Edge cases and FAQ** -- what happens in unusual scenarios, collapsible where possible.
8. **Related features** -- 1-2 line comparisons with links to similar or complementary features.
9. **API reference link**

### Template flexibility

This is the default structure. Some features are best explained by a demo (visual-first -- lead with the demo above the benefit statement) and others by a one-liner code sample (code-first -- lead with the snippet). Use the default unless the content clearly calls for a different lead. The three tiers and their ordering should stay consistent regardless of which element leads.

Problem framing is woven into each feature page. There is no separate "Problems" section in the docs.

---

## Developer journeys to keep in mind

When writing a page, consider which journey the reader is on:

| Journey | Typical path |
|---------|-------------|
| Evaluating ("What is this?") | Overview -> Why this product -> How it works -> Get started |
| Stack-first ("I use framework X, why do I need this?") | Framework guide -> Get started with that framework -> Features |
| Problem-first ("My X keeps breaking") | Why this product -> How it works -> Relevant feature page -> Get started |
| Use-case-first ("I'm building X") | Use case guide -> Relevant feature pages -> Get started |
| Returning developer ("I need to add feature Y") | Feature page -> API reference -> done |


## Page-type templates

Pick the template that matches the page you are writing. Templates describe *structure*, not literal headings — adapt each section heading to the specific page (see the writing-style guidance). These are distilled from the April 2026 wireframe workings used for the AI Transport refresh.

Pick the template that matches the page you are writing.

**Templates describe structure, not headings.** The numbered items below are the *section shape* — what each section covers and roughly in what order. They are not the literal H2 text for the page. A concept-page template item like "Problem statement" becomes a descriptive imperative on the page itself: `## Why Runs exist`, `## Why sessions exist`. "Model" becomes `## Understand the Run lifecycle`, `## Understand sessions and channels`. "Code proof" becomes `## Trigger a Run`, `## Attach to a session`. Adapt the heading to the specific concept; never copy the template label verbatim. Use imperative or descriptive verb phrases per the writing-style guide.

### Feature page

A feature page maps to one developer JTBD. The section order below distils the structural pattern feature pages follow.

1. **Layer-0 hook.** Two sentences, outcome → mechanism.
2. **UX sketch + JTBD one-liner.** Include the sketch where there is a discernible UX pattern; prose-only is acceptable when there is not (an architectural feature like concurrent-turns may not have a UX sketch).
3. **Minimal code sample.** Contrived, no auth boilerplate. `authUrl: '/auth'` placeholder where any auth is shown.
4. **"How it works" mechanism section.** Positive-forward. Architectural diagram if it earns its place.
5. **Implementation.** Server code, client code, verification-in-prose ("open the channel in the Ably dashboard to see…"), durable-execution guidance inline where applicable.
6. **Configuration / inline API reference.** Where applicable.
7. **Edge cases and unhappy paths.** Bullet list. Cover races, timeouts, drops, capability failures, partial state.
8. **FAQ.** Three to five real questions, each with a short answer.
9. **Related features.** Two to three hand-picked. No autogeneration.

### Concept page

Concept pages convey the mental model. The pattern is *problem → model → what the layer requires → code proof*.

1. **Intro + opening claim.** What this concept is, in two or three sentences.
2. **Problem statement** (one paragraph). The shape of the difficulty this concept solves.
3. **Model.** How the concept maps to Ably's primitives. Diagrams welcome.
4. **What this layer requires.** A properties table (ordering, persistence, accumulation, fan-out, multiplexing, bidirectional, mutable state — whichever apply). One row per property, with a "why it matters" cell.
5. **One code-proof sample.** Five to ten lines. Demonstrates the concept; does not teach the API surface. If you find yourself walking through method-by-method, move that to a feature or API reference page.
6. **Sub-sections** as needed for the concept (lifecycle, persistence model, sharing, materialisation, and so on).
7. **Read next.** Three to five links — adjacent concepts, the feature pages that build on this, the API reference for the primitive.

### Framework page

A page that explains how Ably composes with a third-party framework (Vercel AI SDK, Temporal, Inngest, and so on).

1. **What the framework brings.** A capability table — what the framework owns by design.
2. **What Ably adds.** A capability table for what Ably layers on. **Sibling framework pages** are pages in the same `frameworks/` sub-tree that compete for the same developer JTBD (for example, Vercel AI SDK UI alongside a future Temporal page). Align bullets across siblings where the capability genuinely overlaps so a reader can compare like for like. Introduce framework-specific rows where the integration shape differs. Do not force parity when one framework simply does not own that capability. Comparability is the goal, not forced parity.
3. **Where they connect.** The minimal integration code. The plug-in point (`ChatTransport`, codec, adapter).
4. **Scope and trade-offs.** Frame the framework's scope as intentional design. Never "the framework can't…".
5. **Read next.** Getting-started, sibling framework page, API reference for the integration.

### Positioning page

"Why X" or product-overview pages. They may lead with the problem, but they must turn positive by mid-page.

1. **One-sentence opening.** The shape of the product, not the problem.
2. **Problem statement** (one or two paragraphs). What current solutions miss.
3. **Pivot.** A clearly-marked "How Ably solves this" or equivalent capability section. Everything below the pivot is positive-forward.
4. **Comparison table** (optional). Direct HTTP vs durable sessions, default cache vs Ably, and so on. Each row is checkable.
5. **How Ably implements this.** The primitives that back the model — link out to concepts.
6. **Read next.** Getting-started + concepts.

### Getting started page

A walkthrough that ends with a working app.

1. **What you build.** Bulleted outcomes — "tokens stream over a durable session", "second tab joins the same session", "stop button cancels the turn". The reader knows what they will have at the end.
2. **Prerequisites.** Versions, accounts, API keys required.
3. **Install dependencies.**
4. **Set up authentication.** Link out to the auth concept/setup page. Show only the `authUrl: '/auth'` placeholder in client code.
5. **Server-side code.** The Ably-specific code, clean. No 40-line auth boilerplate.
6. **Client-side code.** The Ably-specific code, clean.
7. **Wire it together.** The minimal app shell.
8. **What is happening.** A four-bullet recap of the flow.
9. **Architecture pointer.** Two sentences linking out to the framework page or concept overview.
10. **Explore next.** Five links into features.

### Guide

End-to-end scenarios that combine multiple features ("building support chat", "building a copilot"). Larger than a feature page; assumes getting-started complete.

1. **What you build.** Bulleted outcomes — concrete UX behaviours.
2. **Step 1 to N.** Each step focuses on one feature or one piece of wiring. Cross-link to feature pages for depth.
3. **Production hardening.** A few production-specific notes for this scenario.
4. **Edge cases.** Scenario-specific edge cases.
5. **Read next.** Sibling guides, going-to-production, concept pages.

### Troubleshooting

Organised by subsystem (connection, auth, codec, turn lifecycle, and so on). Each page covers symptoms, root causes, confirmation steps, and fixes.

1. **Symptom-led headings.** "Channel will not attach", "Client keeps reconnecting", "Tokens delivered but in wrong order".
2. **For each symptom:** what the user sees → how to confirm the diagnosis → the fix.
3. **Cross-references** to the relevant feature/concept page at the end.

### Going to production

A single checklist page. Items inline. Cross-cutting only.

1. **Pricing pointer** (link to `/docs/platform/pricing`; never restate numbers — see writing-style-guide).
2. **Limits and quotas.**
3. **Monitoring and observability.**
4. **Auth hardening.**
5. **Data shipping / retention.**
6. **Compliance.**
7. **Deployment notes.**
8. **Cross-cutting edge-cases pointer** — "when adopting in production, also consider…" with links back to per-feature edge-case sections.

### API reference page

API reference pages have their own complete standard — they do not follow the other page-type templates. See the "API reference standard" section below for the full rules: frontmatter, page structure, anchor convention, visible-vs-hidden type tables, React hook sub-template, and verification.

### Internals page

For curious senior engineers. Register: precise, technical, no hand-holding. Diagrams + code + protocol detail.

1. **Intro.** What this internal subsystem is.
2. **Diagrams.** ASCII or PNG/SVG; depict the data flow, sequence, or structure.
3. **Mechanism walkthrough.**
4. **Cross-references** to the wire-protocol or codec reference where applicable.



## Code accuracy: verify against the SDK, not prior docs

Prior docs drift. The SDK is the source of truth.

### Workflow before writing any code snippet

1. Find the SDK version this docs page targets in `src/data/languages/languageData.ts`. That file is the canonical version registry, keyed by product and language. Use that exact version, not whatever npm currently labels `latest`. The page header reads from the same registry, so the code samples and the version badge stay aligned.
2. Pull the package at that version: `npm pack <package>@<version>` into a temp dir, extract, read the `.d.ts` files.
3. Cross-check the signatures, option shapes, and return types your snippet uses.
4. Where the SDK exposes both a core and a framework-bound entry point (for example `@ably/ai-transport` and `@ably/ai-transport/vercel`), pick the entry point your snippet's audience uses and follow its option shape.
5. After drafting, re-grep your file for any old patterns the SDK no longer supports.

### Documenting a pre-release SDK

If the docs page targets an SDK version that is not yet on npm:

1. Bump the version in `src/data/languages/languageData.ts` to the upcoming release.
2. Read the `.d.ts` files straight from the SDK repo. Check out the matching git tag or release branch (or use a local checkout if one is on disk), then read `dist/` or `src/`.
3. Write the docs against that source.
4. Flag the PR as gated on the SDK release. Merge only once the SDK version exists on npm and `languageData.ts` matches.

### Common drift patterns to check

Whenever an SDK has had a major refactor, sweep the docs for these patterns:

- Renamed factories (for example `createTransport` → `createClientTransport`).
- Hooks that changed from factory to context reader (for example `useClientTransport` going from `(options) => Transport` to `(options) => { transport, transportError }`).
- Methods that moved between objects (for example `transport.send` → `view.send`).
- Removed convenience hooks (for example `useEdit`/`useRegenerate`/`useSend` consolidated into methods on a `ViewHandle` returned by `useView`).
- Renamed option keys (for example `id` → `chatId`).
- Renamed enum/literal values (for example `TurnEndReason` going from `'completed' | 'failed' | 'cancelled'` to `'complete' | 'error' | 'cancelled'`).



## Verification checks

Run these from the repo root against the page(s) you changed before review. Expected result is zero hits on each. The review concern skills run the subset relevant to their dimension.

These greps cover the standards. Replace `<your-path>` with the page or section you wrote. The expected result is zero hits on each.

```bash
P=<your-path>  # e.g. src/pages/docs/ai-transport/features/

# Frontmatter completeness (no output = clean)
for field in title meta_description meta_keywords intro; do
  echo "Pages missing $field:"
  find "$P" -name "*.mdx" -exec grep -L "^$field:" {} \;
done

# No API keys in client code (excluding authUrl)
grep -rn -E "key\s*:\s*['\"][^'\"]+['\"]" "$P" | grep -v authUrl

# No "docs under construction" / WIP markers
grep -rni "under construction\|coming soon\|todo:\|wip\b" "$P"

# Every H2 carries an inline anchor (CLAUDE.md convention: `## Heading <a id="slug"/>`)
for f in "$P"/*.mdx; do
  total=$(grep -c "^## " "$f")
  anchored=$(grep -cE '^## .* <a id="[^"]+"' "$f")
  [ "$total" != "$anchored" ] && echo "$f: $anchored/$total H2s anchored"
done

# No em dashes (style guide forbids)
grep -rn "—" "$P"

# No bold-prefix bullets
grep -rnE "^\s*[\*\-]\s+\*\*[^*]+:\*\*" "$P"

# No "we" pronoun in prose
grep -rnE "\bwe\b" "$P" | grep -v "code\|//"

# No Latin abbreviations
grep -rnE "\b(e\.g\.|i\.e\.|etc\.)" "$P"

# No subjective phrases or vague modals
grep -rniE "easily|simple to|it's as easy|fire up" "$P"

# Internal link integrity (catches stale paths if you renamed any pages)
# Replace OLD_PATH with the old URL you replaced; expect zero hits outside redirect_from frontmatter.
grep -rn "OLD_PATH" "$P" | grep -v redirect_from

# FAQ count on feature pages (each should report 3-5)
for f in "$P"/*.mdx; do
  count=$(awk '/^## FAQ/,/^## /' "$f" | grep -c "^### ")
  echo "$f: $count FAQ entries"
done
```

For **API reference pages only**, run these additional checks:

```bash
A=<api-ref-path>  # e.g. src/pages/docs/ai-transport/api-reference/

# Per-interface API ref pages must NOT have intro: (navigational pages can)
# Edit the exclusion list to match the navigational pages in your product.
for f in "$A"/*.mdx; do
  case "$(basename $f)" in
    index.mdx|errors.mdx) continue ;;  # navigational pages
  esac
  if grep -q "^intro:" "$f"; then
    echo "$f: per-interface API ref page should not have intro:"
  fi
done

# Every hidden table must be referenced; every reference must have a definition
node -e "
const fs = require('fs'), path = require('path');
const dir = process.env.A;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.mdx')) continue;
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hidden = [...content.matchAll(/<Table id='([^']+)' hidden>/g)].map(m => m[1]);
  const visible = [...content.matchAll(/<Table id='([^']+)'>/g)].map(m => m[1]);
  const refs = [...content.matchAll(/<Table id='([^']+)'\\/>/g)].map(m => m[1]);
  for (const h of hidden) if (!refs.includes(h)) console.log(f + ': hidden ' + h + ' unreferenced');
  for (const r of refs) if (!hidden.includes(r) && !visible.includes(r)) console.log(f + ': ' + r + ' undefined');
}" 2>/dev/null

# Method headings should be verb phrases, not bare names like "## methodName"
# Flag suspiciously bare H2s (single camelCase or lowercase token):
grep -rnE "^## [a-z][a-zA-Z0-9]*\s*<" "$A"

# Returns sections that mention ErrorInfo without linking to its canonical home
# (replace 'errors#errorinfo' with the actual canonical anchor for your product)
grep -rn "ErrorInfo" "$A" | grep -v "errors#errorinfo" | grep -v errors.mdx
```



## API reference standard

API reference pages have their own complete standard, distinct from every other page type. The rules in this section apply **only** to API reference pages — they do not modify feature, concept, framework, positioning, getting-started, guide, troubleshooting, or internals pages. Those page types keep their templates exactly as written above.

The canonical live reference is the Chat API at `src/pages/docs/chat/api/javascript/` (chat-client.mdx, messages.mdx, room.mdx, connection.mdx). When this section and those pages disagree, the pages win — re-verify against them.

### File layout and frontmatter

- Pages live at `src/pages/docs/{product}/api/{language}/{page-slug}.mdx`. Multi-SDK products use `src/pages/docs/{product}/api/{language}/{sdk-variant}/{page-slug}.mdx` (e.g. `pub-sub/api/javascript/realtime/`). Each page covers one interface, class, or hook.
- Frontmatter on **per-interface pages**: `title`, `meta_description`, `meta_keywords` only. No `intro:`. No `redirect_from` unless the URL is changing.
- Frontmatter on **navigational / cross-cutting pages** (the API reference hub, the errors page): keep `intro:` per principle 14.
- No body H1. The title comes from frontmatter.
- Opening: one or two paragraphs describing the interface and how to access it, then an access-example `<Code>` block.

### Page structure (canonical order)

1. Intro paragraph(s) + access-pattern `<Code>` block.
2. `## Properties` H2 with a 3-column table `Property | Description | Type` (combined instance and static properties; note "Accessed on the class" in the Description cell for static properties).
3. Hidden tables for any types referenced by Properties, placed inline immediately after the section that first references them. Never collect hidden tables at the bottom.
4. One H2 per method, in roughly the order users discover them (constructor → setup → queries → teardown).
5. Per-method shape:
   - H2 heading using a **descriptive verb phrase** (`## Create a client transport`, `## Subscribe to messages`, `## Get message history`), not the bare method name. The `<a id="..."/>` anchor carries the programmatic name.
   - `<MethodSignature>{`signature`}</MethodSignature>` immediately under the heading. The template-literal form (`{` … `}`) is **required** when the signature contains `<` or `>` (most signatures do — generics, `Promise<T>`, etc.). Bare form only for signatures without angle brackets.
   - Multi-line description.
   - `<Code>` usage example.
   - `### Parameters <a id="{slug}-params"/>` H3 (only if the method has parameters), with a 4-column `Parameter | Required | Description | Type` table.
   - `### Returns <a id="{slug}-returns"/>` H3, with the backticked return type then one prose sentence. Skip entirely if the method returns `void` / `Unit`.
6. Hidden tables for types referenced by each method, inline next to that method.
7. Visible H2 sections only for the four cases in "Visible vs hidden type tables" below.
8. End with `## Example` showing end-to-end usage. Required on every per-interface page.

### Anchor convention

Anchors are shared across languages (even though the product may be JS-only today). The rule holds so future language additions can share anchors and cross-language deep links work.

- Method anchor = lowercase kebab-case of the JS method name. `subscribeAll` → `#subscribe-all`. `batchPublish` → `#batch-publish`. Single-word names just lowercase: `publish` → `#publish`.
- If a non-JS SDK renames the method, the **heading body** uses the language's native name, but the `<a id="..."/>` value stays the JS-canonical kebab anchor.
- Sub-section anchors under a method: `{method-slug}-params`, `{method-slug}-returns`.
- Helper-method anchors on a returned/nested type: `{TypeName}-{method}`, e.g. `PaginatedResult-hasNext`.
- Properties don't get individual anchors (they live inside the Properties table). If a specific property genuinely needs to be linked from elsewhere, give it its own H3 with an anchor.

### Visible vs hidden type tables

Three table forms:
- `<Table id='X'>` — visible inline render. Also registers for nesting.
- `<Table id='X' hidden>` — registered only; renders nothing until referenced.
- `<Table id='X'/>` — self-closing reference; renders an expandable inline pointer to a registered `X` table.

**Default to hidden.** Type definitions live as `<Table id='X' hidden>` and are referenced inline via `<Table id='X'/>` from the Type column of the table that first uses them.

**Promote a type to visible only if** at least one applies:

1. **Canonical error type** (`ErrorInfo` or equivalent). Visible H2 on the page that's the error type's home; lowercase anchor (`errorinfo`). Every method's Returns links to it cross-page.
2. **Type has methods that need their own anchors.** Three sub-patterns:
   - **Pattern A — child of Returns:** when returned by exactly one method on the page. Type lives under that method's `### Returns`. Two variants:
     - **A.1:** Intermediate `#### TypeName <a id="TypeName"/>` heading, properties table, then methods as `##### {Method name}` H5s with `<MethodSignature>` and short description. Use when the type has properties or 3+ methods.
     - **A.2:** No intermediate type heading; methods sit as `#### {Method name}` H4s directly under `### Returns`. Use only when the type has no properties and 1–2 self-explanatory methods.
   - **Pattern B — standalone H2:** when the type is returned by multiple methods, or is a first-class named type. `## TypeName <a id="TypeName"/>` with `### Properties` and `### {method}` H3s anchored `TypeName-method`. The `### Properties` H3 heading is required whenever the type has methods.
   - **Pattern C — per-method duplication:** when two methods return the same single-method type. Each method's Returns duplicates the type docs with collision-avoiding anchors.
3. **Return type with no Type-column home, exactly one such table.** Use the "visible-without-H2" pattern: a visible `<Table id='X'>` directly inside the relevant `### Returns` subsection, no H2 heading.
4. **Pragmatic size exception** (e.g. `ClientOptions` with 30+ properties). Visible H2 once on the client page; referenced elsewhere via inline `<Table id='X'/>` when the type is also hidden-duplicated on the other page.

Everything else is hidden.

### Cross-page type sharing: duplicate, don't link

For a type referenced from a page other than its owner, **duplicate the hidden table definition** on the consuming page. Do not cross-page-link to a hidden anchor — it has no DOM target. Pay the drift cost in exchange for self-contained pages.

### Prose conventions

- Don't write same-page markdown anchor links to type anchors (`[X](#X)`). Backtick the type name (`` `ChannelStateChange` ``) — readers find the inline-expandable definition via the Type column.
- Cross-page link to the type's own **page** (not anchor) when the type has its own page: `[Message](/docs/{product}/api/{language}/message)`.
- Cross-page link to the canonical error type uses the lowercase anchor: `[ErrorInfo](/docs/{product}/api/{language}/errors#errorinfo)`.
- Returns prose pattern: backticked type then one sentence linking the error case. Example: "`Promise<Message>`. Returns a promise. The promise is fulfilled with the sent `Message`, or rejected with an [`ErrorInfo`](...) object."
- Backtick type names whenever they appear in prose. Don't make them links unless the link points to the type's own page.

### Table conventions

| Table purpose | Columns |
|---|---|
| Properties on an interface/class/hook | `Property \| Description \| Type` (3 cols) |
| Method or hook parameters | `Parameter \| Required \| Description \| Type` (4 cols) |
| Enum / status values | `Value \| Description` (2 cols) |
| Hook return objects | `Property \| Description \| Type` (3 cols) |

Table IDs are PascalCase and describe the content: `{InterfaceName}Properties` for the main properties table, `{MethodSlug}Parameters` for method params, `{TypeName}` for nested type definitions (no suffix). Every `<Table id='X'>` must be unique within a page.

### React hook pages

React hook pages use a distinct sub-template. One page per hook (e.g. `api/react/use-view.mdx`), plus a `providers.mdx` for the providers (`TransportProvider`, `ChatTransportProvider`). `react/` is a sibling of `javascript/` under `api/`, not nested inside it — the canonical layout is `api/{javascript,react,kotlin,...}/`.

Each per-hook page shape:

1. Opening prose + access-pattern `<Code>` block.
2. Provider-prerequisite note immediately after the access block: "This hook must be used within a [`TransportProvider`](...)."
3. `## Parameters` H2 right after the intro, documenting the hook's options object (4-column table).
4. Single top-level `## Returns` H2 with a 3-column property table for the return object.
5. One H2 per function or value in the return object, with `<MethodSignature>` describing the function shape.
6. `## Example` at the bottom.

Code fence is `react`, not `tsx` or `jsx`.

Hooks don't have a "Properties" section — they don't have properties. The `## Parameters` and `## Returns` sections at the top replace it.

React-specific shared types (like `ErrorInfo`) live on the relevant non-hook page. Reference via cross-page link.

### Client / constructor pages

Same skeleton as other API reference pages, with these specifics:

1. Intro + access example.
2. `## Properties` H2 (combined instance and static properties; "Accessed on the class" for static).
3. Constructor as `## Create a new {client} <a id="constructor"/>` with `<MethodSignature>` per overload. For Kotlin / Swift factory functions, write "factory function" rather than "constructor".
4. `ClientOptions` (or equivalent) as pragmatic-size visible H2 if large. Place after the constructor.
5. Hidden tables for nested types referenced by `ClientOptions`, inline below it. If `ClientOptions` references types defined on another page, duplicate them as hidden tables here.
6. Other return types from methods on this page use the visible-without-H2 under Returns pattern where the type has no natural Type-column home.
7. `## Example` at the bottom.

### Mandatory audit before review

Every hidden table must have at least one inline reference on the same page, and every inline reference must have a matching definition. A simple Node script catches both:

```bash
node -e "
const fs = require('fs'), path = require('path');
const dir = 'src/pages/docs/{product}/api/{language}';
for (const f of fs.readdirSync(dir)) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hidden = [...content.matchAll(/<Table id='([^']+)' hidden>/g)].map(m => m[1]);
  const visible = [...content.matchAll(/<Table id='([^']+)'>/g)].map(m => m[1]);
  const refs = [...content.matchAll(/<Table id='([^']+)'\\/>/g)].map(m => m[1]);
  for (const h of hidden) if (!refs.includes(h)) console.log(f + ': hidden ' + h + ' unreferenced');
  for (const r of refs) if (!hidden.includes(r) && !visible.includes(r)) console.log(f + ': ' + r + ' undefined');
}"
```

Expected: zero output. A hidden table with no inline reference renders nothing. A reference with no definition is a silent broken link.

### Common pitfalls

- **Promoting types to visible because something happened to need a link.** Fix the prose first (drop the link, use backticks). Only promote when a criterion in "Visible vs hidden type tables" applies.
- **Forgetting to duplicate cross-page-referenced types.** A hidden type on page A needed inline on page B must be defined as a hidden table on **both** pages.
- **Per-language anchors instead of shared.** Use the JS-canonical kebab anchor on every language page, even when the method has a different native name.
- **Table ID collisions.** Every `<Table id='X'>` must be unique within a page.
- **Markdown links to hidden table IDs.** They produce a text link with no DOM anchor. Rewrite to backticks or page-level links.
- **Skipping heading levels** (no H2 → H4) breaks the visual hierarchy and the auto-generated page nav.

### Navigation pattern

Multi-language API references use a per-language sub-tree in the nav (`JavaScript`, `React`, `Kotlin`) with plain `{ name, link }` entries. Do not add a `languages: [...]` array — those are only used by the legacy multi-language section. For products with multiple SDK variants (Realtime vs REST), the nav uses `JavaScript (Realtime)`, `JavaScript (REST)`, etc. as the sub-tree labels.

