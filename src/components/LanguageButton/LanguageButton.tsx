import { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults, getFilteredLanguages } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language, selectedSDKInterfaceTab }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedLanguage = getFilteredLanguages(language);
  const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
    selectedLanguage,
    pageLanguage,
  );

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, selectedLanguage);
    cacheVisitPreferredLanguage(isPageLanguageDefault, selectedLanguage, href);
  };

  const filterLanguage = languageSDKInterfaceClean(language, selectedSDKInterfaceTab);

  return (
    <>
      {filterLanguage != '' ? (
        <button
          className={cn(button, {
            [isActive]: isLanguageActive,
          })}
          onClick={handleClick}
        >
          {languageLabels[filterLanguage] ?? filterLanguage}
        </button>
      ) : null}
    </>
  );
};

export default LanguageButton;

export const languageSDKInterfaceClean = (language: string, selectedTab: string) =>
  language.includes(`_`) ? (language.includes(`${selectedTab}_`) ? language.split('_', 2)[1] : '') : language;
