import { usePosts } from "@/hooks/use-posts";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
  const { data: posts, isPending, refetch } = usePosts();

  return (
    <div className="col-span-12 space-y-6 lg:col-span-8">
      <CreatePostForm />

      {isPending
        ? [1, 2, 3, 4].map((_, i) => <PostSkeleton key={i} />)
        : posts?.data.map((post) => (
            <PostCard key={post.id} post={post} refetch={refetch} />
          ))}
    </div>
  );
};

export default PostList;
