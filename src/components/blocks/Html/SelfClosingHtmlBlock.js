import React from 'react';
import PropTypes from 'prop-types';

const SelfClosingHtmlBlock = (Type) => {
  const InnerBlock = ({ attribs }) => <Type {...attribs} />;
  InnerBlock.propTypes = {
    attribs: PropTypes.object,
  };
  return InnerBlock;
};

export default SelfClosingHtmlBlock;
