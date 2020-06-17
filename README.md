# Ably Documentation Overview

[Ably](https://www.ably.io) is a scalable, fast, and secure hosted realtime messaging service for web-enabled devices.

The static site generated from this repository is hosted at <http://docs.ably.io> and deployed automatically when the `master` branch is updated.

We frequently publish updates from this repository so is typically more up to date than the official Ably documentation which can be found at <https://www.ably.io/documentation>.

This Git repository uses the [Textile](redcloth.org/textile) format with [Nanoc](http://nanoc.stoneship.org/) used to build the static site from the `master` branch.

## Running locally

1. Clone a local version of the repo, or a local version of your forked repo.
3. Checkout the master branch.
4. Create and checkout your feature or fix branch.

At this point you can either run the repo using Docker or directly with Ruby.

### Running with Docker

Using Docker, run the following command:

* `docker-compose up`

This starts up a web server at <http://localhost:4000>, builds the static site and allows you to view changes live.

_This has been tested with Docker version 2.3.0.3. See [Docker installation instructions](https://docs.docker.com/get-docker/)._

_Note: On Windows you will need to re-run the `docker-compose up` command to see changes, unless you are using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)._

### Running with Ruby

Using Ruby directly (2.7.0) you must first run the following command:

* `bundle install` 

This installs the necessary gems, including `nanoc`. You can then run the web server by running the following command:

* `bundle exec nanoc live -p 4000` 

This starts up a web server at <http://localhost:4000>, builds the static site and allows you to view changes live.

_For those who use [ASDF](https://github.com/asdf-vm/asdf) or compatible tooling to manage their Ruby runtime versions, we have included a [`.tool-versions`](.tool-versions) file._

## Pull requests

1. Assuming you have followed the steps above, prior to making a PR, make your changes locally.
2. Commit your changes, push your branch and send us a pull request.
3. All pull requests will automatically launch a static review site that will be linked to at the bottom of the PR.

## Publishing to JSBin

This configuration is not required for basic documentation creation and modification, so most
editors can simply skip to
[Forking and running locally](#forking-and-running-locally).

If you will be creating or modifying code within this repository that is to be uploaded automatically
to [JSBin](https://jsbin.ably.io/), for our "Try it now code editor",
then you will need to create yourself a JSBin config file:

    cp config/jsbin_config.example.yaml config/jsbin_config.yaml

And then you will need to populate the `api_key` property in that file with a JSBin API key.

The creation of code content for JSBin is further documented in our
[document formatting guide](content/client-lib-development-guide/documentation-formatting-guide.textile)
which gets published
[here](https://docs.ably.io/client-lib-development-guide/documentation-formatting-guide/#code-blocks).
The code that is published to JSBin can be found in
[content/code/](content/code/).

## Branch and tag scheme for features spec

The `master` branch contains the most recent version of the spec, as
amended by any subsequent fixes and non-breaking improvements. This is
the version that a client library developer who is implementing a
feature now should use as a reference. It is also the version that is
deployed to docs.ably.io.

When proposing a spec change, changes that you would be happy to have
incorporated into the current version of client libraries should be made
against `master`. Changes that should not be incorporated until the next
minor or major version should be made against the corresponding
`integration/<major>.<minor>` branch, e.g. `integration/1.2` (which ideally should
be regularly rebased on top of `master`).

When a new minor or major version of the spec is released, it is tagged
with a tag such as `v1.2`. Conformance to the spec at that tag is what
defines whether a library can be released with the a library version
with that major/minor version.

Client library developers are not expected to monitor the docs repo for
spec fixes that occur after the release tag. If a given spec fix needs
to be made to client libraries at that time, on merging the PR to
`master` you should open a GitHub issue in each individual client lib
repo to request that. If this is not done, it is not mandatory for the
fix to be incorporated until the next spec release.

When updating a client lib to a spec version, client lib developers should
work from a diff from the tag of the previous release, so as to
incorporate all changes since that tag.

## Deploying to website (www.ably.io/documentation)

The website consumes this repo through a ruby gem. The gem points at the `master` branch and saves the revision as a version. To release to `/documentation`, follow these steps:

1. Check if the changes that are already on `master` in this repository are ok to be released
2. Merge your PR
3. Clone the [website repo](https://github.com/ably/website)
4. Run `bundle update ably-docs` in the website repo
5. Check in `Gemfile.lock` that the SHA saved by the above command is the SHA of the commit you expected (in most cases this should be the merge/top commit of your PR)
6. Open PR & ask the website team to review
7. Follow the deployment process for website (if in doubt, ask the website team for help)

## Running on Heroku

This repo will automatically run on Heroku, but relies on the following buildpacks (see https://github.com/ably-forks/heroku-buildpack-nanoc):

    $ heroku buildpacks
    === ably-docs Buildpack URLs
    1. https://github.com/heroku/heroku-buildpack-ruby
    2. https://github.com/ably-forks/heroku-buildpack-nanoc
    3. https://github.com/heroku/heroku-buildpack-static

## Help and contact

If you have any questions or suggestions, please [get in touch with us at Ably](https://www.ably.io/contact).
