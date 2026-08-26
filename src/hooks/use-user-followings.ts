import { axiosInstance } from "@/lib/axios";
import type { Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export const useUserFollowings = (userId?: string) => {
  return useQuery({
    queryKey: ["user-followings", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await axiosInstance.get<Response<any[]>>(
        `/api/users/${userId}/followings`
      );
      return response.data.data;
    },
    enabled: !!userId,
  });
};