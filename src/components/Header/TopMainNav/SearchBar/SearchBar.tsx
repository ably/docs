import React, { ChangeEvent, useRef } from 'react';
import { useSearch } from 'src/hooks';
import { SearchIcon } from '.';

export const SearchBar = () => {
  const textInput = useRef<null | HTMLInputElement>(null);
  const focusOnSearchInput = () => textInput.current && textInput.current.focus();

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
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};
