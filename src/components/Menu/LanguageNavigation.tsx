import React, { FunctionComponent as FC } from 'react';
import { HorizontalMenu } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';
import '@ably/ui/core/styles.css';

export interface LanguageNavigationComponentProps {
  language: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
}

export interface LanguageNavigationProps {
  label: string | JSX.Element;
  items: {
    Component: FC<LanguageNavigationComponentProps>;
    props: LanguageNavigationComponentProps;
    content: string;
  }[];
}

const LanguageNavigation: FC<LanguageNavigationProps> = ({ label, items }) => (
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
