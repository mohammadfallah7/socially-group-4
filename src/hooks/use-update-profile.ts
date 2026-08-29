import { axiosInstance } from "@/lib/axios";
import type { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProfilePayload {
  userId: string;
  name: string;
  bio?: string;
  location?: string;
  website?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, ...data }: UpdateProfilePayload) => {
      const response = await axiosInstance.put<Response<object>>(
        `/api/users/${userId}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["usr-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-profile"] });
    },
  });
};