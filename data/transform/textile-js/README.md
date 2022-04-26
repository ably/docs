# Textile JS

## Why write our own Textile parser?

The most mature codebase to support Textile has some issues with it that are awkward to work around.

The less mature codebases are not usable by  us as they support a very limited subset of Textile.

The most prominent/unavoidable one is that nested HTML elements of the same type cannot be rendered correctly, see:

http://borgar.github.io/textile-js/
`<span style="color: green"><span>Hi there</span></span>`

This is based on the fact that textile-js is inherently written to be greedy, as this same issue applies to links. With links it is an ambiguous interpretation detail with textile-js, but with HTML elements it leads to invalid markup.

### Why not contribute to the open-source codebase?

1. It will take longer to understand how this code works & contribute a fix than to write a parser of our own.
2. It is likely that many codebases by now depend on or expect this behaviour, and it would be unproductive to disrupt any simpler textile-dependent projects just because we have different needs.

## Why RegEx?

While RegExes are not suitable for HTML parsing, we should ignore HTML in textile.

The only use case for parsing the HTML itself  is if the HTML is broken, or breaks in combination with textile, and that is not the job of the textile parser to determine; that is a job for an HTML parser, for which we have Cheerio.

## What's Missing?

The following pieces of work have not been implemented. These should either be of minimal utility, bad for consistency of appearance, or replicated by other functionality.

### Paragraphs can be aligned left, right, centered, or justified:
p<. Aligned left paragraph (default).
p>. Aligned right paragraph.
p=. Centered paragraph.
p<>. Justified paragraph.

### Indentation can be specified by one or more parentheses for every 1em to the right or left.
p(. Left indent 1em.
p((. Left indent 2em.
p(((. Left indent 3em.
 
### Headings can be aligned left, right or centered:
 
h3<. Left aligned header
h3>. Right aligned header
h3=. Centered header

### HTML comments are removed from text:
Here is some text with a <!-- Commented out[1] --> block.
<!-- Here is a single <span>line</span> comment block -->
<!-- Here is a whole
multiline
<span>HTML</span>
Comment
-->
Normal text continues here.
 
### For blocks of elements add a notextile. or notextile.. at the start of the block:
notextile. This line <em>will not</em> be Textilised.

### Mixed Unordered & Ordered Lists
```
* This is a bullet
## this is the start of an enumerated list within a bulleted list
## this is another item list of an enumerated list within a bulleted list
*** this is another level
*** and another bullet
* This is another bullet at level 1
```

### Attributes can be applied to individual list items, or to the list itself
```
When a class, id, lang, style attribute modifier is put on the very first item in the list, then the markup will be applied to the container.

For example:

*(class#id) Item 1
* Item 2
* Item 3
Renders:

<ul class="class" id="id">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
But if you also wish to put a class attribute on individual items in the list, you simply make the first list item end with a . dot immediately after the attributes. That holds the container modifiers, and then proceed as normal.

For example:

*(class#id).
*(first) Item 1
*(second) Item 2
*(third) Item 3
Renders:

<ul class="class" id="id">
    <li class="first">Item 1</li>
    <li class="second">Item 2</li>
    <li class="third">Item 3</li>
</ul>
You can put the class, id, lang, style attribute modifiers on any list item; this works for ordered, unordered and definition lists.
```

### Ordered List continuation characters

 For continuation of a list’s numbering from where you previous ordered list finished, you can let Textile know using the continuation character.

 ### Footnotes

 ### Endnotes

 ### Languages on Blockquotes