# Writing Style Guide

These are technical writing guidelines that should be used for Ably's developer documentation.

This guide does not cover the details of marking up content source. See the [documentation formatting guide](https://github.com/ably/docs/blob/main/content/client-lib-development-guide/documentation-formatting-guide.textile) for the latest details on how to markup source content.

Some of the benefits of using this style guide are:

* Instructions are easier to read and understand.
* More professional feel to documentation.
* Documentation is easier to translate to multiple languages.

Technical accuracy is paramount. This overrides all else. In writing developer documentation technical writers and contributors should strive for:

* Technical accuracy
* Clarity
* Simplicity
* Consistency

Sometimes these objectives can conflict with each other, in which case the technical writer must use their experience and judgement to decide on the best approach.

> **NOTE:** As with most guidelines these are suggestions. Technical writers and contributors should always use their best judgement given the specific circumstances.

## Technical terms

It is important to be consistent with the use of technical terms. In order to provide consistency with technical terms, acronyms, and product names you should always refer to the Ably Glossary.

## Use International English

The company standard is, as with most software companies, to use International English. This is [defined](https://www.star-ts.com/about/translation-faq/what-is-international-english) as US spelling, with Americanisms removed.

The industry standard dictionary is [Merriam Webster](https://www.merriam-webster.com/).

## Use inclusive language

Use inclusive language. Google has written extensively and thoughtfully on this subject, so there is no point in duplicating that here. See the [Google guide](https://developers.google.com/style/inclusive-documentation) for details on writing inclusive language.

## Empathy

Empathy for developers should always be a key factor in your writing.

## Use present tense

Use present tense. It’s easier to read and translate.

Examples:

* *Future:* Command X will start the server.
* *Present:* Command X starts the server.

## Use simple language

For technical writing the best approach is to be simple, direct and technically accurate. To achieve this objective use clear, simple, accurate, and directive language.

Avoid being overly casual in developer documentation as this can lead to a sense of lack of professionalism. However, a more casual writing style may be suitable for more relaxed pieces such as specific blog posts, but in developer documentation this is best avoided, as technical accuracy and clarity are paramount.

Other things to avoid:

* Avoid verbose writing styles.
* Avoid using attempts at humour in technical writing.
* Avoid being casual, especially at the cost of technical accuracy and precision.

Technical writing needs to be unapologetically accurate and precise, and use specific terminology wherever necessary to ensure that the correct and unambiguous meaning is conveyed.

## Avoid fillers

It's sometimes easy to get overly enthusiastic in technical documentation, and this shows itself by liberal use of superlatives. It's best to avoid this in material targeted at developers.

Avoid filler words and superfluous adjectives such as 'really nice feature', 'it may be that', 'and that's it'.

## Avoid subjective phrases

Avoid subjective phrases. "You can easily...". "It is simple to...". "It's as easy as that!"

Rather than say how simple it is to do something, show the developer through specific steps. Let the developer be the judge of whether something is simple or not.

## Contractions

It's generally fine to use common contractions, as long as the intent is clear. Where there may be the possibility for confusion, be explicit, for example, use "it is" or "it has" if using "it's" could lead to confusion. One common error is to use "it's" in the belief that the apostrophe is required if used in a possessive manner. This is never the case. For example:

* *Incorrect:* "Ably persists it's data in memory for two minutes."
* *Correct:* "Ably persists its data in memory for two minutes."

## Number words

For small numbers generally you write the number as a word:

* *Avoid:* "Ably persists messages in memory for 2 minutes."
* *Better:* "Ably persists messages in memory for two minutes."

Larger numbers can stay as numerals, or where precision is required.

## Use active voice

In line with directing the developer succinctly, it is recommended to mostly use the active voice. In active voice the *Subject* *Verbs* the *Object*. Remember SVO.

Examples:

* *Active voice:* The man ate the apple.
* *Passive voice:* The apple was eaten by the man.
* *Active voice:* The client creates the connection.
* *Passive voice:* The connection is created by the client.
* *Active voice:* Ably provides an Asset Tracking SDK.
* *Passive voice:* An Asset Tracking SDK is provided by Ably.

Active voice is simpler, more direct, and easier to translate.

The principle here is you want to guide the developer succinctly and accurately, in the most direct way possible. If you drop into passive voice because it feels correct for the situation that's fine, but generally you want to keep things simple and use active voice.

## Paragraph breaks

In technical writing, and especially blog posts, you can be more generous with your use of paragraph breaks, compared to a novel. Paragraph breaks make the text less overwhelming and easier to read. Generally, you want to avoid dense and cramped text because it's harder to read and digest. From the technical writer's perspective dense text is also harder to maintain.

## Parentheses

Generally avoid long sentences that have embedded parentheses as this makes the text harder to read. You can break out the bracketed text into a new sentence or rewrite the text to not require brackets. Sometimes the bracketed material might be better off as a note or tip admonition.

## Avoid vague and cautious language

Avoid words such as would, should, might, and maybe, as it does not inspire confidence to use such language.

Example:

* *Avoid:* When an inbound message arrives, you might receive it, or you might get an error, or something!
* *Better:* When an inbound message arrives, the message callback handler is invoked.
* *Avoid:* If you click the button, the alert box will probably be displayed.
* *Better:* When you click the `Submit` button, the alert box is displayed.

## Use second person

You should use 'you' rather than 'we' when referring to the reader, especially in task-based material such as tutorials.

The reason for generally avoiding 'we' is that it can potentially create confusion - who exactly is 'we'? 

Consider the following, for example:

* *Avoid:* We now configure the Time To Live (TTL).

Is that something Ably configures on the developer's behalf, or does the developer have to do it, and if so how?

It is always best to be explicit: if the developer needs to do something, tell them directly what they need to do and how.

Examples:

* *Avoid:* We now need to enter an API Key.
* *Better:* You now need to enter your API Key in the `Create Application` dialog.
* *Avoid:* We can now click the button to create your Ably account.
* *Better:* You can now click the button to create your Ably account.
* *Best:* Click the `Create` button to create your Ably account.

Use Ably rather than 'we' when referring to the company.

Example:

* *Avoid:* We also provide a Ruby SDK.
* *Better:* Ably also provides a Ruby SDK.

## Avoid Latin phrases and abbreviations

Latin abbreviations can occasionally cause confusion if not used correctly. For example, people can get confused between the meaning of "i.e." and "e.g." (and sometimes use them as equivalent).

Examples:

* Use ‘for example’, instead of 'e.g.'
* Use 'that is' rather than 'i.e.'
* Use 'and so on' instead of 'etc.'.

Sometimes writers create variations of Latin abbreviations, such as 'eg', 'e.g', 'eg.' and so on. It's best, for various reasons, to avoid this. When automated spell checkers are run, these variations can stop the doc build. As stated previously, to avoid this possible inconsistency creeping in, avoid using Latin abbreviations altogether.

Avoid Latin phrases such as "quid pro quo", "ad nauseum", "vis-a-vis". They can also be less convenient to translate, and not everyone is familiar with their meaning.

## Avoid slang

Avoid slang as this can slow down translation and be hard for some developers to interpret.

For example:

* Don't use overly dramatic words like 'crash' or 'implode', use 'error'.
* Use 'launch' or 'start' rather than 'fire up'.
* Bear in mind the reader's daily language may not be English.
* The mouse is clicked and the keyboard is pressed. Avoid terms such as 'hit', 'punch', or 'whack' when referring to the keyboard. Avoid: "Now punch in any key to continue."
* Avoid idiomatic language such as "You're good to go", "We'll run this by you", "You're all done".

## Avoid words that are rarely used

Avoid unusual words that have a more commonly used equivalent, unless doing so would compromise clarity and accuracy.

Some words are less frequently used, but have a more commonly used alternative word or phrase.

Some example suggested replacements:

* Use 'while' or 'during which' rather than 'whilst'.
* Use 'therefore' rather than 'ergo'.
* Use 'compatible' rather than 'concordant'.
* Use 'with regard to' rather than 'apropos' (if 'apropos' is being used as a preposition).

The aim is to keep things simple, avoid possible confusion, and aid translation, while retaining accuracy of meaning.

## Capitalization

Try to be consistent with capitalization of headings.

The guidance here is to use sentence case for most things, as per the [Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide).

There are some exceptions: for example, the names of products, the titles of stand-alone manuals or guides, whitepaper or article titles, and the titles of people, should use title case. If you do need to use title case, you can use one of the widely available [tools](https://titlecaseconverter.com/).

So, unless there is a good reason not to, use sentence case (first letter is capitalized).

## Bulleted lists

This is an example of a bulleted list:

* Precede a list with a sentence and a colon, followed by a blank line.
* Terminate each *sentence* in a list with a full stop.
* Use bulleted lists for lists of items that have no particular order.
* Use numbered lists for ordered sequences, such as procedures, tasks, a series of specific steps, items that are being enumerated, and so on.

Note the following points:

* The list should always have a piece of text introducing the list followed by a colon, and then a blank line.
* Each sentence in the list is terminated by a full-stop (period).
* If each item in the list is a single word, a terminating period is not required.

## Codeblocks

When inserting example code in the text:

* Specify the coding language attribute where possible.
* Break the text before a codeblock with a colon, not a period (which is a hard stop in the mind of the reader, rather than a continuation).
* There should *not* be a space before the colon.
* Place a blank line after the colon and before the code block.

## Acronyms

Define acronyms on first use. On subsequent use in a topic you do not need to redefine the acronym, unless you feel it would provide clarity.

## Be explicit

Try to be explicit. Use precise terms where necessary to improve clarity and avoid ambiguity.

Use the Ably Glossary to ensure that you refer to product names and features with consistency.

## Avoid genderized language

Avoid genderized language (use user/developer/client as appropriate).

Sometimes there are exceptions to this. For example in cryptography, it is an established practice to use Alice, Bob, and Eve to illustrate cryptographic scenarios.

Avoid using 'he or she' constructs. For example:

* *Avoid:* The developer can invoke the method, and then he or she can check the return code.
* *Better:* You can invoke the `connection_state()` method and then check the status code returned.

## Use correct case

Make sure you write the correct case for product names:

* JavaScript not Javascript
* GitHub not Github
* macOS not Mac OS

## Other considerations

Some additional points to bear in mind:

* Explain the *why* to the developer. Rather than simply state what a feature or function does, also explain why it is needed.
* Avoid statements that predict the future, for example, "the next version will have feature X". There are good legal reasons for avoiding predicting the future.
* Avoid time sensitive information. Specify an exact version where possible, for example '1.1', rather than 'current version' as the current version may change. Sometimes though you do want to use the terms 'current version' or 'latest version', for example: "The latest version of the Ruby SDK can always be downloaded from its GitHub repository".
* Avoid using ampersand ('&') instead of 'and', unless you are specifying a programming language operator or similar.
* Avoid pricing information in *technical documentation* as it is subject to change, hard to maintain, and could lead to legal issues if wrong. Instead, direct developers to sales for the latest pricing information.

## Examples of writing style guides

Some further examples of writing style guides are:

* [Microsft Styleguide](https://docs.microsoft.com/en-us/style-guide)
* [Microsoft Style for Technical Publications](https://books.google.co.uk/books/about/The_Microsoft_Manual_of_Style_for_Techni.html)
* [Kubernetes](https://kubernetes.io/docs/home/contribute/style-guide/)
* [.NET](https://github.com/dotnet/docs/blob/master/styleguide/voice-tone.md)
* [Google's guide on inclusive documentation](https://developers.google.com/style/inclusive-documentation)
* [Vonage/Nexmo](https://developer.nexmo.com/contribute/guides/writing-style-guide)
