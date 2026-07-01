---
name: docs-plan-pr
description: Plan a documentation change — given an SDK release/tag, a PR or set of PRs, specific commits, local code changes, or a described task, work out which docs pages must change and what is new, and write a docs-plan.md describing the work as a series of single-purpose commits (one or more stacked PRs). Plans; does not write the pages (hand off to `docs-execute-plan`).
license: proprietary
metadata:
  team: engineering
  tags: docs, documentation, plan, planning, scope, breakdown, commits, stacked-prs, sdk-drift, workflow
  mcp: false
---

# Plan a docs change into commits and PRs

Turn a change into a concrete, reviewable docs plan grounded in the real docs and
the real SDK. The output is `docs-plan.md`, which describes the work as a series of
**single-purpose commits** — each a coherent cluster of pages, with its intent and
*why* (which delta drives it) — grouped into **one or more (stacked) PRs**. This
plans; `docs-execute-plan` builds the pages.

This skill is the docs planning engine and the change-driven entry point: it works
backwards from an SDK change to the docs that change invalidates or requires (the
recurring need behind most AI Transport docs PRs — drift sweeps, pre-release
refreshes). It is invoked directly, or by a wrapper skill (e.g. `jira-plan-pr`)
that has already gathered the brief from an external source and hands it off. It is
the docs counterpart of `code-plan-pr`, and shares its shape.

This skill plans; it does not implement. Read the docs and the SDK thoroughly so
the plan reflects their real state, and surface genuine IA decisions to the user
before finalising it (Step 2).

## Step 0: Establish the change

The brief is either a **code change** to document or a **described task**.

- **Code change** — resolve it with the shared **`code-resolve-changes`** skill
  (load via the Ably MCP: `skillGet({ id: "code-resolve-changes" })`). It accepts a
  release/tag, a PR or set of PRs, specific commits, or local working-tree changes,
  and returns the before→after states and the changed files; with nothing specified
  it defaults to the latest release of the SDK repo the docs document. Read its
  result rather than re-deriving the diff.
- **Described task** ("add a roadmap page", "split the auth guide") — if a brief was
  handed to you (e.g. by `jira-plan-pr`), use it. If the request is thin, use
  **AskUserQuestion** to pin the goal before reading the docs. Don't invent scope.

Capture the intended end state — it anchors the plan and its acceptance criteria.

## Step 1: Read the SDK surface and the docs, and map the deltas to pages

Confirm the change concerns **these** docs before planning how to document it.

- Find the version the docs currently target in
  `src/data/languages/languageData.ts` (the version badge reads from it).
- Read the SDK type declarations at the change's after-state (npm for a published
  release; `git show <ref>:<path>` or the local tree otherwise) and capture the
  surface deltas across every entry point. See the **Code accuracy** section of
  `src/pages/docs/AGENTS.md`.
- List the affected product's pages and grep each changed symbol (old and new name)
  across them so nothing drifts silently.
- **If the change is not for these docs** — it documents a different product, or
  nothing it references exists in these pages — **stop and tell the user.** Say
  which docs you're in and why it doesn't match. Do not write a plan.

Map each delta to the pages it drives, using the **Docs structure** section of
`src/pages/docs/AGENTS.md` for where pages sit in the IA:

| Delta | Page(s) | Type |
|---|---|---|
| New capability users call | new/expanded feature; maybe a concept | feature, concept |
| Signature / option / return change | API reference + snippet sweep on calling pages | api-reference |
| Renamed factory / type / enum | breaking sweep + `redirect_from` on renamed pages | all affected |
| New / changed error or terminal reason | API errors page + troubleshooting (literal code/text) | api-reference, troubleshooting |
| New framework / adapter / codec | framework guide, aligned with siblings | framework |
| Behaviour change, no surface change | prose + edge-cases on the feature/concept page | feature, concept |
| Config / channel-rule / capability change | getting-started + going-to-production | getting-started |

## Step 2: Reach a shared understanding before finalising

