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

export type RegisterResponse = {
  token: string;
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

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}
