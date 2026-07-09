---
name: docs-execute-plan
description: Write or refresh Ably docs pages (MDX) by executing a docs-plan.md from docs-plan-pr — build it commit by commit, drafting each page from the project guidance, reviewing with the docs-review-* concerns until clean, verifying, then committing with /git-commit; uses fixups for earlier commits and keeps a decision log. For multi-PR (stacked) plans it creates one branch per PR. Can also run against a direct page or directory target. Asks up front whether to checkpoint each commit, between PRs, or run to completion.
license: proprietary
metadata:
  team: engineering
  tags: docs, documentation, execute, write, mdx, commits, stacked-prs, docs-review, git-commit, fixups, workflow
  mcp: false
---

# Execute a docs plan

Take a `docs-plan.md` produced by `docs-plan-pr` and build it to completion — one
**single-purpose commit** (a cluster of pages) at a time, each drafted, reviewed,
verified, and committed before the next. This skill is the execution counterpart of
`docs-plan-pr`: that skill decides *what* the commits and PRs are; this one *builds*
them. It is the docs counterpart of `code-execute-plan`, and the write half of the
write → review loop (the `docs-review-*` skills are the review half).

The loop per commit is: **draft the pages → review with `docs-review-all` (the
`docs-review-*` concerns) and iterate until clean → run the verification checks →
commit with `/git-commit`**. Keep going until the plan is fully built, keeping a
decision log as you go.

## Required reading (read before drafting)

Project-canonical guidance lives in folder `AGENTS.md` files, which auto-load when
you edit pages there. Read what applies to the pages you are writing:

- `src/pages/docs/AGENTS.md` — the general docs-writing guidance: structure / IA
  principles and feature-page tiers, the per-page-type templates, the
  API-reference standard (for `api/**` pages), the code-accuracy workflow, and the
  verification checks.
- `src/pages/docs/<product>/AGENTS.md` — product positioning and terminology
  (e.g. `src/pages/docs/ai-transport/AGENTS.md`).
- `writing-style-guide.md` (repo root) — Ably house style + the AI-fingerprint
  list. **Load-bearing — read before writing prose.** It is the authority for prose
  and takes precedence over anything here; flag conflicts.
- `CLAUDE.md` (repo root) — repo conventions: MDX components, frontmatter, code
  blocks, nav files.

## Step 1: Locate and read the plan

- Find the plan at the repo root: `docs-plan.md`, or `<KEY>-plan.md` (the form
  `jira-plan-pr` writes). If the user named one, use it. If several exist or it's
  ambiguous, ask which with **AskUserQuestion**.
- Read it fully and extract: the **Goal**, **Source of change** and resolved
  decisions, the **Version bump**, the ordered **PR(s)** and their **commits**
  (intent + the page cluster each touches), the **Pages** detail, the **Glossary
  source**, the **acceptance-criteria** checklist, and any **open questions / risks**.
- Note whether the plan is **single-PR or multi-PR (stacked)** — this changes the
  cadence options (Step 2) and the branching (Step 3) — and capture the **ticket
  key** if there is one (from a `<KEY>-plan.md` filename or the plan title) for
  branch names.
- If the plan still has unresolved open questions that block starting, surface them
  and resolve with **AskUserQuestion** before writing any page.

**Direct target (no plan).** If invoked as `/docs-execute-plan <page or directory>`
with no plan, treat the target as an ad-hoc single-commit plan: draft/refresh those
pages with the same per-commit loop (Steps 2 and 4), skipping the stacked-PR
branching. If a larger change has no plan, prefer producing one first with
`docs-plan-pr`.

## Step 2: Ask how the user wants to review (required)

Before building anything, use **AskUserQuestion** to choose the review cadence.
Which options you offer depends on whether the plan is single- or multi-PR (Step 1):

- **Checkpoint each commit** — after a commit's pages are drafted, reviewed
  (`docs-review-all`, iterated clean), and verified, **show the diff and wait for
  the user's approval before committing**. Then move to the next commit.
- **Checkpoint between PRs** *(offer only for multi-PR plans)* — commit through each
  PR's commits without pausing, then **stop at each PR boundary** for the user to
  review that whole PR before starting the next stacked PR.
- **Run to completion** — draft, self-review, verify, and commit each commit without
  pausing (the user has pre-approved `/git-commit`), and only stop at the very end
  for the user to review the whole result.

Remember the choice and apply it consistently in Steps 4–5.

## Step 3: Set up the working branch

Don't commit on the default branch. **Use one branch per PR**, named with the ticket
key (from Step 1) where there is one so each branch is traceable:

