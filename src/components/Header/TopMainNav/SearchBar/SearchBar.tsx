import React, { useRef, useState } from 'react';
import { SearchIcon } from '.';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus && textInput.current.focus();
  return (
    <div
      onClick={focusOnSearchInput}
      className="h-48 px-16 mx-16 bg-light-grey border border-mid-grey rounded-md flex flex-row justify-self-start self-center"
    >
      <SearchIcon className="place-self-center" />
      <input
        type="text"
        ref={textInput}
        placeholder="Search"
        className="h-48 w-256 font-light bg-transparent pl-8 text-base outline-none"
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
    </div>
  );
};
