# Ably Documentation

_[Ably](https://ably.com) is the platform that powers synchronized digital experiences in realtime. Whether attending an event in a virtual venue, receiving realtime financial information, or monitoring live car performance data – consumers simply expect realtime digital experiences as standard. Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime for more than 250 million devices across 80 countries each month. Organizations like Bloomberg, HubSpot, Verizon, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale._

# Legacy Toolchain: Nanoc Documentation Repository

This repository contains Ably's documentation, which is visible in two locations:

- <https://docs.ably.com>: A static site which always reflects the latest version of the contents of this repository, being deployed automatically when the `main` branch is updated.
- <https://ably.com/documentation>: Our official documentation, which points to a specific version of this repository. Changes in this repo are not automatically reflected in the official docs, but require intervention by the Ably website team.

Docs are authored in [Textile](https://textile-lang.com/) and rendered using the Ruby-based [Nanoc](https://nanoc.ws/) static site generator.

> **Note**: The instructions on this page are intended for general users. If you are a member of Ably staff there is more specific information in the [internal README](README_INTERNAL.md).

## Quickstart

To run the static site locally, perform the following steps:

1. Clone or fork this repo
1. Run `bundle install` to install the required dependencies
1. Execute `bundle exec nanoc live -p 4000`
1. Visit `https://localhost:4000` in your web browser. Any changes you make to the docs should update the static site automatically.

> **Note**: The Ruby version required is shown in the [.ruby-version file](.ruby-version). If you use [ASDF](https://github.com/asdf-vm/asdf) or compatible tooling to manage your Ruby runtime versions, we have included a [`.tool-versions`](.tool-versions) file.

## Contributing to the Docs

We welcome contributions to our documentation. The following resources will help you:

- [Writing Style Guide](writing-style-guide.md)
- [Documentation Formatting Guide](/content/client-lib-development-guide/documentation-formatting-guide.textile).

To contribute:

1. Make your changes on a local feature branch.
1. Commit your changes and push your branch.
1. Create a pull request (PR) that summarizes what changes you are proposing and why.
1. The pull request will automatically deploy your changes to a review site that is linked to at the bottom of the PR.
1. The Ably team will review your PR and might suggest changes and improvements that should be made before your PR can be merged. You can make further commits at this stage and the review site will update to reflect them.

## Running with Docker

Execute the following command:

- `docker-compose up`

This starts a web server at <http://localhost:4000>, builds the static site and allows you to view changes live\*.

> **Notes**:

- This has been tested with Docker version 2.10.7. See [Docker installation instructions](https://docs.docker.com/get-docker/).
- If you are running on Windows you will need to re-run the `docker-compose up` command to see your changes in the static site, unless you are using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

### Managing updated dependencies

Occasionally, the `Gemfile` or `Gemfile.lock` files might change and this will cause `docker-compose` to fail with an error similar to this:

```
webserver_1  | The Gemfile built for this container does not match the current Gemfile i.e. they have changed
webserver_1  | You must rebuild the container with: $ ./docker-run build
docs_webserver_1 exited with code 2
```

When this happens, you need to rebuild the containers by running `docker-compose up --build`.

## Running on Heroku

This repo will automatically run on Heroku, but relies on the following [buildpacks](https://github.com/ably-forks/heroku-buildpack-nanoc):

    $ heroku buildpacks
    === ably-docs Buildpack URLs
    1. https://github.com/heroku/heroku-buildpack-ruby
    2. https://github.com/ably-forks/heroku-buildpack-nanoc
    3. https://github.com/heroku/heroku-buildpack-static

## Redirects

Redirects are implemented using the [nanoc-redirector](https://github.com/gjtorikian/nanoc-redirector) Ruby gem.

To set up a redirect, add the following to the frontmatter of the page that you want to be the _destination_ of the redirect:

```ruby
redirect_from:
  - /redirect-from-this-path/
```

Then, when you access `/redirect-from-this-path/`, you are redirected to the destination page.

> **IMPORTANT:** Do not include the file extension in the `redirect_from` URLs list. For example:

- `general/versions/v0.8/webhooks` ✅ _Correct!_
- `general/versions/v0.8/webhooks.textile` ❌ _Incorrect!_

### Updating the redirects YAML file

The website uses the [redirects YAML file](data/redirects.yaml) to handle redirects in the documentation. After configuring a redirect, execute one of the following (depending on how you are running the site) to update `redirects.yaml`:

#### Local install

```bash
$ bundle exec nanoc compile
```

#### Docker

```shell
docker-compose up
```

## Help and contact

If you have any questions or suggestions, please [get in touch](https://ably.com/contact).
# New Toolchain: Gatsby Documentation Repository

This is a static site generated using [Gatsby](https://www.gatsbyjs.com/) and documentation written in:

* [Textile](https://github.com/textile/textile-spec) - Held in the [./data/textile](./data/textile) folders, enhanced with certain additional features described in [./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile](./data/textile/nanoc-compatible/client-lib-development-guide/documentation-formatting-guide.textile)

- <https://docs.ably.com>: A static site which always reflects the latest version of the contents of this repository, being deployed automatically when the `main` branch is updated.
- <https://ably.com/docs>: Our official documentation, which points to a specific version of this repository. Changes in this repo are not automatically reflected in the official docs, but require intervention by the Ably website team.

**Beta** - most patterns are now established, we are approaching v1.

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
