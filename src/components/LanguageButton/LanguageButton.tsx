import { FunctionComponent as FC } from 'react';
import { navigate } from 'gatsby';
import cn from '@ably/ui/core/utils/cn';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language }) => {
  const handleClick = () => {
    const href = '#';
    navigate(href);
  };

  return (
    <button
      className={cn(button, 'ui-text-menu3', {
        [isActive]: true,
      })}
      onClick={handleClick}
    >
      {languageInfo[language as LanguageKey]?.label}
    </button>
  );
};

export default LanguageButton;
