import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<Post[]>>("/api/posts");

      return response.data;
    },
  });
};
