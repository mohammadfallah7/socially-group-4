import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await axiosInstance.post(
        `/api/posts/${postId}/comment`,
        {
          content,
        },
      );

      return response.data;
    },

    onSuccess: (data) => {
      // Home posts
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      // Profile posts
      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });

      toast.add({
        type: "success",
        description: data.message || "Comment created successfully",
      });
    },
  });
};