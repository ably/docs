// https://brand.ably.com/colors

export const primary = {
  richOrange: '#ed760a',
  brightOrange: '#f9a01b',
  charcoalGrey: '#292831',
  white: '#fff',
  black: '#161616',
};

export const secondary = {
  black: '#03020D',
  cableGrey: '#555555',
  darkGrey: '#76767C',
  deniedRed: '#EC465B',
  acceptGreen: '#00C766',
  subtleOrange: '#fde9d7',
};

export const gui = {
  error: '#FB0C0C',
  success: '#11CB24',
};

export const containers = {
  one: '#ebebeb',
  two: '#F5F5F6',
  three: '#FAFAFB',
};

export const borders = { ...containers };

export const text = {
  aux: secondary.darkGrey,
  main: secondary.cableGrey,
  bold: primary.black,
  highlight: primary.richOrange,
  link: secondary.black,
  linkInverse: primary.white,
  linkHover: '#2f93d2',
  linkHoverAlternate: primary.richOrange,
  linkHoverAlternateMuted: primary.brightOrange,
};
