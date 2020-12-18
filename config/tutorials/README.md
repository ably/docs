# Tutorials



The tutorials segment of the docs repository has been mostly decoupled from ably/website repository. This is great news but it also places the responsibly of the metadata on us.



### The fundamental changes:

- External articles and internal articles are consolidated.
- There is JSON Controller to modify category, and group descriptions and a curated list of "favourite" articles.



---


# External articles

Please use the file naming convention: `_article-name.textile` where the prefix `_` is not mandatory, but does distinguish an external article from the rest, with a practical benefit of grouping the directory listing.

An external article uses exactly the same YAML metadata as any other article except it includes one additional flag in the front matter, and the absolute URL to the article content.

```yaml
external: true
url: https://medium.freecodecamp.org/how-to-build-a-multiplayer-vr-web-app-7b989964fb38
```

... and the body of the article contains a single HTML comment.

```html
<!-- external article -->
```

**NOTE**: Viewing an external article on the Ably/docs website will display a blank page. This is because the body is an HTML comment, whereas clicking an external card on the tutorials landing page will redirect the user.

---

# JSON Controller

The respective ENUM values used in the textile articles are derived from the control JSON, with the exception of **languages** (see below). The controller lets us update static text independent of the Ably/Website repo.

### categories

The `desc` property is no longer used by the new design. 

```
"categories": [
    {
        "id": "channels",
        "icon": "arrows-horizontal",
        "name": "Channels",
        "desc": "A selection of tutorials ...."
    },
    ...
]
```

### groups

These are the section divisions within each tab page content.

```
  "groups": {
    "sdk": {
      "id": "sdk",
      "name": "Using native Ably SDKs",
      "desc": "A selection of tutorials ...... mobiles or servers."
    },

```

### favourites

This is a fallback in the unlikely event that there are no search results, in this case the following list of articles will appear in a special section with the respective description and our most popular tutorial cards.

```
 "favorites": {
    "title": "No results for the filter",
    "desc": "However we do have these ... might help you.",
    "filenames": [
        "publish-subscribe.textile",
        "token-authentication.textile",
        "_multiplayer-vr-web.textile",
        "mqtt-snake.textile",
        "_live-flight-tracking.textile",
        "_multi-lingual-chat.textile"
    ]
  },

```



---

# Textile metadata

## Category (ENUM, list)

A category is essentially the TAB in which an article will appear. An article can be displayed in multiple tabs. The list of available ENUM keys can be found in [tutorials.json](./tutorials.json)

```
category:
  - channels
  - reactor-integrations
```



## Tags (String, list)

Please avoid plurals (or be consistent) eg `Graph` and `Graphs` will create two tags, and introduce confusion for the user interface. Additionally please do not create tags for TABs or LANGUAGEs, for the same reason.

```
tags:
  - Bitcoin
  - Hub
  - Angular
  - KendoUI
  - Graphs
```



## Languages (ENUM, list) & Libraries (String, list)

The available languages can be found in [documentation_languages.rb](../lib/helpers/documentation_languages.rb) every tutorial card requires at least one language ENUM. Libraries (optional) Are plain text list of Strings, please be consistent in the use of plural and capitalisation.

**IMPORTANT**:

- If `librries` is defined the interface will display those values, and ignore the `languages` list.
- Not all the languages have an SVG icon. To add a new icon please see [Ably/Website - Assets](https://github.com/ably/website/#assets)

```
# manditory (ENUM)
languages:
  - javascript
  - nodejs

# optional (String)
libraries:
    - Angular

```



## Authors (collection)

The tutorial card can accommodate up to four author profiles, and require at least one. Images can be a path or absolute  URL. (The example below demonstrates both use cases) Please remember to save NEW profile pictures in the Ably/Website repository in: `/app/assets/images/tutorials`  

Ideally please use JPG images no larger that 200x200 pixels.

```
authors:
- author_name: Christopher Batin
  author_bio: ""
  author_profile_url: "https://github.com/cjbatin"
  author_image: "tutorials/christopher-batin.jpg"
- author_name: Srushtika Neelakantam
  author_bio: ""
  author_profile_url: "https://github.com/Srushtika"
  author_image: "https://avatars3.githubusercontent.com/u/5900152?s=460&v=4" 
```



## Group (ENUM, String)

A group is the a subsection that appears within the TAB content page. All articles must be associated with a single group. Currently these are: `sdk`, `mqtt` or `sse`.  The list of available ENUM keys can be found in [tutorials.json](./tutorials.json)

```
group: sdk
```



## Deprecated attributes

Currently all articles must contain both of the following keys. They are not used by the tutorials landing page, however the respective **article page** will reference those values to display SVG icons. 

```yaml
---
platform: browser
ably_product: reactor
---
```



## Ordering tutorial cards

If you need to publish a multi-part tutorial series you might want those cards to appear in a grouped order. (The WebRTC tutorial is an example of multi-part grouped ordering) To achieve this change the `index` for each article, where lower values will appear first.

```
index: 151
```

If you want to see the used index values you can get an ordered list of articles and indexes with ...

```bash
# All of the articles: filenames sorted by their index value
grep -r "index:\s\w*" content/* | sort -t: -n -k3

# Just tutorials: Bottom 10 (tail -n 10) or Top 10 (head -n 10)
grep -r "index:\s\w*" content/tutorials/* | sort -t: -n -k3 | tail -n 10

```

