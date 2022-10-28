# Data

The data folder contains:

1. YAML files used to power app behaviour such as redirects and page furniture which should be controllable by editors (./yaml)
2. Parsing logic and constants related to the parsing of markup folders (./transform, ./html-parser, ./types)
3. Gatsby plugin functions for the ingesting of data (./createPages, ./onCreateNode)

## Main Application

### Textile

For the main application, there are five significant steps in the interpretation of textile documents.

1. [Pre-parser stage](./transform/pre-parser/README.md)
2. [textile-js](https://github.com/borgar/textile-js)
3. [Parser enhancement stage](./transform/parser-enhancements/README.md)
4. [Post-parser stage](./transform/post-parser/README.md)
5. [HTML parsing and modifications](./html-parser/README.md)
 