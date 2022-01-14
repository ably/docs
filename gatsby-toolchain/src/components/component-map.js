import { curry, propOr } from 'lodash/fp';
import HtmlDataTypes from '../../data/types/html';
import P from './blocks/paragraphs/P';

const IS_TEXT = null;

const HtmlTypeComponentMap = Object.freeze({
    // text
    [HtmlDataTypes.p]: P,
    [HtmlDataTypes.pre]: "pre",
    [HtmlDataTypes.code]: "code",
    // semantic styles
    [HtmlDataTypes.strong]: "strong",
    [HtmlDataTypes.em]: "em",
    [HtmlDataTypes.small]: "small",
    [HtmlDataTypes.sub]: "sub",
    [HtmlDataTypes.sup]: "sup",
    // enhancements
    [HtmlDataTypes.abbr]: "abbr",
    [HtmlDataTypes.details]: "details",
    [HtmlDataTypes.summary]: "summary",
    [HtmlDataTypes.dfn]: "dfn",
    [HtmlDataTypes.time]: "time",
    // software-related
    [HtmlDataTypes.kbd]: "kbd",
    [HtmlDataTypes.output]: "output",
    [HtmlDataTypes.samp]: "samp",
    [HtmlDataTypes.var]: "var",
    // external references
    [HtmlDataTypes.a]: "a",
    [HtmlDataTypes.iframe]: "iframe",
    [HtmlDataTypes.img]: "img",
    [HtmlDataTypes.video]: "video",
    [HtmlDataTypes.audio]: "audio",
    [HtmlDataTypes.address]: "address",
    [HtmlDataTypes.blockquote]: "blockquote",
    [HtmlDataTypes.q]: "q",
    // headings
    [HtmlDataTypes.header]: "header",
    [HtmlDataTypes.h1]: "h1",
    [HtmlDataTypes.h2]: "h2",
    [HtmlDataTypes.h3]: "h3",
    [HtmlDataTypes.h4]: "h4",
    [HtmlDataTypes.h5]: "h5",
    [HtmlDataTypes.h6]: "h6",
    // tables
    [HtmlDataTypes.caption]: "caption",
    [HtmlDataTypes.colgroup]: "colgroup",
    [HtmlDataTypes.col]: "col",
    [HtmlDataTypes.table]: "table",
    [HtmlDataTypes.tbody]: "tbody",
    [HtmlDataTypes.td]: "td",
    [HtmlDataTypes.tfoot]: "tfoot",
    [HtmlDataTypes.th]: "th",
    [HtmlDataTypes.thead]: "thead",
    [HtmlDataTypes.tr]: "tr",
    // lists
    [HtmlDataTypes.dl]: "dl",
    [HtmlDataTypes.dd]: "dd",
    [HtmlDataTypes.dt]: "dt",
    [HtmlDataTypes.li]: "li",
    [HtmlDataTypes.ol]: "ol",
    [HtmlDataTypes.ul]: "ul",
    // dividers
    [HtmlDataTypes.main]: "main",
    [HtmlDataTypes.article]: "article",
    [HtmlDataTypes.section]: "section",
    [HtmlDataTypes.aside]: "aside",
    [HtmlDataTypes.span]: "span",
    [HtmlDataTypes.div]: "div",
    // complex functionality
    [HtmlDataTypes.input]: "input",
    [HtmlDataTypes.button]: "button",
    [HtmlDataTypes.meter]: "meter",
    [HtmlDataTypes.noscript]: "noscript",
    [HtmlDataTypes.progress]: "progress",
    [HtmlDataTypes.select]: "select",
    [HtmlDataTypes.textarea]: "textarea",
    // other/utility
    [HtmlDataTypes.br]: "br",
    [HtmlDataTypes.wbr]: "wbr"
});

const componentMap = propOr(IS_TEXT, curry.placeholder, HtmlTypeComponentMap);

export {
    IS_TEXT
};
export default componentMap;