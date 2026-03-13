You are a translation sub-agent. Your job is to translate JavaScript examples to Swift in a single MDX file.

## File to translate

{FILEPATH}

## Output

Write your translation metadata to:
  swift-translations/translations/{FILENAME}.json

The JSON must conform to the schema at `.claude/skills/translate-examples-to-swift/schemas/translation.schema.json`. Read that schema file to understand the required structure. Validate your output with `npx ajv-cli validate` — do not use python or other tools for JSON validation.

---

## Translation Steps

For each JavaScript code block in the documentation, you will:

1. Generate a Swift test harness
2. Translate the JavaScript code
3. Insert the translated code into the test harness
4. Use the test harness to verify the translated code
5. Insert the translated code into the documentation

As you work through these steps, collect the data needed for the translation JSON. For each example, you'll need: the example ID, line number, and any translation notes/decisions.

### Example IDs

Generate a unique ID for each example using the format `{filename}-{sequential}`, numbering ALL JavaScript examples in the file sequentially:
- `streaming-1` for the first JavaScript example in `streaming.mdx`
- `streaming-2` for the second JavaScript example
- etc.

**Important**: Number all JavaScript examples, even those you don't translate (like data structure literals). This keeps IDs stable and predictable. If you skip translating an example, just skip that ID - don't renumber.

This ID must be consistent across:
1. The harness function name (e.g., `func example_streaming_1(...)`)
2. The MDX harness comment (e.g., `ID: streaming-1`)
3. Your JSON output

All three must match exactly to enable correlation between harness, MDX, and verification results.

---

## 1. Generate a Swift test harness

Generate a Swift _test harness_. This is a Swift program into which we will subsequently insert the translated code in order to verify that the translated code compiles. This is necessary because a given block may not be self-contained; it may assume that there are variables or other types that already exist. The test harness provides these types.

**Important**: The harness provides ONLY the context that is NOT present in the original JavaScript example. If the JavaScript example creates something (a client, a variable, a function), the Swift translation should also create it—that code belongs in the translated example, not hidden in the harness. The harness is for things the JS example _assumes_ exist but doesn't show.

1. Read the JavaScript code example and the context surrounding this example in the documentation.

2. Decide what context needs to exist in the test harness—i.e., what does the JS code assume exists but not create?

For example, given this JavaScript:

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

We can see that the following must exist:

- a realtime channel (the `channel` variable)
    - from the surrounding context, you can infer that this is a `RealtimeChannel`
    - the equivalent in ably-cocoa is an `ARTRealtimeChannel`
- a stream of events (the `stream` variable)
    - from the surrounding context, you can infer that this is an `AsyncIterable` whose elements have a user-provided type that has shape `{ type: string, text: string }`
    - the equivalent in Swift could be an `any AsyncSequence<(type: String, text: String), Never>` using a tuple with labeled elements

### Setting up the Swift test harness

Create a Swift package with ably-cocoa as a dependency:

