import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledLi: FC = ({ children, ...props }) => (
  <li {...props} className="ui-text-p1">
    {children}
  </li>
);

const Li = GenericHtmlBlock(StyledLi);

export default Li;
