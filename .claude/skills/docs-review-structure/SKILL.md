---
name: docs-review-structure
description: Audit a docs page for page-type conformance — benefit-led opening and the understand/implement/detail tiers, section order against the page-type template, mechanism-first feature pages, one-code-proof concept pages, intentional-design framing on framework pages, edge-cases and FAQ presence, visual placement, and diagram-type match. Read-only; produces a conformance report and never edits the page.
license: proprietary
metadata:
  team: engineering
---

# Review: structure

Audit whether each page is the right shape for its type and follows the project's
structure principles.

## Step 1 — scope & contract

Invoke the `review-conventions` skill via the Ably MCP
(`skillGet({ id: "review-conventions" })`) — report-only rule, scope resolution
(honouring `$ARGUMENTS`), severity scale, report format. Use
**concern = `structure`**, **surface = docs**. The authorities are
the **Docs structure** and **Page-type templates** sections of `src/pages/docs/AGENTS.md`. For each
page, identify the page type and audit against that template, then emit the report.

## Step 2 — what to look for

**Every page** (from `structure.md`):

- **Benefit-led opening with problem woven in** — leads with what the feature
  gives you, not a standalone problem section; stands alone for the buying
  decision. (`major`)
- **Three tiers — understand → implement → detail** — result first, code fast,
  detail later; an evaluator/returning dev shouldn't scroll past edge cases to
  see what it does. (`major`)
- **Visual placement** — demo/GIF/diagram prominent (at or near the top for
  feature pages), not tucked below the code. (`minor`–`major`)
- **One focus per page, structured by developer intent** — atomic, not bundled
  conditional logic; default to the most common choice rather than presenting
  equal options. (`minor`–`major`)
- **Variants are toggles, not page splits** — no per-variant copies of a page. (`major`)
- **Diagram type matches** — UX/interaction visuals on feature pages; architectural/
  flow/state diagrams on concept/internals pages. A mismatch is a finding. (`major`)

**By page type** (from `page-types.md`):

- **Feature** — mechanism-led, minimal "this is all you write" snippet in tier 1;
  full implementation in tier 2; **edge-cases/FAQ** and related features in tier 3.
  Missing edge-cases or a real FAQ is `major`.
- **Concept** — mental model; **one** code-proof sample; no method-by-method API
  teaching. (`major` if it drifts into API teaching.)
- **Framework** — capability tables; **intentional-design framing** ("the
  framework intentionally doesn't do X", never "can't"); sibling-page alignment
  where capabilities overlap, without forced parity. "can't" framing is `major`.
- **Positioning** — may open problem-first but must pivot to capability by mid-page.
- **Getting-started** — clear "working app" milestone, everything after it additive;
  `authUrl: '/auth'` placeholder only.
- **Troubleshooting** — symptom-named; Issue → Cause → Solution.
- **API reference** — defer mechanics to `docs-review-links`/`docs-review-code-accuracy`;
  here check only the API-reference *shape*.

## Step 3 — severity notes

Read the whole page before judging order — section intent matters more than
literal heading text. A missing required tier/section (edge-cases, FAQ,
benefit-led opening, capability pivot) is `major`. Out-of-order is `minor` unless
it breaks the reader's path. Diagram-type mismatch is `major`. Don't flag a
deliberate, template-noted divergence (`structure.md` allows visual-first or
code-first leads).
