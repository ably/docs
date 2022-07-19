# Components

These are the components we will use to render our docs.

They represent the final stage before the user will see our documents.

## Compare

1. Pre-parser - transforms data before it has been parsed by a dedicated parser such as `textile-js`
2. Parser enhancements - transforms data with enhancements from `attributes` and document `path`
3. Post-parser - transforms data after it has been parsed by a dedicated parser such as `textile-js`
4. Component mapping - maps `{ data, type }` objects to our React components based on `type`

## Usage

It is a good place to put:
* Broad changes to behaviour, presentation, layout, markup
* Changes to main body content driven by page data in GraphQL; see [`components/blocks`](./blocks/README.md)

It is not the best place to put:
* String transformation operations such as regex substitutions; consider putting these in pre-parser or parser-enhancements
* Meta-data-based operations; ideally these should happen in parser-enhancements
