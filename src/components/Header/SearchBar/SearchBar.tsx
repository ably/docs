import { ChangeEvent, useRef, useState, useEffect, useCallback } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';

import { useKeyPress, useOnClickOutside } from 'src/hooks';
import { useSearch } from 'src/hooks';
import { isMac } from 'src/utilities';

import { SuggestionBox } from './SuggestionBox';
import { KeyIcon } from './KeyIcon';

import { searchInput } from './SearchBar.module.css';

export enum DisplayMode {
  FULL_SCREEN = 'FULL_SCREEN',
  MOBILE = 'MOBILE',
}

export const SearchBar = ({
  displayMode,
  displayLocation,
  extraStyleOptions,
}: {
  displayMode?: DisplayMode;
  displayLocation?: string;
  extraStyleOptions?: object;
}) => {
  const textInput = useRef<null | HTMLInputElement>(null);
  const searchDisplayRef = useRef<null | HTMLDivElement>(null);
  const [isInFocus, setIsInFocus] = useState(false);
  const [keyIcon, setKeyIcon] = useState('^');
  const extraWrapperContainerStyle = extraStyleOptions && extraStyleOptions.wrapperContainer;
  const extraInputStyle = extraStyleOptions && extraStyleOptions.inputContainer;

  const {
    state: { query, results, error },
    actions: { search },
  } = useSearch({
    addsearchApiKey: process.env.GATSBY_ADDSEARCH_API_KEY,
    enableParamsSync: true,
    configureClient: useCallback(({ client }) => {
      client.setThrottleTime(800);
    }, []),
  });

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    search({ query: value });
  };

  const focusOnSearchInput = () => {
    setIsInFocus(true);
    textInput?.current?.focus();
  };
  const handleFocusEvent = () => {
    setIsInFocus(false);
    textInput?.current?.blur();
  };

  useOnClickOutside(handleFocusEvent, searchDisplayRef);
  useKeyPress(['Escape'], handleFocusEvent);
  useKeyboardShortcut(['Meta', 'K'], focusOnSearchInput, {
    overrideSystem: true,
    repeatOnHold: false,
  });

  useEffect(() => {
    if (isMac) {
      setKeyIcon('⌘');
    }
  }, []);

  return (
    <div
      ref={searchDisplayRef}
      onClick={focusOnSearchInput}
      className={cn('relative items-center justify-start md:py-0', {
        'flex md:hidden': displayMode === DisplayMode.MOBILE,
        'hidden md:flex': displayMode === DisplayMode.FULL_SCREEN,
      })}
      style={{ ...extraWrapperContainerStyle }}
    >
      <div
        className={cn('relative w-full', {
          'mx-24 mt-24 md:m-0': displayLocation !== 'homepage',
        })}
      >
        <input
          type="text"
          ref={textInput}
          placeholder="Search"
          className={cn(searchInput)}
          value={query}
          onChange={handleSearch}
          style={{ ...extraInputStyle }}
        />
        <Icon name="icon-gui-search" size="24px" additionalCSS="absolute left-16 top-12" />
        {!isInFocus && (
          <div className="absolute right-16 top-12 hidden lg:flex items-center justify-end">
            <KeyIcon className="mr-4">{keyIcon}</KeyIcon>
            <KeyIcon className="pt-2">K</KeyIcon>
          </div>
        )}
      </div>
      <SuggestionBox
        results={results}
        error={error}
        query={query}
        isActive={isInFocus}
        displayLocation={String(displayLocation)}
      />
    </div>
  );
};
