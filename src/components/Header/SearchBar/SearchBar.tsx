import React, { ChangeEvent, useRef, useState } from 'react';
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

export const SearchBar = ({ displayMode }: { displayMode: DisplayMode }) => {
  const textInput = useRef<null | HTMLInputElement>(null);
  const searchDisplayRef = useRef<null | HTMLDivElement>(null);
  const [isInFocus, setIsInFocus] = useState(false);

  const {
    state: { query, results, error },
    actions: { search },
  } = useSearch({
    addsearchApiKey: process.env.GATSBY_ADDSEARCH_API_KEY,
    enableParamsSync: true,
    configureClient: ({ client }) => {
      client.setThrottleTime(800);
    },
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

  return (
    <div
      ref={searchDisplayRef}
      onClick={focusOnSearchInput}
      className={cn('relative flex items-center justify-start pt-24 pb-16 md:py-0 mx-24', {
        'md:hidden': displayMode === DisplayMode.MOBILE,
        'hidden md:block': displayMode === DisplayMode.FULL_SCREEN,
      })}
    >
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className={cn(searchInput)}
        value={query}
        onChange={handleSearch}
      />
      <Icon name="icon-gui-search" size="24px" additionalCSS="absolute left-16 top-36 md:top-12" />
      {!isInFocus && (
        <div className="absolute right-16 top-12 hidden lg:flex items-center justify-end">
          <KeyIcon className="mr-4">{isMac ? '⌘' : '^'}</KeyIcon>
          <KeyIcon className="pt-2">K</KeyIcon>
        </div>
      )}
      <SuggestionBox results={results} error={error} query={query} isActive={isInFocus} />
    </div>
  );
};
