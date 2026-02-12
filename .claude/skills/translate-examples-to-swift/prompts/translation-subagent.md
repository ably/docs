You are a translation sub-agent. Your job is to translate JavaScript examples to Swift in a single MDX file.

## File to translate

{FILEPATH}

## Output

Write your translation metadata to:
  swift-translations/translations/{FILENAME}.json

The JSON must conform to the schema at `.claude/skills/translate-examples-to-swift/schemas/translation.schema.json`. Read that schema file to understand the required structure. Validate your output with `npx ajv-cli validate` — do not use python or other tools for JSON validation.

---

## Translation Steps

Translate every JavaScript code block in the documentation unless explicitly told otherwise. For each one, you will:

1. Generate a Swift test harness
2. Translate the JavaScript code
3. Insert the translated code into the test harness
4. Use the test harness to verify the translated code
5. Insert the translated code into the documentation

As you work through these steps, collect the data needed for the translation JSON. For each example, you'll need: the example ID, line number, and any translation notes/decisions.

### Example IDs

Generate a unique ID for each translated example. IDs are random 6-character alphanumeric strings (mixed case), e.g. `Kx9mQ3`, `tR4wBn`, `Hj7nPq`. Just pick a random-looking string — the only requirement is uniqueness.

IDs are written into the MDX harness comment (so the verification agent can read them) and used in your JSON output. They are also used in the harness function name (e.g., `func example_Kx9mQ3(...)`) during compilation.

Generate an ID for each translated example.

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
   // swift-tools-version: 6.2
   import PackageDescription

   let package = Package(
       name: "SwiftTestHarness",
       platforms: [
           .macOS(.v26)  // Required for Task.immediate (Swift 6.2+)
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

When stub type declarations are needed, wrap them in an enclosing function to provide scope. Use the example ID in the function name:

```swift
func exampleContext_Kx9mQ3() {
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
// Function name includes the example ID
func example_Kx9mQ3(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
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

#### Bridging ably-cocoa callbacks with `async` / `await`

The ably-cocoa SDK uses Objective-C-style callbacks, but all translated Swift code should use `async` / `await` to match the JavaScript examples' structure. Bridge one-shot SDK callbacks with `withCheckedThrowingContinuation`.

There are three categories of SDK call, each translated differently:

##### One-shot calls where JS uses `await`

When JavaScript `await`s a one-shot SDK call (publish, history, annotations.publish, etc.), bridge it with `withCheckedThrowingContinuation`. Always `await` when JS does, even if the result isn't used — this preserves the JS semantics and keeps translations consistent.

##### One-shot calls where JS does NOT `await` (fire-and-forget)

When JavaScript intentionally does not `await` a one-shot SDK call (e.g. `channel.appendMessage(...)` with no `await`), simply call the ably-cocoa method without a callback (or with a no-op callback `{ _, _ in }` if the API requires one). Do NOT wrap it in a `Task` — this preserves call ordering (important when appending tokens in a loop) and is the most concise translation.

For example, given this JavaScript:

```javascript
const { serials: [msgSerial] } = await channel.publish({ name: 'response', data: '' });

for await (const event of stream) {
  // No await — fire-and-forget
  channel.appendMessage({ serial: msgSerial, data: event.text });
}
```

The `publish` is awaited, so it gets a continuation. The `appendMessage` is not awaited, so it's called directly without a callback:

```swift
let publishResult = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<ARTPublishResult, Error>) in
    channel.publish("response", data: "") { result, error in
        if let error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume(returning: result!)
        }
    }
}

guard let msgSerial = publishResult.serials.first?.value else {
    print("No serial returned")
    return
}

for await event in stream {
    let messageToAppend = ARTMessage()
    messageToAppend.serial = msgSerial
    messageToAppend.data = event.text

    channel.append(messageToAppend, operation: nil, params: nil)
}
```

##### Deferred error checking (`Promise.allSettled` pattern)

When the JS code fires off multiple operations and then _later_ checks for failures (e.g. collecting promises and checking with `Promise.allSettled`), use `Task.immediate` with a continuation inside. `Task.immediate` (Swift 6.2+) starts executing immediately on the current executor before yielding, which preserves the ordering of SDK calls — unlike `Task { }`, which provides no ordering guarantee. Collect the `Task` handles and await them after the loop.

Include a comment in the translated code explaining why `Task.immediate` is used, along the lines of:

```
// Task.immediate starts on the calling context and continues until it suspends,
// preserving the order of append calls. Users targeting OS versions prior to
// macOS 26 / iOS 26 may need to use a callback-based approach instead.
```

Example:

```swift
var appendTasks: [Task<Void, Error>] = []

for await event in stream {
    let messageToAppend = ARTMessage()
    messageToAppend.serial = msgSerial
    messageToAppend.data = event.text

    // Task.immediate starts on the calling context and continues until it suspends,
    // preserving the order of append calls. Users targeting OS versions prior to
    // macOS 26 / iOS 26 may need to use a callback-based approach instead.
    let task = Task.immediate {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            channel.append(messageToAppend, operation: nil, params: nil) { _, error in
                if let error {
                    continuation.resume(throwing: error)
                } else {
                    continuation.resume()
                }
            }
        }
    }
    appendTasks.append(task)
}

