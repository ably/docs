import { FunctionComponent as FC } from 'react';
import { navigate } from 'gatsby';
import cn from '@ably/ui/core/utils/cn';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useLayoutContext } from 'src/contexts/layout-context';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language }) => {
  const { activePage } = useLayoutContext();
  const handleClick = () => {
    navigate(`${location.pathname}?lang=${language}`, { replace: true });
  };

  return (
    <button
      className={cn(button, 'ui-text-menu3', {
        [isActive]: language === activePage.language,
      })}
      onClick={handleClick}
    >
      {languageInfo[language as LanguageKey]?.label}
    </button>
  );
};

export default LanguageButton;
