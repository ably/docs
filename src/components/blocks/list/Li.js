import React from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledLi = ({ children, ...props }) => (
  <li {...props} className="ui-text-p1 mb-16">
    {children}
  </li>
);

const Li = GenericHtmlBlock(StyledLi);

export default Li;
