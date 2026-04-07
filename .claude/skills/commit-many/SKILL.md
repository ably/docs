---
name: commit-many
description: Stage and commit all uncommitted changes as a series of logical, well-ordered commits
allowed-tools: Bash(git diff *), Bash(git status *), Bash(git log *), Bash(git reset HEAD *), Bash(git add *), AskUserQuestion, Skill
---

# Commit Many: Split Changes into Logical Commits

Split all uncommitted changes into a series of logical, well-ordered commits
where each commit compiles and passes lint.

## Step 1: Gather context

Run these commands to understand the uncommitted changes:

1. `git diff --stat` and `git diff --cached --stat` to see all changed files
2. `git diff` and `git diff --cached` to see the full diffs (staged and unstaged)
3. `git status` to check overall state (never use `-uall` flag)
4. `git log --oneline -5` to see recent commit style

If there are no changes to commit, tell the user and stop.

## Step 2: Plan the commits

Analyze the diff and propose a series of logical commits. Present the plan
as a numbered table with columns: commit number, type/scope, description,
and which files go in each commit.

**Principles for splitting:**

- Each commit must represent a single logical change
- Each commit must leave the codebase in a compilable state (no
  intermediate breakage) - if interdependent changes can't be split
  without breaking compilation, they belong in one commit
- Source code changes and their corresponding test updates belong in
  the same commit
- Documentation changes are separate from code changes
- Demo/example changes are separate from library code changes
- Pre-existing unrelated changes should be identified and excluded
  (or committed separately with their own message)
- Commit code changes together with its tests

Use **AskUserQuestion** to ask: "Proceed, adjust, or cancel?" with those
three options. If the user adjusts, update the plan and re-present.

## Step 3: Execute the plan

For each commit in the approved plan:

1. **Reset staging area**: `git reset HEAD -- .` (if anything is staged)
2. **Stage the files for this commit**: `git add <specific files>`
3. **Verify staging**: `git diff --cached --stat` to confirm the right
   files are staged
4. **Delegate to `/commit`**: Use the Skill tool to invoke the `commit`
   skill, which will generate the commit message, present it to the
   user for review, and handle the commit. Wait for `/commit` to
   finish before proceeding to the next commit.

Continue to the next commit only after the previous one is committed.

After the final commit, show the complete commit log for the series:
`git log --oneline -<N>` where N is the number of commits created.

Commit message guidelines and project-specific rules are handled by the
`/commit` skill - do not duplicate them here.
