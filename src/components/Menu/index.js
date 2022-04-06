import React from 'react';
import { ChildPropTypes } from '../../react-utilities';

const HorizontalMenu = ({ children }) => (
  <menu className="flex px-8 m-0 overflow-y-hidden overflow-x-auto whitespace-nowrap bg-dark-grey">{children}</menu>
);

HorizontalMenu.propTypes = {
  children: ChildPropTypes,
};

export { HorizontalMenu };
