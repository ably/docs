---
title: LiveObjects REST API Reference
meta_description: "..."
meta_keywords: "..."
section: api
index: 100
jump_to:
redirect_from:
---

# LiveObjects REST API

Routes providing access to live objects stored on the channel.

# Fetching objects

There are three APIs for fetching objects stored on a channel:
1. List - returns a list of objects.
2. Object - returns the objects in a tree starting from the given object.
3. Compact - returns the object state in a compact tree format.

## List objects

Use the list endpoint to fetch a list of objects stored on the channel.

`GET rest.ably.io/channels/<channelId>/objects`

Returns the IDs of the live objects store on the channel.

```json
[
  "root",
  "map:YIffJYRAP2k2e7ZP+xzequ9c5kDu1LfI/sEOKoWHvv4@1742479683000",
  "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000"
]
```

To include values, set the `values=true` query parameter.

`GET rest.ably.io/channels/<channelId>/objects?values=true`

```json
[
  {
    "objectId": "map:YIffJYRAP2k2e7ZP+xzequ9c5kDu1LfI/sEOKoWHvv4@1742479683000",
    "map": {
      "entries": {
        "myMapKey": { "data": { "string": "my map value" } },
        "myObjectRef": { "data": { "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000" } }
      }
    }
  },
  {
    "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000",
    "counter": { "data": { "number": 5 } }
  }
]
```

### Data values

In the list API, data values represent a concrete piece of data (a number, a string, etc) or a
reference to another object. The key in the data value indicates the type that you can expect to
receive in the value.

```json
{ "data": { "number" : 4 }}
{ "data": { "string" : "Ably Pub/Sub" }}
{ "data": { "boolean" : true }}
{ "data": { "bytes": "TGl2ZU9iamVjdHMgaXMgYXdlc29tZQo=", "encoding": "base64" }}
{ "data": { "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000" }}
```

Maps are made of entries, which are a user-defined key (e.g. "myMapKey") and a data value.
Counters are data values containing a number.

### Query params

Param      | Description
-----------|-----------
values     | `true` or `false`, default is `false`. Include the values in the response. Setting this to `false` returns a list objectIds only.
limit      | Set the number of objects to be returned in each page.
cursor     | The cursor used for pagination.
metadata   | `true` or `false`, default is `false`. Include object metadata in the response.

### Metadata

Object metadata describes the internal details of an object. There are two metadata fields that are common to all objects:

Metadata field  | Description
----------------|-------------
Tombstone       | true or false, indicates if the object has been deleted. Objects will exist as tombstones for a short while to ensure they remain deleted and are not accidentally created by a lagging live objects client.
SiteTimeserials | a map of sites, and the last operation applied to this object from that site.

Maps have additional metadata attached to their map entries.

Metadata field  | Description
----------------|-------------
MapSemantics    | Indicates the conflict resolution method used in this map.
Timeserial      | The last operation applied to this map key, used to preserve the map semantics.
Tombstone       | true or false, indicates if the map entry has been deleted. Tombstoned map values are not included in the responses by default or when using the `metadata=false` query param.

Example:

```json
{
  "objectId": "map:YIffJYRAP2k2e7ZP+xzequ9c5kDu1LfI/sEOKoWHvv4@1742479683000",
  "map": {
    "mapSemantics": "LWW",
    "entries": {
      "myMapKey": {
        "timeserial": "...",
        "tombstone": false,
        "data": { "string": "my map value" }
      },
      "myObjectRef": {
        "timeserial": "...",
        "tombstone": true,
        "data": { "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000" }
      }
    }
  }
}
```

### Tombstones

Tombstones are used on objects and on map entires to indicate that the object or map entry has been
deleted. This protects against lagging live objects clients from re-introducing a deleted value by
accident.

Tombstone objects are not included by default, but can be enabled using `metadata=true` query param.

Tombstone map entry keys are included by default, but the values are not. The key will be present in
the entries object but with a null value e.g. `myKey: null`. Tombstoned map entry values can be
included using the `metadata=true` flag.

### Cyclic and diamond references

In the List, Object, and Compact APIs objects will only be included in the response once. For
cyclic or diamond references, the later references to any object that was already included will have
an objectIds only. The reference will be included even if you request the data to be inlined using
query params, as objects will only appear in the response once.

