import React, { useRef, useState } from 'react';
import { SearchIcon } from '.';
import { FullSizeSearchDisplay } from './FullSizeSearchDisplay';
import { MobileSearchDisplay } from './MobileSearchDisplay';

export const displayModes = {
  FULL_SCREEN: 'FULL_SCREEN',
  MOBILE: 'MOBILE',
} as const;

type DisplayMode = keyof typeof displayModes;

export const SearchBar = ({ displayMode }: { displayMode: DisplayMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus && textInput.current.focus();
  let StyledSearchComponent = FullSizeSearchDisplay;
  if (displayMode === displayModes.MOBILE) {
    StyledSearchComponent = MobileSearchDisplay;
  }
  return (
    <StyledSearchComponent onClick={focusOnSearchInput}>
      <SearchIcon className="place-self-center" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className="h-48 font-light bg-transparent pl-8 text-base outline-none"
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
    </StyledSearchComponent>
  );
};
