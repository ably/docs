import spacing from './spacing';

const mq = (key, query) => {
  const size = spacing.bp[key];

  if (!size) return '';

  return `@media (${query}: ${size})`;
};

const sizes = Object.keys(spacing.bp);

const minWidth = sizes
  .map((size) => ({ [size]: mq(size, 'min-width') }))
  .reduce((acc, item) => ({ ...item, ...acc }), {});

export { minWidth };
export default mq;
