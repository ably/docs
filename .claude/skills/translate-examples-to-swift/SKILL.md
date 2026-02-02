---
name: translate-examples-to-swift
description: Translates inline JavaScript example code to Swift
---

## Usage

Invoke this skill with `/translate-examples-to-swift` followed by a description of what to translate.

### Examples

```
/translate-examples-to-swift translate the JavaScript examples in src/pages/docs/ai-transport/streaming.mdx
```

```
/translate-examples-to-swift translate all JavaScript code blocks in the src/pages/docs/messages/ directory
```

```
/translate-examples-to-swift translate the code block at line 45 of src/pages/docs/channels/index.mdx
```

### What to specify

- **File or directory**: Which documentation file(s) contain the examples to translate
- **Scope** (optional): Specific code blocks if you don't want to translate all examples in a file

---

## Architecture Overview

This skill uses a **two-phase architecture** with independent translation and verification:

1. **Translation phase**: Spawn one sub-agent per MDX file. Each translates examples, self-checks compilation (for iteration), inserts into MDX, and writes translation metadata JSON.

2. **Verification phase**: Spawn one sub-agent per MDX file. Each reads Swift code from the MDX (source of truth), compiles in a fresh harness, assesses faithfulness, and writes verification results JSON.

3. **Assembly phase**: Merge translation and verification JSONs, generate consolidated JSON and HTML review file.

**Key principle**: Verification reads from MDX, not from translation output. This ensures verification tests what actually ships.

**Always delegate**: Spawn a sub-agent for each file, even for single-file tasks. This keeps behavior consistent and context isolated.

---

## Output Directory Structure

All intermediate files go in `swift-translations/` at the repo root:

```
swift-translations/
    translations/
        {filename}.json       # One per MDX file
    verifications/
        {filename}.json       # One per MDX file
    consolidated.json         # Merged data for review app
    review.html               # Human review interface
```

The `{filename}` is derived from the MDX filename without path or extension:
- `src/pages/docs/ai-transport/messaging/citations.mdx` → `citations.json`
- `src/pages/docs/ai-transport/token-streaming/message-per-token.mdx` → `message-per-token.json`

---

## Translation Steps

Given a JavaScript code block in the documentation, for example:

<pre>
<Code>
```javascript
// Publish initial message and capture the serial for appending tokens
const { serials: [msgSerial] } = await channel.publish({ name: 'response', data: '' });

// Example: stream returns events like { type: 'token', text: 'Hello' }
for await (const event of stream) {
  // Append each token as it arrives
  if (event.type === 'token') {
    channel.appendMessage({ serial: msgSerial, data: event.text });
  }
}
```
</Code>
</pre>

We wish to generate equivalent Swift example code to be inserted alongside the JavaScript example, and to be sure that this code is correct; in particular, that it compiles.

In order to generate the Swift example code, there are eight steps:

1. Generate a Swift test harness
2. Translate the JavaScript code
3. Insert the translated code into the test harness
4. Use the test harness to verify the translated code
5. Insert the translated code into the documentation
6. Independent verification (via subagent)
7. Generate review file for human review
8. Report back to the user

Detailed instructions for each of these steps are given below.

**Important**: As you work through steps 1-5, collect the data needed for the translation JSON (step 6). For each example, you'll need: the example ID, line number, and any translation notes/decisions.

## 1. Generate a Swift test harness

Generate a Swift _test harness_. This is a Swift program into which we will subsequently insert the translated code in order to verify that the translated code compiles. This is necessary because a given block may not be self-contained; it may assume that there are variables or other types that already exist. The test harness provides these types.

1. Read the JavaScript code example and the context surrounding this example in the documentation.

2. Decide what context needs to exist in the test harness.

For example, in the example given above, we can see that the following must exist:

- a realtime channel (the `channel` variable)
    - from the surrounding context, you can infer that this is a `RealtimeChannel`
    - the equivalent in ably-cocoa is an `ARTRealtimeChannel`
- a stream of events (the `stream` variable)
    - from the surrounding context, you can infer that this is an `AsyncIterable` whose elements have a user-provided type that has shape `{ type: string, text: string }`
    - the equivalent in Swift could be an `any AsyncSequence<(type: String, text: String), Never>` using a tuple with labeled elements

