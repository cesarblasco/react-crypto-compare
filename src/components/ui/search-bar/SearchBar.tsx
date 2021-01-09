import React, { useEffect, useState } from "react";

interface ISearchBar {
  onSearch: (searchTerm: string) => void;
  currentSearchTerm: string;
  placeholder: string;
  isDisabled?: boolean;
  debounceTime?: number;
}

const SearchBar: React.FC<ISearchBar> = ({
  onSearch,
  currentSearchTerm,
  placeholder,
  isDisabled = false,
  debounceTime = 1000,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => onSearch(searchTerm), debounceTime);
    return () => clearTimeout(timeoutId);
  }, [searchTerm])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      disabled={isDisabled}
      className="border-solid border-2 w-64 pl-4 outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
