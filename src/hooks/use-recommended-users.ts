import { axiosInstance } from "@/lib/axios";
import type { Response } from "@/types/response.type";
import type { RecommendedUser } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedUsers = () => {
  return useQuery({
    queryKey: ["recommended-users"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<RecommendedUser[]>>(
        "/api/users/recommend",
      );
      return response.data;
    },
  });
};
