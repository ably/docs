import React from 'react';
import PropTypes from 'prop-types';

const EditableHtmlBlock = (Type) => {
  const InnerBlock = ({ data, attribs }) => <Type defaultValue={data} {...attribs} />;
  InnerBlock.propTypes = {
    data: PropTypes.string,
    attribs: PropTypes.object,
  };
  return InnerBlock;
};

export default EditableHtmlBlock;
