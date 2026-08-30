import { axiosInstance } from "@/lib/axios";
import type { ProfilePageValues } from "@/types/auth.type";
import type { Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export const useUsrProfile = (username?: string) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<ProfilePageValues>>(
        `/api/users/${username}/profile`,
      );
      return response.data.data;
    },
    enabled: !!username,
  });
};
