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
        content: content.trim(),
      });

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      toast.add({
        type: "success",
        description: data.message,
      });
    },

    onError: (error: AxiosError<ErrorResponse<string>>) => {
      const errorData = error.response?.data?.error;

      let message = "Failed to create post";

      if (typeof errorData === "string") {
        message = errorData;
      } else if (errorData && typeof errorData === "object") {
        if ("content" in errorData) {
          message = "invalid feilds";
        } else {
          message = Object.values(errorData).join(", ");
        }
      }

      toast.add({
        type: "error",
        description: message,
      });
    },
  });
};