## Object API

Use the object API to fetch a live object stored on the channel in a tree structure.

`GET rest.ably.io/channels/<channelId>/objects/<objectId>`

```json
{
  "objectId": "root",
  "map": {
    "entries": {
      "myMapKey": { "data": { "string": "my map value" }},
      "myObjectRef": {
        "data": { "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000" }
      }
    }
  }
}
```

To replace the object references with the actual values (inlined), set the `children=true` query parameter.
This query param causes the content of the objects to be included in the tree response, instead of
just the objectIds.

`GET rest.ably.io/channels/<channelId>/objects/<objectId>?children=true`

```json
{
  "objectId": "root",
  "map": {
    "entries": {
      "myMapKey": { "data": { "string": "my map value" }},
      "myObjectRef": {
        "data": {
          "objectId": "counter:Nz1ZiNjqsDfkDjA61xarinqpWsqEGAAw2mzWWtvX2b8@1742481614000",
          "counter": { "data": { "number": 5 }}
        }
      }
    }
  }
}
```

Use `root` as the objectId in the URL to get the full state, or any other objectId to fetch a
subset of the state.

The traverse API also supports requesting metadata with `metadata=true` query param.

You can limit the number of objects included in the response using the `limit` query param.

## Compact API

The compact API returns a tree structure of the objects in a concise format that's easier to
unmarshal into data types that represent your state.

`GET rest.ably.io/channels/<channelId>/objects/<objectId>/compact`

```json
{
  "root": {
    "myMapKey": "my may value",
    "myObjectRef": 5
  }
}
```

Map keys will be inlined as json object keys, maps will be json objects, and counters will be
inlined directly with the counter value.

You can limit the number of objects included in the response using the `limit` query param.

Note, cyclic and diamond references will be included as objectId references rather than including a
single object in the response more than once. The compact API response schema does not distinguish
between a string value and an objectId.

# Issuing operations

## Operations API

POST rest.ably.io/channels/<channelId>/objects

### Maps

Create a map:
```json
{
  "operation": "MAP_CREATE",
  "data": {
    "myMapKey": {"data": {"string": "myMapValue"}},
    "myOtherKey": {"data": {"boolean": true}}
  }
}
```

The `data` field is made up of your map keys, and a "data" value [^link to above].
You do not have to set a value on the map when you create it.

You do not have to provide an objectId when you create a map. The server will assign the correct
objectId and return it in the response:

```json
{
  "channel": "<channelId>",
  "objectIds": ["map:Pm/NQtjxtARMnLFMUiw8U+eeiayy0kClduUZlH0ag30@1742555472000"]
}
```

You can create an objectId and provide it in the create request. The server will validate the
objectId is the correct format. See the [Object ID format LINK] Object ID format section.

```json
{
  "operation": "MAP_CREATE",
  "objectId": "map:99OSLwCFQsrs6GID4M8rfO_0sYmVwRADcECua_-yXQE@1742207566771",
  "nonce": "myNonce",
  "data": {"myMapKey":{"string":"myMapValue"}}
}
```

Set a value on a map:

To set a value on a map, you need to provide the objectId of the map you wish to set the key and
value on. The data value consists of a `key` and `value`. Like before the `value` carries an object
that indicates the type of the value being set.

```json
{
  "operation": "MAP_SET",
  "objectId": "map:99OSLwCFQsrs6GID4M8rfO_0sYmVwRADcECua_@1742207566771",
  "data": {"key":"foo", "value":{"string":"bar"}}
}
```

Remove a value from a map:

To remove a key and value from a map, provide the objectId of the map you wish to modify, and the
key to remove.

```json
{
  "operation": "MAP_REMOVE",
  "objectId": "map:99OSLwCFQsrs6GID4M8rfO_0sYmVwRADcECua_@1742207566771",
  "data": {"key":"myMapKey"}
}
```

### Counters

Create a counter:

The counter create takes a `data` value with a `number` field. This number is the initial value that
the counter will be initialised to.

```json
{
  "operation": "COUNTER_CREATE",
  "data": { "number": 3.1415926 }
}
```

You can create a counter with an objectId, rather than relying on the server to assign the objectId.


Response:

