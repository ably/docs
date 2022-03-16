# Parser Enhancements

The parser-enhancements directory is intended for use augmenting data before being parsed.

It is the second stage of the transformation from a _document type_ (e.g. Textile) to a _documentation page_.

## Compare

1. Pre-parser - transforms plain text to plain text ready to be parsed
2. Post-parser - transforms data after it has been parsed by a dedicated parser such as `textile-js`
3. Component mapping - maps `{ data, type }` objects to React components based on `type`.
4. React components - standardise the behaviour, presentation, layout and markup semantics of `data` from `{ data, type }` objects.

## Usage

It is a good place to put:
* Augmentations based on article meta-data such as document `path`, `frontmatter` attributes
* Augmentations based on application meta-data/config such as `.yaml` files

It is not the best place to put:
* Transformations designed to fix issues or make the text easier to understand; put these in pre- or post-parser
* Alterations to presentation and design - put these in component mapping or React components