// Check for any failures after the stream completes
var failed = false
for task in appendTasks {
    do {
        try await task.value
    } catch {
        failed = true
    }
}
```

##### Persistent listeners (subscribe)

`channel.subscribe` callbacks fire multiple times, so they cannot be bridged to a single `await`. These remain as callbacks in the translated code.

However, when the JS `await`s the subscribe call itself (e.g. `await channel.subscribe('prompt', callback)`), the `await` is waiting for the implicit channel attach. Bridge this with `subscribe(_:onAttach:callback:)`:

```swift
try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
    channel.subscribe("prompt", onAttach: { error in
        if let error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume()
        }
    }, callback: { message in
        // This callback fires for each message — it stays as a callback
        processMessage(message)
    })
}
```

If the JS does NOT `await` the subscribe (just `channel.subscribe('prompt', callback)` with no `await`), use the simple form without `onAttach:`.

#### The `(result, error)` callback convention

ably-cocoa callbacks pass `(Result?, Error?)` where the convention is exactly one is non-nil.

**Exception — pagination callbacks**: `ARTPaginatedResult.next` calls back with `(nil, nil)` when there are no more pages (per spec point TG4). Use an optional continuation type for pagination and check for nil after the `await`.

**When you need the result**, force-unwrap `result!` inside the continuation — this enforces the convention and is the only acceptable use of force-unwrap:

```swift
let publishResult = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<ARTPublishResult, Error>) in
    channel.publish("response", data: data) { result, error in
        if let error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume(returning: result!)  // Force-unwrap: if no error, result is non-nil
        }
    }
}
```

After the continuation, use optional chaining + `guard` for everything else — never force-unwrap beyond the callback convention itself:

```swift
guard let msgSerial = publishResult.serials.first?.value else {
    print("No serial returned")
    return
}
```

The callback body should do nothing beyond resuming the continuation. Do not extract values, perform logic, or branch inside the callback — the whole point of the continuation is to get the result out so you can work with it sequentially after the `await`.

**When you only care about success or failure** (you don't need the result value), just check the error — do not force-unwrap a result you're going to discard:

```swift
try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
    channel.publish([message]) { _, error in
        if let error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume()
        }
    }
}
```

#### The `channel.history` special case

`ARTRealtimeChannel.history(_:callback:)` is unusual: the ObjC method signature is `- (BOOL)history:callback:error:`, which Swift bridges as `throws`. The continuation closure passed to `withCheckedThrowingContinuation` is non-throwing (`(CheckedContinuation<T, Error>) -> Void`), so you need a `do`/`catch` _inside_ the continuation to handle the synchronous `throws`:

```swift
var page = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<ARTPaginatedResult<ARTMessage>?, Error>) in
    do {
        try channel.history(query) { page, error in
            if let error {
                continuation.resume(throwing: error)
            } else {
                continuation.resume(returning: page)
            }
        }
    } catch {
        continuation.resume(throwing: error)
    }
}
```

#### Handling mutable state with @MainActor

This section applies when **subscribe callbacks mutate local state**. Since subscribe callbacks remain as callbacks (they can't be bridged to `await`), and they need to access mutable state declared outside the callback, you need `@MainActor` isolation.

**Do NOT create custom actor types** (e.g., `actor PendingPrompts { ... }` or `actor ActiveRequestsStore { ... }`). This adds unnecessary complexity and diverges from the JavaScript's simple approach.

Instead, mark the harness function with `@MainActor` and use plain local variables. Since ably-cocoa executes callbacks on the main thread by default, use `MainActor.assumeIsolated { }` inside subscribe callbacks to access main-actor-isolated state:

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

If a subscribe callback needs to do async work (e.g. calling a nested `async` function) that also touches the mutable state, use `Task { }` inside `MainActor.assumeIsolated { }`. The `Task` inherits `@MainActor` isolation from the `assumeIsolated` closure, so an explicit `@MainActor` annotation on the `Task` is not needed:

```swift
@MainActor
func example(channel: ARTRealtimeChannel) {
    var activeRequests: [String: String] = [:]

    channel.subscribe("user-input") { message in
        MainActor.assumeIsolated {
            let promptID = (message.data as? [String: Any])?["promptId"] as? String ?? ""
            activeRequests[promptID] = "processing"

            Task {
                defer { activeRequests.removeValue(forKey: promptID) }
                await processRequest(promptID)
            }
        }
    }
}
```

**When `@MainActor` is NOT needed**: If no subscribe callback mutates local state — i.e. callbacks just pass data to functions or print output — then `@MainActor` should not be used on the harness function. If a subscribe callback needs to launch async work but doesn't touch shared mutable state, a plain `Task { }` (without `@MainActor` or `MainActor.assumeIsolated`) suffices.

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

**C7. Avoid `as Any` casts**: `as Any` is a code smell. Fix depending on cause:
- **Optional in dictionary literal**: Guard/unwrap the optional first, then put the unwrapped value in the dictionary.
- **Discriminated data**: Use an enum with associated data so each case carries exactly the fields it needs.
- **Optional in non-optional context**: Guard/unwrap.

**C8. No `(value: T, Void)` tuples in user-visible code**: Do NOT use tuples like `(text: String, Void)` to mimic JS objects with one property in the **translated example code** that readers see. Use `T` directly — e.g., `[String: String]` instead of `[String: (text: String, Void)]`. However, `(value: T, Void)` tuples are acceptable in **harness parameters** (the function signature in the harness comment) where they provide labelled property access matching the JS original (e.g., `latest: () -> (timestamp: Date, Void)` so the visible code can write `.latest().timestamp`).

**C9. No `nonisolated(unsafe)`**: Never use `nonisolated(unsafe)` for mutable state. Instead, mark the harness function with `@MainActor` and use `MainActor.assumeIsolated { }` inside ably-cocoa subscribe callbacks to access main-actor-isolated state. See the [Handling mutable state with @MainActor](#handling-mutable-state-with-mainactor) section above.

---

For example, a candidate translation of the running example would be:

```swift
// Publish initial message and capture the serial for appending tokens
let publishResult = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<ARTPublishResult, Error>) in
    channel.publish("response", data: "") { result, error in
        if let error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume(returning: result!)
        }
    }
}

