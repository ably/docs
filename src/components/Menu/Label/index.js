import React from 'react';
import { ChildPropTypes } from '../../../react-utilities';
import '@ably/ui/core/styles.css';
import '../styles.css';

const MenuLabel = ({ children }) => <li className="docs-menu-item docs-menu-item-label">{children}</li>;

MenuLabel.propTypes = {
  children: ChildPropTypes,
};

const SmallMenuLabel = ({ children }) => <span className="align-middle ui-text-menu3">{children}</span>;

SmallMenuLabel.propTypes = {
  children: ChildPropTypes,
};

export { SmallMenuLabel };
export default MenuLabel;
