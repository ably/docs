import React from 'react';
import PropTypes from 'prop-types';
import Html from '.';

const GenericHtmlBlock = (Type) => {
  const InnerBlock = ({ data, attribs }) => (
    <Type {...attribs}>
      <Html data={data} />
    </Type>
  );
  InnerBlock.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    attribs: PropTypes.object,
  };
  return InnerBlock;
};

export default GenericHtmlBlock;