### Setting up the Swift test harness

Create a Swift package with ably-cocoa as a dependency:

1. Create the package:
   ```bash
   mkdir -p swift-translations/harness && cd swift-translations/harness
   swift package init --type executable
   ```

2. Update `Package.swift`:
   ```swift
   // swift-tools-version: 6.0
   import PackageDescription

   let package = Package(
       name: "SwiftTestHarness",
       platforms: [
           .macOS(.v15)  // Required for modern Swift features like typed AsyncSequence
       ],
       dependencies: [
           .package(url: "https://github.com/ably/ably-cocoa", from: "1.2.0")
       ],
       targets: [
           .executableTarget(
               name: "SwiftTestHarness",
               dependencies: [
                   .product(name: "Ably", package: "ably-cocoa")
               ]
           ),
       ]
   )
   ```

3. Put your test harness code in `Sources/SwiftTestHarness/SwiftTestHarness.swift` with `import Ably` at the top.

4. Build with `swift build` to verify compilation.

### Providing context via parameters vs stub type declarations

The goal is to make everything the original JavaScript code assumes exists available in scope. The easiest way to do this is to pass things as parameters to the `example()` function, spelling their types using function types, tuples, and existentials.

**Use parameters** (the default) when the type only needs to exist in the function signature—i.e., the translated code uses values of that type but doesn't need to spell the type name itself.

For example, if the JavaScript code calls `loadResponsesFromDatabase()` which returns an object with a `latest()` method and a `has()` method, you can spell this as a parameter:

```swift
func example(
    loadResponsesFromDatabase: () -> (
        latest: () -> (timestamp: Date, Void),
        has: (String) -> Bool
    ),
    channel: ARTRealtimeChannel
) {
    let completedResponses = loadResponsesFromDatabase()
    let latestTimestamp = completedResponses.latest().timestamp
    if completedResponses.has(responseId) { ... }
}
```

**Use stub type declarations** (in the enclosing scope) when the translated code itself needs to reference the type name—for type annotations, instantiation, or type inference hints. For example:

```swift
// Stub type declaration needed because the translated code references `ResponseData` by name
struct ResponseData {
    var timestamp: Date
}

func example(...) {
    // The type name `ResponseData` appears in the translated code
    let responses: [String: ResponseData] = [:]
    ...
}
```

The key question is: does the type name appear *inside* the translated code, or only in the harness's function signature?

When stub type declarations are needed, wrap them in an enclosing function to provide scope. Use a unique identifier in the function name in case you later want to use the same test harness for multiple examples (for efficiency):

```swift
func exampleContext_7EEA145D_060F_4DAD_BFBF_1A4CC28856E8() {
    // Stub type declaration needed because translated code references `ResponseData` by name
    struct ResponseData {
        var timestamp: Date
    }

    func example(...) {
        let responses: [String: ResponseData] = [:]  // type name appears in translated code
        ...
    }
}
```

### Putting it together

