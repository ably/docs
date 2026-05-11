# Auto Docs Update Skill — Implementation Plan

Goal: Keep `ably-docs` in sync with upstream SDK repositories (`ably-js`, `ably-java`, `ably-dotnet`, `ably-cli`, and others added later) by running a per-SDK Claude Code skill that diffs the SDK against a recorded "last known good" commit, proposes documentation edits, and queues anything ambiguous for manual review.

The skill is explicitly designed to be **iteratively hardened** — first runs will be noisy; the workflow captures every intermediate artifact so we can audit mistakes and bake the lessons back into the skill prompts.

---

## 1. Guiding principles

1. **Manifest-driven, not date-driven.** The "last synced" pointer is a commit SHA, never a timestamp. SHAs are stable, dates are not.
2. **Idempotent runs.** Re-running the skill on the same manifest must produce identical output. The manifest SHA only advances after a run is *accepted* by the user (i.e. PR merged or commit landed) — see §6.
3. **Never blindly mirror upstream.** Docs are deliberately curated and often simpler than the SDK. The skill *proposes*; the human approves. No skill writes directly to `main` or auto-commits.
4. **Prefer high-signal sources.** Read the SDK's `CHANGELOG.md`, release notes, README, and public API surface (`index.ts`, `*.d.ts`, public Java/Kotlin/C# classes) before diving into raw commit diffs.
5. **Capture everything.** Every intermediate file from every run is preserved under a per-run directory so we can replay, debug, and improve the skill. Disk is cheap; lost context is expensive.
6. **Fail loudly to `MANUAL_REVIEW.md`.** When the skill can't confidently map a change to a doc section, the change goes to a human queue rather than being silently dropped or guessed.
7. **Scope discipline.** A skill is per-SDK. The ably-js skill never touches Java docs. Cross-SDK consistency is a separate concern, handled later by a "consistency sweep" skill (out of scope here).

---

## 2. The manifest: `update-manifest.json`

Single file at repo root. Drives every per-SDK skill.

```jsonc
{
  "$schema": "./schemas/update-manifest.schema.json",
  "version": 1,
  "sources": [
    {
      "id": "ably-js",
      "repo": "https://github.com/ably/ably-js",
      "branch": "main",
      "lastSyncedCommit": "abc123def456...",
      "lastSyncedAt": "2026-05-08T10:00:00Z",
      "lastSyncedBy": "sachin.shinde@ably.com",
      "docScopes": [
        "src/pages/docs/getting-started/javascript.mdx",
        "src/pages/docs/pub-sub/**",
        "src/pages/docs/channels/**",
        "src/pages/docs/auth/**"
      ],
      "languageTags": ["javascript", "react", "nodejs"],
      "primarySources": ["CHANGELOG.md", "README.md", "src/index.ts", "ably.d.ts"],
      "ignorePaths": [".github/**", "test/**", "examples/**", "scripts/**"],
      "notes": "JS is the reference SDK; changes here often imply parallel updates in Java/.NET docs (flagged separately, not auto-applied)."
    },
    {
      "id": "ably-java",
      "repo": "https://github.com/ably/ably-java",
      "branch": "main",
      "lastSyncedCommit": "...",
      "docScopes": ["src/pages/docs/**"],
      "languageTags": ["java", "android"],
      "primarySources": ["CHANGELOG.md", "lib/src/main/java/io/ably/lib/**/*.java"],
      "ignorePaths": ["test/**", ".github/**", "gradle/**"]
    },
    {
      "id": "ably-dotnet",
      "repo": "https://github.com/ably/ably-dotnet",
      "branch": "main",
      "lastSyncedCommit": "...",
      "docScopes": ["src/pages/docs/**"],
      "languageTags": ["csharp"],
      "primarySources": ["CHANGELOG.md", "src/IO.Ably.Shared/**/*.cs"],
      "ignorePaths": ["test/**", ".github/**"]
    },
    {
      "id": "ably-cli",
      "repo": "https://github.com/ably/cli",
      "branch": "main",
      "lastSyncedCommit": "...",
      "docScopes": ["src/pages/docs/cli/**", "src/pages/docs/platform/tools/cli.mdx"],
      "languageTags": ["shell"],
      "primarySources": ["README.md", "src/commands/**", "package.json"],
      "ignorePaths": ["test/**", ".github/**", "dist/**"]
    }
  ]
}
```

### Fields explained / why each exists

