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
    - the equivalent in Swift could be an `any AsyncSequence<UserElement, Never>`, where `UserElement` is a struct with `type` and `text` properties, both of type `String`

TODO: before this, we need to tell it how to actually create a Swift project and add Ably to it and import it.

In order to avoid needing to set up all of these variables in the test file (since it may not be obvious how to initialize them), create a Swift function that accepts the surrounding context as an argument:

```swift
// A top-level function that encapsulates all the context needed for this example. We use a unique identifier in the name in case later on we wish to use the same test harness for multiple examples (for efficiency).
func exampleContext_7EEA145D_060F_4DAD_BFBF_1A4CC28856E8() {
    struct UserElement {
        var type: String
        var text: String
    }

    // The body of this function is the translation of the example.
    func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<UserElement, Never>) async throws {
        // TODO: fill in with translation of example (to come in next step)
    }
}
```

Now **confirm that the test harness builds cleanly**: `swift build`.

## 2. Translate the JavaScript code

TODO: what guidance should we give it for how to translate the JS code?
TODO: explain where the Sendable came from

Now translate the JavaScript code to Swift, using your knowledge of ably-js and ably-cocoa.

Guidance:

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
// A top-level function that provides the scope for any custom types.
func customTypesScope() {
    struct UserElement {
        var type: String
        var text: String
    }

    // The body of this function is the translation of the example.
    func example(channel: ARTRealtimeChannel, stream: any AsyncSequence<UserElement, Never> & Sendable) async throws {
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
}
```

## 4. Use the test harness to verify the translated code

1. Inside the test harness directory, run `swift build`.
2. If the compilation succeeds, the translated code can be considered correct; there is nothing else to do.
3. If the compilation fails, analyse the compilation failures. If you know how to fix the compilation failures, then modify the translated code and try building again. If you do not know how to fix the compilation failures, then seek input from the user as to how to proceed. When reporting back to the user, provide the following information:
  - the original JavaScript code
  - the location of the original JavaScript code
  - the translated code and the test harness code into which it was inserted (make it clear which is which)
  - the compilation failure and any ideas you have about what's going on

## 5. Report back to the user

Report back to the user, explaining:

- any important decisions that you made, such as deviations from the JavaScript code
