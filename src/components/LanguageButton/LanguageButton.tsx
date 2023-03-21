import { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults, getLanguageFiltered } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';
import { button, isActive } from '../Menu/MenuItemButton/MenuItemButton.module.css';
import { DEFAULT_PREFERRED_INTERFACE } from '../../../data/createPages/constants';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({
  language,
  sdkInterface = DEFAULT_PREFERRED_INTERFACE,
  isSDK = false,
  isEnabled = true,
  isSDKSelected = false,
}) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedLanguage = getLanguageFiltered(language);
  const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(
    selectedLanguage,
    pageLanguage,
  );

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(
      isPageLanguageDefault,
      isLanguageDefault,
      selectedLanguage,
      sdkInterface,
    );
    cacheVisitPreferredLanguage(isPageLanguageDefault, selectedLanguage, href, sdkInterface);
  };

  return isSDK ? (
    <button
      className={`font-medium font-sans  focus:outline-none px-24  ${isSDKSelected ? 'bg-charcoal-grey' : ''}
      ${isEnabled ? 'text-mid-grey' : 'text-disabled-tab-button cursor-default'}
      `}
      onClick={isEnabled ? handleClick : () => null}
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
