import { axiosInstance } from "@/lib/axios";
import type { LikeResponse } from "@/types/post.type";
import type { Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export const useUserLikes = (userId?: string) => {
  return useQuery({
    queryKey: ["user-likes", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<LikeResponse[]>>(
        `/api/users/${userId}/likes`,
      );
      return response.data.data;
    },
    enabled: !!userId,
  });
};
