const { TAG_REGEX_STRING } = require('./constants');

/**
 * These strings are added in the pre-parser stage to avoid being misread by textile-js
 * as textile-js does not correctly parse nested HTML tags of the same type.
 */
const DIV_COLLAPSIBLE_WRAPPER = `DIV_collapsible-wrapper`;
const DIV_COLLAPSIBLE_CONTENT = `DIV_collapsible-content`;
const DIV_COLLAPSIBLE_INNER = `DIV_collapsible-inner`;

const getRegexStringForToken = token =>  `${ // Replace the outer tag
    TAG_REGEX_STRING
}{{${token}}}${ // And the inner tag
        TAG_REGEX_STRING
    }(.*?)${ // This should be $1/p1, the first capturing group.
        TAG_REGEX_STRING 
    }{{${token}_(?:<span class="caps">)?END(?:<\\/span>)?}}${ // textile-js adds <span class="caps"></span> to capital letters.
    TAG_REGEX_STRING
}`;

const COLLAPSIBLE_WRAPPER_REGEX_STRING = getRegexStringForToken(DIV_COLLAPSIBLE_WRAPPER);
const COLLAPSIBLE_CONTENT_REGEX_STRING = getRegexStringForToken(DIV_COLLAPSIBLE_CONTENT);
const COLLAPSIBLE_INNER_REGEX_STRING = getRegexStringForToken(DIV_COLLAPSIBLE_INNER);

const COLLAPSIBLE_WRAPPER_REGEX = new RegExp(COLLAPSIBLE_WRAPPER_REGEX_STRING, 'gms');
const COLLAPSIBLE_CONTENT_REGEX = new RegExp(COLLAPSIBLE_CONTENT_REGEX_STRING, 'gms');
const COLLAPSIBLE_INNER_REGEX = new RegExp(COLLAPSIBLE_INNER_REGEX_STRING, 'gms');


const convertCollapsibleInnerToHtml = content => content.replace(
    COLLAPSIBLE_INNER_REGEX,
    `\n\n<div class="collapsible-inner">\n$1\n</div>\n\n`
);

const convertCollapsibleContentToHtml = content => content.replace(
    COLLAPSIBLE_CONTENT_REGEX,
    (_match, p1) => `\n\n<div class="collapsible-content">\n${convertCollapsibleInnerToHtml(p1)}\n</div>\n\n`
);

const convertCollapsibleMarkupToHtml = content => content.replace(
    COLLAPSIBLE_WRAPPER_REGEX,
    (_match, p1) => `\n\n<div class="collapsible-content">\n${convertCollapsibleContentToHtml(p1)}\n</div>\n\n`
);

module.exports = {
    convertCollapsibleMarkupToHtml
}