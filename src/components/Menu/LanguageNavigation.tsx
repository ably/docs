import React, { FunctionComponent as FC, useCallback, MouseEvent } from 'react';
import { CopyIcon } from 'src/icons';
import { ButtonWithTooltip, HorizontalMenu } from 'src/components';
import '@ably/ui/core/styles.css';

export interface LanguageNavigationComponentProps {
  language: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
}

export interface LanguageNavigationProps {
  language: LanguageNavigationComponentProps['language'];
  items: {
    Component: FC<LanguageNavigationComponentProps>;
    props: LanguageNavigationComponentProps;
    content: string;
  }[];
}

const LanguageNavigation: FC<LanguageNavigationProps> = ({ items, language }) => {
  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const code = items.find(({ props }) => props.language === language);
    console.log(code);
    // navigator.clipboard.writeText(language);
  };

  return (
    <HorizontalMenu>
      <div>
        {items.map(({ Component, props, content }, index) => (
          <>
            <Component {...props} key={index}>
              {content}
            </Component>
          </>
        ))}
      </div>
      <div className="pr-16 flex items-center">
        <ButtonWithTooltip tooltip="Copy" notification="Copied!" onClick={handleCopy}>
          <CopyIcon className="text-white" width={16} height={16} />
        </ButtonWithTooltip>
      </div>
    </HorizontalMenu>
  );
};

export default LanguageNavigation;
