import { Dispatch, FunctionComponent as FC, SetStateAction } from 'react';
import { SingleValue } from 'react-select';
import {
  createLanguageHrefFromDefaults,
  getTrimmedLanguage,
  getLanguageDefaults,
  ReactSelectOption,
  Select,
} from 'src/components';

import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE, SDK_INTERFACES } from '../../../../data/createPages/constants';
import { dropdownContainer, horizontalNav } from './LanguageNavigation.module.css';
import SDKInterfacePanel from '../../SDKInterfacePanel/SDKInterfacePanel';
import { usePageLanguage } from 'src/contexts';
import { navigate } from 'gatsby';

export interface LanguageNavigationComponentProps {
  language: string;
  sdkInterface?: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
  selectedSDKInterfaceTab?: string;
  selectedLocalLanguage: string;
}

export interface LanguageNavigationProps {
  items: {
    Component: FC<LanguageNavigationComponentProps>;
    props: LanguageNavigationComponentProps;
    content: string;
  }[];
  SDKSelected?: string;
  allListOfLanguages?: string[];
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
  setPreviousSDKInterfaceTab: Dispatch<SetStateAction<string>>;
}

const changePageOnSelect =
  (pageLanguage: string, cb: (arg: string) => void) => (newValue: SingleValue<ReactSelectOption>) => {
    if (newValue) {
      const language = newValue.value;
      const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(
        getTrimmedLanguage(language),
        pageLanguage,
      );

      const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
      if (!isPageLanguageDefault) {
        cb(language);
      }

      navigate(href);
    }
  };

const LanguageNavigation = ({
  items,
  allListOfLanguages,
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
  setPreviousSDKInterfaceTab,
}: LanguageNavigationProps) => {
  const { currentLanguage: pageLanguage, setPreferredLanguage } = usePageLanguage();
  const selectedPageLanguage = pageLanguage === DEFAULT_LANGUAGE ? DEFAULT_PREFERRED_LANGUAGE : pageLanguage;
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === selectedPageLanguage);

  const onSelectChange = changePageOnSelect(pageLanguage, setPreferredLanguage);

  const isSDKInterFacePresent = allListOfLanguages
    ? checkIfLanguageHasSDKInterface(allListOfLanguages, SDK_INTERFACES)
    : [false];
  const sdkInterfaceAvailable: string[] = [];
  if (isSDKInterFacePresent && allListOfLanguages) {
    // pass all languages for both realtime and rest
    SDK_INTERFACES.map((sdkInterface) => {
      if (isLanguageSDKInterfaceIsAvailable(allListOfLanguages, sdkInterface)) {
        sdkInterfaceAvailable.push(sdkInterface);
      }
    });
  }

  return (
    <>
      {isSDKInterFacePresent.includes(true) ? (
        <SDKInterfacePanel
          selectedSDKInterfaceTab={selectedSDKInterfaceTab}
          setSelectedSDKInterfaceTab={setSelectedSDKInterfaceTab}
          sdkInterfaceAvailable={sdkInterfaceAvailable}
          setPreviousSDKInterfaceTab={setPreviousSDKInterfaceTab}
        />
      ) : null}

      {items.length >= 1 ? (
        <div className="w-full border-b border-charcoal-grey">
          <menu data-testid="menu" className={horizontalNav}>
            {items.map(({ Component, props, content }, index) => (
              <Component {...props} key={index}>
                {content}
              </Component>
            ))}
            <div className={dropdownContainer}>
              <Select
                instanceId={'language-navigation'}
                options={options}
                value={value}
                isSearchable={false}
                onChange={onSelectChange}
              />
            </div>
          </menu>
        </div>
      ) : null}
    </>
  );
};

export default LanguageNavigation;

const checkIfLanguageHasSDKInterface = (allLanguage: string[], sdkInterfaces: string[]) =>
  allLanguage.map((language) => sdkInterfaces.includes(language.includes('_') ? language.split('_', 2)[0] : ''));

const isLanguageSDKInterfaceIsAvailable = (allLanguage: string[], sdkInterface: string) =>
  allLanguage.map((language) => language.includes(`${sdkInterface}_`)).includes(true);
