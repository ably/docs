import React from 'react';
import PropTypes from 'prop-types';
import Html from '.';
import CopyLink from '../wrappers/CopyLink';

const LinkableHtmlBlock = (Type, marginBottom) => {
  const InnerBlock = ({ data, attribs }) => (
    <CopyLink attribs={attribs} marginBottom={marginBottom}>
      <Type {...attribs}>
        <Html data={data} />
      </Type>
    </CopyLink>
  );
  InnerBlock.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    attribs: PropTypes.object,
  };
  return InnerBlock;
};

export default LinkableHtmlBlock;
