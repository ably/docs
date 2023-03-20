import { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';

import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';

import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({
  language,
  sdkInterface = 'rt',
  isSDK = false,
  isEnabled = true,
  isSDKSelected = false,
}) => {
  const pageLanguage = useContext(PageLanguageContext);
  const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(language, pageLanguage);

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language, sdkInterface);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href, sdkInterface);
  };

  const handleClickSDK = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language, sdkInterface);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href, sdkInterface);
  };

  return isSDK ? (
    <button
      className={`font-medium font-sans  focus:outline-none px-24  ${isSDKSelected ? 'bg-charcoal-grey' : ''}
      ${isEnabled ? 'text-mid-grey' : 'text-light-grey cursor-default'}
      `}
      onClick={isEnabled ? handleClickSDK : () => null}
    >
      {languageLabels[sdkInterface] ?? sdkInterface}
    </button>
  ) : (
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
