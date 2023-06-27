import { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults, getTrimmedLanguage } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language, selectedLocalLanguage }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedLanguage = getTrimmedLanguage(language);
  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(selectedLanguage, pageLanguage);
  /*
  separate the isLanguageActive variable because we will pass a pageLanguage value that is not always from the useContext(PageLanguageContext),
  so if the  useContext(PageLanguageContext) is not present in the languages we will pass the first language of the languages
   eg: selected global language: PHP but the languages are: [js, ruby]  so it will pass js now as php is not present
   */
  const { isLanguageActive } = getLanguageDefaults(selectedLanguage, selectedLocalLanguage);

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, selectedLanguage);
    cacheVisitPreferredLanguage(isPageLanguageDefault, selectedLanguage, href);
  };
  const langLabelAndVersion = languageLabels[language].split(' ');
  const languageLabel = langLabelAndVersion.slice(0, -1).join(' ');

  return (
    <button
      className={cn(button, {
        [isActive]: isLanguageActive,
      })}
      onClick={handleClick}
    >
      {languageLabel ?? language}
    </button>
  );
};

export default LanguageButton;
