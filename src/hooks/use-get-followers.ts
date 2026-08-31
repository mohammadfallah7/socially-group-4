
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { GetFollowersResponse } from "@/types/follow.type";

export const useGetFollowers = (userId?: string, enabled = true) => {
  return useQuery({
    queryKey: ["user-followers", userId],
    queryFn: async (): Promise<GetFollowersResponse> => {
      const response = await axiosInstance.get<GetFollowersResponse>(
        `/api/users/${userId}/followers`
      );
      return response.data;
    },
    enabled: enabled && !!userId,
    staleTime: 1000 * 60 * 5,
  });
};