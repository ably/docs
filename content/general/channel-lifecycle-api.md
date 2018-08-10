# Channel lifecycle API (beta)

## Overview

The channel lifecycle API is a set of related features that enable an application to obtain information about the existence, and lifecycle, of channels.

The primary feature is the channel lifecycle metachannel; this is a channel, in principle just like any other channel, except that it carries events with metadata, and exists in the metachannel namespace so it does not conflict with any application channels. Messages in the lifecycle channel indicate activation and deactivation of channels (both globally and regionally) and, when enabled for the app, periodic occupancy updates for active channels.

APIs are also provided in the REST API to:

- enumerate the active channels in an app;
- get the status of a given channel.

## Metachannels

A regular channel in an app has a channel name and, with very few restrictions, a channel name can be any unicode string. Regular channels can belong to a channel namespace (which is the part of the channel name string up to the first colon `:`) and namespaces can be used to set certain properties across all associated channels.

However, Ably also supports a way of qualifying channel names so they exist in an entirely distinct space from regular channels. Metachannels are one such space of channels with qualified names; these are reserved for specific purposes within an app and generally carry messages that are system-generated, but can be consumed by apps in just the same way as regular channels. The `log` metachannel, for example, is used to broadcast log messages (usually error messages) for events that occur within the application's context.

Two new metachannels have been added: `channel.lifecycle`, which carries messages about channel lifecycle and metadata, and `connection.lifecycle`, which carries messages about the lifecycle of realtime connections.

Metachannels are accessed by qualifying the channel name with the `[meta]` qualifier; for example `[meta]log` or `[meta]channel.lifecycle`.

There are a few things to bear in mind when accessing metachannels.

### Permissions

A regular Ably key has a `capability` which lists resources (glob expressions that match channel names) and, for any given resource, a set of permitted operations. The wildcard resource `'*'` will match any regular channel name.

In order to grant permission in a key to a metachannel, however, the resource name(s) in the `capability` must include the `[meta]` qualifier explicitly; so the following are examples of capabilities that will validly permit access to a metachannel:

    {"[meta]*":["subscribe"]}
    {"[meta]*":["*"], "*":["*"]}
    
Under normal circumstances you won't be granted permission to publish or be present in metachannels.

### Reactor rules

You can associate reactor rules with metachannels in the same way as for regular channels; configure these using the `Message` source and use a `channelFilter` that matches the qualified metachannel name, or simply the name `[meta]channel.lifecycle`. The `Channel Lifecycle` webhook source is no longer supported with the channel lifecycle metachannel.

### Subscribing via a realtime connection

The rate of messages published in a metachannel can exceed the rate that a realtime connection can handle. At present, realtime connections are permitted to subscribe to a metachannel but this may result in the connection being frequently detached as the outbound rate limit is hit on the connection. As the rate on a metachannel grows it eventually will scale by having its traffic sharded across multiple independent shard channels, each carrying a fraction of the traffic. Once a metachannel scales to a level that it is sharded, it is no longer possible to subscribe with a realtime connection; it is only possible to get messages from that metachannel via reactor rules.

### Configuration

Metachannels have defaults for various attributes - such as the maximum message rate - but certain attributes are also configurable on a per-application basis. These custom configurations are presently only available to enterprise accounts, and we do not provide dashboard support for modifying that configuration; contact Ably to discuss your requirements if this is relevant to you.

The configuration options for the `channel.lifecycle` metachannel specifically are:

- `enabled` (default `true`): determines whether or not the metachannel is enabled;
- `sendOccupancy` (default `false`): determines whether or not occupancy events are enabled;
- `occupancyUpdateInterval` (default `5000`): where occupancy events are enabled, the minimum interval, in milliseconds, between occupancy updates on any given channel.

## Channel metadata types

The primary payload of lifecycle events for channels is the `ChannelDetails` type which contains the `channelId` and other static information about the channel, plus a `status` containing a `ChannelStatus` instance which contains information about the current state of the channel.

The details of these types and their attributes is as follows.

### ChannelDetails

- `channelId` (required): the name of the channel including any qualifier, if any;
- `region` (optional): in events relating to the activity of a channel in a specific region, this identifies the region;
- `isGlobalMaster` (optional): in events relating to the activity of a channel in a specific region, this identifies whether or not that region is resonsible for global coordination of the channel;
- `status` (optional): a `ChannelStatus` instance.

