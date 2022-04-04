import React from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';

// eslint-disable-next-line react/prop-types
const StyledH1 = ({ props, children }) => (
  <h1 {...props} className="ui-text-h1">
    {children}
  </h1>
);

const H1 = LinkableHtmlBlock(StyledH1);

export default H1;
