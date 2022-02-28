const ROOT_LEVEL = 3;
const MAX_LEVEL = 6;

const EXPAND_MENU = Object.freeze({
  EXPANDED: true,
  COLLAPSED: false,
  SECTION_MATCH: 'SECTION_MATCH',
  EXPAND_NEXT: 'EXPAND_NEXT',
  COLLAPSE_NEXT: 'COLLAPSE_NEXT',
});

// Consts should also be used by gatsby build scripts
module.exports = {
  ROOT_LEVEL,
  MAX_LEVEL,
  EXPAND_MENU,
};
