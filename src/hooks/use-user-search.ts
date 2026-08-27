import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchUsers } from "@/hooks/use-search-users";

export const useUserSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 400);

  const { data: users, isFetching } =
    useSearchUsers(debouncedQuery);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    setOpen(true);
  };

  const handleFocus = () => {
    if (query) {
      setOpen(true);
    }
  };

  const handleSelectUser = (onSelectUser?: () => void) => {
    setOpen(false);
    onSelectUser?.();
  };

  return {
    query,
    setQuery,
    open,
    setOpen,
    containerRef,
    debouncedQuery,
    users,
    isFetching,
    handleChange,
    handleFocus,
    handleSelectUser,
  };
};