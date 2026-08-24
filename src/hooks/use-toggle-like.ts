import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axiosInstance.patch(`/api/posts/${postId}`);

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-likes"],
      });

      toast.add({
        type: data.message === "Post liked successfully" ? "success" : "error",
        description: data.message,
      });
    },
  });
};