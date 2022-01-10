const { TAG_REGEX_STRING } = require('./constants');

const DIV_COLLAPSIBLE_WRAPPER = `DIV_collapsible-wrapper`;
const DIV_COLLAPSIBLE_CONTENT = `DIV_collapsible-content`;
const DIV_COLLAPSIBLE_INNER = `DIV_collapsible-inner`;

const getRegexStringForToken = token =>  `${
    TAG_REGEX_STRING
}{{${token}}}${
        TAG_REGEX_STRING
    }(.*?)${
        TAG_REGEX_STRING 
    }{{${token}_(?:<span class="caps">)?END(?:<\\/span>)?}}${
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

console.log(COLLAPSIBLE_WRAPPER_REGEX.source);

const convertCollapsibleMarkupToHtml = content => content.replace(
    COLLAPSIBLE_WRAPPER_REGEX,
    (_match, p1) => { console.log(_match); return`\n\n<div class="collapsible-content">\n${convertCollapsibleContentToHtml(p1)}\n</div>\n\n`; }
);

module.exports = {
    convertCollapsibleMarkupToHtml
}