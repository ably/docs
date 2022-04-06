import React from 'react';
import { ChildPropTypes } from '../../react-utilities';

const HorizontalMenu = ({ children }) => (
  <menu className="flex p-0 m-0 overflow-y-hidden overflow-x-auto whitespace-nowrap">{children}</menu>
);

HorizontalMenu.propTypes = {
  children: ChildPropTypes,
};

export { HorizontalMenu };
