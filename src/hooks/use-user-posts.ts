import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export const useUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<Post[]>>(
        `/api/users/${userId}/posts`,
      );
      return response.data.data;
    },
    enabled: !!userId,
  });
};
