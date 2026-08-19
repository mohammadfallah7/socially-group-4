import { axiosInstance } from "@/lib/axios";
import type { NotificationItem } from "@/types/notification.type";
import type { ErrorResponse, Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useNotifications = () => {
  return useQuery<
    Response<NotificationItem[]>,
    AxiosError<ErrorResponse<string>>
  >({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response =
        await axiosInstance.get<Response<NotificationItem[]>>(
          "/api/notifications",
        );
      return response.data;
    },
  });
};
