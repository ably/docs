# Build live voting with message annotations

This is a live-voting app: an admin runs a show of polls, an audience votes
from their phones, and a big screen shows results updating in realtime. The
voter pane and presenter pane on the left are both live: cast a vote and watch
the presenter's heatmap and vote bubbles react instantly.

There's a lot of different ways you can implement this using Ably. This example
shows one possible pattern, using
[**annotations**](/docs/messages/annotations) for votes. A poll
is a regular Ably message, and each vote is an annotation attached to that
message. Ably aggregates the annotations into a summary, attached to the
original poll message, and delivers it to subscribers.

Votes are never stored in a database. They live entirely as annotations on the channel, and Ably does the aggregation. Your own server's job is narrow: it authenticates clients and it hands out the poll definitions. Anything expensive and latency-sensitive is done by Ably.

## Why annotations?

The simplest way you could imagine implementing a live voting system with Ably would be to have each vote be a message. The presenter would subscribe to the channel and keep a running tally in memory, and re-render when needed. This works for a demo, but has drawbacks. Everyone gets the same set of messages, so every voter sees everyone's vote unnecessarily; and nothing constrains one client to only have one vote without custom deduplication logic in any client that wants to count votes, which could get increasingly expensive as the set of voters grows. There's no server-side aggregation, so a phone that joins late, or a presenter view that refreshes, has missed the votes that already happened and has to reconstruct the tally from history. (And imagine if you do have a hundred thousand voters, you'd have to paginate through tens of thousands of pages of history to get the vote count).

 [LiveObjects](/docs/liveobjects) is another possibility, which solves some of these problems. You could model the tally as a [`LiveCounter`](https://ably.com/docs/liveobjects/counter) per option; a synchronised, conflict-free counter on the channel. It's a lovely primitive. But there's no built-in one-vote-per-client constraint: any client can call `increment` as often as it likes. To stop ballot-stuffing you'd need a separate [`LiveMap`](https://ably.com/docs/liveobjects/map) of `clientId → vote` and check it before incrementing, but there's no atomic check-and-increment across the two, so a double-counting is still possible. And there's no fine-grained capabilities; any client with the ability to increment one livecounter can arbitrarily mutate the whole state.

So, [annotations](/docs/messages/annotations), which have three big advantages:

- Summaries and raw events are two separate streams, and different clients want different ones. A voter's phone only needs the *summary*: a single compact, rolled-up object, with aggregated information on all the annotations that have been contributed. The exact information in the summary depends on the annotation's [aggregation type](/docs/messages/annotations#aggregation), and there are several choices. With very popular polls, each voter only gets a periodically-rolled-up summary update, not one event per vote. But the presenter screen does want to see individual annotation events, so it can animate a bubble for each one (and label it with the voter who cast it), and it can opt into that higher-volume stream separately, with the [`ANNOTATION_SUBSCRIBE` channel mode](https://ably.com/docs/messages/annotations#individual-annotations) and an `annotations.subscribe()` listener. Same underlying data is exposed in two ways, each appropriate to the view that needs it.

- Capabilities for least-privilege. Because a vote is an annotation, a voter's [token](/docs/auth/capabilities) can grant *only* the `annotation-publish` capability on the channel (and `message-subscribe`). A voter can cast votes and do literally nothing else: it can't publish poll messages (which are 'full' messages, not annotations), and it can't subscribe to other voters' raw annotations. It can't tamper with the poll or snoop on who voted for what. The presenter gets `annotation-subscribe`; the admin gets full message publish rights.  See the per-role capabilities in [`server/src/server.ts`](https://github.com/ably-demos/live-voting-with-annotations/blob/main/server/src/server.ts).

- One person, one vote, enforced by Ably. Votes use the `unique` [aggregation type](/docs/messages/annotations#aggregation). In `unique` mode Ably keeps at most one annotation per `clientId`, and switching to another option *moves* that client's vote rather than adding a second one. As long as your auth server vets users and assigns each one a unique `clientId`, a careful choice of aggregation type gives you the vote semantics you need.

## Roles

The app has three roles.

- The *voter* is the phone in your hand: pick an option (a list, or a d-pad for something more playful), and watch the live percentages. It only ever publishes annotations and reads the summary.
- The *presenter* is the big screen. It reads the summary to draw the bar chart or d-pad heatmap (with a star badge on the current leader), and subscribes to individual annotations to pop a bubble for each vote and suggestion as it lands.
- The *admin* is the operator console, the only role that publishes poll messages. It walks through a show of polls, opens and closes voting, and (because it can both publish and subscribe) shows the organiser a live view of what's happening.

## How it works

1. The admin starts a poll by publishing a message:

    ```javascript
    await channel.publish('poll', { pollId, question, type, options });
    ```

2. A voter attaches a `vote:unique.v1` annotation to that message's `serial`,
   naming the chosen option:

    ```javascript
    await channel.annotations.publish(pollSerial, {
      type: 'vote:unique.v1',
      name: optionId,
    });
    ```

3. Ably aggregates the votes and delivers a summary on the poll message. Voters
   read it to render live percentages:

    ```javascript
    channel.subscribe((message) => {
      const summary = message.annotations?.summary?.['vote:unique.v1'];
      // summary[optionId].total === votes for that option
    });
    ```

4. The presenter additionally subscribes to the individual events for its vote
   and suggestion bubbles:

    ```javascript
    channel.annotations.subscribe('vote:unique.v1', (annotation) => {
      // one event per vote — annotation.name is the option, annotation.clientId the voter
    });
    ```

That annotation type string, `vote:unique.v1`, follows the `namespace:summarization.version` convention; `unique` is one of [five aggregation types](/docs/messages/annotations#aggregation) (`unique`, `distinct`, `multiple`, `total`, `flag`), each rolling up the same raw annotations a different way.

The channel [is attached with `rewind: 1`](/docs/channels/options/rewind), so a phone that joins (or refreshes) mid-poll immediately receives the current poll message and its latest summary. Late joiners are caught up without the admin republishing anything.

## Unaggregated annotations

Open-ended "suggest" polls (where voters type free text instead of picking an
option) use a second annotation type, `suggestion`, with no aggregation suffix.
Votes need a running tally, so they use `unique` and are read from the summary.
A suggestion is a one-off piece of text that floats across the presenter once
and is gone, with nothing to count. Since they are unaggregated, they are
received by anyone subscribing to annotations, and they are retrievable through
anyone using
[annotations.get()](/docs/messages/annotations#retrieve) to
retrieve a list of annotations for a given message, but they don't result in a
new message summary being generated.

## Server-side batching

For high volume usecases, where individual votes might (say) overwhelm the
presenter view's message rate limits, you can turn on [server-side
batching](/docs/messages/batch) for the `voting` channel namespace so Ably
groups messages over a short interval (for example 100ms) before fanning them
out. This keeps cost and rate-limits in check during surges with only a small,
configurable delay. Create the rule in your app settings, or via the Control
API / CLI:

```shell
ably apps rules create --name "voting" --batching-enabled --batching-interval 100
```

## Required channel rule

Annotations require the *Message annotations, updates, deletes, and appends*
rule to be enabled on the channel or namespace. Enable it for the `voting`
namespace before running this against your own app.

## Getting started

The live demo above is a cut-down stub of the full demo, intended to be run entirely in the browser, to demonstrate the voting page. If you want to try it out yourself, the real example, with a proper auth server and the admin/voter/presenter split and token authentication, lives at [ably-demos/live-voting-with-annotations](https://github.com/ably-demos/live-voting-with-annotations).

Its README has the full setup, but in short: give the server an Ably API key and
an admin password, pick the static (`SHOWS_FILE`) or Postgres poll store, then
run the server and the client. The default view is the voter; `?role=admin`
drives the show and `?role=presenter` is the big screen, and the admin shows a QR
code that points voters at the right session.

The client never sees an API key — it calls the server's `/auth` endpoint for
short-lived, role-scoped tokens. The hosted demo above has no backend, so it uses
a raw key embedded in the page; that's just for the demo and should never be done
in a real app.

## Related

- [Message annotations](/docs/messages/annotations) — the full feature reference.
- [Message annotations example](/examples/pub-sub-message-annotations) — a
  lower-level tour of all five aggregation types.
- [Message batching](/docs/messages/batch) — scaling high-throughput channels.
