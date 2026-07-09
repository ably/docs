---
name: docs-review-terminology
description: Audit a docs page for product-vocabulary correctness against the canonical glossary — wrong or deprecated terms, conflated terms, and internal jargon leaking into public docs. Glossary source is configurable (AI Transport Terminology Reference by default). Read-only; produces a conformance report and never edits the page.
license: proprietary
metadata:
  team: engineering
---

# Review: terminology

Check that every product term matches the canonical glossary. Wrong or
internal-only vocabulary is a reliable review rejection — it confuses readers and
contradicts other pages.

## Step 1 — scope & contract

Invoke the `review-conventions` skill via the Ably MCP
(`skillGet({ id: "review-conventions" })`) — report-only rule, scope resolution
(honouring `$ARGUMENTS`), severity scale, report format. Use
**concern = `terminology`**, **surface = docs**. Apply the criteria below and emit
the report.

## Step 2 — load the glossary (fetch at runtime)

Determine the glossary source: an explicit one in `$ARGUMENTS` or the docs-change
plan; otherwise the product's positioning file the product folder AGENTS.md (e.g. `src/pages/docs/ai-transport/AGENTS.md`)
(e.g. `ai-transport.md`) plus the product glossary. For **AI Transport** the
canonical glossary is the **AI Transport Terminology Reference**, Confluence page
`4865097761` — fetch it (`confluenceGetPage({ pageId: "4865097761" })` if the
Confluence tool is available). Never embed a copy; fetch each run.

## Step 3 — what to look for

- **Deprecated / renamed terms** — old nouns the product moved away from. For AIT:
  `Transport`→`Session`, `Turn`→`Run`. (`blocker`)
- **Internal jargon in public docs** — for AIT, **`root`** is not public; write
  "an object on a channel" (`const myObject = await channel.object.get();`). (`blocker`)
- **Conflated terms** — for AIT, **barge-in is voice-specific; interruption is
  the general term** — don't rename or merge. (`major`–`blocker`)
- **Inconsistent term** within the page or across the section. (`major`)
- **Wrong-primitive claims** — for AIT, branching is anchored on `codecMessageId`,
  not `runId`. (`major`)
- **Capitalisation/spelling** of product and tech names (JavaScript, GitHub, macOS). (`minor`)

## Step 4 — severity notes

Check each term against the glossary you fetched — don't rely on memory. A
deprecated term or internal jargon in public docs is a `blocker`; an
inconsistent-but-valid term is `major`. When a term is missing or ambiguous in
the glossary, flag it as a `minor` for the product owner to confirm rather than
inventing a ruling.
