/**
 * Spans must have whitespace trimmed, because they should be inline and (as language spans)
 * interchangeeable with each other.
 * Divs must have whitespace levels enforced, the reason being practical; textile does not read nested divs
 * that end during a list correctly, which makes sense as it's technically invalid HTML (it should place the
 * final </div> outside the <dl></dl> but it isn't clever enough to manage that)
 */
const trimWhitespaceBetweenSpans = content => content.replace(/\<\/span\>\s+\<span\slang=["']([^"']+)["']>/g, '</span><span lang="$1">');

const ensureNewlineBetweenDivs = content => content.replace(/\<\/div\>\s*\<div\slang=["']([^"']+)["']>/g, '</div>\n<div lang="$1">');

const enforceWhiteSpaceLevelsBetweenLanguageElements = content => {
    return trimWhitespaceBetweenSpans(
        ensureNewlineBetweenDivs(
            content
        )
    );
};

module.exports = {
    enforceWhiteSpaceLevelsBetweenLanguageElements
}