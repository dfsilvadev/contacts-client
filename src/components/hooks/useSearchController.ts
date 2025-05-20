import { useCallback, useEffect, useRef, useState } from "react";

import {
  fetchContacts,
  searchContacts,
} from "@/features/contacts/slices/contactSlices";

import useAppDispatch from "@/hooks/useAppDispatch";

const useSearchController = () => {
  const [query, setQuery] = useState<string>("");
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const page = 1;
  const limit = 10;

  const dispatch = useAppDispatch();

  const fetchResults = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        dispatch(fetchContacts({ page, limit }));
      }

      dispatch(searchContacts({ query: searchTerm, page, limit }));
    },
    [dispatch]
  );

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
  }, [triggerSearch, query, fetchResults]);

  return {
    query,
    handleSearchTextChange,
    handleKeyDown,
  };
};
export default useSearchController;
