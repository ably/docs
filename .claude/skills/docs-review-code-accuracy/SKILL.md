---
name: docs-review-code-accuracy
description: Audit the code samples on a docs page against the SDK they target — factory and method names, option shapes, return shapes, enum values, import surfaces verified against the SDK .d.ts at the version the docs target, plus no API keys in client code. Read-only; produces a conformance report and never edits the page.
license: proprietary
metadata:
  team: engineering
---

# Review: code accuracy

Check that every code sample matches the SDK it targets. Prior docs drift; the
SDK is the source of truth. This is the concern where a confidently-wrong sample
does the most damage.

## Step 1 — scope & contract

Invoke the `review-conventions` skill via the Ably MCP
(`skillGet({ id: "review-conventions" })`) — report-only rule, scope resolution
(honouring `$ARGUMENTS`), severity scale, report format. Use
**concern = `code-accuracy`**, **surface = docs**. The method is in
the **Code accuracy** section of `src/pages/docs/AGENTS.md` (auto-loaded when editing docs). Apply the criteria below, then emit the report.

## Step 2 — establish the SDK state, then read it

1. **Resolve the state to verify against** with the shared **`code-resolve-changes`**
   skill (load via the Ably MCP: `skillGet({ id: "code-resolve-changes" })`). If
   the docs-change plan names a source of change, pass it; otherwise default to the
   version the docs target (`src/data/languages/languageData.ts`), and failing that
   the latest release of the SDK repo.
2. **Badge check.** A sample written against a different version than the
   `languageData.ts` badge is a finding.
3. **Read the type declarations** from the resolved state to cross-check snippets —
   `npm pack <package>@<version>` for a published release, or `git show <ref>:<path>`
   / the local working tree for a state not on npm (read-only; do not mutate).
4. Use the entry point the sample's audience uses (core vs framework-bound).

## Step 3 — what to look for

For every snippet, cross-check against the `.d.ts`:

- **Factory / constructor names** exist and are spelled as written. (`blocker`)
- **Method locations** — the method is on the object the sample calls it on. (`blocker`)
- **Option / parameter shapes** — keys exist, types match, required present. (`major`–`blocker`)
- **Return shapes** — the sample uses what the method returns. (`major`)
- **Enum / literal values** match the SDK. (`major`)
- **Import surfaces** — one consistent import per file; symbol exported by that path. (`minor`–`major`)
- **No API keys in client code** — `authUrl: '/auth'` placeholder only. A literal key is a `blocker`.

After reading the SDK, re-grep the page for old patterns it no longer supports
(renamed factories, moved methods, removed hooks, renamed option keys).

## Step 4 — severity notes

Verify before flagging — read the actual `.d.ts`, not memory or prior docs. A
sample that won't compile/run as written is a `blocker`; deprecated-but-runs is
`major`; a real key in client code is always a `blocker`. When you cannot fetch
the SDK, say so and mark affected snippets unverified rather than guessing.
