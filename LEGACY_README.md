# Legacy Toolchain: Nanoc Documentation Repository

This repository contains Ably's documentation, which is visible in two locations:

- <https://docs.ably.com>: A static site which always reflects the latest version of the contents of this repository, being deployed automatically when the `main` branch is updated.
- <https://ably.com/docs>: Our official documentation, which points to a specific version of this repository. Changes in this repo are not automatically reflected in the official docs, but require intervention by the Ably website team.

Docs are authored in [Textile](https://textile-lang.com/) and rendered using the Ruby-based [Nanoc](https://nanoc.ws/) static site generator.

> **Note**: The instructions on this page are intended for general users. If you are a member of Ably staff there is more specific information in the [internal README](README_INTERNAL.md).

## Why is the Ruby section of Docs considered legacy?

While the legacy toolchain continues to run, it is not possible to preview pages as they will appear on the site without also running the website. This requires a lot of tooling to be installed, which is onerous for onboarding new documentation writers & an unreasonable expectation for open source contributors.

While docker is one possible solution, moving to a new toolchain enables us to have finer control over how components display and behave from within the Ably Docs application.

## Quick start

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
