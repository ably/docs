# Ably Documentation Overview

[Ably](https://www.ably.io) is a hugely scalable, superfast and secure hosted realtime messaging service for web-enabled devices.

This Git repository contains most of the [Ably API documentation](https://www.ably.io/documentation) that resides at <https://www.ably.io/documentation> in [Textile](redcloth.org/textile) format.  [Nanoc](http://nanoc.stoneship.org/) is used to build the static site from the `master` branch.

The Ably documentation was intentionally created as a public repository using a simple text based markup language so that:

* It can be maintained by Ably staff and developers.
* 3rd parties can fork the repository, and submit pull requests to improve the documentation.  We welcome the community's suggestions and input.
* This documentation is later merged upstream to the [Ably primary website documentation](https://www.ably.io/documentation) with each website release.

## Viewing the documentation

The static site generated from this documentation repository is hosted at <http://docs.ably.io> and deployed automatically when the `master` branch is updated.  We frequently publish updates from this repository so is typically more up to date than the [official Ably API documentation](https://www.ably.io/documentation).

The official complete Ably documentation that incoporates all the documentation in this repository can be found at <https://www.ably.io/documentation>

## Forking and running locally

* Fork the repository at https://github.com/ably/docs
* Clone a local version of your forked repo `git clone https://github.com/[you]/docs` and `cd` into it
* Checkout the master branch: `git checkout master`
* Create your feature or fix branch and check it out: `git checkout -b [your-branch]`
* `bundle install` to install the necessary gems, including `nanoc`
* Create a jsbin config file: `cp config/jsbin_config.example.yaml config/jsbin_config.yaml`

At this point you can either run the repo directly on your machine or via Docker.

If you have Ruby and are comfortable working in a Ruby environment as follows:

* `bundle exec nanoc compile` to generate the site for the first time
* `bundle exec nanoc view -p 4000` to start up a web server at <http://localhost:4000>
* `bundle exec guard` to watch for changes and rebuild the site automatically. This is normally run in conjunction with the `nanoc view -p 4000` command so that you can see changes immediately

If you would prefer to use Docker, then you can set up the env as follows:

* `./docker-run build` to build the initial Docker image
* `./docker-run compile` to compile the HTML for the static site (this is a once off command)
* `./docker-run server` to start up a web server at <http://localhost:4000>
* `./docker-run guard` to watch for changes and rebuild the site automatically. This is normally run in conjunction with the `./docker-run server` command so that you can see changes immediately

For those who use
[ASDF](https://github.com/asdf-vm/asdf)
or compatible tooling to manage their Ruby runtime versions, we have included a
[`.tool-versions`](.tool-versions)
file.

## Running on Heroku

This repo will automatically run on Heroku, but relies on the following buildpacks (see https://github.com/ably-forks/heroku-buildpack-nanoc):

    $ heroku buildpacks
    === ably-docs Buildpack URLs
    1. https://github.com/heroku/heroku-buildpack-ruby
    2. https://github.com/ably-forks/heroku-buildpack-nanoc
    3. https://github.com/heroku/heroku-buildpack-static

## Pull requests

* Assuming you have followed the steps above, prior to making a PR, make your changes locally and they should be visible within seconds in the browser following a refresh (if using the `guard` command, else a manual `compile` is required).  If the changes are not visible, check your console where `guard` is running for errors.
* Commit your changes, push your branch and send us a pull request
* All pull requests will automatically launch a static review site that will be linked to at the bottom of the PR

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
`master-<major>-<minor>` branch, e.g. `master-2-0` (which ideally should
be regularly rebased on top of `master`).

When a new minor or major version of the spec is released, it is tagged
with a tag such as `v1.1`. Conformance to the spec at that tag is what
defines whether a library can be released with the a library version
with that major/minor version.

Client library developers are not expected to monitor the docs repo for
spec fixes that occur after the release tag. If a given spec fix needs
to be made to client libraries at that time, on merging the pr to
`master` you should open a github issue in each individual client lib
repo to request that. If this is not done, it is not mandatory for the
fix to be incorporated until the next spec release.

When updating a client lib to a spec version, client lib devs should
work from a diff from the tag of the previous release, so as to
incorporate all changes since that tag.

## Help and contact

If you have any questions or suggestions, please [get in touch with us at Ably](https://www.ably.io/contact).
