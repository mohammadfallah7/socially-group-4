import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/session.store";
import type { Response } from "@/types/response.type";
import type { RecommendedUser } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedUsers = () => {
  const { session, isLoading: isSessionLoading } = useSessionStore();

  return useQuery({
    queryKey: ["recommended-users"],

    queryFn: async () => {
      const response = await axiosInstance.get<Response<RecommendedUser[]>>(
        "/api/users/recommend",
      );

      return response.data;
    },

    enabled: !!session && !isSessionLoading,
  });
};
