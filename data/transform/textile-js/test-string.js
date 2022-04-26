const TextileTestString = `
h1. Header 1
h2. Header 2
h3. Header 3
h4. Header 4
h5. Header 5
h6. Header 6

h1.(class#id) Header 1 with ID
h6.(class#id) Header 6 with ID

h1.(class#id)[javascript] Header 1 with ID class and language

Paragraph example

Paragraph example
with line break

###. A comment
with multiple lines.

p. Paragraph example

p. Paragraph example
with line break

p.(class#id)[javascript] Paragraph example with features

  No paragraph

pre. Pre-formatted text
A paragraph following pre-formatted text

pre.. Pre-formatted text
Not a paragraph following pre-formatted text
p. A paragraph following pre-formatted text

pre.. Pre-formatted text
Not a paragraph following pre-formatted text
p. A paragraph following pre-formatted text

bc. Block code

bc.(class#id) Block code with class and ID

bc.. Block code
Not a paragraph following block code

p. A paragraph following pre-formatted text

bc..(class#id) Block code with class and ID
Not a paragraph following block code

p. A paragraph following pre-formatted text

Inline @code snippet@ and some text not in a code snippet@.

bq. A blockquote

bq.:https://www.example.com A blockquote with a cite attribute.

bq.(class#id):https://www.example.com A blockquote with a cite attribute & other features.

bq.. Multiline blockquote
Some more text

& some more text

p. A paragraph following multiline blockquote

bq..:https://www.example.com Multiline blockquote with a cite attribute.
Some more text

& some more text

p. A paragraph following multiline blockquote

bq..(class#id):https://www.example.com Multiline blockquote with a cite attribute & other features.
Some more text

& some more text

p. A paragraph following multiline blockquote

Some inline-text that is ==@not to be handled by textile@==

Some inline-text that is <notextile>@not to be handled by textile@</notextile>

<div>No change to <span>HTML elements</span></div>

* Unnested unordered list
* Unnested unordered list
* Unnested unordered list
* Unnested unordered list


* Nested unordered list
** Nested unordered list
*** Nested unordered list
** Nested unordered list
* Nested unordered list


* Uneven nested unordered list
*** Uneven nested unordered list
* Uneven nested unordered list
** Uneven nested unordered list
** Uneven nested unordered list
**** Uneven nested unordered list


# Unnested ordered list
# Unnested ordered list
# Unnested ordered list
# Unnested ordered list


# Nested ordered list
## Nested ordered list
### Nested ordered list
## Nested ordered list
# Nested ordered list


# Uneven nested ordered list
### Uneven nested ordered list
# Uneven nested ordered list
## Uneven nested ordered list
## Uneven nested ordered list
#### Uneven nested ordered list

- Term := definition
- Term := definition
- Term := definition
- Term := definition

"Example link":https://www.example.com<a href="https://www.example.com?q=2">Second example link</a>

["Bracketed link":https://www.example.com].

!https://www.example.com/image.png!

*Strong text*

**Bold text**

_Emphasised text_

__Also emphasised text__

Super^script^

~Sub~script

Some -deleted- text. A -strike-through-.

??A citation??

The four main UN-agencies are the WHO(World Health Organisation), the ILO(International Labour Organisation), the UNESCO(United Nations Educational, Scientific, and Cultural Organization) and the IAEA(International Atomic Energy Authority).

`;

const TextileResultString = `
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
`;

export { TextileTestString };
