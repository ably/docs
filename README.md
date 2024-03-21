# Ably Documentation

_[Ably](https://ably.com) is the platform that powers synchronized digital experiences in realtime. Whether attending an event in a virtual venue, receiving realtime financial information, or monitoring live car performance data – consumers simply expect realtime digital experiences as standard. Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime for more than 250 million devices across 80 countries each month. Organizations like Bloomberg, HubSpot, Verizon, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale._

# New Toolchain: Gatsby Documentation Repository

This is a static site generated using [Gatsby](https://www.gatsbyjs.com/) and documentation written in:

- [Textile](https://github.com/textile/textile-spec) - Held in the [./content](./content) folders, enhanced with certain additional features described in [./content/client-lib-development-guide/documentation-formatting-guide.textile](./content/client-lib-development-guide/documentation-formatting-guide.textile)

- <https://docs.ably.com>: A static site which always reflects the latest version of the contents of this repository, being deployed automatically when the `main` branch is updated.
- <https://ably.com/docs>: Our official documentation, which points to a specific version of this repository. Changes in this repo are not automatically reflected in the official docs, but require intervention by the Ably website team.

## Run

Install node & yarn.

If you use [ASDF](https://github.com/asdf-vm/asdf) or compatible tooling to manage your Ruby runtime versions, we have included a [`.tool-versions`](.tool-versions) file - where the dependencies within can be installed with `asdf install` from the project root.

At the time of writing, this project requires Ruby 3.0.0, which in turn requires `openssl@1.1`. Environments with different versions (i.e. `openssl@3`) may experience a failing Ruby install, in which case you can do the following (and if this fails, uninstall `@openssl@X` first):

```
brew install openssl@1.1
RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)" asdf install ruby
```

`yarn`

If Gatsby CLI is not already installed:

`yarn global add gatsby-cli`

**Environment variables setup**

If you have not yet [set up your local .env.development environment variables](#environment-variables), run:

`yarn develop:env-setup`

**Editors:**

`yarn edit`

**Developers:**

To develop locally run:

`yarn develop`

Visit `localhost:8000` for homepage.

Visit `localhost:8000/docs/${relativePath}` for documentation pages, e.g. `localhost:8000/docs/client-lib-development-guide/documentation-formatting-guide`.

To build and serve locally:

`yarn rebuild`

Visit `localhost:8000` for homepage.

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

Redirects added in this way are also added to a file at `./config/nginx-redirects.conf`, and used to create a map of nginx redirects at build time.

Other one-off instances of redirects may be added to additional config files, and imported in a similar way. See:

- `./config/website-redirects.conf`
- `./config/client-lib-development-guide-redirects.conf`
- `./config/nginx.conf.erb`

For how to create and include these redirects.

## Images

Wherever possible, images should live in `src/images` and _not_ in `static/images`. The authors of Gatsby recommend [importing images](https://www.gatsbyjs.com/docs/how-to/images-and-media/importing-assets-into-files/) into components. The `static` folder in Gatsby is an escape hatch for the rare cases where files cannot be imported.

The benefit of sticking to the Gatsby approach is that our images get processed and optimized during build time. It also allows us to serve our images over a CDN which is much better for our users.

### Images in components

Images in components can be imported and rendered as follows:

~~~typescript
import myImage from 'src/path/to/my-image.png';

export default Component => (<img src={myImage} />);
~~~

### Images in YAML data

_TBD_

### Images in textfile files

For rendering images in Textfile we have a special convention.

Firstly, place the image file in `src/images/content`. The in the textile files reference it with a special path `@content`, for example:

~~~textile
<img src="@content/path/to/image.png" />
~~~

The above will render the image at `src/images/content/path/to/image.png`.

Content images in textile is powered by `ContentImagesProvider` and `useContentImages`. Templates rendering content need to add the following to their GraphQL queries to get all the images loaded before passing it to the `ContentImagesProvider`:

~~~graphql
  images: allFile(filter: { relativeDirectory: { glob: "content/**" } }) {
    nodes {
      ...ContentImage
    }
  }
~~~

## Environment Variables

Note that any env variables needed to show in the browser must be prefixed with `GATSBY_` in order to appear.

- GATSBY_DOCS_SIGNED_IN - set to any string to force APIKeyMenuSelector & MultilineCodeContent to behave as though you are logged in
- GATSBY_ABLY_MAIN_WEBSITE - the URL from which basic user data and API keys can be retrieved, and from which we can generate sitemap links and so on

`GATSBY_ABLY_MAIN_WEBSITE` can also be changed to point to staging or a local running website instance.

Place these in .env.development to run locally.

## Further Information

Documentation is included throughout this repository in the form of README.md files at folder level. These are intended to:

1. Aid navigation through the repository, so documentation contributors and developers can easily see if they are in the right place
2. Support documentation contributors in understanding the expected results from their work
3. Explain the thinking behind the application structure and conscious choices made, so that improvements can be made with increased confidence when a wrong choice has been made
   1. Ensure that where there is an alternative option, especially an obvious alternative option, the reasons for not selecting that option are made clear
4. Support new & external developers in quickly understanding how separate parts of the application are expected to work

We have selected folder-level README files instead of the alternative of a dedicated documentation folder because we think it enables points `1` and `4` more directly, especially with the support from GitHub. The aim is to make browsing the repository much more clear even if you have no context for the repository.

## Optional Setup Steps

If you would like to run linting and tests automatically before every commit and run yarn install automatically after every branch checkout, run `yarn repo-githooks`. If you would like to remove this behaviour, run `yarn no-githooks`.

To understand the data ingestion and parsing steps, please check the READMEs in the [/data folder](./data/README.md).

## Help and contact

If you have any questions or suggestions, please [get in touch](https://ably.com/contact).
