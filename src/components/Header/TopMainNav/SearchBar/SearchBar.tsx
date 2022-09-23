import React, { ChangeEvent, useRef, useState } from 'react';

import { useSearch } from 'src/hooks';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import { SearchIcon, DisplayMode, SearchDisplay } from '.';
import { SuggestionBox } from './SuggestionBox';

export const SearchBar = ({ displayMode }: { displayMode: DisplayMode }) => {
  const textInput = useRef<null | HTMLInputElement>(null);
  const [isInFocus, setIsInFocus] = useState(false);
  const focusOnSearchInput = () => textInput?.current?.focus();

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

  useKeyboardShortcut(['Meta', 'K'], () => textInput?.current?.focus(), {
    overrideSystem: true,
    repeatOnHold: false,
  });

  return (
    <SearchDisplay onClick={focusOnSearchInput} displayMode={displayMode}>
      <SearchIcon className="place-self-center" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className="h-48 font-light bg-transparent pl-8 text-base outline-none w-160 max-w-512"
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsInFocus(true)}
        onBlur={() => setIsInFocus(false)}
      />
      <SuggestionBox results={results} isActive={isInFocus} />
    </SearchDisplay>
  );
};
