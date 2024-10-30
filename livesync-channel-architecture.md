## Use cases

LiveSync can benefit a wide range of applications including Customer
Relationship Management (CRM) applications, customer support
applications, productivity or task management applications, online
auctions, collaborative form editing, e-commerce systems, chat
conversations, multiplayer turn-based games and realtime newsfeeds. You
can enable collaboration between multiple users, while ensuring the app
data is always securely stored in your own database and serves as the
final source of truth.

To understand this further, let's take the example of a CRM application
--- In a CRM app, an individual customer details page can be represented
as a single data model with its own channel. When a user updates the
customer's information, optimistic updates can immediately reflect the
changes in the UI while the confirmation goes to a roundtrip through the
database. When confirmed, the original user's UI update can be confirmed
and all other clients can also see that update without needing to
refresh the page.

### Known limitations

LiveSync's current design might be limiting to data models based on
graph data structures. As each data model is meant to work with a
channel of it's own, any application changes that apply to multiple data
models will need to be handled and published separately to the outbox
table.

LiveSync might also be limiting to use-cases requiring complex conflict
resolution logic and the "last write to the database wins" strategy
isn't enough. Having said that, LiveSync can be easily coupled with the
component locking feature in Spaces to make sure the individual UI
components can be locked thus avoiding the need to resolve conflicts.
For most use-cases like collaborative form building, component locking
might actually a better user experience compared to co-editing
capabilities.
