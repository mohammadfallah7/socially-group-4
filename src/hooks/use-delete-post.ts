import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type DeletePostError = {
  message: string;
  success: boolean;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axiosInstance.delete(`/api/posts/${postId}`);

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });

      toast.add({
        type: "success",
        description: data.message || "Post deleted successfully",
      });
    },

    onError: (error: AxiosError<DeletePostError>) => {
      toast.add({
        type: "error",
        description: error.response?.data.message || "Post not found",
      });
    },
  });
};
