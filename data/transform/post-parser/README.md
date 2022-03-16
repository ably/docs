# Post-Parser

The post-parser directory is intended for use transforming HTML with plain text tokens embedded in it to HTML.

It is the third stage of the transformation from a _document type_ (e.g. Textile) to a _documentation page_.

## Compare

1. Pre-parser - transforms plain text to plain text ready to be parsed
2. Parser enhancements - transforms data with enhancements from `attributes` and document `path`
4. Component mapping - maps `{ data, type }` objects to React components based on `type`.
5. React components - standardise the behaviour, presentation, layout and markup semantics of `data` from `{ data, type }` objects.

## Usage

It is a good place to put:
* Operations that cannot take place before the parser runs, for example:
  * Operations that rely on text that would be interpreted by the parser as meaningful syntax
  * Operations that depend on the specific operations in the pre-parsing stage, such as regex operations on whitespace

It is not the best place to put:
* Operations that remove information for developers only - consider putting these in pre-parser, so there's less text to process later on, and parsing the more complex HTML structure is a little easier.
* Transformations based on frontmatter variables; the frontmatter is extracted after the pre-parser phase, as are partials; partials should inherit frontmatter variables (such as published_date) from their 'parent' page. Consider putting these in parser-enhancements, so that the variables we use are consistently applied & easier to access.
* Final transformations before rendering; consider putting these actions in React components.