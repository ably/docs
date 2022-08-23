import React, { ChangeEvent, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import debounce from 'lodash.debounce';
import { useSearch } from 'src/hooks';
import { SearchIcon } from '.';

// NOTE: function is outside the component because it triggers a rerender and calls are being made more often than required
const fetchSearch = debounce((queryValues, callback) => callback(queryValues), 500);

export const SearchBar = () => {
  const location = useLocation();
  const initialSearch = new URLSearchParams(location.search).get('q');

  const [searchTerm, setSearchTerm] = useState(initialSearch?.toString());
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus && textInput.current.focus();

  const {
    actions: { search },
  } = useSearch({
    addsearchApiKey: process.env.GATSBY_ADDSEARCH_API_KEY,
    enableParamsSync: true,
  });

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchTerm(value);
    fetchSearch({ query: value }, search);
  };

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
        onChange={handleSearch}
      />
    </div>
  );
};
