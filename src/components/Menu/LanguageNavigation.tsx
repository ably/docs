import React, { FunctionComponent as FC } from 'react';
import { HorizontalMenu } from 'src/components';
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

const LanguageNavigation = ({ items }: LanguageNavigationProps) => {
  return (
    <HorizontalMenu>
      {items.map(({ Component, props, content }, index) => (
        <Component {...props} key={index}>
          {content}
        </Component>
      ))}
    </HorizontalMenu>
  );
};

export default LanguageNavigation;
