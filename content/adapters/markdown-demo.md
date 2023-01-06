---
title: Markdown testing
meta_description: "Test Markdown elements"
languages:
  - javascript
  - nodejs
  - ruby
  - java
  - swift
  - objc
  - csharp
  - flutter
---

## Code snippets

Example consecutive code snippets:

```javascript
const ably = new Ably.Realtime({ '{{API_KEY}}' });
ably.connection.on('connected', () => {
  console.log('Connected to Ably!');
});
```

```nodejs
const Ably = require('ably');
const ably = new Ably.Realtime({ '{{API_KEY}}' });  
ably.connection.on('connected', () => {
  console.log('Connected to Ably!');
});
```

```ruby
ably = Ably::Realtime.new('{{API_KEY}}')
ably.connection.on(:connected) do
  puts "Connected to Ably!"
end
```

```java
AblyRealtime ably = new AblyRealtime("{{API_KEY}}");
ably.connection.on('connected', new ConnectionStateListener() {
  @Override
  public void onConnectionStateChanged(ConnectionStateChange change) {
    System.out.println("Connected to Ably!");
  }
});
```

```csharp
AblyRealtime ably = new AblyRealtime("{{API_KEY}}");
ably.Connection.On(ConnectionEvent.Connected, args => {
  Console.WriteLine("Connected to Ably!");
});
```

```objc
ARTRealtime *ably = [[ARTRealtime alloc] initWithKey:@"{{API_KEY}}"];
[ably.connection on:ARTRealtimeConnectionEventConnected callback:^(ARTConnectionStateChange *change) {
    NSLog(@"Connected to Ably!");
}];
```

```swift
let realtime = ARTRealtime(key: "{{API_KEY}}")
realtime.connection.on(.connected) { change in
    print("Connected to Ably!")
}
```

```flutter
final realtime = ably.Realtime(key: '{{API_KEY}}');
final channel = realtime
  .on(ably.ConnectionStateChange.connected)
  .subscribe((ably.ConnectionStateChange stateChange) {
    print('Connected to Ably!');
  }
);
```

## Links

Does [this](#definition-lists) link to definition lists?

## Tables

### Simple

| Property | Description | Default |
| -------- | ----------- | ------- |
| `Test` | The test property sees if this table displays correctly | True |

### Complex

|_=. Limit |_=. Free |_=. PAYG |_=. Committed Use |
| "Number of apps":#apps (per account) |\4=. 100 |
| "Number of API keys":#api-keys (per account) |\4=. 100 |
| "Number of rules":#rules (per account) |\4=. 100 |
| "Number of namespaces":#namespaces (per account) |\4=. 100 |

## Lists

### Ordered

1. Open this page.
2. See if the numbering works.
    * It either will,
    * Or it won't.
3. Test other pages.

### Unordered

* This one should
    * Check the level of nesting
        * We can handle.

## Spans

A new connection attempt can be triggered by an explicit call to <span lang="default">`connect()`</span><span lang="ruby">`connect`</span><span lang="csharp">`Connect()`</span> on the `Connection` object.

## Definition lists

- initialized := A `Connection` object having this state has been initialized but no connection has yet been attempted.
- connecting := A connection attempt has been initiated. The connecting state is entered as soon as the library has completed initialization, and is reentered each time connection is re-attempted following disconnection.
- connected := A connection exists and is active.