- **Naming:** `<key-lowercase>-<short-slug>`, and for a multi-PR plan include the
  PR's position, e.g. `ait-1234-pr1-new-pages`, `ait-1234-pr2-api-sweep`. With no
  ticket key, fall back to a descriptive slug (`pr1-new-pages`, or
  `docs-<product>-refresh` for a single PR). Keep the slug short and drawn from the
  PR's theme.
- Create the branch for the plan's **first PR** now: `git switch -c <slug>`.
- For a **stacked-PR** plan, **each later PR is its own branch stacked on the
  previous PR's branch** — create them at each PR boundary (Step 5), not up front.

## Step 4: Build the plan, commit by commit

Work through the commits **in the plan's order**. Following the repo's orchestration
pattern (see `translate-examples-to-swift`), **spawn a drafting subagent per page**
and keep the orchestrator coordinating, not editing — even for a single page, to
keep behaviour consistent and context isolated. For each commit:

1. **Draft** the cluster's pages. For each page: identify the **page type** and read
   the matching template in the **Page-type templates** section of
   `src/pages/docs/AGENTS.md` (or its **API reference standard** for `api/**`
   pages). Draft applying that template, the **Docs structure** guidance, the
   product folder's `AGENTS.md` positioning and terminology, and the house style.
   Verify every code snippet against the SDK per the **Code accuracy** section. Stay
   within the commit's stated intent — resist pulling in unrelated pages.
2. **Review** with `docs-review-all` over the commit's pages (it fans out the
   `docs-review-*` concerns as subagents). Fix every `blocker` and `major`, then
   re-review. Repeat until every concern returns `VERDICT: PASS`. `minor`/`nit` are
   author's discretion. Don't commit over unresolved review findings.
3. **Verify** — run the **Verification checks** from `src/pages/docs/AGENTS.md` (and
   the API-reference hidden-table audit for `api/**` pages). Expect zero hits.
   Register new or renamed pages in `src/data/nav/`, with `redirect_from` on moves.
   If a page ships Swift variants, hand off to `translate-examples-to-swift`.
4. **Gate on the chosen cadence (Step 2):**
   - *Checkpoint each commit* → show the diff and a one-line summary, wait for
     approval, apply requested changes and re-review/re-verify before committing.
   - *Run to completion* → proceed without asking (pre-approved).
5. **Commit** with `/git-commit`.
6. **Fixups for earlier commits.** If, while doing a later commit, you make a change
   that belongs to an **already-made** commit (e.g. a cross-link or nav entry for an
   earlier cluster), create a **targeted fixup** against that commit (`/git-fixup`,
   i.e. `git commit --fixup=<sha>`) rather than burying it. This keeps each commit
   single-purpose, matching the plan.
7. **Log it** (Step 6).

## Step 5: PR boundaries (stacked plans)

When you finish all commits for a PR in a stacked plan:

- Run `docs-review-all` and the verification checks once more over that PR's
  complete set of pages.
- **If the cadence is _Checkpoint between PRs_** (Step 2): stop here, show the PR's
  full diff and a summary of what it delivers, and wait for the user's approval
  (apply any requested changes and re-check) before moving on.
- Start the **next PR on its own branch, stacked on the current one**, using the
  same naming as Step 3: `git switch -c <key>-pr<N>-<slug>` (created from the
  just-completed PR's branch, not the default branch). Then continue Step 4.

Pushing branches and opening PRs is outward-facing — **don't do it automatically**.
Once the plan (or a PR within it) is complete, offer to **push the branch**
(`git push`), then hand off **opening the PR** to the user or their PR-creation flow
— use the `gh-pr-description` skill to write the description, referencing the
originating ticket when the plan came from `jira-plan-pr`. For a stacked plan, each
PR targets the previous PR's branch as its base.

## Step 6: Keep a decision log

Maintain a running **Decision log** as you build — append it as a
`## Decision log` section to the plan file (`docs-plan.md` / `<KEY>-plan.md`) so the
record sits with the plan. For each entry note: which commit/PR it relates to, any
**deviation from the plan** and why, decisions made while drafting (terminology
calls, IA tweaks), fixups applied, and anything a reviewer should know. Update it as
you go, not only at the end.

## Step 7: Report

When the plan is fully built, tell the user: the branch(es) created, the commits
made (and any fixups), the `docs-review-all` result and verification status, which
acceptance criteria are now met, and a pointer to the decision log. If you stopped
early (no plan, blocked on an open question, a review you couldn't get to PASS), say
so plainly and what remains.
