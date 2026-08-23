export type Author = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type Like = {
  userId: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
};

export type LikeResponse = {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
};