1. Create the package (use a unique directory per file being translated):
   ```bash
   mkdir -p swift-translations/harness-{FILENAME} && cd swift-translations/harness-{FILENAME}
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

For the running example (which doesn't need stub type declarations), create a simple function. **Use the example ID in the function name** to enable correlation:

```swift
// The body of this function is the translation of the example.
// Function name includes the example ID (streaming-1 -> example_streaming_1)
func example_streaming_1(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
    // TODO: fill in with translation of example (to come in next step)
}
```

Now **confirm that the test harness builds cleanly**: `swift build`.

---

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

#### Handling mutable state with @MainActor

**Do NOT create custom actor types** (e.g., `actor PendingPrompts { ... }` or `actor ActiveRequestsStore { ... }`). This adds unnecessary complexity and diverges from the JavaScript's simple approach.

Instead, when the JavaScript example uses mutable local variables (like `Map`, arrays, or objects that get mutated), use `@MainActor` isolation with plain local variables. This keeps the Swift code close to the JavaScript structure.

Mark the harness function with `@MainActor`. Since ably-cocoa executes callbacks on the main thread by default, use `MainActor.assumeIsolated { }` inside callbacks to access main-actor-isolated state:

```swift
@MainActor
func example(channel: ARTRealtimeChannel) {
    // Mutable state as simple local variables, just like in JavaScript
    var pendingPrompts: [String: String] = [:]

    // ably-cocoa callbacks run on main thread, so use MainActor.assumeIsolated
    // to tell the compiler it's safe to access @MainActor state
    channel.subscribe { message in
        MainActor.assumeIsolated {
            // This compiles because we're asserting we're on the main actor
            pendingPrompts[message.id] = message.data as? String
        }
    }
}
```

This pattern:
- Mirrors JavaScript's straightforward mutable variable approach
- Avoids custom actor types, which are rarely used in typical Swift code and would be unfamiliar to most readers
- Is simpler for readers to understand

#### Nested functions

If the JavaScript example defines a function (like `async function processAndRespond(...)`), translate it as a nested function inside the harness function body. The nested function becomes part of the translated example code, not a harness parameter:

```swift
@MainActor
func example(channel: ARTRealtimeChannel) {
    // Nested async function - part of the translated example
    func processAndRespond(prompt: String, promptId: String) async {
        // ...
    }

    // Rest of translated code that calls processAndRespond
}
```

#### Conventions

Follow these conventions in all Swift translations:

**C1. Template variables**: Use the same template variables as the JavaScript code (`'{{RANDOM_CHANNEL_NAME}}'`, `{{API_KEY}}`, `{{APP_ID}}`). Never hardcode channel names like `"test-channel"` or `"my-channel"` when the JS uses a template variable.

**C2. Setting `message.extras`**: Use `as ARTJsonCompatible` (not `as NSDictionary`) when assigning dictionary literals to `message.extras`, since Swift cannot implicitly bridge `[String: Any]` to `(any ARTJsonCompatible)?`. Use the SDK protocol type rather than the Foundation type. Example:
```swift
message.extras = ["ai.ably.chat": ["think": true]] as ARTJsonCompatible
```

**C3. `authCallback` token values**: Use `as ARTTokenDetailsCompatible` when passing a `String` token to the `authCallback` callback, since `String` doesn't implicitly conform. Example:
```swift
options.authCallback = { tokenParams, callback in
    Task {
        do {
            let url = URL(string: "/api/auth/token")!
            let (data, _) = try await URLSession.shared.data(from: url)
            let token = String(data: data, encoding: .utf8)!
            callback(token as ARTTokenDetailsCompatible, nil)
        } catch {
            callback(nil, error)
        }
    }
}
```

**C4. Reading `message.extras`**: Always use `toJSON()` for reading extras:
```swift
guard let extras = try? message.extras?.toJSON() as? [String: Any],
      let aiExtras = extras["ai.ably.chat"] as? [String: Any] else { return }
