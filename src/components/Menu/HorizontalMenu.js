import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalCodeMenu } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';

const HorizontalMenu = ({ label, items }) => (
  <HorizontalCodeMenu>
    {label && <MenuLabel>{label}</MenuLabel>}
    {items.map(({ Component, props, content }, index) => (
      <MenuItem key={index}>
        <Component {...props}>{content}</Component>
      </MenuItem>
    ))}
  </HorizontalCodeMenu>
);

HorizontalMenu.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  items: PropTypes.array,
};

export default HorizontalMenu;