```json
{
  "channel": "<channelId>",
  "objectIds": ["counter:u41d1-DfkEt1AtbyJUSUJn3qAFblVVGmx5Dpg-ToCeI@1734628392000"]
}
```

Increment a counter:

To increment a counter, you must provide the objectId of the counter that you are going to
increment. You can increment by a negative value.

```json
{
  "operation": "COUNTER_INC",
  "objectId": "counter:J7x6mAF8X5Ha60VBZb6GtXSgnKJQagNLgadUlgICjkk@1734628392000",
  "data": {"amount": 2}
}
```

## Object ID format

An objectId is made of the following components:

```
objectType:base64hash@millisecondTimestamp
```
For example:
```
counter:J7x6mAF8X5Ha60VBZb6GtXSgnKJQagNLgadUlgICjkk@1734628392000
```

The object types are `map` or `counter`.

The millisecond timestamp is "now". There is a small leeway to compensate for server clocks being
out of sync. You can fetch the ably server time using rest.ably.io/time

The base64 raw url encoding hash is made of `initialValue:nonce`. The initial value is the raw bytes
taken from the `data` field on create operations. The `nonce` is any random string.

Examples:

Initial value                          | Nonce     | Result hash
---------------------------------------|-----------|------------
`{"value":3.1415926539}`               | `nonce`   | `u41d1-DfkEt1AtbyJUSUJn3qAFblVVGmx5Dpg-ToCeI`
`{"foo":{"string":"bar"}}`             | `nonce`   | `ME2yWbb_6sK5AlwxklHA8mTBPxPZx9iyW2Zk6rKJfRs`
`{"myMapKey":{"string":"myMapValue"}}` | `myNonce` | `99OSLwCFQsrs6GID4M8rfO_0sYmVwRADcECua_-yXQE`

Note the initial value is space and case sensitive.

The Operations API accepts the "data" field as either a json object, or as a string with an encoding
field. For example, this request passes the data field for a counter as a string with json encoding.

```json
{
  "operation": "COUNTER_CREATE",
  "data": "{ \"number\": 3.1415926 }",
  "encoding": "json"
}
```

## Batch operations

You can pass a list of operations to the operations endpoint.

POST rest.ably.io/channels/<channelId>/objects

```json
[
  {
    "operation": "MAP_SET"
    "objectId": "map:cwhvmsq21tXtFDS02TQqPdIhGGezcSc8UsBYeUGygng@1636022994797",
    "data": {"key": "isActive", "value": { "boolean": true }}
  },
  {
    "operation": "COUNTER_INC"
    "objectId": "counter:DXr2i8FHRGkLrHPccWhXKDj1VUX2s7ACvmTrNEguJXo@1742481614000",
    "data": {"amount": 1}
  }
]
```

It map be useful to generate an objectId client-side, so that you can create an object and modify it
in the same batch operation. For example; create a map and set values on it in the same operation.

Batches of operations issued in the REST API will remain a batch, and will be passed to clients as a
batch. Other operations issued against that object will not be interleaved between operations within
the same batch.

## Path operations

Use path operations to issue operations against objects based on their referenced location in the
tree of objects stored on the channel.

For example, increment the `likes` counter in the `reactions` map by 3.

```json
{
  "path": "root.reactions.likes",
  "operation": "COUNTER_INC",
  "data": {"amount":3}
}
```

All path operations are expressed from the `root`.

You can issue a single operation against multiple objects at once using the wildcard `*`.
For example, increment all `reactions` counters by 1.
```json
{
  "path": "root.reactions.*",
  "operation": "COUNTER_INC",
  "data": {"amount":1}
}
```

Wildcards can be included at the end or in the middle of paths and will match exactly one level in
the object tree. For example, this path increments all objects reachable from the root map that have
a `likes` counter:

```json
{
  "path": "root.*.likes",
  "operation": "COUNTER_INC",
  "data": {"amount":1}
}
```

If your map keys (that make up the path) already contain a `.`, you can escape the path using a `\.`

For example, increment the counter stored at the `foo.bar` key on the root map:

```json
{
  "path": "root.foo\.bar",
  "operation": "COUNTER_INC",
  "data": {"amount":1}
}
```

## Idempotent operations

All operations support an `id` field. [LINK TO ID FORMAT]