guard let msgSerial = publishResult.serials.first?.value else {
    print("No serial returned")
    return
}

// Example: stream returns events like { type: 'token', text: 'Hello' }
for await event in stream {
    // Append each token as it arrives
    if event.type == "token" {
        let messageToAppend = ARTMessage()
        messageToAppend.serial = msgSerial
        messageToAppend.data = event.text

        channel.append(messageToAppend, operation: nil, params: nil)
    }
}
```

Note how the JS `await channel.publish(...)` becomes a `try await withCheckedThrowingContinuation`, while the JS `channel.appendMessage(...)` (no `await`) is called directly without a callback.

---

## 3. Insert the translated code into the test harness

Insert the translated code from step 2 into the test harness from step 1:

```swift
func example_Kx9mQ3(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never> & Sendable) async throws {
    // Publish initial message and capture the serial for appending tokens
    let publishResult = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<ARTPublishResult, Error>) in
        channel.publish("response", data: "") { result, error in
            if let error {
                continuation.resume(throwing: error)
            } else {
                continuation.resume(returning: result!)
            }
        }
    }

    guard let msgSerial = publishResult.serials.first?.value else {
        print("No serial returned")
        return
    }

    // Example: stream returns events like { type: 'token', text: 'Hello' }
    for await event in stream {
        // Append each token as it arrives
        if event.type == "token" {
            let messageToAppend = ARTMessage()
            messageToAppend.serial = msgSerial
            messageToAppend.data = event.text

            channel.append(messageToAppend, operation: nil, params: nil)
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

Insert the verified Swift code into the documentation file, within the same `<Code>` block as the JavaScript example. Include a test harness comment immediately before the Swift code block, showing the compilable wrapper:

```mdx
<Code>
```javascript
// original JavaScript code
```

{/*
Swift test harness (id: Kx9mQ3):
func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<(type: String, text: String), Never>) async throws {
    // insert example code here
}
*/}
```swift
// translated Swift code goes here
```
</Code>
```

When **stub types are needed** (the translated code references a type by name), include them in the harness comment:

```mdx
<Code>
```javascript
// original JavaScript code
```

{/*
Swift test harness (id: tR4wBn):
struct ResponseData {
    var timestamp: Date
    var content: String
}

func example(channel: ARTRealtimeChannel) {
    // insert example code here
}
*/}
```swift
// The type name `ResponseData` appears in the translated code
let responses: [String: ResponseData] = [:]
// ...
```
</Code>
```

The test harness comment must include **everything needed to compile the example**:
- **Stub types**: Any actors, structs, classes, or type aliases that the example code references by name
- **Function signature**: The function that wraps the example code, with all parameters

**Critical**: The example code in the MDX must be **byte-for-byte identical** to the code inside the `example()` function body that was tested. If you need to add a wrapper, actor, or any other code to make compilation work, that code must either:
1. Go in the harness comment (if it's context the example assumes exists), OR
2. Be part of the example code itself (if it's something the reader should see)

Never test code with workarounds (like `@unchecked Sendable`) that aren't included in either the harness comment or the example code.

**Exception — `import` statements**: When the original JavaScript example includes an `import` statement (e.g. `import * as Ably from "ably"`), the displayed Swift code block should include `import Ably` at the top. Since Swift imports are file-level and cannot appear inside a function body, this line is exempt from the byte-for-byte rule — the displayed code includes the import, but the compiled function body does not. The test harness already has `import Ably` at file scope.

This enables:
- **Reviewers** to verify the translation compiles correctly
- **Future editors** to modify the Swift code and test compilation without having to reverse-engineer what context was originally used

---

## Report back

Report what you translated and any issues encountered.
