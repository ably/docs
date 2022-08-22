import React, { ChangeEvent, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import debounce from 'lodash.debounce';
import { useSearch, State } from 'src/hooks';
import { SearchIcon } from '.';

export const SearchBar = () => {
  const location = useLocation();
  const initialSearch = new URLSearchParams(location.search).get('q');

  const [searchTerm, setSearchTerm] = useState(initialSearch?.toString());
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus && textInput.current.focus();

  const {
    state: { results },
    actions: { search },
  } = useSearch({
    addsearchApiKey: process.env.GATSBY_ADDSEARCH_API_KEY,
    enableParamsSync: true,
  });

  const fetchResults = debounce((queryValues: Pick<State, 'query' | 'page'>) => {
    search(queryValues);
  }, 500);

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchTerm(value);
    fetchResults({ query: value, page: 1 });
  };

  console.log('results', results);

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
