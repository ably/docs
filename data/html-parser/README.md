# HTML Parser

The HTML parser directory is intended for manipulations that are most easily executed using jQuery (Cheerio) transformations on HTML.

It is the final stage in the data ingestion process before HTML is transformed into data for GraphQL/for the main documentation application.

## Compare

1. [Pre-parser](../transform/pre-parser/README.md) - transforms plain text to plain text ready to be parsed.
2. [Parser enhancements](../transform/parser-enhancements/README.md) - transforms data with enhancements from `attributes` and document `path`.
2. [Post-parser](../transform/post-parser/README.md) - transforms data after it has been parsed by a dedicated parser such as `textile-js`.
4. Component mapping - maps `{ data, type }` objects to React components based on `type`.
5. React components - standardise the behaviour, presentation, layout and markup semantics of `data` from `{ data, type }` objects.

## Usage

It is a good place to put:
* Operations that are too expensive to carry out on the client's machine.
* Operations that may be complicated to implement for the data provided to the client's machine, for which jQuery/Cheerio has well-tested existing functions.
* Behaviour that is implemented in jQuery on the legacy toolchain or via. the website in jQuery on the legacy toolchain that we do not want to risk changing.

It is not the best place to put:
* Changes in HTML behaviour that allow for interactivity or which affect component functionality.
* Most changes that are not directed at HTML components.
* Fixes for strange parser behaviour.