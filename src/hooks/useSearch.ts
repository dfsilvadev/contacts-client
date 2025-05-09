import { useEffect, useRef, useState } from "react";

const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    // eslint-disable-next-line no-console
    console.log(`🔍 Buscando por: ${searchTerm}`);
  };

  const handleSearchTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setTriggerSearch(true);
    }, 2000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      setTriggerSearch(true);
    }
  };

  useEffect(() => {
    if (triggerSearch) {
      fetchResults(query);
      setTriggerSearch(false);
    }
  }, [triggerSearch, query]);

  return {
    query,
    handleSearchTextChange,
    handleKeyDown,
  };
};
export default useSearch;
