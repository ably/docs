import React from 'react';
import PropTypes from 'prop-types';

// Gatsby SVG React plugin does not work with latest version of Gatsby/webpack
const AIChevronUp = ({ className }: { className: string }) => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <title>ai-chevron-up</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7047 9.83448C11.5199 10.0397 11.2038 10.0564 10.9985 9.87164L7.99967 7.17268L5.00082 9.87164C4.79556 10.0564 4.47942 10.0397 4.29469 9.83448C4.10996 9.62922 4.1266 9.31308 4.33185 9.12835L7.66519 6.12835C7.85534 5.95721 8.144 5.95721 8.33415 6.12835L11.6675 9.12835C11.8727 9.31308 11.8894 9.62922 11.7047 9.83448Z"
      fill="#03020D"
    />
  </svg>
);

AIChevronUp.propTypes = {
  className: PropTypes.string,
};

export default AIChevronUp;
