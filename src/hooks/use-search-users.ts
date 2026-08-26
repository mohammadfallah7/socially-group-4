// src/hooks/use-search-users.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { SearchUsersResponse } from "@/types/user.search";

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<SearchUsersResponse>(
        "/api/users/search",
        { params: { q: query } },
      );
      return data.data;
    },
    enabled: query.trim().length > 1,
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  });
};
