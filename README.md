# Ably Documentation

_[Ably](https://ably.com) is the platform that powers synchronized digital experiences in realtime. Whether attending an event in a virtual venue, receiving realtime financial information, or monitoring live car performance data – consumers simply expect realtime digital experiences as standard. Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime for more than 250 million devices across 80 countries each month. Organizations like Bloomberg, HubSpot, Verizon, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale._

# New Toolchain: Gatsby Documentation Repository

This is a static site generated using [Gatsby](https://www.gatsbyjs.com/) and documentation written in:

- [Textile](https://github.com/textile/textile-spec) - Held in the [./data/textile](./data/textile) folders, enhanced with certain additional features described in [./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile](./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile)

- <https://docs.ably.com>: A static site which always reflects the latest version of the contents of this repository, being deployed automatically when the `main` branch is updated.
- <https://ably.com/docs>: Our official documentation, which points to a specific version of this repository. Changes in this repo are not automatically reflected in the official docs, but require intervention by the Ably website team.

**Beta** - most patterns are now established, we are approaching v1.

## Run

Install node & npm.

If you use [ASDF](https://github.com/asdf-vm/asdf) or compatible tooling to manage your Ruby runtime versions, we have included a [`.tool-versions`](.tool-versions) file. Note that if you `brew install`ed your asdf installation instead of `git clone`ing it, npm [may not be installed correctly](https://youtrack.jetbrains.com/issue/WEB-51052).

`npm i`

`gatsby clean && gatsby develop`

Visit `localhost:8000` for homepage.

Visit `localhost:8000/docs/${relativePath}` for documentation pages, e.g. `localhost:8000/docs/client-lib-development-guide/documentation-formatting-guide`.

Or:

`gatsby clean && gatsby build && gatsby serve`

Visit `localhost:9000` for homepage.

To run with the website, run:

`gatsby clean && gatsby build --prefix-paths && gatsby serve --prefix-paths`

## Redirects

Redirects are currently implemented using Gatsby's in-built redirect functionality.

To set up a redirect, add the following to the frontmatter of the page that you want to be the _destination_ of the redirect:

```yaml
redirect_from:
  - /redirect-from-this-path/
```

You can also add a single redirect, however while this is supported it is not the principal way to add redirects; adding a YAML array, as shown above, is the most stable and predictable way to add a redirect.

```yaml
redirect_from: /redirect-from-this-single-path/
```

If a redirect is not already prepended with `/docs`, `/docs` will be prepended to the redirect source URL; if you need a redirect from the main website to a docs page, Gatsby currently cannot handle this.

Otherwise, the redirect will be left intact.

## Environment Variables

Note that any env variables needed to show in the browser must be prefixed with `GATSBY_` in order to appear.

* GATSBY_DOCS_SIGNED_IN - set to any string to force the application to behave as though you are logged in
* GATSBY_DOCS_API_KEYS - set to any string to force the application to behave as though you have API keys available
* GATSBY_WEBSITE_API - the URL from which basic user data and API keys can be retrieved

Place these in .env.development to run locally.

## Further Information

Documentation is included throughout this repository in the form of README.md files at folder level. Thanks in part to support for this sort of setup from GitHub, these are intended to:

1. Aid navigation through the repository, so documentation contributors and developers can easily see if they are in the right place
2. Support documentation contributors in understanding the expected results from their work
3. Explain the thinking behind the application structure and conscious choices made, so that improvements can be made with increased confidence when a wrong choice has been made
   1. Ensure that where there is an alternative option, especially an obvious alternative option, the reasons for not selecting that option are made clear
4. Support new & external developers in quickly understanding how separate parts of the application are expected to work

We have selected folder-level README files instead of the alternative of a dedicated documentation folder because we think it enables points `1` and `4` more directly, especially with the support from GitHub. The aim is to make browsing the repository much more clear even if you have no context for the repository.

## Help and contact

If you have any questions or suggestions, please [get in touch](https://ably.com/contact).
