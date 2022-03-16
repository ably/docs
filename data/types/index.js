// Avoiding using an Enum as such, in favour of simpler type labels as there is no ordering/priority.
// Trade-offs:
/**
 * + Simple
 * + Serializable
 * + Difficult to overwrite accidentally
 * - Not using TypeScript to manage all typing
 * - Not guaranteed unique (cf. Symbols)
 * - Possible to overwrite (cf. Object.defineProperty())
 * - Not maximally performant
 * (cf. https://stackoverflow.com/questions/287903/how-can-i-guarantee-that-my-enums-definition-doesnt-change-in-javascript/50355530#50355530,
 *  but this is extremely marginal & suggested solution in comment is not workable)
 * These are acceptable trade-offs for quick development but a good focus point for reconsideration & improvements later.
 */
const DataTypes = Object.freeze({
    Partial: "Partial",
    String: "String",
    Html: "Html",
    DateString: "DateString",
});

module.exports = DataTypes;