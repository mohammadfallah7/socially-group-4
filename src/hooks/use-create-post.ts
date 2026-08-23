import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await axiosInstance.post<Response<Post>>("/api/posts", {
        content,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
