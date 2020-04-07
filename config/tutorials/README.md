# Tutorials

**A guide to making gorgeous metadata.**

The tutorials segment of the docs repository has been mostly decoupled from ably/website repository. This is great news but it also places the responsibly of the metadata on you!

### The fundamental changes:

- External articles and internal articles are consolidated
- Hard dependencies and non-negotiable in the YAML front matter
- How the UI filters work with respect to the JSON control file.
- A curated list of "favorite" articles, to mitigate "no search results"



---




## External articles

Please use the file naming convention: `_article-name.textile` where the prefix `_` is not manditory, but does distinguish an external article from the rest, with a practical benefit of grouping the directory listing.

An external article uses exactly the same YAML metadata as any other article except it includes one additional flag in the front matter.

```yaml
external: true
```

... and the body of the article contains a single HTML comment.

```html
<!-- external article -->
```



---



## The metadata of an article

| Key       | Value                                                        | Notes             |
| --------- | ------------------------------------------------------------ | ----------------- |
| title     | Mary's little lamb                                           | String            |
| excerpt   | It's fleece as black as coal, everywhere Mary went the lamb refused to go. Mary now owns Ugg boots, with a fashionable dark woolen lining. That lamb will go when Mary says so. | String            |
| section   | tutorials                                                    | always            |
| category  | channels, api-hub, reactor-integrator (category id)          | List, category id |
| group     | sdk OR mqtt OR sso (group id)                                | String, group id  |
| tags      | list of Strings ()                                           | List, text        |
| languages | ENUM                                                         | ENUM              |



```yaml
---
title: Webhooks and Chuck Norris
excerpt: Learn how to use our Webhooks to trigger HTTP requests when realtime data is published and then use the Chuck Norris API to publish jokes in real time.

section: tutorials
category:
  - channels
  - reactor-integrations
group: sdk
tags:
  - Webhooks
languages:
  - ruby
index: 105
platform: browser
authors:
- author_name: Ably Team
  author_bio: ""
  author_profile_url: https://ably.io/about/team
  author_image: "tutorials/ably.png"
level: medium
reading_time: 25
ably_product: reactor
---
```



If you **MUST** set the index value you can get an ordered list of articles and indexes with ...

```bash
# All of the articles: filenames sorted by their index value
grep -r "index:\s\w*" content/tutorials/* | sort -t: -n -k3

# Bottom 10 (tail -n 10)
grep -r "index:\s\w*" content/tutorials/* | sort -t: -n -k3 | tail -n 10

# Top 10 (head -n 10)
grep -r "index:\s\w*" content/tutorials/* | sort -t: -n -k3 | tail -n 10

```