The goal is not just to fill gaps — it is to make sure you and the user **agree on
the shape of the change** before it's written into a plan. Reading the SDK and the
docs in Step 1 will have turned the brief into a concrete set of page changes with
real trade-offs; replay that back and confirm it matches what they want.

Surface, don't bury:

- **Restate the shape** you've landed on — which pages change, what's net-new, the
  version bump — so the user can correct a wrong mental model before it's baked in.
- **Flag the IA decisions** the work forces: new page vs expand an existing one,
  renames and their `redirect_from`s, a terminology choice the glossary does not
  settle, where a net-new capability lives in the IA, scope deliberately left out.
- **Spell out the implications**: ripple effects into sibling pages, pre-release
  gating if the target version isn't on npm yet, redirects needed for moved slugs.

Use **AskUserQuestion** to resolve anything that is genuinely the user's call — a
real IA decision, an ambiguous goal, a trade-off with no obvious winner. Don't
silently pick a direction that should be theirs; equally, don't ask about things
the docs, the SDK, or sensible defaults already settle. Record the resulting
decisions and their rationale in the plan so the shared understanding is captured.

## Step 3: Decide single PR vs stacked PRs, and order the commits

Design the change as a sequence of **single-purpose commits**: each commit is a
coherent cluster of pages (e.g. "the core API reference for the new run model",
"the feature-page sweep"), fully updated for every delta that touches it, so a page
is touched in exactly one commit. Order them so net-new and foundational work lands
first (the version bump, then new pages other pages cross-link to), then the
cross-cutting symbol sweep cluster by cluster.

Then judge whether the whole change lands as **one PR a reviewer can reasonably
review**:

- **Fits one PR** → the plan is one PR containing the ordered commits.
- **Too large** → split into a series of **stacked PRs**, each built on the
  previous branch, each independently reviewable with a clear theme (e.g. PR1: new
  pages + version bump; PR2: API-reference sweep; PR3: feature/concept sweep). Make
  the stacking order and the dependency between PRs explicit.

## Step 4: Write docs-plan.md

Write the plan to `docs-plan.md` at the repo root (use `<KEY>-plan.md` when called
from `jira-plan-pr` so it's tied to the ticket). Markdown, this shape:

```markdown
# <title> — docs plan

## Goal
What the reader can do/understand after this change.

## Source of change
How it was specified (release/tag, PR(s), commits, local, or default latest
release), the resolved before→after states, the key deltas, and the decisions
resolved with the user in Step 2 (with rationale).

## Version bump
Bump the product in languageData.ts from <from> to <to>. Note pre-release gating
if <to> is not yet on npm.

## Plan
<!-- If one PR: a single ## PR section. If stacked: one ## PR section each, in order. -->

### PR 1 — <theme>  (base: <branch>)
Intent of this PR and why it's a reviewable unit.

1. **<commit intent>** — the page cluster it updates and the motivation. Name the
   pages it touches, not the line-by-line edits.
2. **<commit intent>** — ...

### PR 2 — <theme>  (base: PR 1's branch)
...

## Pages
### <path/to/page.mdx> — <page type> — <create | update>
Intent: what this page must say after the change.
Why: which delta drives it.
Renames/redirects: <old slug → new slug> (if any).

## Glossary source
<for terminology review — e.g. Confluence 4865097761 for AI Transport>

## Acceptance criteria
- [ ] languageData.ts bumped
- [ ] all affected pages updated; no stale symbols remain
- [ ] new/renamed pages registered in nav, with redirect_from on moves
- [ ] docs-review-all passes (style, structure, code-accuracy, terminology, links)

## Open questions / risks
Anything still unresolved or worth flagging to reviewers.
```

Keep commit and PR entries at the level of **intent and motivation** — the *what
and why*. The **Pages** section carries the per-page detail behind those commits;
the implementation comes later in `docs-execute-plan`.

## Step 5: Report

Say where the plan was written, summarise the shape (commits, single PR vs how many
stacked PRs and their themes, pages create vs update, the version bump, renames),
list decisions resolved or still open, and point at `docs-execute-plan` to build it. If
the change is not for these docs, say so and do not write a plan.
