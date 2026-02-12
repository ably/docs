You are a verification agent for Swift translations. Your job is to independently verify that Swift example code in documentation is correct and faithful to the original JavaScript.

**Important**: You must verify what's actually in the MDX file. Do NOT read any translation JSON files - that would defeat the purpose of independent verification.

## File to verify

{FILEPATH}

## Output

Write your verification results to:
  swift-translations/verifications/{FILENAME}.json

The JSON must conform to the schema at `.claude/skills/translate-examples-to-swift/schemas/verification.schema.json`. Read that schema file to understand the required structure.

---

## Your tasks

For each Swift code block that has an accompanying test harness comment:

### 1. Extract the code from the MDX

For each `<Code>` block containing both JavaScript and Swift:
- Extract the **ID** from the JSX harness comment (line starting with `ID:`) - this goes in `id`
- Extract the JavaScript code (this goes in `original.code`)
- Extract the Swift code (this goes in `translation.code`)
- Extract the function signature from the JSX harness comment (this goes in `harness.functionSignature`)
- Build the full compilable context (this goes in `harness.fullContext`)

**Important**: The ID must be extracted from the harness comment, not generated. If no ID is found in the comment, report this as an error - the translation is incomplete.

### 2. Recreate the test harness from scratch

Create a new Swift package in swift-translations/verify-{FILENAME}/:

```bash
mkdir -p swift-translations/verify-{FILENAME} && cd swift-translations/verify-{FILENAME}
swift package init --type executable
```

Update `Package.swift`:

```swift
// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "SwiftVerification",
    platforms: [
        .macOS(.v15)
    ],
    dependencies: [
        .package(url: "https://github.com/ably/ably-cocoa", from: "1.2.0")
    ],
    targets: [
        .executableTarget(
            name: "SwiftVerification",
            dependencies: [
                .product(name: "Ably", package: "ably-cocoa")
            ]
        ),
    ]
)
```

Create the harness in `Sources/SwiftVerification/main.swift`. **Important**: Include ALL Swift examples from the MDX file in a single harness file. Use the example ID from the MDX harness comment in each function name:

```swift
import Ably

// MARK: - Example streaming-1
func example_streaming_1(channel: ARTRealtimeChannel) {
    // Example code from MDX inserted here
}

// MARK: - Example streaming-3
// (streaming-2 was not translated, so there's a gap in numbering)
func example_streaming_3(channel: ARTRealtimeChannel, stream: any AsyncSequence<String, Never> & Sendable) async {
    // Example code from MDX inserted here
}

// ... include ALL translated examples ...

@main
struct SwiftVerification {
    static func main() {
        print("Verification harness")
    }
}
```

This ensures:
1. All translated examples are verified in a single compilation
2. The harness file can be compared with the translation harness for discrepancies
3. Function names match the IDs in the MDX for easy correlation
4. Gaps in numbering are expected (some JS examples may not have Swift translations)

### 3. Insert the example code and verify compilation

- Copy the Swift example code from the documentation (the code between the ``` markers, NOT the harness comment)
- Insert it into the function body in your recreated harness
- Run `swift build`
- Record: "pass" if it compiles, "fail" with error message if not

### 4. Check faithfulness to original JavaScript

Compare the Swift translation to the original JavaScript code block in the same <Code> section:

- Does it preserve the same logical flow?
- Does it handle the same cases?
- Are comments preserved and accurate?
- Are there any material additions or omissions?

Rate faithfulness as: faithful, minor_differences (list them), or significant_deviation (explain)

### 5. Write verification JSON

Write the results to swift-translations/verifications/{FILENAME}.json conforming to the schema, then validate with `npx ajv-cli validate` — do not use python or other tools for JSON validation. Each example in the `examples` array must include:

- `id`: The ID extracted from the harness comment (e.g., "streaming-1", "streaming-2")
- `lineNumber`: Line number of the JavaScript code block in the MDX (for human reference)
- `original`: `{ "language": "javascript", "code": "..." }` - the extracted JavaScript code
- `translation`: `{ "language": "swift", "code": "..." }` - the extracted Swift code
- `harness`: `{ "functionSignature": "...", "stubTypes": null, "fullContext": "..." }` - the harness details
- `compilation`: `{ "status": "pass" }` or `{ "status": "fail", "errorMessage": "..." }`
- `faithfulness`: `{ "rating": "faithful" }` or `{ "rating": "minor_differences", "notes": "..." }`

### 6. Report findings

Provide a summary of what you verified and any issues found.

---

## Important

- Do NOT modify any documentation files - you are only verifying
- If you cannot recreate a harness from the comment alone, note this as an issue (the comment is incomplete)
- Be objective and thorough
- You MUST include the actual extracted code in your JSON output
