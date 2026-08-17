export type LoginResponse = {
  redirect: boolean;
  token: string;
  url: string;
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};
