import { Link } from "react-router";
import { Loader2, Search } from "lucide-react";
import { getUsernameFromEmail } from "@/lib/utils";
import { useUserSearch } from "@/hooks/use-user-search";
import { useSessionStore } from "@/stores/session.store";
import { Input } from "../ui/input";
import UserAvatar from "../UserAvatar";

interface SearchUsersProps {
  onSelectUser?: () => void;
}

const SearchUsers = ({ onSelectUser }: SearchUsersProps) => {
  const session = useSessionStore((state) => state.session);

  const {
    query,
    open,
    containerRef,
    debouncedQuery,
    users,
    isFetching,
    handleChange,
    handleFocus,
    handleSelectUser,
  } = useUserSearch();

  if (!session) return null;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search users..."
          className="w-full pl-9 pr-9"
        />

        {isFetching && (
          <Loader2 className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      {open && debouncedQuery.trim().length > 1 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-md border bg-popover shadow-md">
          {isFetching ? (
            <p className="p-3 text-sm text-muted-foreground">Searching...</p>
          ) : users && users.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-1">
              {users.map((user) => (
                <li key={user.id}>
                  <Link
                    to={`/profile/${getUsernameFromEmail(user.email)}`}
                    onClick={() => handleSelectUser(onSelectUser)}
                    className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-accent"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium">
                      <UserAvatar image={user.image} />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium">
                        {user.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-sm text-muted-foreground">User not found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