```
Do NOT use `as? NSDictionary`, `as? ARTJsonCompatible`, or `as? [String: Any]` directly on `message.extras`.

**C5. Swift naming — `ID` not `Id`**: Use `ID` in Swift variable names per Swift API Design Guidelines: `promptID`, `responseID`, `toolCallID`, `userID`, `clientID`. Keep dictionary *keys* unchanged (`"promptId"`, `"responseId"` etc.) since those are cross-platform wire format.

**C6. No empty-string fallback for `clientId`**: Instead of `message.clientId ?? ""`, use a guard:
```swift
guard let userID = message.clientId else { return }
```
Exception: `?? ""` is acceptable inside string interpolation purely for display (e.g., `print("User: \(member.clientId ?? "")")`).

**C7. `async throws` with continuations**: When the JavaScript has `async function`, the Swift equivalent should be `async throws` using `withCheckedThrowingContinuation` to bridge callback-based SDK calls:
```swift
func sendPrompt(text: String) async throws {
    try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
        channel.publish("prompt", data: text) { error in
            if let error {
                continuation.resume(throwing: error)
            } else {
                continuation.resume()
            }
        }
    }
}
```
Use this when the JavaScript function awaits SDK calls. Use plain callback chaining when only demonstrating SDK call sequences.

**C8. Avoid `as Any` casts**: `as Any` is a code smell. Fix depending on cause:
- **Optional in dictionary literal**: Guard/unwrap the optional first, then put the unwrapped value in the dictionary.
- **Discriminated data**: Use an enum with associated data so each case carries exactly the fields it needs.
- **Optional in non-optional context**: Guard/unwrap.

**C9. No `(value: T, Void)` tuples for single-property types**: Do NOT use tuples like `(text: String, Void)` to mimic JS objects with one property. Use `T` directly — e.g., `[String: String]` instead of `[String: (text: String, Void)]`.

**C10. No `nonisolated(unsafe)`**: Never use `nonisolated(unsafe)` for mutable state. Instead, mark the harness function with `@MainActor` and use `MainActor.assumeIsolated { }` inside ably-cocoa callbacks to access main-actor-isolated state. See the [Handling mutable state with @MainActor](#handling-mutable-state-with-mainactor) section above.

---

For example, a candidate translation of the running example would be:

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

---

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

---

## 4. Use the test harness to verify the translated code

1. Inside the test harness directory, run `swift build`.
2. If the compilation succeeds, the translated code can be considered correct; proceed to step 5.
3. If the compilation fails, analyse the compilation failures. There are two possible causes:
   - **Missing context in the test harness**: The original JavaScript code assumed something exists (a type, a function, a variable) that the test harness doesn't provide. In this case, add the missing context to the test harness and try again. Do NOT modify the translated code to work around missing context.
   - **Mistranslation**: The translated Swift code is incorrect (wrong method names, wrong syntax, incorrect API usage). In this case, fix the translation and try again.
4. If you cannot determine the cause of the compilation failure or do not know how to fix it, report the issue. Provide:
   - the original JavaScript code
   - the location of the original JavaScript code
   - the translated code and the test harness code into which it was inserted (make it clear which is which)
   - the compilation failure and any ideas you have about what's going on

**Important**: The code that ends up in the documentation must be exactly the code inside the `example()` function body that was verified to compile. Do not insert different code into the documentation than what was tested.

---

## 5. Insert the translated code into the documentation

Insert the verified Swift code into the documentation file, within the same `<Code>` block as the JavaScript example. Include the test harness context as a JSX comment with the example ID:

```mdx
<Code>
```javascript
// original JavaScript code
```

{/* Swift example test harness
ID: streaming-1
To verify: copy this comment into a Swift file, paste the example code into the function body, run `swift build`

func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
    // --- example code starts here ---
*/}
```swift
// translated Swift code goes here
```
{/* --- end example code --- */}
</Code>
```

When **stub types are needed** (the translated code references a type by name), include them in the harness comment:

```mdx
<Code>
```javascript
// original JavaScript code
```

{/* Swift example test harness
ID: streaming-5
To verify: copy this comment into a Swift file, paste the example code into the function body, run `swift build`

struct ResponseData {
    var timestamp: Date
    var content: String
}

func example(channel: ARTRealtimeChannel) {
    // --- example code starts here ---
*/}
```swift
// The type name `ResponseData` appears in the translated code
let responses: [String: ResponseData] = [:]
// ...
```
{/* --- end example code --- */}
</Code>
```

The test harness comment must include **everything needed to compile the example**:
- **ID**: Unique identifier for this example (used by verification to match translations)
- **Stub types**: Any actors, structs, classes, or type aliases that the example code references by name
- **Function signature**: The function that wraps the example code, with all parameters

**Critical**: The example code in the MDX must be **byte-for-byte identical** to the code inside the `example()` function body that was tested. If you need to add a wrapper, actor, or any other code to make compilation work, that code must either:
1. Go in the harness comment (if it's context the example assumes exists), OR
2. Be part of the example code itself (if it's something the reader should see)

Never test code with workarounds (like `@unchecked Sendable`) that aren't included in either the harness comment or the example code.

**Exception — `import` statements**: When the original JavaScript example includes an `import` statement (e.g. `import * as Ably from "ably"`), the displayed Swift code block should include `import Ably` at the top. Since Swift imports are file-level and cannot appear inside a function body, this line is exempt from the byte-for-byte rule — the displayed code includes the import, but the compiled function body does not. The test harness already has `import Ably` at file scope.

This enables:
- **Verification agent** to match this translation with its verification results
- **Reviewers** to verify the translation compiles correctly
- **Future editors** to modify the Swift code and test compilation without having to reverse-engineer what context was originally used

---

## Report back

Report what you translated and any issues encountered.
