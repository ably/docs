import React from 'react';
import Html from '.';

const GenericHtmlBlock = (Type) => {
  const InnerBlock = ({ data, attribs = {} }) => (
    <Type {...attribs}>
      <Html data={data} />
    </Type>
  );
  return InnerBlock;
};

export default GenericHtmlBlock;
