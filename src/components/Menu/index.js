import React from 'react';
import { ChildPropTypes } from '../../react-utilities';
import './styles.css';

const HorizontalMenu = ({ children }) => <menu className="docs-horizontal-menu">{children}</menu>;
const TopHorizontalMenu = ({ children }) => <menu className="docs-top-horizontal-menu">{children}</menu>;

HorizontalMenu.propTypes = {
  children: ChildPropTypes,
};

TopHorizontalMenu.propTypes = {
  children: ChildPropTypes,
};

export { HorizontalMenu, TopHorizontalMenu };
