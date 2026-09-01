import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface UploadResponse {
  success?: boolean;
  image?: string;
  id?: string;
  uuid?: string;
  url?: string;
  data?: any;
  [key: string]: any;
}

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post<UploadResponse>(
        "/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};