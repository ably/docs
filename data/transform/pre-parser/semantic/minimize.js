const { extractIndented } = require('../shared-utilities/extract-indented');

const MINIMIZE_REGEX = /^minimize\.(.*)[\r\n]/m;
const MINIMIZED_HEADINGS_REGEX = /^(h[1-6])(\(#[^)]+\))?\(minimize(?:=([^)]*))?\)\.(.*?)\n\n(.+?)(?=(?:\n\nh[1-6]))/gm;
const VIEW_MORE_TEXT = 'View More';

const getDetailsComponentAsString = (title, body) =>
  `<details><summary>${title}</summary><div>${body}</div></details>\n`;

const addMinimizeForHeadings = (content) => {
  const replacer = (_match, hTag, anchor, expandTitle, title, innerContent) => {
    const fullExpandTitle = expandTitle ?? VIEW_MORE_TEXT;
    return `${hTag}${anchor}.${title}\n\n` + getDetailsComponentAsString(fullExpandTitle, innerContent);
  };
  return content.replace(MINIMIZED_HEADINGS_REGEX, replacer);
};

const getAllContentAfterRegex = (content, position) => {
  const nextContent = content.slice(position); // get content after regex
  return nextContent.replace(MINIMIZE_REGEX, '').slice(1);
};

const addMinimizedIndent = (content) => {
  let position = content.search(MINIMIZE_REGEX);
  while (position > -1) {
    const minimizeTitle = content.match(MINIMIZE_REGEX)[0].trim();
    const matchTitle = minimizeTitle === 'minimize.' ? VIEW_MORE_TEXT : minimizeTitle.replace('minimize.', '');

    // Only indented lines are part of the hidden panel
    const { onlyIndentedLines, nonIndentedLineLocation } = extractIndented(
      getAllContentAfterRegex(content, position),
      'minimize.',
    );

    content =
      content.substring(0, position) +
      getDetailsComponentAsString(matchTitle.trim(), onlyIndentedLines) +
      content.substring(position + content.match(MINIMIZE_REGEX)[0].length + nonIndentedLineLocation);
    position = content.search(MINIMIZE_REGEX);
  }

  return content;
};

module.exports = {
  addMinimizeForHeadings,
  addMinimizedIndent,
};
