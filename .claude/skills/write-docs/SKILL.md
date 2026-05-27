---
name: write-docs
description: Write or refresh an Ably documentation page in this repo. Use when creating a new MDX page, rewriting an existing one, or applying the page-design principles to docs work. Captures the principles, page-type templates, writing standards, and code-accuracy checks distilled from the April 2026 wireframe workings used for the AI Transport refresh.
---

## How to use this skill

This skill is the distilled rulebook for writing Ably docs in this repo. Read it before starting a draft. Apply the per-page-type template to your draft. Run the verification checks before review.

The principles are aimed at the human reader first and the AI agent second. The writing standards are aimed at not sounding like AI.

## Required reading

Read these in-repo references before you draft. The skill **does not duplicate them**.

- [`CLAUDE.md`](../../../CLAUDE.md) — repository conventions: MDX components, frontmatter, code blocks, `<Aside>`, `<Tiles>`, `<Table>`, language toggles, nav files. The "Content Formatting (MDX)" and "Writing Style" sections are load-bearing.
- [`writing-style-guide.md`](../../../writing-style-guide.md) — Ably house style: International English, present tense, active voice, second person, imperative headings, sentence case, no em dashes, no bold-prefix bullets, no Latin abbreviations, no subjective phrases, no vague modals, no slang, no pricing detail in technical docs.

When this skill conflicts with `CLAUDE.md` or `writing-style-guide.md`, those win. Flag the conflict.

## Principles (read these once; apply them every time)

Eighteen principles govern Ably docs pages, distilled from the AI Transport wireframe workings (April 2026). Three groups: general (apply to every page), page-specific (depend on page type), and mechanical (binary checks).

### General

1. **Humans first, agents second.** Narrative and outcome up top; technical detail and API specifics lower on the page where agents still find them.
2. **Progressive disclosure.** Each page has clear tiers — Understand → See it → Build it → Go deep. A reader can stop at any tier and have gotten value.
3. **Minimal first code sample.** Contrived, no setup boilerplate, no auth scaffolding. Demonstrate the one capability. Runnable implementation comes later.
4. **Link to concepts, don't require them.** Reference concepts inline with one or two lines of explanation plus a "learn more" link. A reader should not need to leave the page to understand it.
5. **Primary audience: developers and senior engineers.** Product readers are secondary — accessible enough to evaluate, written for engineers.
6. **We enable user experience.** Show what the API makes possible for end users, not just what the API exposes. Avoid pure feature-listing.
7. **Visual type matches page type.** Feature pages use UX interaction sketches. Concept, positioning, and infrastructure pages use architectural/flow/state diagrams. UX visuals on a concept page read as marketing and undermine credibility.

### Page-specific

8. **Feature pages lead with the mechanism.** The first heading is "How it works", not "the problem with X". Lead with how Ably solves the job; problem framing is a lightweight aside or lives on the concept page.
9. **Concept pages convey what the layer requires.** The pattern is *problem → model → what this layer requires → code proof*. Name the technical properties (ordering, persistence, accumulation, fan-out, presence) and why each matters.
10. **Concept pages do not teach features.** One minimal code-proof sample max. No API surface walkthrough. If a concept page drifts into method-by-method content, it stops being a concept page and the feature pages around it feel thin.
11. **Features map to jobs to be done.** Each feature page maps to what a developer is trying to accomplish ("barge-in" = "let my users change direction mid-response"). Page names and intros use the JTBD framing.
12. **Framework pages: intentional design framing, not "missing features".** Frame the framework's scope as a deliberate boundary the framework chose, and Ably as the layer that fills the gap. Never "the framework can't do X" — always "the framework intentionally doesn't do X". Sibling framework pages (for example UI vs Core) use verbatim-aligned capability bullets.
13. **Positioning pages: open problem-first, turn positive.** "Why X" pages may lead with the problem, but must pivot to the capability section by mid-page. Pages that stay defensive end-to-end become gripe lists, not pitches.

### Mechanical (binary, agent-checkable)

