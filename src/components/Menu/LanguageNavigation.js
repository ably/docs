import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalMenu } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';
import '@ably/ui/core/styles.css';

const LanguageNavigation = ({ label, items }) => (
  <HorizontalMenu>
    {label && <MenuLabel>{label}</MenuLabel>}
    {items.map(({ Component, props, content }, index) => (
      <MenuItem key={index}>
        <Component {...props}>{content}</Component>
      </MenuItem>
    ))}
  </HorizontalMenu>
);

LanguageNavigation.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  items: PropTypes.array,
};

export default LanguageNavigation;
