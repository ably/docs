import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalMenu as HM } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';
import '@ably/ui/core/styles.css';

const HorizontalMenu = ({ label, items }) => (
  <HM className="docs-code-explorer-language-navigation">
    {label && <MenuLabel>{label}</MenuLabel>}
    {items.map(({ Component, props, content }, index) => (
      <MenuItem key={index}>
        <Component className="ui-text-menu3" {...props}>
          {content}
        </Component>
      </MenuItem>
    ))}
  </HM>
);

HorizontalMenu.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  items: PropTypes.array,
};

export default HorizontalMenu;
