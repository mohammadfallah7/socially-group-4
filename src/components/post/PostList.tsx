import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";

const PostList = () => {
  return (
    <div className="col-span-12 lg:col-span-8 space-y-6">
      <CreatePostForm />
      <PostCard />
    </div>
  );
};

export default PostList;
