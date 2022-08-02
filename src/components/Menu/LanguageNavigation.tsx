import React from 'react';
import { HorizontalMenu } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';
import '@ably/ui/core/styles.css';

type LanguageNavigationProps = {
  label: string | JSX.Element;
  items: {
    Component: React.FunctionComponent<{ language: string }>;
    props: {
      language: string;
      onClick?: (event: { target: { value: string } }) => void;
      value?: string;
    };
    content: string;
  }[];
};

const LanguageNavigation = ({ label, items }: LanguageNavigationProps) => (
  <HorizontalMenu>
    {label && <MenuLabel>{label}</MenuLabel>}
    {items.map(({ Component, props, content }, index) => (
      <MenuItem key={index}>
        <Component {...props}>{content}</Component>
      </MenuItem>
    ))}
  </HorizontalMenu>
);

export default LanguageNavigation;
