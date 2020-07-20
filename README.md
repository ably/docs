# Ably Documentation Overview

[Ably](https://www.ably.io) is a scalable, fast, and secure hosted realtime messaging service for web-enabled devices.

The static site generated from this repository is hosted at <http://docs.ably.io> and deployed automatically when the `master` branch is updated.

We frequently publish updates from this repository so is typically more up to date than the official Ably documentation which can be found at <https://www.ably.io/documentation>.

This Git repository uses the [Textile](https://redcloth.org/textile) format with [Nanoc](http://nanoc.stoneship.org/) used to build the static site from the `master` branch.

For more information on writing documentation for Ably, please see the [Documentation Formatting Guide](/content/client-lib-development-guide/documentation-formatting-guide.textile).

## Running locally

1. Clone a local version of the repo, or a local version of your forked repo.
2. Checkout the master branch.
3. Create and checkout your feature or fix branch.

At this point you can either run the repo using Docker or directly with Ruby.

### Running with Docker

Using Docker, run the following command:

- `docker-compose up`

This starts up a web server at <http://localhost:4000>, builds the static site and allows you to view changes live.

_This has been tested with Docker version 2.3.0.3. See [Docker installation instructions](https://docs.docker.com/get-docker/)._

_Note: On Windows you will need to re-run the `docker-compose up` command to see changes, unless you are using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)._

## Publishing to JSBin

This configuration is not required for basic documentation creation and modification, so most
editors can simply skip to [Forking and running locally](#forking-and-running-locally).

If you will be creating or modifying code within this repository that is to be uploaded automatically
to [JSBin](https://jsbin.ably.io/), for our "Try it now code editor", then you will need to create yourself a JSBin config file:

To obtain the API key you need to run this command in the terminal, you must ensure you have installed the `heroku-cli`  tools (Instructions on [installing the Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli) ) and postgresl ([PostgreSQL Downloads](https://www.postgresql.org/download/))

```bash
$ heroku pg:psql -a ably-jsbin -c "select name, api_key from ownership"
```

When you execute this command a browser window will open and you will need to login using your **Ably email address**, only Ably staff members will be granted permission to access this resource.

If you are a staff member and you are receiving this message

```bash
$ heroku pg:psql -a ably-jsbin -c "select name, api_key from ownership"
 ▸    You do not have permission to view addon resources on ably-jsbin. You need to
 ▸    have the deploy or operate permission on this app.
```

then ask your admin to check you have permission on Heroku, then re-authenticate with.

```bash
$ heroku login
```

If everything goes smoothly you will be given the API key.

```
 name |      api_key
------+-------------------
 ably | 12345678901234567
(1 row)
```

### Running with Ruby

Using Ruby, run the following command:

```bash
$ cp config/jsbin_config.example.yaml config/jsbin_config.yaml
```

### Compile the JSBin code snippets

Once you have finished creating your code snippet you will need to add the new assets to the existing ones. This is essentially a table of hashed documents and corresponding file names, [./jsbins.yaml](./jsbins.yaml) if you are interested in the entire list.

```bash
$ bundle exec nanoc compile
```

This will output a huge list that looks similar to this, as each file is checked

```bash
Published new JsBin for hub-product/http-javascript at https://jsbin.ably.io:443/ujehow/1/edit?javascript,live
Copied https://jsbin.ably.io:443/ujehow/1/edit?javascript,live to clipboard
    create  [0.49s]  output/code/realtime/channel-deltas-sse/index.html
    update  [1.10s]  output/sse/index.html
    update  [1.02s]  output/concepts/socketio/index.html
```

This process has added a record to `jsbin.yaml` Please notice the `ID` string in the Published URL (above) which is`ujehow` By hashing the contents, we don't need to contact the JSBin API on every static build. We only do this if a hash does not exist, and thus we need to notify JSBin to create a JSBin which contains the HTML, CSS & JS.

```yaml
---
jsbin_hash:
    Rh81oraUHHJ3PrrvwdJAOrVBqA8=: ujehow <-- hash: ID
    eBxLJU1YqdX+JW9JQY70S4iQfmU=: omedab
    pzHKfCW4/o2wDnCfbg1m0Pkl7v8=: ovucin
jsbin_id:
    adapters/pusher-pub-sub: eBxLJU1YqdX+JW9JQY70S4iQfmU=
    adapters/pubnub-pub-sub: pzHKfCW4/o2wDnCfbg1m0Pkl7v8=
    hub-product/http-javascript: Rh81oraUHHJ3PrrvwdJAOrVBqA8= <-- file: hash
---
```

**NOTE**: if you take that `ID` and use the format http://jsbin.ably.io/ID/edit, you will get the JSBin matching that code sample, [http:\/\/jsbin.ably.io/ujehow/edit](http://jsbin.ably.io/ujehow/edit)

One of the nifty things it does is replace API keys with live API keys dynamically. So for example, https://jsbin.ably.io/enagak/1/edit currently has API key `xVLyHw.mDQnPQ:IXCte59B2XjpNRV4`. Now change the extension to `.textile` i.e. https://jsbin.ably.io/enagak/2.textile, and voilà - you now have a file you can copy & paste back into the docs repo, but **importantly**, it is intelligent enough to detect a docs or demo **API key**, and replace it with a variable **{{API_KEY}}**.

This ensures our JSBin demo's are always rendered with working API keys.

### Adding a link to the JSBin resource

To make retrieving the URL easy we created a Ruby helper which does all the work

```ruby
<%= JsBins.url_for("hub-product/native-sdks-javascript") %>
```

The creation of code content for JSBin is further documented in our [document formatting guide](content/client-lib-development-guide/documentation-formatting-guide.textile) which gets published [here](https://docs.ably.io/client-lib-development-guide/documentation-formatting-guide/#code-blocks). The code that is published to JSBin can be found in [content/code/](content/code/).

**IMPORTANT**: You must `git commit` the updated `jsbin.yaml` with your new assets.

## Forking and running locally

- `bundle install`

This installs the necessary gems, including `nanoc`. You can then run the web server by running the following command:

- `bundle exec nanoc live -p 4000`

This starts up a web server at <http://localhost:4000>, builds the static site and allows you to view changes live.

_The Ruby version required is outlined in the [.ruby-version file](.ruby-version)._

_For those who use [ASDF](https://github.com/asdf-vm/asdf) or compatible tooling to manage their Ruby runtime versions, we have included a [`.tool-versions`](.tool-versions) file._

## Pull requests

1. Assuming you have followed the steps above, prior to making a PR, make your changes locally.
2. Commit your changes, push your branch and send us a pull request.
3. All pull requests will automatically launch a static review site that will be linked to at the bottom of the PR.

## Publishing to JSBin

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

The `master` branch contains the most recent version of the spec, as amended by any subsequent fixes and non-breaking improvements. This is the version that a client library developer who is implementing a feature now should use as a reference. It is also the version that is deployed to docs.ably.io.

When proposing a spec change, changes that you would be happy to have incorporated into the current version of client libraries should be made against `master`. Changes that should not be incorporated until the next minor or major version should be made against the corresponding`integration/<major>.<minor>` branch, e.g. `integration/1.2` (which ideally should be regularly rebased on top of `master`).

When a new minor or major version of the spec is released, it is tagged with a tag such as `v1.2`. Conformance to the spec at that tag is what defines whether a library can be released with the library version with that major/minor version.

Client library developers are not expected to monitor the docs repo for spec fixes that occur after the release tag. If a given spec fix needs to be made to client libraries at that time, on merging the PR to`master` you should open a GitHub issue in each individual client lib repo to request that. If this is not done, it is not mandatory for the fix to be incorporated until the next spec release.When updating a client lib to a spec version, client lib developers should work from a diff from the tag of the previous release, so as to incorporate all changes since that tag.

## Deploying to website (www.ably.io/documentation)

The website consumes this repo through a Ruby gem. The gem points at the `master` branch and saves the revision as a version. To release to `/documentation`, follow these steps:

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