For the running example (which doesn't need stub type declarations), create a simple function:

```swift
// The body of this function is the translation of the example.
func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
    // TODO: fill in with translation of example (to come in next step)
}
```

Now **confirm that the test harness builds cleanly**: `swift build`.

## 2. Translate the JavaScript code

Now translate the JavaScript code to Swift, using your knowledge of ably-js and ably-cocoa.

### Looking up API details

When you need to look up specific API details (method signatures, parameter types, return types), consult the auto-generated SDK documentation:

- **JavaScript SDK**: https://ably.com/docs/sdk/js/v2.0 (to understand what you're translating FROM)
- **Swift/Cocoa SDK**: https://ably.com/docs/sdk/cocoa/v1.2/ (to understand what you're translating TO)

Note that some items may not appear in the auto-generated docs. If you can't find something:

1. **Check existing Swift examples** in this documentation repository for reference
2. **Look at the ably-cocoa header files** in the test harness's SPM checkout. After running `swift build`, the source is available at `.build/checkouts/ably-cocoa/Source/include/Ably/`. Use `find` and `grep` to locate the header file you need, then read it directly. The headers contain authoritative type definitions, method signatures, and documentation comments.

**Do not fetch files from GitHub** to look up API details. The SPM checkout already contains the exact version of the SDK you're compiling against, so it's both faster and more reliable to read the headers locally.

### Looking up translation patterns

For examples of how JavaScript code is typically translated to Swift (e.g., how callbacks are structured, how async/await becomes completion handlers), look at existing Swift examples in this documentation repository. For example, `src/pages/docs/messages/updates-deletes.mdx` contains Swift examples alongside JavaScript that demonstrate common patterns.

### Guidance

- Keep the translated code as close to the original JavaScript as possible; don't make material changes without good reason

For example, a candidate translation of the of the above example would be:

```swift
// Publish initial message and capture the serial for appending tokens
channel.publish("response", data: "") { publishResult, error in
    if let error {
        print("Error publishing message: \(error)")
        return
    }

    let msgSerial = publishResult!.serials[0].value!

    Task {
        // Example: stream returns events like { type: 'token', text: 'Hello' }
        for await event in stream {
          // Append each token as it arrives
          if (event.type == "token") {
              let messageToAppend = ARTMessage()
              messageToAppend.serial = msgSerial
              messageToAppend.data = event.text

              channel.append(messageToAppend, operation: nil, params: nil) { _, error in
                  if let error {
                      print("Error appending to message: \(error)")
                  }
              }
          }
        }
    }
}
```

## 3. Insert the translated code into the test harness

Insert the translated code from step 2 into the test harness from step 1:

```swift
func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never> & Sendable) async throws {
    // Publish initial message and capture the serial for appending tokens
    channel.publish("response", data: "") { publishResult, error in
        if let error {
            print("Error publishing message: \(error)")
            return
        }

        let msgSerial = publishResult!.serials[0].value!

        Task {
            // Example: stream returns events like { type: 'token', text: 'Hello' }
            for await event in stream {
              // Append each token as it arrives
              if (event.type == "token") {
                  let messageToAppend = ARTMessage()
                  messageToAppend.serial = msgSerial
                  messageToAppend.data = event.text

                  channel.append(messageToAppend, operation: nil, params: nil) { _, error in
                      if let error {
                          print("Error appending to message: \(error)")
                      }
                  }
              }
            }
        }
    }
}
```

## 4. Use the test harness to verify the translated code

1. Inside the test harness directory, run `swift build`.
2. If the compilation succeeds, the translated code can be considered correct; proceed to step 5.
3. If the compilation fails, analyse the compilation failures. There are two possible causes:
   - **Missing context in the test harness**: The original JavaScript code assumed something exists (a type, a function, a variable) that the test harness doesn't provide. In this case, add the missing context to the test harness and try again. Do NOT modify the translated code to work around missing context.
   - **Mistranslation**: The translated Swift code is incorrect (wrong method names, wrong syntax, incorrect API usage). In this case, fix the translation and try again.
4. If you cannot determine the cause of the compilation failure or do not know how to fix it, seek input from the user. When reporting back to the user, provide:
   - the original JavaScript code
   - the location of the original JavaScript code
   - the translated code and the test harness code into which it was inserted (make it clear which is which)
   - the compilation failure and any ideas you have about what's going on

**Important**: The code that ends up in the documentation must be exactly the code inside the `example()` function body that was verified to compile. Do not insert different code into the documentation than what was tested.

## 5. Insert the translated code into the documentation

Insert the verified Swift code into the documentation file, within the same `<Code>` block as the JavaScript example. Include the test harness context as a JSX comment:

```mdx
<Code>
```javascript
// original JavaScript code
```

{/* Swift example test harness: to modify and check it compiles, copy this comment into a
temporary Swift file, paste the example code into the function body, and run `swift build`

func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
    // --- example code starts here ---
*/}
```swift
// translated Swift code goes here
```
{/* --- end example code --- */}
</Code>
```

The test harness comment documents the function signature and context required to compile the example. This enables:
- **Reviewers** to verify the translation compiles correctly
- **Future editors** to modify the Swift code and test compilation without having to reverse-engineer what context was originally used

## 6. Independent verification (via subagent)

After inserting translations into the documentation, spawn an independent verification subagent. This provides an unbiased review by an agent with fresh context that recreates everything from scratch.

### Why independent verification?

- **Fresh perspective**: The verifier has no memory of your translation decisions, so it approaches the code without bias
- **Catches copy-paste errors**: Ensures the code in documentation matches what was actually tested
- **Validates harness comments**: Confirms the test harness comments are complete and usable
- **Faithfulness check**: Compares translations against originals with fresh eyes

### How to spawn the verification subagent

Use the Task tool with the following configuration:

```
Tool: Task
subagent_type: "general-purpose"
prompt: [see below]
```

**Verification prompt template:**

```
You are a verification agent for Swift translations. Your job is to independently verify that Swift example code in documentation is correct and faithful to the original JavaScript.

**Important**: You must verify what's actually in the MDX file. Do NOT read any translation JSON files - that would defeat the purpose of independent verification.

## File to verify

[The documentation file path]

## Output

Write your verification results to:
  swift-translations/verifications/{FILENAME}.json

Where {FILENAME} is the MDX filename without path or extension.

## Your tasks

For each Swift code block that has an accompanying test harness comment:

### 1. Recreate the test harness from scratch

- Create a new Swift package in swift-translations/verify-harness/:
  ```bash
  mkdir -p swift-translations/verify-harness && cd swift-translations/verify-harness
  swift package init --type executable
  ```
- Set up Package.swift with ably-cocoa dependency (same as translation harness)
- Extract the function signature from the JSX comment in the documentation
- Create the harness in Sources/SwiftVerification/main.swift

### 2. Insert the example code and verify compilation

- Copy the Swift example code from the documentation (the code between the ``` markers, NOT the harness comment)
- Insert it into the function body in your recreated harness
- Run `swift build`
- Record: PASS if it compiles, FAIL with error message if not

