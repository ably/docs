const MINIMIZE_REGEX = /^minimize\.(.*)([\n])(.*)$/m;
const MINIMIZED_HEADINGS_REGEX = /^(h[1-6])(\(#[^)]+\))?\(minimize(?:=([^)]*))?\)\.(.*?)\n\n(.+?)(?=(?:\n\nh[1-6]))/gm;
const VIEW_MORE_TEXT = 'View More';

const getDetailsComponentAsString = (title, body) => `<details><summary>${title}</summary><div>${body}</div></details>\n`;

const addMinimizeForHeadings = (content) => {
  let expandNum = 0;
  const replacer = (_match, hTag, anchor, expandTitle, title, innerContent) => {
    ++expandNum;
    const fullExpandTitle = expandTitle ?? VIEW_MORE_TEXT;
    return `${hTag}${anchor}.${title}\n\n` + getDetailsComponentAsString(fullExpandTitle, innerContent);
  };
  return content.replace(MINIMIZED_HEADINGS_REGEX, replacer);
};

const addMinimizedIndent = (content) => {
  let expandNum = 0;
  let position = content.search(MINIMIZE_REGEX);
  while (position > -1) {
    const [minimizeTitle, body] = content.match(MINIMIZE_REGEX)[0].split('\n');
    const matchTitle = minimizeTitle === 'minimize.' ? VIEW_MORE_TEXT : minimizeTitle.replace('minimize.','');

    content =
      content.substring(0, position) + 
      getDetailsComponentAsString(matchTitle.trim(), body.trim()) +
      content.substring(position + content.match(MINIMIZE_REGEX)[0].length);
    position = content.search(MINIMIZE_REGEX);
    ++expandNum;
  }

  return content;
};

module.exports = {
  addMinimizeForHeadings,
  addMinimizedIndent,
};
