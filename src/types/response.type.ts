export type Response<T> = {
  message: string;
  success: boolean;
  data: T;
};

export type ErrorResponse<T> = {
  message: string;
  success: boolean;
  error: T;
};
