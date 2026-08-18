import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import type { RegisterResponse, SignUpFormValues } from "@/types/auth.type";
import type { ErrorResponse, Response } from "@/types/response.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: SignUpFormValues) => {
      const response = await axiosInstance.post<Response<RegisterResponse>>(
        "/api/authentication/register",
        payload,
      );

      return response.data;
    },

    onSuccess: (data) => {
      toast.add({
        type: "success",
        description: data.message,
      });

      navigate("/");
    },

    onError: (error: AxiosError<ErrorResponse<string>>) => {
      toast.add({
        type: "error",
        description: error.response?.data.error || "Registration failed.",
      });
    },
  });
};
