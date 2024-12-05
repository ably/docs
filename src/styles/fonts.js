import { text } from './colors';

const weights = {
  light: '300',
  base: '500',
  bold: '700',
};

const fontsDefinitions = {
  efficientBody: {
    size: '14px',
    lineHeight: '20px',
  },
  secondaryBody: {
    size: '15px',
    lineHeight: '24px',
  },
  body: {
    size: '17px',
    lineHeight: '28px',
  },
  standFirst: {
    size: '24px',
    weight: weights.light,
    lineHeight: '32px',
    color: text.highlight,
  },
  h1: {
    size: '48px',
    weight: weights.bold,
    lineHeight: '54px',
    color: text.bold,
  },
  h2: {
    size: '28px',
    weight: weights.bold,
    lineHeight: '40px',
    color: text.bold,
  },
  h3: {
    size: '24px',
    weight: weights.bold,
    lineHeight: '32px',
    color: text.bold,
  },
  h4: {
    size: '20px',
    weight: weights.bold,
    lineHeight: '28px',
    color: text.bold,
  },
  h5: {
    size: '17px',
    weight: weights.bold,
    lineHeight: '24px',
    color: text.bold,
  },
};

const font = (key) => {
  const type = fontsDefinitions[key];

  if (!type) return '';

  return `
    font-family: ${type.family || 'Manrope, system-ui'};
    font-size: ${type.size};
    font-weight: ${type.weight || weights.base};
    line-height: ${type.lineHeight};
    color: ${type.color || text.main};
  `;
};

const link = `
  color: ${text.link};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${text.linkHover};
  }
`;

const mutedLink = `
  color: ${text.main};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${text.linkHover};
  }
`;

const highlightLink = `
  color: ${text.highlight};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${text.linkHoverAlternateMuted};
  }
`;

const fonts = Object.keys(fontsDefinitions)
  .map((key) => ({ [key]: font(key) }))
  .reduce((acc, item) => ({ ...item, ...acc }), {});

fonts.link = link;
fonts.mutedLink = mutedLink;
fonts.highlightLink = highlightLink;

export { weights };
export default fonts;
