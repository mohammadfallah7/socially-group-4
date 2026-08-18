export type NotificationItem = {
  id: string;
  userId: string;
  creatorId: string;
  postId: string | null;
  commentId: string | null;
  type: "FOLLOW" | "LIKE" | "COMMENT";
  read: boolean;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    image: string | null;
    email: string;
  };
  post: { id: string; content?: string } | null;
  comment: { id: string; content?: string } | null;
};