| Field | Purpose |
|---|---|
| `id` | Stable key used by the skill (`update-docs-from-<id>`). |
| `repo`, `branch` | Where to fetch from; branch is overridable per run if we ever sync from a release branch. |
| `lastSyncedCommit` | The pointer. Single source of truth for "what's already in our docs." |
| `lastSyncedAt`, `lastSyncedBy` | Audit trail; not used by the skill but useful for humans. |
| `docScopes` | Glob list of doc paths the skill is *allowed* to edit. Hard guardrail. |
| `languageTags` | Drives `<If lang="...">` filtering and code-block language hints. |
| `primarySources` | Files in the SDK repo the skill should read first when reasoning about an API change. Avoids the skill drowning in raw diffs. |
| `ignorePaths` | Globs in the SDK repo that should never trigger doc updates (CI, tests, build). Saves token budget. |
| `notes` | Free-form human notes the skill includes in its system prompt. |

A JSON Schema (`schemas/update-manifest.schema.json`) validates the manifest in CI so a typo doesn't silently disable a sync.

---

## 3. Repository layout

```
ably-docs/
├── update-manifest.json
├── schemas/
│   └── update-manifest.schema.json
├── .claude/
│   └── skills/
│       ├── update-docs-from-ably-js/
│       │   ├── SKILL.md
│       │   ├── prompts/
│       │   │   ├── classifier.md      # commit triage
│       │   │   ├── mapper.md          # change → doc-section mapping
│       │   │   ├── editor.md          # propose MDX edits
│       │   │   └── reviewer.md        # self-review pass
│       │   ├── scripts/
│       │   │   ├── fetch-changes.sh   # clones/fetches SDK repo, produces diff
│       │   │   ├── classify-commits.sh
│       │   │   ├── render-summary.sh  # builds final HTML/MD report
│       │   │   └── update-manifest.sh # bumps SHA after acceptance
│       │   └── learnings/
│       │       └── README.md          # accumulated lessons from past runs
│       ├── update-docs-from-ably-java/...     (same shape)
│       ├── update-docs-from-ably-dotnet/...
│       ├── update-docs-from-ably-cli/...
│       └── _shared/                   # (optional) common scripts / prompt fragments
└── auto-docs-update/                  # all run artifacts live here (gitignored)
    └── <sdk-id>/
        └── runs/
            └── <YYYY-MM-DD-HHMM>-<from-sha7>-to-<to-sha7>/
                ├── 00-manifest-snapshot.json
                ├── 01-fetch/
                │   ├── commits.json
                │   ├── changelog.diff
                │   ├── full.patch
                │   └── files-changed.txt
                ├── 02-classify/
                │   ├── classified.json   # one entry per commit: category + confidence
                │   └── api-surface.diff  # public-API-only diff
                ├── 03-map/
                │   └── mappings.json     # change → candidate doc files
                ├── 04-propose/
                │   ├── edits/
                │   │   └── <doc-file-path>.patch
                │   └── proposed-edits.json
                ├── 05-review/
                │   └── self-review.json
                ├── MANUAL_REVIEW.md      # unmapped / low-confidence items
                ├── RUN_SUMMARY.md        # human-readable summary
                └── run.log               # full skill log
```

The numeric prefixes (`00-…05-…`) make the run order obvious when scrolling a directory and stable across SDKs.

### Suggested renames vs the user's draft naming

| Original idea | Suggested | Reason |
|---|---|---|
| `MANUAL_ASSESSMENT.md` | `MANUAL_REVIEW.md` | Shorter, action-oriented, matches existing repo verbs. |
| (one-shot temp dir) | `auto-docs-update/<sdk>/runs/<dated>/` | Explicit per-SDK, per-run. Multiple runs coexist, easy to diff. |
| (root-level temp files) | everything under `auto-docs-update/` | Avoid polluting the repo root — already busy with 30+ scratch `.md` files. Add to `.gitignore`. |
| Numeric file prefixes | `00-manifest-snapshot`, `01-fetch`, … | Stable ordering; a fresh reader can follow the pipeline by `ls`. |

### `.gitignore` additions

```
auto-docs-update/
!auto-docs-update/.keep
```

Run artifacts are local-only by default. We may later opt-in to committing `RUN_SUMMARY.md` + `MANUAL_REVIEW.md` (only) to the PR branch for review traceability — see §10.

---

## 4. Per-SDK skill: pipeline phases

Every SDK skill follows the same 6-phase pipeline. The phases are independent, write to disk, and can be re-run individually — critical for debugging.

