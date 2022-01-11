# Pre-Parser

The pre-parser directory is intended for use transforming plain text to plain text.

It is the first stage of the transformation from a _document type_ (e.g. Textile) to a _documentation page_.

## Compare

1. Parser enhancements - transforms data with enhancements from `attributes` and document `path`
2. Post-parser - transforms data after it has been parsed by a dedicated parser such as `textile-js`
3. Component mapping - maps `{ data, type }` objects to React components based on `type`.
4. React components - standardise the behaviour, presentation, layout and markup semantics of `data` from `{ data, type }` objects.

## Usage

It is a good place to put:
* Regex-based operations that can cheaply transform entire documents
* Operations that remove information for developers only
* Transformations of inline HTML elements that are difficult to implement as their own blocks

It is not the best place to put:
* Regex-based operations that perform worse on longer documents (e.g. regex operations with a lot of potential backtracking, see: https://blog.stevenlevithan.com/archives/greedy-lazy-performance) - consider putting these in parser-enhancements, so that they can run on lots of small documents.
* Transformations based on frontmatter variables; the frontmatter is extracted after the pre-parser phase, as are partials; partials should inherit frontmatter variables (such as published_date) from their 'parent' page. Consider putting these in parser-enhancements, so that the variables we use are consistently applied & easier to access.
* Transformations intended to have a very specific output on the front-end; rather than rely on the parser/parser enhancements/component mapping/components to interpret a string change differently, consider implementing these changes later on in the pipeline.
  * Replacing data with data from another source; consider putting these in parser-enhancements.
  * Broad changes to behaviour, presentation, layout, markup; consider putting these in component-mapping.
  * Fine changes to behaviour, presentation, layout, markup; consider putting these in the relevant React components.