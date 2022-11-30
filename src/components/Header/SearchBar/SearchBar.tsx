import React, { ChangeEvent, useRef, useState } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import Icon from '@ably/ui/core/Icon';

import { useKeyPress, useOnClickOutside } from 'src/hooks';
import { useSearch } from 'src/hooks';
import { isMac } from 'src/utilities';

import { DisplayMode, SearchDisplay } from '.';
import { SuggestionBox } from './SuggestionBox';
import { KeyIcon } from './KeyIcon';

import { searchInput } from './SearchBar.module.css';

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
    <SearchDisplay ref={searchDisplayRef} onClick={focusOnSearchInput} displayMode={displayMode}>
      <Icon name="icon-gui-search" size="24px" additionalCSS="absolute left-16 top-12 md:left-16 md:top-10" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className={searchInput}
        value={query}
        onChange={handleSearch}
      />
      <KeyIcon className="mr-4">{isMac ? '⌘' : '^'}</KeyIcon>
      <KeyIcon className="mr-16 pt-2">K</KeyIcon>
      <SuggestionBox results={results} error={error} query={query} isActive={isInFocus} />
    </SearchDisplay>
  );
};
