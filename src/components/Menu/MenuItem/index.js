import React from 'react';
import { ChildPropTypes } from '../../../react-utilities';
import '../styles.css';

const MenuItem = ({ children }) => <li className="docs-menu-item">{children}</li>;

MenuItem.propTypes = {
  children: ChildPropTypes,
};

export default MenuItem;
