import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/session.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!session) {
        navigate("/sign-in");
        return null;
      }

      const response = await axiosInstance.patch(`/api/posts/${postId}`);

      return response.data;
    },

    onSuccess: (data) => {
      if (!data) return;

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