14. **Layer 0 hook in the first 5 seconds.** Every page opens with a hook that answers "what is this, why should I care?". The `intro:` frontmatter feeds the auto-generated PageHeader; the body's first paragraph reinforces it. On feature pages, the hook is two sentences: outcome first ("Your users can change direction mid-response"), mechanism second ("AI Transport's session layer lets a client cancel and re-prompt without breaking the stream"). **Per-interface API reference pages are the one exception**: they drop `intro:` and let the opening paragraph carry the hook. Navigational API pages (the API reference hub, the errors page) keep `intro:` like every other page type. See the `## API reference pages` section for the full standard.
15. **Cover unhappy paths.** Every feature page has an edge-cases section. Race conditions, timeouts, network drops, capability-missing failures, what happens when the LLM errors. This is what separates trusted docs from marketing.
16. **FAQ with three to five real entries on feature pages.** Surface what developers actually ask. Do not pad to meet a count.
17. **No API keys in client code.** Ever. Use `authUrl: '/auth'` as the placeholder and link out to `concepts/authentication` (or the equivalent setup page) once.
18. **Visual rhythm.** Diagram, code block, card layout, or icon table every few paragraphs. No walls of text.

### Cross-product orientation

AI Transport is the testbed for the new principles. Other Ably products will align over time. Diverge from Chat / LiveObjects / Pub-Sub patterns where these principles demand it; do not contort an AIT page to match an older Pub-Sub convention. Note the divergence in the PR description so the wider docs can track.

## Page-type templates

Pick the template that matches the page you are writing.

### Feature page

A feature page maps to one developer JTBD. Use the canonical wireframe as the structural reference. The section order:

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
2. **What Ably adds.** A capability table — what Ably layers on. Use verbatim-aligned bullets across sibling framework pages.
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

A walkthrough that ends with a working app. Walkthrough only — prompts-as-docs is a future enhancement, not in scope yet.

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

API reference pages have their own complete standard — they do not follow the other page-type templates. See the `## API reference pages` section below for the full rules: frontmatter, page structure, anchor convention, visible-vs-hidden type tables, React hook sub-template, and verification.

### Internals page

For curious senior engineers. Register: precise, technical, no hand-holding. Diagrams + code + protocol detail.

1. **Intro.** What this internal subsystem is.
2. **Diagrams.** ASCII or PNG/SVG; depict the data flow, sequence, or structure.
3. **Mechanism walkthrough.**
4. **Cross-references** to the wire-protocol or codec reference where applicable.

## API reference pages

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

## Code accuracy: verify against the SDK, not against prior docs

Prior docs drift. The SDK is the source of truth.

### Workflow before writing any code snippet

1. Find the latest published version of the SDK you are documenting: `npm view <package>` for `latest` and the repo URL.
2. Pull the package: `npm pack <package>@<version>` into a temp dir, extract, read the `.d.ts` files.
3. Cross-check the signatures, option shapes, and return types your snippet uses.
4. Where the SDK exposes both a core and a framework-bound entry point (for example `@ably/ai-transport` and `@ably/ai-transport/vercel`), pick the entry point your snippet's audience uses and follow its option shape.
5. After drafting, re-grep your file for any old patterns the SDK no longer supports.

### Common drift patterns to check

Whenever an SDK has had a major refactor, sweep the docs for these patterns:

- Renamed factories (for example `createTransport` → `createClientTransport`).
- Hooks that changed from factory to context reader (for example `useClientTransport` going from `(options) => Transport` to `(options) => { transport, transportError }`).
- Methods that moved between objects (for example `transport.send` → `view.send`).
- Removed convenience hooks (for example `useEdit`/`useRegenerate`/`useSend` consolidated into methods on a `ViewHandle` returned by `useView`).
- Renamed option keys (for example `id` → `chatId`).
- Renamed enum/literal values (for example `TurnEndReason` going from `'completed' | 'failed' | 'cancelled'` to `'complete' | 'error' | 'cancelled'`).

## Writing standards (the parts that catch people out)

`writing-style-guide.md` is the source of truth. The standards below are the ones most commonly violated in AI-assisted drafts.

### Banned outright

