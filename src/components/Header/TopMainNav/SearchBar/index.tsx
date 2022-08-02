import React, { useRef, useState } from 'react';
import { SearchIcon } from './SearchIcon';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const textInput = useRef<null | HTMLInputElement>(null);
  const handleClick = () => textInput.current && textInput.current.focus && textInput.current.focus();
  return (
    <div
      onClick={handleClick}
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
