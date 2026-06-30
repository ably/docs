---
name: docs-review-style
description: Audit a docs page for writing style — AI-generated-content fingerprints (the "de-claudeify" concern), house-style violations, em dashes, bold-prefix bullets, Latin abbreviations, "we" as subject, vague modals, blog-style openers, gift-wrapped endings. Read-only; produces a conformance report and never edits the page.
license: proprietary
metadata:
  team: engineering
---

# Review: style

Audit the prose for the patterns that get docs sent back in review — AI tone
first ("reads like Claude in smartarse mode"; "reads like an intro to a blog
post"), then house-style violations.

## Step 1 — scope & contract

Invoke the `review-conventions` skill via the Ably MCP
(`skillGet({ id: "review-conventions" })`). It defines the report-only rule,
scope resolution (honouring any `$ARGUMENTS` override), the severity scale, and
the report format. Use **concern = `style`**, **surface = docs**. The authority
is `../../../writing-style-guide.md` (repo root) — read it, apply its rules, and
emit the report.

## Step 2 — what to look for

The "Avoid AI-generated content fingerprints" section of the style guide is the
checklist. Flag, with the offending line quoted:

- **Corrective antithesis** — "Not X. It's Y." setups. (`major`)
- **Dramatic pivots** — "But here's the thing", "Here's the catch". (`major`)
- **Soft hedging** — "It's worth noting", "This is where X really shines". (`major`)
- **Throat-clearing intros** — "Let's dive in", "First, let's understand". (`major`)
- **Gift-wrapped endings / mid-page summary scaffolds** — "In summary", "These properties combine to give you…". (`major`)
- **Blog-style problem windups** where the page should open with the benefit/mechanism (see `structure.md`: benefit-led, problem woven in). (`major`)
- **Editorial nouns the product does not use** — e.g. "problem surface", "ambient" sync. (`minor`–`major`)
- **Generic examples** — "imagine a chat app" with no concrete behaviour. (`minor`)
- **Overexplaining the obvious** to a developer audience (defining `await`, a JWT). (`minor`)
- **Staccato runs** and **copy-paste metaphors** reused more than twice. (`minor`)

House-style binaries (grep the scoped pages — each hit is a finding):

- Em dashes `—` (`blocker`). Bold-prefix bullets `* **Label:** …` (`blocker`).
- Latin abbreviations `e.g.`/`i.e.`/`etc.` (`major`). "we" as subject (`major`).
- Vague modals — would/should/might/maybe (`minor`–`major`). Slang (`minor`).

Respect the style guide's "Patterns to keep" — fragments, occasional
sentence-initial "And"/"But", a comma splice that reads well are not findings.
Judge tone like a human editor, not a regex.

## Step 3 — severity notes

Quote the exact line for every finding. Tone findings are `major` — they are the
notes reviewers reliably catch. Banned-syntax hits (em dash, bold-prefix bullet)
are `blocker`. Taste calls are `nit`.
