# Gatsby Documentation Repository

This is a static site generated using [Gatsby](https://www.gatsbyjs.com/) and documentation written in:

* [Textile](https://github.com/textile/textile-spec) - Held in the [./data/textile](./data/textile) folders, enhanced with certain additional features described in [./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile](./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile)

## Current Status

**Alpha** - anything in this repository is subject to change, v0 has not yet been reached.

## Run

`gatsby clean && gatsby develop`

Visit `localhost:8000` for homepage.

Visit `localhost:8000/documentation/${relativePath}` for documentation pages, e.g. `localhost:8000/documentation/client-lib-development-guide/documentation-formatting-guide`.

## Further Information

Documentation is included throughout this repository in the form of README.md files at folder level. Thanks in part to support for this sort of setup from GitHub, these are intended to:

1. Aid navigation through the repository, so documentation contributors and developers can easily see if they are in the right place
2. Support documentation contributors in understanding the expected results from their work
3. Explain the thinking behind the application structure and conscious choices made, so that improvements can be made with increased confidence when a wrong choice has been made
   1. Ensure that where there is an alternative option, especially an obvious alternative option, the reasons for not selecting that option are made clear
4. Support new & external developers in quickly understanding how separate parts of the application are expected to work

We have selected folder-level README files instead of the alternative of a dedicated documentation folder because we think it enables points `1` and `4` more directly, especially with the support from GitHub. The aim is to make browsing the repository much more clear even if you have no context for the repository.

## Roadmap

**Alpha** - the roadmap is speculative &amp; subject to complete change at any time.

1. Basic rendering; rendering of partials
2. Text parsing &amp; well-formed HTML creation
3. HTML parsing &amp; mapping of HTML data to dedicated React components
4. Navigation &amp; design improvements
5. Testing &amp; CI pipeline work
6. More complex frontend functionality
7. Alpha complete, enter Beta phase.
