import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { SearchedUser } from "@/types/search.type";
import type { Response } from "@/types/response.type";

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response<SearchedUser[]>>(
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
