import { FunctionComponent as FC } from 'react';
import { navigate } from 'gatsby';
import cn from '@ably/ui/core/utils/cn';
import { createLanguageHrefFromDefaults, getLanguageDefaults, getTrimmedLanguage } from 'src/components';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useLayoutContext } from 'src/contexts/layout-context';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language }) => {
  const { activePage, setLanguage } = useLayoutContext();
  const selectedLanguage = getTrimmedLanguage(language);
  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(selectedLanguage, activePage.language);
  /*
  separate the isLanguageActive variable because we will pass a pageLanguage value that is not always from the useContext(PageLanguageContext),
  so if the  useContext(PageLanguageContext) is not present in the languages we will pass the first language of the languages
   eg: selected global language: PHP but the languages are: [js, ruby]  so it will pass js now as php is not present
   */
  const isLanguageActive = activePage.language === selectedLanguage;

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, selectedLanguage);

    if (!isPageLanguageDefault) {
      setLanguage(language);
    }
    navigate(href);
  };

  return (
    <button
      className={cn(button, 'ui-text-label3', {
        [isActive]: isLanguageActive,
      })}
      onClick={handleClick}
    >
      {languageInfo[language as LanguageKey]?.label}
    </button>
  );
};

export default LanguageButton;