- **Em dashes.** Use commas, full stops, or restructure. Em dashes are an AI fingerprint and the style guide forbids them.
- **Bold-prefix bullets.** No `**Feature:** description` shape. Another AI fingerprint.
- **Latin abbreviations.** Use "for example", "that is", "and so on" instead of `e.g.`, `i.e.`, `etc.`.
- **Subjective phrases.** No "easily", "simply", "it's as easy as that". Show the steps; let the reader judge.
- **Vague modals where definite language fits.** No "might", "would", "should" when stating a fact.
- **Slang and idiomatic phrases.** No "you're good to go", "fire up the server", "hit the button".
- **"We" as the subject.** Use "you" for the reader, "Ably" for the company. Never "we".
- **Pricing detail.** Link to `/docs/platform/pricing`; do not restate numbers in technical docs.
- **API keys in client code.** Always.

### Required

- International English (US spelling, Americanisms removed). Merriam-Webster as the dictionary.
- Present tense, active voice. "The client creates the connection", not "the connection is created".
- Imperative headings. "Configure the client", not "Configuring the client". FAQ entries phrased as questions are the only exception.
- Sentence case headings, except for product names and titled works.
- Numbers under ten generally spelled as words ("two minutes", not "2 minutes"). Larger numbers stay as numerals.
- Each sentence in a bulleted list ends with a full stop. Single-word bullets do not.
- Code fences are preceded by a colon with a blank line between the colon and the fence. Headings never sit directly above a code block; introductory text always follows the heading.
- JavaScript and TypeScript code uses single quotes for strings (excluding JSON).

### Asides (`<Aside data-type='...'/>`)

Sparingly. `important` only for production-blocking issues. `note` for genuine context. `new` for newly-added features. Default to no aside — prose carries the emphasis. Decorative asides get purged on review.

### Layer-0 hook patterns

Concept page: outcome-claim sentence, then mechanism. Example: "A session is the durable, shared state of a conversation. It outlives any single connection so a user can close their laptop, switch to a phone, or refresh the page without losing the stream."

Feature page: outcome sentence + mechanism sentence. Example: "Your users can change direction mid-response. AI Transport's session layer lets a client cancel the in-progress turn and start a new one without breaking the stream."

Both patterns survive review when they sound like a person writing — not Mad Libs ("Your users can [X]. AI Transport's [Y] layer lets [Z].").

### Patterns to strip after the first draft

These are the AI-writing patterns that surfaced repeatedly during the AI Transport refresh and that have to be cut. They overlap with the `/deslop` skill (`~/.claude/skills/deslop/SKILL.md`) — run it if you have it installed, but the rules below are the load-bearing ones for this repo. Re-read your draft against each.

- **Corrective antithesis.** "Not X. But Y." constructions that set up something the reader never assumed and correct it for drama. Just say what you mean. Example to cut: "Cancellation isn't a connection-level operation. It's a turn-level signal." → "Cancellation is a turn-level operation."
- **Dramatic pivot phrases.** Cut "But here's the thing", "Here's the catch", "Here's what most people miss", "Here's the bind". Fold the point into the sentence.
- **Soft hedging.** Cut "It's worth noting that", "Something we've observed", "This is where X really shines", "It's important to remember". Say the thing.
- **Throat-clearing intros.** No "Let's explore", "Let's dive in", "Let's break it down", "In this article we'll", "First, let's understand". The page header is the title; the first paragraph lands the reader in the middle of the topic. The Layer-0 hook is incompatible with throat-clearing.
- **Gift-wrapped endings.** Cut "In summary", "In conclusion", "Ultimately", "Moving forward", "At the end of the day". Pages end with the Related features list, the Read next links, or the last substantive paragraph. They do not restate themselves.
- **Generic examples.** "Imagine an e-commerce app" or "consider a chat application" with no specific behaviour is filler. Use concrete, specific examples that name a real behaviour ("a user closes their laptop and picks up their phone", "a tool that takes longer than the agent's runtime budget", "two devices submitting the same approval at the same time").
- **Overexplaining the obvious.** Developers know what an HTTP request, a WebSocket, a React hook, a JWT, and the `await` keyword are. Don't define them. State the specific behaviour the reader needs to know about this surface.
- **Audience-aware cuts.** Once you have established the audience (developers and senior engineers, per principle 5), cut explanations of things they already understand. Restating known concepts to fill space makes the writer look unsure of their reader.
- **Copy-paste metaphors.** If the same metaphor or framing phrase appears more than twice, vary it. "Drop-in", "the session as the anchor", "the layer that fills the gap" each get used once and stay specific.
- **Staccato runs.** Avoid stacks of short sentences with no variation. ("Sessions are durable. They persist. They survive disconnects. They span devices.") Combine some; let others stretch. Rhythm should follow thinking, not a drumbeat.