### 3. Check faithfulness to original JavaScript

Compare the Swift translation to the original JavaScript code block in the same <Code> section:

- Does it preserve the same logical flow?
- Does it handle the same cases?
- Are comments preserved and accurate?
- Are there any material additions or omissions?

Rate faithfulness as: faithful, minor_differences (list them), or significant_deviation (explain)

### 4. Write verification JSON

Write the results to swift-translations/verifications/{FILENAME}.json following the schema at `.claude/skills/translate-examples-to-swift/schemas/verification.schema.json`.

### 5. Report findings

Provide a summary of what you verified and any issues found.

## Important

- Do NOT modify any documentation files - you are only verifying
- If you cannot recreate a harness from the comment alone, note this as an issue (the comment is incomplete)
- Be objective and thorough
```

### Validate verification output

After the verification subagent completes, validate its JSON output:

```bash
npx ajv-cli validate \
  -s .claude/skills/translate-examples-to-swift/schemas/verification.schema.json \
  -d swift-translations/verifications/{filename}.json
```

If validation fails, report the error.

### Handling verification results

When the verification subagent returns:

1. **All passed**: Proceed to Step 7 (generate review file), including the verification summary
2. **Compilation failures**:
   - Review the failure details
   - If it's a harness comment issue (incomplete context), fix the comment and re-verify
   - If it's a translation issue, fix the translation and re-verify
3. **Faithfulness concerns**:
   - Review the differences noted
   - If intentional (documented in your decisions), note this in the final report
   - If unintentional, fix the translation and re-verify

### Handling user feedback

When the user reviews the generated review file and provides feedback:

1. Make the requested changes to the translation
2. Update the test harness and re-run `swift build` to verify compilation
3. Update the documentation with the fixed translation
4. Re-run independent verification (spawn a new verification subagent)
5. Regenerate the review file with updated data
6. Report back to the user

**This is not optional.** Any change to a translation—whether from user feedback, verification comments, or your own corrections—must go through the full verify-and-review cycle before being considered complete.

### The verification invariant

**Never output code that hasn't been verified.** This is the core principle of the skill:

- Every Swift code block inserted into documentation must have passed `swift build` in a test harness
- Every change to existing Swift code must be re-verified before the task is complete
- The review file must always reflect the current state of the translations

If you find yourself about to report completion without having verified recent changes, stop and run verification first.

## 7. Generate review file for human review

After automated verification, generate a review file that allows human reviewers to examine translations side-by-side with their originals.

### Write translation JSON

Write the translation metadata to `swift-translations/translations/{FILENAME}.json` following the schema at `.claude/skills/translate-examples-to-swift/schemas/translation.schema.json`.

Validate it:

```bash
npx ajv-cli validate \
  -s .claude/skills/translate-examples-to-swift/schemas/translation.schema.json \
  -d swift-translations/translations/{filename}.json