### Phase 0 — Preflight
- Validate `update-manifest.json` against schema.
- Confirm working tree clean (or `--allow-dirty` flag).
- Snapshot manifest to `00-manifest-snapshot.json` so the run is reproducible even if the manifest changes mid-run.
- Create the dated run directory.

### Phase 1 — Fetch (`scripts/fetch-changes.sh`)
- Shallow clone the SDK to a cache dir (`~/.cache/ably-docs/sdks/<id>`) or `git fetch` if cached.
- Compute commit range: `lastSyncedCommit..origin/<branch>`.
- Emit:
  - `01-fetch/commits.json` — `[ {sha, author, date, subject, body, files} ]`.
  - `01-fetch/full.patch` — `git diff <range>` (full).
  - `01-fetch/changelog.diff` — diff of `CHANGELOG.md` only (highest signal).
  - `01-fetch/files-changed.txt` — flat list, post-`ignorePaths` filter.
- Deterministic. Pure shell — no LLM yet. If this fails, no LLM tokens wasted.

### Phase 2 — Classify (LLM, parallel sub-agent per commit batch)
- Input: `commits.json` + `changelog.diff`.
- Each commit gets a category and a confidence:
  - `api-change` (public surface added/changed/removed) — drives doc updates.
  - `behaviour-change` (semantics changed without signature change) — drives doc updates, harder to detect.
  - `bugfix-internal` — usually no doc change, but check `CHANGELOG.md`.
  - `chore` (CI, deps, build) — ignore.
  - `docs-only` (in the SDK repo) — extract for cross-reference.
  - `test-only` — ignore.
  - `unknown` — escalate to MANUAL_REVIEW.
- Output: `02-classify/classified.json`.
- Also produce `02-classify/api-surface.diff`: filtered diff containing only public-API files (per `primarySources`).

### Phase 3 — Map (LLM)
- For each `api-change` / `behaviour-change` commit, find candidate doc files in `docScopes`.
- Strategy:
  1. Symbol search: extract changed symbol names (function, class, method) → `Grep` in `docScopes`.
  2. Concept search: extract the commit's CHANGELOG bullet → semantic match against doc headings.
  3. If neither yields a hit → mark `unmapped`.
- Output: `03-map/mappings.json`:
  ```json
  {
    "commit": "abc123",
    "category": "api-change",
    "symbols": ["Realtime#close"],
    "candidateDocs": [
      { "path": "src/pages/docs/connect/index.mdx", "score": 0.82, "reason": "matches 'close' heading" }
    ],
    "status": "mapped" | "unmapped" | "ambiguous"
  }
  ```

### Phase 4 — Propose edits (LLM, one sub-agent per doc file)
- For each mapped doc file, a sub-agent receives:
  - The doc file content.
  - The relevant commits (subjects, bodies, diffs of public API).
  - The CLAUDE.md MDX conventions (codeblock format, `<If lang>`, admonitions, etc.).
  - The kebab-case rule for CLI placeholders (per `CLAUDE.md`).
