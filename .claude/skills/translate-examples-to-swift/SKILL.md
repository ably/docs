---
name: translate-examples-to-swift
description: Translates inline JavaScript example code to Swift
---

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

In order to generate the Swift example code, there are four steps:

1. Generate a Swift test harness
2. Translate the JavaScript code
3. Insert the translated code into the test harness
4. Use the test harness to verify the translated code
5. Report back to the user

Detailed instructions for each of these steps are given below.

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

TODO: before this, we need to tell it how to actually create a Swift project and add Ably to it and import it.

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

Note that some items may not appear in the auto-generated docs. If you can't find something, check existing Swift examples in this repository for reference.

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

## 5. Report back to the user

Report back to the user, explaining:

- any important decisions that you made, such as deviations from the JavaScript code