```

### Merge into consolidated JSON

Read all translation and verification JSONs and merge them into `swift-translations/consolidated.json` following the schema at `.claude/skills/translate-examples-to-swift/schemas/consolidated.schema.json`.

The `translationNotes` come from the translation JSON; `original`, `translation`, `harness`, and `verification` come from the verification JSON.

Validate it:

```bash
npx ajv-cli validate \
  -s .claude/skills/translate-examples-to-swift/schemas/consolidated.schema.json \
  -d swift-translations/consolidated.json
```

### Generate the HTML review file

Use the review app generator script to create a standalone HTML file:

```bash
.claude/skills/translate-examples-to-swift/review-app/generate-review.sh \
  swift-translations/consolidated.json \
  swift-translations/review.html
```

The output file can be opened directly in a browser. It provides:
- Side-by-side comparison of JavaScript and Swift code
- Syntax highlighting
- Translation notes and decisions (collapsible)
- Test harness context (collapsible)
- Verification results (compilation status, faithfulness rating)
- Interactive review controls (approve/flag/skip with comments)
- Export functionality for review summary

See `review-app/example-data.json` for a complete example of the expected data format.

## 8. Report back to the user

Report back to the user, explaining:

- any important decisions that you made, such as deviations from the JavaScript code
- the verification results summary
- any issues that require human attention
- the location of the review file for human review

Example:

```
Translation complete.

## Summary
- Files processed: 2
- Examples translated: 5
- Compilation: 4 passed, 1 failed

## Review file
Open the review file to examine translations:
  swift-translations/review.html

## Issues requiring attention
- src/pages/docs/messages/updates-deletes.mdx:78 - Compilation failed: `updateSerial` property not found
```

---

## Spawning Translation Subagents

For each MDX file to translate, spawn a translation subagent:

```
Tool: Task
subagent_type: "general-purpose"
prompt: [see below]
```

**Translation subagent prompt template:**

```
You are a translation sub-agent. Your job is to translate JavaScript examples to Swift in a single MDX file.

## File to translate

[MDX file path]

## Output

Write your translation metadata to:
  swift-translations/translations/{FILENAME}.json

Where {FILENAME} is the MDX filename without path or extension (e.g., "citations" for citations.mdx).

## Instructions

Follow the translation steps documented in the skill:

1. Create a Swift test harness in swift-translations/harness/
2. For each JavaScript code block, translate to Swift
3. Self-check compilation with `swift build` (iterate until it compiles)
4. Insert the Swift code and harness comment into the MDX
5. Record translation notes (decisions, deviations)
6. Write the translation JSON

## API Reference

- **JavaScript SDK**: https://ably.com/docs/sdk/js/v2.0
- **Swift/Cocoa SDK**: https://ably.com/docs/sdk/cocoa/v1.2/

For details not in docs, check the ably-cocoa headers in `.build/checkouts/ably-cocoa/Source/include/Ably/` after running `swift build`.

## Report back

Report what you translated and any issues encountered.
```

---

## JSON Schemas

Schemas are in `.claude/skills/translate-examples-to-swift/schemas/`:

- `translation.schema.json` - Translation sub-agent output (notes and metadata)
- `verification.schema.json` - Verification sub-agent output (code, harness, results)
- `consolidated.schema.json` - Final merged data for review app

Validate with:

```bash
npx ajv-cli validate -s {schema} -d {data}
```
