import { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults, getTrimmedLanguage } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language, selectedLanguageForPre }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedLanguage = getTrimmedLanguage(language);
  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(selectedLanguage, pageLanguage);
  /* separated the isLanguageActive as we will pass a pageLanguage that is not only from the context lang, but a condition
  where the context page lang is not present in the languages we will pass the first language of the languages */
  const { isLanguageActive } = getLanguageDefaults(selectedLanguage, selectedLanguageForPre);

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, selectedLanguage);
    cacheVisitPreferredLanguage(isPageLanguageDefault, selectedLanguage, href);
  };

  return (
    <button
      className={cn(button, {
        [isActive]: isLanguageActive,
      })}
      onClick={handleClick}
    >
      {languageLabels[language] ?? language}
    </button>
  );
};

export default LanguageButton;
