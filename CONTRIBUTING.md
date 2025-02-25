# Contribution guide

This guide covers how to contribute to the Ably docs repository. From general pull request processes, to how to update and use each textile component.

## Pull request process

The following high-level information covers the pull request process for Ably docs:

* Pull requests should be raised against the `main` branch in the majority of cases.
* A review site is built for every pull request, and rebuilt on subsequent commits.
* Tag `@team-deved` for review.
* Once approved and merged into `main`, content is automatically updated on `/docs`.

### CI

CI runs in [CircleCI](https://circleci.com/).

### Reviews

Request reviews from the group `@team-deved` on any pull requests.

[CodeRabbitAI](https://github.com/apps/coderabbitai) doesn't run by default on pull requests, but is available using the command `@coderabbitai review`.

### Linting

Contributors should use [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) when adding content. An `.editorconfig` file is included in the repository.

### Style guide

There is a [writing style guide](writing-style-guide.md) that contributors should follow when adding content.

## Repository structure

There are two main locations that contributors need to work with to varying extents. The following is a table explaining what each folder contains that is relevant to editing the docs:

| Folder | Contains |
| ------ | -------- |
| content | All content pages written in textile. |
| src | Images, navigation and language version and management. |

## Textile format

The following sections discuss how to write and implement each component using textile.

### Metadata

The following metadata can be included in the front matter of files. Metadata should be written between `---` in YAML:

```yaml
---
title: "The page title that will appear on page. This is required."
meta_description: "A description for the page that will be returned in searches. This is required."
meta_keywords: "A comma separated list of keywords about the page."
redirect_from: "A YAML array of pages that will redirect to the current page."
---
```

#### Redirects

Redirects are automatically added to [`config/nginx-redirects.conf`](config/nginx-redirects.conf) using the values set in `redirect_from`, and used to create a map of nginx redirects at build time.

Other one-off instances of redirects are contained in the following files. These should rarely, if ever need to be touched.

* [`/config/website-redirects.conf`](config/website-redirects.conf)
* [`/config/client-lib-development-guide-redirects.conf`](config/client-lib-development-guide-redirects.conf)
* [`/config/nginx.conf.erb`](config/nginx.conf.erb)

### Headings

Page headings are implemented in the format: `h[1-6](#anchor-id).`. In reality `h1` is never used as it is automatically set by the page title defined in the metadata.

An example heading (with a custom anchor link) is: `h2(#subscribe). Subscribe to a channel`

### Links

Links in textile are written in quotation marks. Link text can also be [code styled](#in-line-code).

#### Internal links

To link to another heading on the same page use the anchor link: `"channel state changes":#listen-for-state`.

To link to another docs page use: `"messages":/docs/channels/message`.

You may also use in-line code to style link text: `"@get()@":/docs/api/realtime-sdk/channels#get method`

#### External links

To link externally, or outside of the docs repository, use a fully qualified link: `"Ably dashboard":https://ably.com/dashboard`.

> Note: for dashboard links you can use `/any/` as the account ID to link directly to a specific page. For example: `https://ably.com/accounts/any/edit` for the account settings page.

### Codeblocks

Codeblocks are defined using triple backticks followed by the language wrapped in square brackets, for example: ` ```[javascript] `. They are closed using triple backticks. Codeblocks are grouped into tabs when they follow one another with a single empty line between them:

```plaintext
    ```[javascript]
    const channel = realtime.channels.get('channelName');
    ```
    ```[objc]
    ARTRealtimeChannel *channel = [realtime.channels get:@"channelName"];
    ```
```

To use nested codeblocks when describing features that are available to the realtime and REST interfaces, use the the same syntax as a normal codeblock but prefix the languages with `realtime_` or `rest_`. Spacing should be continuous as with a normal codeblock, however the snippets for each interface should all be written together, rather than interspersed:

```plaintext
    ```[realtime_javascript]
    const channel = realtime.channels.get('channelName');
    ```
    ```[realtime_objc]
    ARTRealtimeChannel *channel = [realtime.channels get:@"channelName"];
    ```

    ```[rest_javascript]
    const channel = rest.channels.get('channelName');
    ```
    ```[rest_objc]
    ARTRestChannel *channel = [realtime.channels get:@"channelName"];
    ```
```

### In-line code

In-line code should be written between `@` symbols. For example, `the @get()@ method`.

### Variables

The following variables can be inserted into codeblocks to generate values at runtime:

| Variable | Description |
| -------- | ----------- |
| `{{API_KEY}}` | Injects a demo API key into the code sample if a user isn't logged in. Enables users to select an API key from from their dashboard if they are logged in. |
| `{{RANDOM_CHANNEL_NAME}}` | Generates a random channel name. |

### Definition lists

Definition lists are used to display a list of terms and their descriptions, such as the available capabilities.

They use the following syntax:

```plaintext
- publish := can publish messages to channels
- presence := can register presence on a channel (enter, update and leave)
```

### Tables

Textile tables are supported which are slightly more flexible than Markdown ones. They don't need to use a row of hyphens to separate the header and content either.

For the header row use the following syntax:

```plaintext
|_. Flag |_. Description |
| SUBSCRIBE | Can subscribe to receive messages on the channel. |
```

To make a cell span two columns:

```plaintext
|_/2=. Limit |
|_. Soft |_. Hard |
```

### Admonitions

There are three types of admonition that can be used; `note`, `important` and `further-reading`. Update the value of `data-type` to switch between them. Admonitions are written using the HTML `<aside>` tag. Content must be constructed in HTML, other than links and in-line code styling which accept textile format.

```html
<aside data-type='note'>
<p>The following restrictions apply to "channel":/docs/channels names:</p>
<ul><li>Channel names are case sensitive</li>
<li>They can't start with @[@ or @:@</li>
<li>They can't be empty</li>
<li>They can't contain newline characters</li></ul>
</aside>
```

> Note: 'important' admonitions should be used sparingly, and only for critical information. Try to keep admonitions short where possible. They may not contain block code, only in-line code.

#### Feature changes

Two additional types of admonition are used to display features that have been added or updated in a version update; `new` and `updated`.

```html
<aside data-type='updated'>
<p>The @AblyProvider@ was updated in version 2.0. See the "migration guide":https://github.com/ably/ably-js/blob/main/docs/migration-guides/v2/react-hooks.md#rename-optional-id-field-to-ablyid for details on upgrading from a previous version.</p>
</aside>
```

### Ordered and unordered lists

Textile accepts several formats for unordered lists, however `*` should be used for consistency.

```plaintext
* Strawberry
* Mango
* Mint Choc Chip
```

For ordered lists, textile will accept any number before a `.` and order it appropriately. Ascending numbers should be used for readability and consistency.

```plaintext
1. Cornetto
2. Twister
3. Mars
```

### Images

Images are implemented using the HTML `<a>` tag. They are all stored in the [images folder](/src/images/content) and should be named named logically. The root of this folder can be accessed using `@content/`.

```plaintext
<a href="@content/diagrams/history-default.png" target="_blank">
<img src="@content/diagrams/history-default.png" style="width: 100%" alt="Default Persistence">
</a>
```

### Language-specific text

There are three different ways of displaying different text depending on the language that someone has selected.

#### `blang`

A `blang[].` enables you to provide blocks of content that only appear when a specific set of languages are selected. They can also be chained together in succession. The content that follows a `blang[].` must be indented by one tab. The first sentence that isn't indented will revert to being visible to all languages.

```plaintext
blang[ruby].

  This sentence is only visible when Ruby is selected.

blang[csharp,python].

  This sentence is visible when C# or Python is selected.

This sentence will be visible regardless of which language is selected.
```

#### `span`

`<span>` tags can be used to display a word, or short phrase in different languages. They are quite messy to read, so are mainly used in API references to label property names differently.

```html
<span lang="ruby">@Ably::Util::@</span><span lang="java">@io.ably.lib.util.@</span>
```

#### `div`

`<div>` tags can be used in a similar fashion to `blang[].`, however they aren't indented.

```html
<div lang="java,swift,objc">

h6(#device).

A reference to the "<span lang="default">@LocalDevice@</span><span lang="objc,swift">@ARTLocalDevice@</span>":/api/realtime-sdk/push#local-device object.
</div>
```

### Languages and versions

SDKs are versioned using SemVer. When a new major or minor version is released, the documentation needs to be updated to reflect the change and the version bumped in [`src/data/languages/languageData.ts`](src/data/languages/languageData.ts).

The list of available languages that can be used throughout the site are in [`src/data/languages/languageInfo.ts`](src/data/languages/languageInfo.ts).

### Navigation

The left-hand navigation is written per-product and generated using the files in [`src/data/nav`](src/data/nav).

```ts
export default {
  name: 'The top-level product name that appears in the navigation.',
  link: 'The link of the page you want the product name to be in the breadcrumbs, e.g. /chat',
  icon: {
    closed: 'The monochrome product image in the navigation, e.g. icon-product-chat-mono',
    open: 'The coloured product image in the navigation when it is open, e.g. icon-product-chat',
  },
...
  content: [
    {
      name: 'A section header that appears in capitals, e.g. Introduction',
      pages: [
        {
          name: 'The page name to appear in the navigation, e.g. About Chat',
          link: 'The link to the page referenced above, e.g. /chat',
        },
      ],
    },
...
  api: [
    {
      name: 'The title for the API reference section, e.g. API References',
      pages: [
        {
          name: 'The page name to appear in the navigation, e.g. JavaScript SDK',
          link: ' The link to the page reference above, e.g. https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/modules/chat-js.html',
          external: 'Whether the link is external to the docs site, so an arrow is appended to the name. This defaults to false and is boolean, e.g.' true,
        },
...
```

### Homepage

The homepage content is in [`src/data/content/homepage.ts`](src/data/content/homepage.ts).

## API references

The majority of the content above is also relevant for API references, however there are some variations and additional items to be aware of.

### Headings

Properties and methods should be written as H6 headings so that they are styled appropriately. These headings can also take an optional tabbed set of languages if the method name differs between languages.

```plaintext
h6(#get).
  default: get
  csharp: Get
```

### Method signatures

Method signatures are written in a similar way to headings. They use the `bq(definition).` syntax and can list options for each language, or languages.

```plaintext
bq(definition).
  default: new Ably.Realtime(String keyOrTokenId)
  ruby: Ably::Realtime.new(String key_or_token_id)
```

### Partials

API references make use of [partials](content/partials/) where content is reused between files. They are included in .textile files using the following syntax:

```plaintext
<%= partial partial_version('realtime/_stats') %>
```

### Control API

The Control API is a REST API and the spec can be found in [`static/open-specs/control-v1.yaml](static/open-specs/control-v1.yaml).

This is then referenced in [`src/pages/api/control-api.tsx](src/pages/api/control-api.tsx) for rendering.
