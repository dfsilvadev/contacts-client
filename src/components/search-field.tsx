import { MagnifyingGlass } from "phosphor-react";

import TextField from "./ui/text-field";

import useSearchController from "./hooks/useSearchController";

const SearchField = () => {
  const { query, handleSearchTextChange, handleKeyDown } =
    useSearchController();

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
