import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosInstance.patch(`/api/users/${userId}`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recommended-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sidebar-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      toast.add({
        type: "success",
        description: "Follow toggled successfully",
      });
    },
  });
};
