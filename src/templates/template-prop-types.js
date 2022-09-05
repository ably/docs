import PropTypes from 'prop-types';
// Temporary: These are to be replaced with TypeScript types or removed as soon as possible

export const templatePropTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  pageContext: PropTypes.object,
  data: PropTypes.object,
};
