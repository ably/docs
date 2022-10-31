import React, { ChangeEvent, useRef, useState } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import Icon from '@ably/ui/core/Icon';

import { useFunctionOnOutsideClick } from 'src/hooks/useFunctionOnOutsideClick';
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
    state: { query, results },
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
  const handleFocusEvent = () => setIsInFocus(false);

  useKeyboardShortcut(['Meta', 'K'], focusOnSearchInput, {
    overrideSystem: true,
    repeatOnHold: false,
  });

  useFunctionOnOutsideClick(handleFocusEvent, searchDisplayRef);

  return (
    <SearchDisplay ref={searchDisplayRef} onClick={focusOnSearchInput} displayMode={displayMode}>
      <Icon name="icon-gui-search" size="1.5rem" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className={searchInput}
        value={query}
        onChange={handleSearch}
      />
      <KeyIcon className="mr-4">{isMac ? '⌘' : '^'}</KeyIcon>
      <KeyIcon>K</KeyIcon>
      <SuggestionBox results={results} isActive={isInFocus} />
    </SearchDisplay>
  );
};
