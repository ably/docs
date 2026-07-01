---
name: docs-review-links
description: Audit a docs page for mechanics and integrity — H2 anchors, internal link resolution, frontmatter completeness, nav registration, redirects, the API-reference hidden-table audit, and literal error codes in troubleshooting for searchability. Read-only; produces a conformance report and never edits the page.
license: proprietary
metadata:
  team: engineering
---

# Review: links & mechanics

Audit the mechanical integrity that breaks pages silently — anchors, links,
frontmatter, navigation, redirects, and the API-reference table wiring.

## Step 1 — scope & contract

Invoke the `review-conventions` skill via the Ably MCP
(`skillGet({ id: "review-conventions" })`) — report-only rule, scope resolution
(honouring `$ARGUMENTS`), severity scale, report format. Use
**concern = `links`**, **surface = docs**. The checks are the **Verification
checks** section of `src/pages/docs/AGENTS.md` (and its **API reference standard**
section for the hidden-table audit). Run them from the repo root against the
scoped pages; each hit is a finding. Emit the report.

## Step 2 — what to look for

- **H2 anchors** — every `## Heading` carries `<a id="slug"/>`. Missing anchors
  break the page nav. (`major`)
- **Internal link resolution** — every internal link resolves; no links to a URL
  that exists only in another page's `redirect_from`. (`major`–`blocker`)
- **Frontmatter completeness** — `title`, `meta_description`, `meta_keywords`,
  `intro`, and `redirect_from` where the page moved. Per-interface API-reference
  pages **omit** `intro:`; navigational API pages keep it. (`major`)
- **Navigation registration** — new pages added to `src/data/nav/`; renamed slugs
  updated everywhere. (`major`)
- **Redirects on moves** — renamed/merged pages carry `redirect_from`. (`blocker` if the old URL was live)
- **Troubleshooting searchability** — each entry includes the **literal error
  code and text** so search finds it. (`major`)
- **API-reference hidden-table audit** — every `<Table id='X' hidden>` has an
  inline `<Table id='X'/>` reference and vice versa (run the Node audit in
  `api-reference.md`). (`major`)
- **Heading levels** — no skipped levels (H2→H4). (`minor`)
- **Asides** — `<Aside>` only when load-bearing. (`minor`)

## Step 3 — severity notes

Run the greps and the Node hidden-table audit rather than eyeballing — these are
binary. A broken internal link or missing redirect on a moved page is
`blocker`/`major`. Missing frontmatter and unanchored H2s are `major`. Quote the
exact path and line for each hit.
