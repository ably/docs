import React, { ChangeEvent, useRef } from 'react';
import { useSearch } from 'src/hooks';
import { SearchIcon } from '.';
import { FullSizeSearchDisplay } from './FullSizeSearchDisplay';
import { MobileSearchDisplay } from './MobileSearchDisplay';

export const displayModes = {
  FULL_SCREEN: 'FULL_SCREEN',
  MOBILE: 'MOBILE',
} as const;

type DisplayMode = keyof typeof displayModes;

export const SearchBar = ({ displayMode }: { displayMode: DisplayMode }) => {
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus && textInput.current.focus();

  let StyledSearchComponent = FullSizeSearchDisplay;
  if (displayMode === displayModes.MOBILE) {
    StyledSearchComponent = MobileSearchDisplay;
  }

  const {
    state: { query },
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
  return (
    <StyledSearchComponent onClick={focusOnSearchInput}>
      <SearchIcon className="place-self-center" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className="h-48 font-light bg-transparent pl-8 text-base outline-none w-160 max-w-512"
        value={query}
        onChange={handleSearch}
      />
    </StyledSearchComponent>
  );
};
