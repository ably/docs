# Blocks

Block components are derived from the data taken from GraphQL recursively.

A block component takes some data and some attributes and renders some HTML, then parses any nested data to the block rendering function to render the next block component (if any).

They are not usually suitable for reuse elsewhere, consider using the top level components folder for React components you want to use in multiple places, and especially if you might use it out of the regular flow of body copy.