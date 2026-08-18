import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { Response } from "@/types/response.type";

const PostList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<Post[]>>("/api/posts");

      return response.data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="col-span-12 lg:col-span-8 space-y-6">
      <CreatePostForm />

      {data.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
