import React, { FunctionComponent as FC } from 'react';
import { HorizontalMenu } from '.';
import { CopyIcon } from 'src/icons';
import '@ably/ui/core/styles.css';

export interface LanguageNavigationComponentProps {
  language: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
}

export interface LanguageNavigationProps {
  items: {
    Component: FC<LanguageNavigationComponentProps>;
    props: LanguageNavigationComponentProps;
    content: string;
  }[];
}

const LanguageNavigation: FC<LanguageNavigationProps> = ({ items }) => (
  <HorizontalMenu>
    {items.map(({ Component, props, content }, index) => (
      <Component {...props} key={index}>
        {content}
      </Component>
    ))}
    <ButtonWithTooltip tooltip="Copy" notification="Copied!" onClick={}>
      <CopyIcon />
    </ButtonWithTooltip>
  </HorizontalMenu>
);

export default LanguageNavigation;
