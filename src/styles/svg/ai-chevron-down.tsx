import React from 'react';
import PropTypes from 'prop-types';

// Gatsby SVG React plugin does not work with latest version of Gatsby/webpack
const AIChevronDown = ({ className }: { className: string }) => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <title>ai-chevron-down</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.29535 6.16552C4.48008 5.96027 4.79622 5.94363 5.00148 6.12836L8.00033 8.82732L10.9992 6.12836C11.2044 5.94363 11.5206 5.96027 11.7053 6.16552C11.89 6.37078 11.8734 6.68692 11.6681 6.87165L8.33481 9.87165C8.14466 10.0428 7.856 10.0428 7.66585 9.87165L4.33251 6.87165C4.12726 6.68692 4.11062 6.37078 4.29535 6.16552Z"
      fill="#03020D"
    />
  </svg>
);

AIChevronDown.propTypes = {
  className: PropTypes.string,
};

export default AIChevronDown;
