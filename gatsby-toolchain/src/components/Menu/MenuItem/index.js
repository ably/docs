import React from 'react';
import { ChildPropTypes } from '../../../react-utilities';

const MenuItem = ({ children }) => <li className="c-menu__item">{children}</li>;

MenuItem.propTypes = {
  children: ChildPropTypes,
};

export default MenuItem;
