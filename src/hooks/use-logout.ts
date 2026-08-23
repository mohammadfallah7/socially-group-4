import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/session.store";
import type { Response } from "@/types/response.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setSession } = useSessionStore();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post<Response<null>>(
        "/api/authentication/logout",
      );

      return response.data;
    },
    onSuccess: () => {
      setSession(null);
      navigate("/");
    },
  });
};
