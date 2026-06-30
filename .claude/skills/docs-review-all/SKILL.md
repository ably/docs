---
name: docs-review-all
description: Run a full review of a docs change — fan out every relevant review concern (docs-review-style, docs-review-structure, docs-review-code-accuracy, docs-review-terminology, docs-review-links) across independent subagents and synthesise one consolidated report with a single verdict. Read-only; never edits the docs.
license: proprietary
metadata:
  team: engineering
---

# Review docs (all concerns)

Runs every docs review concern over a change and produces one combined report.
Read-only — it reports; it does not edit. Fixing is the author's job, or the
`docs-execute-plan` skill's loop. This is the docs analogue of `code-review-all`.

## Step 1 — resolve scope once

Resolve the scope via the shared **`review-conventions`** contract (load via the
Ably MCP: `skillGet({ id: "review-conventions" })`) — honour any `$ARGUMENTS`
override, otherwise the changed `.mdx` pages on this branch vs its base plus
working-tree changes. State the scope once and pass the same scope to every
concern so they review the same pages.

## Step 2 — fan out the concerns

Run all five concern skills over the scope. **Prefer parallel subagents** (one
`Task` per concern) so they run concurrently and independently:

- `docs-review-style`
- `docs-review-structure`
- `docs-review-code-accuracy`
- `docs-review-terminology` (pass the glossary source)
- `docs-review-links`

Each returns a report ending in `VERDICT: PASS | CHANGES_REQUESTED`.

## Step 3 — synthesise

Merge the five reports into one: a single findings table sorted by severity then
page, each finding tagged with its concern; de-duplicate where two concerns flag
the same line (keep the higher severity). Overall verdict is
`CHANGES_REQUESTED` if any concern returned it, else `PASS`. Emit the combined
report in the `review-conventions` format with the overall `VERDICT:` last, and
note in the Notes which concerns passed and which requested changes.

## When to use

- **Directly** — a quick "is this docs change ready?" check on the branch.
- **In the `docs-execute-plan` loop** — `docs-execute-plan` calls this per page and iterates until the
  verdict is `PASS` before moving on.
