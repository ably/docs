---
name: pr-description
description: Update the current PR description using `gh pr edit`. Analyzes the diff and commit history against the PR's base branch to write a reviewer-oriented summary.
allowed-tools: Bash(git log *), Bash(git diff *), Bash(gh pr view *), Bash(gh pr edit *), AskUserQuestion
---

# PR Description: Update the Current PR

Generate and apply a PR description that helps reviewers understand the
change as a whole. Commit messages explain incremental steps; the PR
description explains the bigger picture — motivation, design decisions,
and what reviewers should pay attention to.

## Step 1: Gather context

Run these in parallel:

1. `gh pr view --json number,title,body,baseRefName` — get the current
   PR metadata **including the base branch**
2. `git log --oneline <base>..HEAD` — list all commits on this branch
   (use the PR's `baseRefName`, NOT hardcoded `main`)
3. `git diff <base>..HEAD --stat` — overview of what files changed
4. `git diff <base>..HEAD` — full diff (read selectively if very large)

If there is no open PR for this branch, tell the user and stop.

**Important:** Always diff against the PR's actual base branch (from
`baseRefName`), not `main`. A PR targeting `feature-x` should only
describe changes relative to `feature-x`, not everything since `main`.

## Step 2: Understand the change

Read the full diff and commit history. Focus on:

- **What changed**: which components, interfaces, types, or behaviors were added/removed/modified
- **Why**: what motivated this change? Look for patterns across commits — a rename, a removal, a new abstraction, a simplification
- **Design decisions**: what trade-offs were made? What was the alternative?
- **Impact surface**: what do consumers of this code need to know? Are there breaking changes?

Do NOT just concatenate commit messages. Synthesize them into a coherent narrative.

## Step 3: Draft the description

Write a PR description with this structure:

```
<1-2 sentence summary of the change and its motivation>

### What changed

- **Component/area**: what happened and why (one bullet per logical change)
- Keep bullets concrete — name the types, methods, and files involved
- Group related changes under a single bullet rather than listing every file

### Breaking changes

- List any breaking changes to the public API (removed types, renamed methods, changed signatures)
- Omit this section entirely if there are no breaking changes
```

Guidelines:
- Lead with motivation, not mechanics
- Be specific: name the types, methods, and interfaces involved
- Keep it scannable — reviewers skim first, read deeply second
- Don't repeat information that's obvious from the diff
- Don't include test plan sections, emoji, or boilerplate

## Step 4: Present for review

Show the drafted description to the user. Use **AskUserQuestion** to ask:
"Update PR, adjust, or cancel?" with those three options.

## Step 5: Apply

Update the PR using `gh pr edit` with a heredoc:

```bash
gh pr edit --body "$(cat <<'EOF'
<description here>
EOF
)"
```

Confirm with the PR URL when done.
