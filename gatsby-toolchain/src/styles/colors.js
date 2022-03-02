// https://brand.ably.com/colors

export const primary = {
  richOrange: '#ed760a',
  brightOrange: '#f9a01b',
  charcoal: '#333333',
  white: '#fff',
  black: '#161616',
};

export const secondary = {
  actionBlue: '#50b4f3',
  cableGrey: '#555555',
  smokeGrey: '#999999',
  deniedRed: '#EC465B',
  acceptGreen: '#00C766',
};

export const tertiary = {
  warningRed: '#FFCCCB',
  backgroundGreen: '#98FB98',
};

export const containers = {
  one: '#ebebeb',
  two: '#f1f1f1',
  three: '#f8f8f8',
};

export const borders = { ...containers };

export const text = {
  aux: secondary.smokeGrey,
  main: secondary.cableGrey,
  bold: primary.black,
  highlight: primary.richOrange,
  link: secondary.actionBlue,
  linkInverse: primary.white,
  linkHover: '#2f93d2',
  linkHoverAlternate: primary.richOrange,
  linkHoverAlternateMuted: primary.brightOrange,
};
