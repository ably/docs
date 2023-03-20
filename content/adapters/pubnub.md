# Ably Pubnub protocol adapter

**For a step-by-step tutorial to using the Pubnub protocol adapter, see https://ably.com/tutorials/pubnub-adapter**

## Example

To use the Ably Pubnub protocol adapter, you must initialize your Pubnub client library as follows:

JavaScript example:

```js
var apiKey = "<your Ably api key>";
var pubnub = PUBNUB({
  publish_key        : apiKey,
  subscribe_key      : apiKey,
  origin             : 'pubnub.ably.io',
  ssl                : true,
  no_wait_for_pending: true
});
```

Ruby example:

```ruby
api_key = "<your Ably API key>"
pubnub = Pubnub.new(
  :subscribe_key => api_key,
  :publish_key   => api_key,
  :origin        => 'pubnub.ably.io',
  :origins_pool  => ['pubnub.ably.io'],
  :ssl           => true
)
```

Please note:

* For simplicity, the above example uses the Pubnub JavaScript library. All other Pubnub client libraries can be instantiated in a similar fashion. See the [complete list of Pubnub SDKs and their documentation](https://www.pubnub.com/docs/).
* You can add any other Pubnub options you would normally use in the initializer.
* Don't try to use different Ably API keys for the `publish_key` and `subscribe_key`. Unlike Pubnub, Ably does not use different keys for publish and subscribe; instead, capabilities are connection-oriented, and the Adapter will use whatever you pass as the `subscribe_key` to create the Ably connection. If that key does not have publish capabilities, you will not be able to publish, whatever the `publish_key` has.
* The `ssl` option is not mandatory, but strongly recommended. The Pubnub client includes the raw api key in the path that it connects to, so we strongly advise you to use this option to prevent it being sent in plain text.
* Pubnub client libraries are inconsistent in how they let you set a new origin. Most let you just specify it in the constructor, but some require setting the domain and subdomain separately: for example, the java lib (version 3.7.10) requires you to call `pn.setOrigin('pubnub'); pn.setDomain('ably.io'); pn.setCacheBusting(false)` after initializing it to set the origin. Some require setting an additional `origins_pool` client option as well as `origin`. Consult the docs for the library you're using.

## Supported features

- publish
- subscribe
- presence
- history
- getstate
- setstate
- herenow
- global herenow (See usage note in 'REST requests' below)

## Unsupported features

- PAM
- wherenow
- channel groups
- backfill subscribes
- stream filters

## Usage notes

### General

- Using the Pubnub adapter will likely be slightly slower than using a native Ably library due to the overhead of protocol translation. Typically the impact is in the low milliseconds
- Some things which are quick with Pubnub are slow or impossible with Ably, and vice versa. Some things which in Pubnub are single operations (e.g. global herenow) are translated to many different operations, and will be correspondingly slower. Some operations (e.g. wherenow) are unlikely to ever be supported in the adapter, as they have no Ably equivalent.
- Behind the scenes, the adapter just uses the normal Ably service, so there is no problem with using Pubnub and Ably client libraries side by side: they are completely interoperable, subject to a few caveats below.
- Finally, many of the advantages of Ably over Pubnub (using [websockets rather than long polling](https://faqs.ably.com/which-transports-are-supported), [continuity guarantees](https://faqs.ably.com/connection-state-recovery), [fallback host support](https://faqs.ably.com/routing-around-network-and-dns-issues) etc.) are unavailable when using Pubnub client libraries. If a native Ably library is available for your platform, we recommend you consider using the Ably client libraries instead or at least make a plan to eventually transition over to Ably native client libraries.

### Publishing and subscribing

- Pubnub does not have a concept of a message name. Pubnub message content is mapped to Ably message data (the payload). A publish using the Pubnub adapter will leave the Ably message name blank, and message name is not visible to Pubnub adapter subscribers.
- Each separate UUID (for a given api key, in a given region) is treated as a separate subscriber (for presence purposes), and so will count as a separate connection to Ably.
- In Pubnub's model, message continuity is available for '5-20 minutes' and up to 100 messages. To provide compatibility with this, the Pubnub adapter will stay connected and attached to your channels for 5 minutes after the last subscribe long poll it receives. If the client doesn't connect to the adapter for 5 minutes, the adapter will disconnect from Ably, and any subsequent subscribe poll will be treated as a new connection (and will get messages from the time of that poll onwards).
- As such, during development, beware that using a lot of different uuids (eg using the `unique_uuid` option of the js lib to generate a new uuid on each page refresh) may result in connections racking up quickly, as each will stay alive a minimum of 5 minutes.
- In Pubnub itself, the catchup mechanism will only give you the last ~100 messages total, across all channels you're subscribed to. When using the Ably Pubnub adapter, things are not quite this bad: you will receive the last 100 messages for *each* channel you're subscribed to. But as with Pubnub, you will have no idea whether or not this represents all the messages you missed, and so you will not know whether you've lost connection continuity. This is a problem inherent to the Pubnub protocol, so if it is an issue for you, we recommend switching to the Ably client libraries, which will tell you whether or not you have lost continuity (and so e.g. you can do a history request if so, to get any messages you've missed).
- Commas are valid in Ably channel names, but not Pubnub, since with Pubnub they are used as delimiters. So Ably channels with commas in them will not be accessible to Pubnub clients.

### Presence and state

- Pubnub's `UUID` is mapped to Ably's [`clientId`](https://ably.com/docs/realtime/authentication#identified-clients).
- Pubnub considers the same `UUID` to be the same member; Ably considers the same `clientid` on different connections to be different members of the presence set. As such, if you have multiple connections with the same `clientId`, the presence set will contain that `clientId` multiple times. Ably does this so that if you have multiple devices connected with the same `clientId` you can check which devices are present. If getting the state for a `clientId`, if there are multiple members in the set with the same `clientId`, the adapter will just pick one and return its state.
- Pubnub's member state is mapped to Ably's presence data. With presence data, member aren't permitted to change other members' presence data. So each client can only set its own state, not other people's.

### REST requests

- Note that some Pubnub api requests are mapped to multiple Ably requests, and will count as such for rate limiting and package quota purposes. For example:
 - A global herenow request is mapped to a request for a list of active channels, followed by a presence request for each channel, for a total of n+1 requests for n channels.
 - Due to the mismatch between how Ably and how Pubnub paginate history requests, any Pubnub history request which in Ably would give a paginated result (that is, for which the result set is limited by the `limit`/`count` param) will involve two Ably API requests.
