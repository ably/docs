# Ably Documentation (Internal)

The instructions on this page are intended for Ably staff. Please see the [main README](README.md) for more general instructions on how to work with the Ably docs repository.

## Publishing to JSBin

The following steps apply if you will be creating or modifying code within this repository for our "Try it now" code editor in [JSBin](https://jsbin.ably.com/).

> **Note**: The creation of code content for JSBin is further documented in our
> [document formatting guide](content/client-lib-development-guide/documentation-formatting-guide.textile)
> which gets published
> [here](https://docs.ably.com/client-lib-development-guide/documentation-formatting-guide/#code-blocks).
> The code that is published to JSBin can be found in the
> [content/code/](content/code/) folder.

### Obtaining the API key

First, ensure that you have the following installed:

- The `heroku-cli` tools: [installation instructions](https://devcenter.heroku.com/articles/heroku-cli)
- PostgresSQL: [downloads](https://www.postgresql.org/download/)

Execute the following SQL statement to retrieve the API key:

```bash
$ heroku pg:psql -a ably-jsbin -c "select name, api_key from ownership"
```

When you execute this command you will be prompted to open a browser window and log in to Heroku. Ensure that you log in **using your Ably email address**, as only Ably staff members are permitted to access this resource.

If you are an Ably staff member and receive this message:

```bash
$ heroku pg:psql -a ably-jsbin -c "select name, api_key from ownership"
 ▸    You do not have permission to view addon resources on ably-jsbin. You need to
 ▸    have the deploy or operate permission on this app.
```

...then ask your admin to grant you the correct permissions on Heroku. You can re-authenticate by executing the following command:

```bash
$ heroku login
```

When the SQL statement has executed successfully, you will be shown the API key that you need for the next step, which is to create a JSBin config file:

```
 name |      api_key
------|-------------------
 ably | 12345678901234567
(1 row)
```

### Create the JSBin config file

Copy the example config file (`config/jsbin_config.example.yaml`) to `config/jsbin_config.yaml`:

```bash
$ cp config/jsbin_config.example.yaml config/jsbin_config.yaml
```

Then, populate `jsbin_config.yaml` with the API key that you retrieved in the preceding step.

### Compile the JSBin code snippets

This step adds your new code snippet to the list of existing snippets in `/data/jsbins.yaml`. This file is essentially a table of hashed documents and corresponding file names. Choose the appropriate command for your installation type:

#### Ruby

```bash
$ bundle exec nanoc compile
```

#### Docker

```shell
docker-compose up
```

Executing one of the above commands checks each file and produces a long lists that looks similar to the following:

```bash
...
Published new JSBin for hub-product/http-javascript at https://jsbin.ably.com:443/ujehow/1/edit?javascript,live
Copied https://jsbin.ably.com:443/ujehow/1/edit?javascript,live to clipboard
    create  [0.49s]  output/code/realtime/channel-deltas-sse/index.html
    update  [1.10s]  output/sse/index.html
    update  [1.02s]  output/concepts/socketio/index.html
...
```

The output above shows that a new record was added to `jsbins.yaml` with the ID of `ujehow` in the JSBin URL. By hashing the contents, we don't need to call the JSBin API on every static build, but only if a hash does not exist, in which case we call the API to create a new JSBin that contains the required HTML, CSS, and JavaScript for our code snippet.

```yaml
---
# Extract from data/jsbins.yaml:
jsbin_hash:
  Rh81oraUHHJ3PrrvwdJAOrVBqA8=: ujehow # <-- hash: ID
  eBxLJU1YqdX+JW9JQY70S4iQfmU=: omedab
  pzHKfCW4/o2wDnCfbg1m0Pkl7v8=: ovucin
  ...
jsbin_id:
  adapters/pusher-pub-sub: eBxLJU1YqdX+JW9JQY70S4iQfmU=
  adapters/pubnub-pub-sub: pzHKfCW4/o2wDnCfbg1m0Pkl7v8=
  hub-product/http-javascript: Rh81oraUHHJ3PrrvwdJAOrVBqA8= # <-- file: hash
  ...
---
```

> **NOTE**: You can use this `ID` to view the JSBin for the associated code sample, by visiting `http://jsbin.ably.com/<ID>/edit`. For example, to view the JSBin with ID `ujehow`: [http:\/\/jsbin.ably.com/ujehow/edit](http://jsbin.ably.com/ujehow/edit)

This process populates the code samples with working API keys dynamically. So for example, https://jsbin.ably.com/enagak/1/edit currently has an API key defined in the `apiKey` JavaScript variable. If you change the extension to `.textile` (`https://jsbin.ably.com/enagak/1.textile`), you now have a file you can copy and paste back into the docs repo, but **importantly**, it detects the presence of a real API key and replaces it with the placeholder `{{API_KEY}}`.

> **IMPORTANT**: You must commit the updated `jsbin.yaml` with your new assets when you push your changes to GitHub.

### Adding a link to the JSBin resource

You need to reference the JSBin using the appropriate URL. To make retrieving the URL easy we created a Ruby helper which retrieves the URL for you:

```ruby
<%= JsBins.url_for("hub-product/native-sdks-javascript") %>
```

## Branch and tag scheme for features spec

The spec has moved to [the `ably/specification` repository](https://github.com/ably/specification), where contribution guidance can be found for it.

## Checking for broken links using Nanoc

There are two checks that can be run using [Nanoc](https://nanoc.app/doc/testing/) to check for broken links:

* For internal links run `nanoc check ilinks`.
* For external links run `nanoc check elinks`.

A list of any broken links will be generated and output to the command line in the following format, where the first line is the file containing the link and the second line is the broken link itself:

```
output/general/events/aws-lambda/index.html:
  [ ERROR ] internal_links - broken reference to file:///general/event
```

## Deploying documentation changes on the nanoc toolchain to `ably.com/docs`

Changes to the docs repo are always visible at https://docs.ably.com, but the official documentation at https://ably.com/docs consumes the docs repo via a Ruby gem which points at the `nanoc-toolchain` branch and saves the revision as a version. To include your doc changes in the website, you need to update the version of the docs repo that the gem references:

1. Ensure that the `nanoc-toolchain` version of this repository includes the doc changes that you want to publish.
2. Clone the [website repo](https://github.com/ably/website) and create a new feature branch.
3. Execute `./script/bump_docs.sh` from the root folder of the website code. This script creates a commit for publishing the documentation.
4. Push your branch to the website repo and create a pull request.
5. Edit any unnecessary information out of the description and add the website team as reviewers.