### ChannelStatus

- `isActive` (required): a boolean value indicating whether the channel that is the subject of the event is active. For events indicating regional activity of a channel this indicates activity in that region, not global activity;
- `occupancy` (optional): an `Occupancy` instance indicating the occupancy of the channel. For events indicating regional activity of a channel this indicates activity in that region, not global activity.

### Occupancy

- `metrics` (optional): a dictionary of membership categories for a realtime channel and their counts. Membership categories include:
  - `publishers`: the number of connections attached to the channel that are authorised to publish;
  - `subscribers`: the number of connections attached that are authorised to subscribe to messages;
  - `presenceSubscribers`: the number of connections that are authorised to subscribe to presence messages`;
  - `presenceConnections`: the number of connections that are authorised to enter members into the presence channel;
  - `presenceMembers`: the number of members currently entered into the presence channel.

## Lifecycle events

The following events arise as messages on the channel lifecycle metachannel. In all cases, the `data` member of the message is a `ChannelDetails` instance.

- `name`: `channel.opened`: indicates that the channel has been activated globally; that is, it has become active in at least one region, having previously been inactive. The included `ChannelDetails.status` includes `occupancy` globally.
- `name`: `channel.closed`: indicates that the channel has been deactivated globally.
- `name`: `channel.region.active`: indicates that the channel has been activated in a specific region.
- `name`: `channel.region.inactive`: indicates that the channel has been deactivated in a specific region. The included `ChannelDetails.status` includes `occupancy` in that region.
- `name`: `channel.occupancy`: indicates a change in global occupancy. Not all occupancy changes are sent; there is a minimum interval on a per-channel basis, so if the occupancy is changing continuously, then only periodic snapshots of occupancy are sent. Further roll-up of events may occur depending on the capacity of the lifecycle channel. Any occupancy changes in which any of the occupancy categories changes from 0 to a non-zero count, or vice versa, are always included.

## Channel metadata REST API

The REST API now includes the endpoint

`GET /channels/<channelId>`

Returns a `ChannelDetails` for the given channel, indicating global occupancy. A side-effect of this request, in this pre-release of this API, is that it will cause the channel in question to become activated; therefore it is primarily intended to be used in conjunction with the enumeration API (see below) or in situations where the application has another means to know whether or not a given channel is active. A future version of this API will remove that restriction.

The credentials presented with the request must include the `list-channels` permission for the channel in question.

Client libraries do not currently support this API, but it is usable via the generic request API (ref).

## Channel enumeration REST API

The REST API now includes the endpoint

`GET /channels`

Enumerates all active channels in the application. This is a paginated API following the same API conventions as other paginated APIs in the Ably REST library.

The following params are supported:

- `limit` (optional; default: 100): specifies the maximum number of results to return. A `limit` greater than 1000 is unsupported;
- `prefix` (optional): limits the query to only those channels whose name starts with the given prefix;
- `by` (optional; default `value`): specifies whether to return just channel names (`by=id`) or `ChannelDetails` (by=value).

The credentials presented with the request must include the `list-channels` permission for the wildcard resource (`'*'`) or, if a `prefix` is specified, for a resource that matches the `prefix`.

Client libraries do not currently support this API, but it is usable via the generic request API (ref).

Enumeration is possible of all channels in an app, by repeated calls to the API, following the `next` relative link on each successive call, until there is no `next` relative link. However, the state of the app and the cluster itself can change during that enumeration. This API therefore has the following limitations:

- channels that become active, or become inactive, between the first and last request in the sequence, might or might not appear in the result. The API guarantees that if a channel is continuously active from the time that the first request is made until the time that the last request completes, then it is guaranteed to be present in the result. Similarly, if a channel is continously inactive between those times then it is guaranteed not to be present in the result.

- cluster state changes, in this first release of this API, may cause a pagination sequence to become invalid, in which case the request will respond with an error with code `40011`. In this case, to get a complete result, it is necessary to start the enumeration again from the beginning. Other API options to deal with this possibility will be provided in later versions of this API. Enumerations that are satisfiable in the first response page do not have this issue.