- Sub-agent produces a unified diff per doc file, *not* a full rewrite (matches the user's saved feedback "prefer regex edits").
- Output:
  - `04-propose/edits/<flattened-doc-path>.patch`
  - `04-propose/proposed-edits.json` — index with per-edit summary, confidence, and originating commits.
- Sub-agent **must not** apply the edit. Application is a separate, explicit step (§5).

### Phase 5 — Self-review (LLM)
- A reviewer sub-agent reads each proposed patch + the original doc and checks:
  - Did we accidentally drop content unrelated to the change?
  - Does the new code block compile/typecheck on signature inspection?
  - Does it follow the writing-style-guide (US English, present tense, second person)?
  - Are language tabs still consistent across the page?
- Output: `05-review/self-review.json` with `pass | warn | fail` per patch.
- `fail` patches get bumped to `MANUAL_REVIEW.md` instead of being applied.

### Phase 6 — Materialize
- Apply all `pass` patches under `04-propose/edits/` to the working tree on a fresh branch: `auto-docs/<sdk-id>/<from-sha7>-to-<to-sha7>`.
- Generate `RUN_SUMMARY.md`:
  - Counts: commits scanned, classified, mapped, edited, manual.
  - Per-edit table with links to the originating commit.
  - Open questions for the human reviewer.
- Generate `MANUAL_REVIEW.md` (see §7).
- **Do not commit, do not push.** The user reviews `git diff`, then commits/PRs themselves (per saved `feedback_no_auto_commit`).

### Phase 7 — Manifest bump (only on user request)
- A separate sub-command: `/update-docs-from-<sdk> --accept <run-id>`
- Updates `lastSyncedCommit`, `lastSyncedAt`, `lastSyncedBy` in `update-manifest.json`.
- Run as a follow-up after the PR merges — keeps the manifest honest.

---

## 5. The `MANUAL_REVIEW.md` file

One per run. Replaces the user's working name `MANUAL_ASSESSMENT.md` (shorter, action-oriented).

Structure:

```markdown
# Manual review queue — ably-js — 2026-05-08 (abc1234..def5678)

## How to use this file
For each section below, decide:
  [ ] Update the docs and check off the box.
  [ ] Skip — add a one-line reason.
  [ ] Defer — move to `learnings/` so the next run can handle it automatically.

## Unmapped changes (no candidate doc found)
### 1. feat: add `Realtime#requestState()` (commit a1b2c3d)
- **Category:** api-change (confidence 0.91)
- **Symbol:** `Realtime.requestState`
- **Searched paths:** `src/pages/docs/connect/**`, `src/pages/docs/pub-sub/**`
- **Why no match:** No existing heading mentions a state-request flow.
- **CHANGELOG entry:** > Added `requestState()` for clients to ...
- **Suggested action:** create new section under `connect/index.mdx` or a new page `connect/request-state.mdx`?

## Ambiguous mappings (multiple plausible homes)
### 2. fix: clarify reconnection backoff (commit e4f5g6h)
- **Candidates:** `connect/index.mdx`, `pub-sub/advanced.mdx`
- **Both look plausible because** ...

## Self-review failures
### 3. (proposed edit fell back to manual — see `05-review/self-review.json`)

## Behaviour-change commits (no signature delta — humans should sanity check)
### 4. ...
```

The format is intentionally checklist-y so the human reviewer can run through it in one sitting. Items not handled feed into the `learnings/` folder for the next iteration of the skill.

---

## 6. Idempotency and the manifest bump

The trickiest bit. Naive design: bump `lastSyncedCommit` at the end of every run. Problem: if the user rejects the proposed edits, we've still moved the pointer and lost those changes forever.

**Rules:**

1. The skill **never** bumps `lastSyncedCommit` automatically.
2. Bump happens via `/update-docs-from-<sdk> --accept <run-id>` after the PR is merged.
3. The new SHA is the `to` SHA from the accepted run, not `HEAD` of upstream — even if upstream advanced during review. The next run picks up the gap automatically.
4. If the user partially accepts (some edits applied, some deferred), the bump still moves to the run's `to` SHA, but the deferred items are appended to a sticky `auto-docs-update/<sdk>/carry-over.md` so they appear in the *next* `MANUAL_REVIEW.md`. This prevents work from being silently lost.

---

## 7. Cross-SDK ripple effects (important nuance)

When `ably-js` adds an API, the parallel docs in Java / .NET / Kotlin pages are usually now stale. The js skill **must not** edit those pages (scope guardrail), but it **should** flag them.

Pattern:
- After Phase 4, scan all proposed edits.
- For each edited MDX page, check whether it uses `<If lang="...">` blocks for *other* languages.
- If yes, append to `MANUAL_REVIEW.md` under a "**Cross-SDK ripple**" section: "the same page has a Java block — verify whether ably-java has shipped the same change."
- This is where the manifest's `notes` field earns its keep — js notes can pre-warn the skill.

A future iteration could spawn the sibling SDK skills automatically, but that's deferred until the single-SDK flow is reliable.

---

## 8. Iterative hardening: the `learnings/` folder

The user is explicit that the skill won't be perfect on day one. Concrete mechanism for getting better:

- After every run, the human reviewer drops notes into `.claude/skills/update-docs-from-<sdk>/learnings/<date>-<topic>.md`:
  - "When the commit subject says 'internal:', it is never a doc change — auto-classify as `chore`."
  - "Symbol `RealtimeChannel#publish` is documented at three places X, Y, Z — always update all three."
  - "Don't propose edits to `cli/index.mdx`; that page is hand-curated."
- The skill's classifier/mapper prompts include the contents of `learnings/` as a system-prompt addendum (concatenated, capped at, say, 8 KB).
- Periodically, a maintainer consolidates loose notes into the prompt files proper and archives the raw notes.

This is the documented path for the "keep upgrading it" flow the user described.

---

## 9. Tooling choices and dependencies

- **No new runtime deps in `package.json`.** Skill scripts use shell + the GitHub CLI (`gh`) which is already in the dev environment, plus `jq` for JSON manipulation.
- **SDK clones cached in `~/.cache/ably-docs/sdks/`** — outside the repo, never gitignored-bloat. Re-used across runs.
- **Use `git -C <cache>` rather than `cd`**, for parity with our shell hygiene.
- **Patches over rewrites.** Sub-agents emit unified diffs that `git apply --3way` can run; this matches the user's saved preference for regex-style edits and lets us audit each change.

---

## 10. Open design questions (flagged for the user)

These are the calls I'd want to make explicit before coding starts:

1. **Should `RUN_SUMMARY.md` and `MANUAL_REVIEW.md` be committed to the proposed PR branch** (so reviewers see them in GitHub), or stay local-only? Recommend: commit them to the branch only, never to `main`. They're useful in a PR thread; they're noise in `main`.
2. **Do we want a single "umbrella" skill** (`/update-docs-from-upstream <sdk-id>`) that dispatches to the per-SDK skills, or do we want each per-SDK skill standalone? Recommend: standalone now (cheaper to iterate), umbrella later once flows stabilize.
3. **Should classification run locally with a heuristic first**, and only escalate to LLM for `unknown`? This would cut token cost dramatically for noisy SDK repos. Recommend: yes, in v2 — start with all-LLM classification to validate the categories.
4. **Versioned SDKs** (e.g. `ably-js@2.x` vs `@3.x`): do docs need to track multiple major versions concurrently? If yes, `update-manifest.json` needs a `branch` per major and the skill needs a `--branch` flag. Out of scope for v1, but worth knowing whether to plumb.
5. **CI guard:** add a CircleCI job that runs `validate-manifest.sh` on every PR to catch malformed manifest edits. Cheap insurance.

---

## 11. Phased delivery

A suggested order of attack so we ship something useful early:

| Phase | Deliverable | Notes |
|---|---|---|
| **M1** | `update-manifest.json` + JSON schema + manifest validator | No skills yet. Lets us start tracking SHAs immediately. |
| **M2** | `update-docs-from-ably-cli` skill, end-to-end (Phases 0–6) | CLI is the smallest surface area — best test bed. |
| **M3** | `learnings/` mechanism + carry-over file | Proves the iterative loop works. |
| **M4** | `update-docs-from-ably-js` skill | Largest surface; biggest payoff. |
| **M5** | `update-docs-from-ably-java`, `update-docs-from-ably-dotnet` | Reuse js skill's prompts with language swaps. |
| **M6** | Cross-SDK ripple flagging (§7) | Once 3+ SDK skills exist. |
| **M7** | Heuristic classifier, umbrella skill, CI guard | Optimization & polish. |

Each phase is independently mergeable; nothing blocks `main` until M2 actually runs.

---

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Skill silently overwrites a curated doc page | `docScopes` allowlist + sub-agents emit patches, not writes. Human applies the diff. |
| Manifest SHA drifts from reality (someone edits docs without bumping it) | Manifest bump is decoupled from doc edits; fine for SHA to lag. The next sync just does more work. |
| Token blow-up on a large commit range | `ignorePaths`, `primarySources` filter, per-commit batching, heuristic pre-filter (M7). |
| Review fatigue when `MANUAL_REVIEW.md` is huge | Cap manual items per run; if exceeded, the skill stops at Phase 3 and asks the user to narrow the SHA range. |
| Two skills run concurrently and clobber each other's run dir | Per-SDK subdir + per-run timestamped subdir; no shared paths. |
| LLM hallucinated symbol or API | Self-review phase + `learnings/` accrual. False positives are caught the second time at the latest. |
| Repo root keeps accumulating scratch `.md` files (already happening) | All run artifacts under `auto-docs-update/`, gitignored. Plan documents (like this one) live where the user puts them. |

---

## 13. Summary

- One manifest at the root tracks `lastSyncedCommit` per upstream SDK.
- One Claude Code skill per SDK, structured as a 6-phase pipeline, every phase persisted to disk under `auto-docs-update/<sdk>/runs/<dated>/`.
- Skill proposes; human applies. Manifest bumps only on explicit acceptance.
- `MANUAL_REVIEW.md` is the human queue; `learnings/` is the feedback loop that makes the skill smarter run-over-run.
- Start with `ably-cli` to de-risk; expand outward.
