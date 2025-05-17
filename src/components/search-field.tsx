import { MagnifyingGlass } from "phosphor-react";

import TextField from "./ui/text-field";

import { useSearch } from "@/hooks";

const SearchField = () => {
  const { query, handleSearchTextChange, handleKeyDown } = useSearch();

  return (
    <TextField
      type="text"
      placeholder="Pesquisar contato"
      icon={<MagnifyingGlass />}
      value={query}
      onChange={handleSearchTextChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchField;
