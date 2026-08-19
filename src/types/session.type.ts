export type Session = {
  session: {
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
    id: string;
  };
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: null | string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};
