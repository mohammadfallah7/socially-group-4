import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://socially-nextjs-six.vercel.app",
  withCredentials: true,
});
