import React, { useEffect, useState } from "react";

interface ISearchBar {
  onSearch: (searchTerm: string) => void;
  placeholder: string;
  isDisabled?: boolean;
  debounceTime?: number;
}

const SearchBar: React.FC<ISearchBar> = ({
  onSearch,
  placeholder,
  isDisabled = false,
  debounceTime = 1000,
}) => {
  let debounceChange: any = 0;

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();

    if (debounceChange) clearTimeout(debounceChange);
    debounceChange = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);
  };

  return (
    <>
      <input
        type="text"
        disabled={isDisabled}
        className="border-solid border-2 border-black-800 w-64 pl-4"
        placeholder={placeholder}
        onChange={handleSearchChange}
      />
    </>
  );
};

export default SearchBar;
