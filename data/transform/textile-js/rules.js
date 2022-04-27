const { compose } = require('lodash/fp');

const notextileInstances = [];
const notextileReplacer = (_match, p1) => {
  notextileInstances.push(p1);
  return `{{NOTEXTILE:${notextileInstances.length - 1}}}`;
};

const nestableListReplacer =
  (listType = 'ul', listToken = '*') =>
  (_match, p1) => {
    let nestingLevel = 0;
    const entries = p1.split('\n');
    let result = '\n';
    for (let i = 0; i < entries.length; ++i) {
      let count = 0;
      const listEntry = entries[i];
      for (let c = 0; c < listEntry.length; ++c) {
        if (listEntry.charAt(c) !== listToken) {
          break;
        }
        ++count;
      }
      const maybeListItem = count > 0 ? `<li>${listEntry.slice(count).trim()}</li>` : '';
      if (count > nestingLevel) {
        let openList = '';
        for (let i = count; i > nestingLevel; --i) {
          openList = `${openList}<${listType}>`;
        }
        result = `${result}\n${openList}\n${maybeListItem}`;
      } else if (count < nestingLevel) {
        let closeList = '';
        for (let i = count; i < nestingLevel; ++i) {
          closeList = `${closeList}</${listType}>`;
        }
        result = `${result}\n${closeList}\n${maybeListItem}`;
      } else {
        result = `${result}\n${maybeListItem}`;
      }
      nestingLevel = count;
    }
    return result;
  };

const rules = [
  // Add notextile text back in
  [/{{NOTEXTILE:(\d+)}}/g, (_match, p1) => notextileInstances[parseInt(p1)]],
  // Remove line breaks from preformatted elements
  [/(<pre>|<code>)(.*)<br \/>(.*)(<\/pre>|<\/code>)/g, '$1$2\n$3$4'],
  // Paragraphs
  [/^([\w"'].*?)\n/gms, '<p>$1</p>\n'],
  [
    /^p\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*?)\n/gms,
    (_match, p1, p2, p3, p4) =>
      `<p${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${p3 ? ` lang="${p3}"` : ''}>${p4}</p>\n`,
  ],
  // Linebreaks; important for paragraphs to work as expected
  [/([^\n])\n([^\n<])/g, '$1<br />$2'],
  // Pre-formatted
  [
    /^pre\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*)$/gm,
    (_match, p1, p2, p3, p4) =>
      `<pre${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${p3 ? ` lang="${p3}"` : ''}>${p4}</pre>\n`,
  ],
  [
    /\npre\.\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*?)\n+(p\.|bc\.|bq\.|h[1-6]\.)/gs,
    (_match, p1, p2, p3, p4, p5) =>
      `<pre${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${p3 ? ` lang="${p3}"` : ''}>${p4}</pre>\n\n${p5}`,
  ],
  // Code
  [
    /^bc\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*)$/gm,
    (_match, p1, p2, p3, p4) =>
      `<pre${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${
        p3 ? ` lang="${p3}"` : ''
      }><code>${p4}</code></pre>`,
  ],
  [
    /\nbc\.\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*?)\n+(p\.|pre\.|bq\.|h[1-6]\.)/gs,
    (_match, p1, p2, p3, p4, p5) =>
      `<pre${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${
        p3 ? ` lang="${p3}"` : ''
      }><code>${p4}</code></pre>\n\n${p5}`,
  ],
  [/@(.*?)@/g, '<code>$1</code>'],
  // Blockquote
  [
    /^bq\.(?:\(([^#]*)#?(.*?)\))?(?::(.*?))?\s(.*)$/gm,
    (_match, p1, p2, p3, p4) =>
      `<blockquote${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${
        p3 ? ` cite="${p3}"` : ''
      }><p>${p4}</p></blockquote>`,
  ],
  [
    /\nbq\.\.(?:\(([^#]*)#?(.*?)\))?(?::(.*?))?\s(.*?)\n+(p\.|bc\.|pre\.|h[1-6]\.)/gs,
    (_match, p1, p2, p3, p4, p5) =>
      `<blockquote${p1 ? ` class="${p1}"` : ''}${p2 ? ` id="${p2}"` : ''}${
        p3 ? ` cite="${p3}"` : ''
      }><p>${p4}</p></blockquote>\n\n${p5}`,
  ],
  // Headings
  [
    /h([1-6])\.(?:\(([^#]*)#?(.*?)\))?(?:\[([^\]]*)\])?\s(.*?)$/gm,
    (_match, p1, p2, p3, p4, p5) =>
      `<h${p1}${p2 ? ` class="${p2}"` : ''}${p3 ? ` id="${p3}"` : ''}${p4 ? ` lang="${p4}"` : ''}>${p5}</h${p1}>\n`,
  ],
  // Lists
  // Unordered
  [/\n(\*.*?\n\n)/gs, nestableListReplacer()],
  // Ordered
  [/\n(#.*?\n\n)/gs, nestableListReplacer('ol', '#')],
  // Definition
  [/^-\s(.*?)\s:=\s(.*)$/gm, '\n<dt>$1</dt><dd>$2</dd>'],
  [/((?:-\s(?:.*?)\s:=\s.*\n)+)/g, '<dl>\n$1\n</dl>'],
  // Links
  [/"([^"]*)":([^<\s]+)/g, '<a href="$2">$1</a>'],
  [/\["([^"]*)":([^<\s]+)\]/g, '<a href="$2">$1</a>'],
  // Images
  [/!([^!\s]+)!/g, '<img src="$1" />'],
  // Styling
  [/\*([^*\n]+)\*/g, '<strong>$1</strong>'],
  [/\*\*([^*\n]+)\*\*/g, '<b>$1</b>'],
  [/_([^_]+)_/g, '<em>$1</em>'],
  [/__([^_]+)__/g, '<em>$1</em>'],
  [/\^([^^\n]+)\^/g, '<sup>$1</sup>'],
  [/~([^~\n]+)~/g, '<sub>$1</sub>'],
  // Citations
  [/\?\?([^?]+)\?\?/g, '<cite>$1</cite>'],
  // Acronyms & Abbreviations
  [/([A-Z]+)\((.+?)\)/g, '<abbr title="$2">$1</abbr>'],
  // Comments & Notextile
  [/\n###\.\s(.*?)\n{2,}/gs, '\n'],
  [/==(.*?)==/g, notextileReplacer],
  [/<notextile>(.*?)<\/notextile>/g, notextileReplacer],
];

const ruleApplications = compose(...rules.map((rule) => (content) => content.replace(rule[0], rule[1])));

module.exports = {
  rules,
  ruleApplications,
};
