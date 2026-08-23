import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { ErrorResponse, Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await axiosInstance.post<Response<Post>>("/api/posts", {
        content,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.add({
        type: "success",
        description: data.message || "Post created successfully",
      });
    },
    onError: (error: AxiosError<ErrorResponse<string>>) => {
      toast.add({
        type: "error",
        description: error.response?.data.error || "Failed to create post",
      });
    },
  });
};