### Patterns the SDK source taught us to keep

A few patterns are worth keeping when they earn their place:

- Fragments are fine when the rhythm asks for one. "No application code needed." is a complete-enough thought.
- Starting a sentence with "And" or "But" is fine sparingly.
- A comma splice that reads well is acceptable.
- Use judgment. If a sentence reads better with a "rule break", leave it. The goal is prose that sounds like a person wrote it.

## Per-page workflow

1. **Identify the page type.** Pick the matching template above.
2. **Draft the prose against the template.** Keep it tight.
3. **Verify every code snippet against the actual SDK.** See the code-accuracy section.
4. **Strip AI-writing patterns.** Re-read against the "Patterns to strip after the first draft" list.
5. **Self-check against the verification greps below.**
6. **Open the PR.** Reviewer (not the writer) reviews against this skill and the writing-style guide.

## Verification (run from the repo root before review)

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

## Reviewer checklist

When reviewing someone else's docs PR (or your own at PR time), walk this list. Each item is a yes/no check.

**Page shape**

1. The page type is identifiable from the structure (feature / concept / framework / positioning / getting-started / guide / troubleshooting / API reference / internals).
2. Layer-0 hook present and not Mad Libs.
3. `intro` frontmatter present and matches the page-header sentence — except on per-interface API reference pages, which drop `intro:`.
4. Section order matches the template for this page type.
5. Edge cases / unhappy paths section present (feature pages).
6. FAQ has three to five real questions (feature pages).
7. Concept page shows at most one code-proof sample and does not drift into API teaching.
8. Visual rhythm — diagram, code, or card every few paragraphs. No walls of text.

**Writing standards**

9. No em dashes.
10. No bold-prefix bullets.
11. Second person ("you"), Ably (not "we").
12. No Latin abbreviations.
13. No subjective phrases or vague modals where definite language fits.
14. Imperative headings, sentence case.
15. Bulleted-list sentences end with full stops.
16. Pricing detail absent — only the link to `/docs/platform/pricing`.
17. Author ran `/deslop`.

**Code accuracy**

18. Every code snippet matches the actual SDK at the latest tagged release (factory names, option shapes, return shapes, method locations, enum values).
19. No API keys in client code.
20. `authUrl: '/auth'` used for the placeholder where auth is referenced.

**Mechanics**

21. Frontmatter complete: `title`, `meta_description`, `meta_keywords`, `intro`, `redirect_from` where the page moved or merged. (Per-interface API reference pages omit `intro`.)
22. New page added to the relevant nav file under `src/data/nav/`.
23. `<Aside>` used sparingly and load-bearing — no decorative asides.
24. Internal links resolve. No references to URLs that only exist in `redirect_from` frontmatter.

**API reference pages only** (additional checks)

25. Method H2s use descriptive verb phrases (`## Create a client transport`), not bare method names. Anchor is JS-canonical kebab-case.
26. Every method H2 is followed by `<MethodSignature>{` … `}</MethodSignature>` (template-literal form for signatures with `<` or `>`).
27. Every method with parameters has `### Parameters <a id="{slug}-params"/>` with a 4-column `Parameter | Required | Description | Type` table.
28. Every method has `### Returns <a id="{slug}-returns"/>` unless it returns `void`/`Unit`.
29. Type tables default to hidden (`<Table id='X' hidden>`) referenced via `<Table id='X'/>`. Visible types only when they meet one of the four promotion criteria.
30. Hidden table audit passes — every hidden has at least one inline reference; every reference has a definition.
31. Error type referenced via cross-page link to its canonical home (lowercase `#errorinfo` anchor).
32. Page ends with `## Example` showing end-to-end usage.
33. No same-page markdown anchor links to type anchors (`[X](#X)`). Type names in prose are backticked; cross-page references go to the type's own page.

## When the SDK or product changes shape

When a major SDK change lands (renamed factories, moved methods, removed hooks, changed enum values), do a sweep across the relevant docs section using the patterns in the code-accuracy section above. Drift is the single biggest source of incorrect docs.
