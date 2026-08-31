
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { GetFollowingsResponse } from "@/types/follow.type";

export const useGetFollowings = (userId?: string, enabled = true) => {
  return useQuery({
    queryKey: ["user-followings", userId],
    queryFn: async (): Promise<GetFollowingsResponse> => {
      const response = await axiosInstance.get<GetFollowingsResponse>(
        `/api/users/${userId}/followings`
      );
      return response.data;
    },
    enabled: enabled && !!userId,
    staleTime: 1000 * 60 * 5,
  });
};