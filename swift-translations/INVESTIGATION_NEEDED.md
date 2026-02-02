# Swift Translation Investigation Needed

## Summary

Translation completed with 73 examples, but 4 failed verification. Both failure types suggest the translation agents didn't properly verify their output matches what was written to the MDX files.

## Issues to Investigate

### 1. chain-of-thought.mdx (examples 1 & 2)

**Symptom**: Harness comment provides `channel: ARTRealtimeChannel` but code uses `realtime.channels.get(...)`

**Verification error**: `cannot find 'realtime' in scope`

**Questions**:
- Did the translation agent's actual test harness include `realtime`?
- Why was a different/incomplete signature written to the JSX comment?
- Check `swift-translations/harness-chain-of-thought/` to see what the agent actually used

**Files to examine**:
- `src/pages/docs/ai-transport/messaging/chain-of-thought.mdx` (lines ~44-143)
- `swift-translations/harness-chain-of-thought/Sources/SwiftTestHarness/SwiftTestHarness.swift`

### 2. accepting-user-input.mdx (examples 6 & 7)

**Symptom**: Swift 6 concurrency errors - `@Sendable` requirements and mutable captures in Tasks

**Verification errors**:
- Example 6: `generateTokens` closure not marked `@Sendable`
- Example 7: mutable `activeRequests` captured in Task

**Questions**:
- Did the translation agent's harness actually compile with Swift 6 strict concurrency?
- Was there a cached build or different compiler settings?
- Does the harness comment in the MDX match what the agent tested?
- Check `swift-translations/harness-accepting-user-input/` to compare with verification harness

**Files to examine**:
- `src/pages/docs/ai-transport/messaging/accepting-user-input.mdx` (examples 6 & 7)
- `swift-translations/harness-accepting-user-input/Sources/SwiftTestHarness/SwiftTestHarness.swift`
- `swift-translations/verify-accepting-user-input/Sources/SwiftVerification/main.swift`

## Investigation Plan

1. **Compare harnesses**: For each failing example, diff the translation harness against the verification harness to see discrepancies

2. **Rebuild translation harnesses**: Go to each `harness-*` directory and run `swift build` fresh to see if they actually compile now

3. **Check harness comments**: Verify the JSX comments in the MDX files contain the complete function signatures needed

4. **Review translation agent transcripts**: Check `/private/tmp/claude-501/-Users-lawrence-code-work-ably-docs/tasks/` for the translation agent outputs to understand what they actually tested

5. **Fix the issues**: Either:
   - Update the harness comments to include missing parameters
   - Or update the Swift code to use what the harness provides
   - For concurrency issues: add `@Sendable` annotations or use actors

## Commands to Run

```bash
# Check if translation harnesses still compile
cd swift-translations/harness-chain-of-thought && swift build
cd swift-translations/harness-accepting-user-input && swift build

# Compare harnesses
diff swift-translations/harness-chain-of-thought/Sources/SwiftTestHarness/SwiftTestHarness.swift \
     swift-translations/verify-chain-of-thought/Sources/SwiftVerification/main.swift

diff swift-translations/harness-accepting-user-input/Sources/SwiftTestHarness/SwiftTestHarness.swift \
     swift-translations/verify-accepting-user-input/Sources/SwiftVerification/main.swift
```

## Review File

The full review is available at: `swift-translations/review.html`

Open this to see side-by-side JavaScript/Swift comparisons for all 73 examples.
