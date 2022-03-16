const HtmlDataTypes = Object.freeze({
    // base types
    tag: "tag",
    text: "text",
    // text
    p: "p",
    pre: "pre",
    code: "code",
    // semantic styles
    strong: "strong",
    em: "em",
    small: "small",
    sub: "sub",
    sup: "sup",
    // enhancements
    abbr: "abbr",
    details: "details",
    summary: "summary",
    dfn: "dfn",
    time: "time",
    // software-related
    kbd: "kbd",
    output: "output",
    samp: "samp",
    var: "var",
    // external references
    a: "a",
    iframe: "iframe",
    img: "img",
    video: "video",
    audio: "audio",
    address: "address",
    blockquote: "blockquote",
    q: "q",
    // headings
    header: "header",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    // tables
    caption: "caption",
    colgroup: "colgroup",
    col: "col",
    table: "table",
    tbody: "tbody",
    td: "td",
    tfoot: "tfoot",
    th: "th",
    thead: "thead",
    tr: "tr",
    // lists
    dl: "dl",
    dd: "dd",
    dt: "dt",
    li: "li",
    ol: "ol",
    ul: "ul",
    // dividers
    main: "main",
    article: "article",
    section: "section",
    aside: "aside",
    span: "span",
    div: "div",
    // complex functionality
    input: "input",
    button: "button",
    meter: "meter",
    noscript: "noscript",
    progress: "progress",
    select: "select",
    textarea: "textarea",
    // other/utility
    br: "br",
    wbr: "wbr"
});

module.exports = HtmlDataTypes;