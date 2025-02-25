import { Dispatch, FunctionComponent as FC, SetStateAction } from 'react';
import { SingleValue } from 'react-select';
import { navigate } from 'gatsby';

import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE, SDK_INTERFACES } from '../../../../data/createPages/constants';
import { dropdownContainer, horizontalNav } from './LanguageNavigation.module.css';
import SDKInterfacePanel from '../../SDKInterfacePanel/SDKInterfacePanel';

import { ReactSelectOption, Select } from 'src/components';
import cn from '@ably/ui/core/utils/cn';

export interface LanguageNavigationComponentProps {
  language: string;
  sdkInterface?: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
  selectedSDKInterfaceTab?: string;
  selectedLocalLanguage: string;
  children?: React.ReactNode;
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

const changePageOnSelect = (pageLanguage: string) => (newValue: SingleValue<ReactSelectOption>) => {
  if (newValue) {
    const href = '#';

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
  const pageLanguage = 'javascript';
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === pageLanguage);

  const onSelectChange = changePageOnSelect(pageLanguage);

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
        <div className="border-b border-charcoal-grey w-full">
          <menu
            className={cn(horizontalNav, 'docs-language-navigation')}
            data-testid="menu"
            data-languages={items.map((item) => item.props.language).join(',')}
          >
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
