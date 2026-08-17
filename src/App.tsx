import RecommendedUsers from "./components/layout/RecommendedUsers";
import CreatePostForm from "./components/post/CreatePostForm";
import PostCard from "./components/post/PostCard";

const App = () => {
  return (
    <>
      <div className="grid gap-5 lg:grid-cols-9">
        <div className="space-y-5 lg:col-span-6">
          <CreatePostForm />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>

        <div className="hidden lg:col-span-3 lg:block">
          <RecommendedUsers />
        </div>
      </div>

    </>
  );
};

export default App;
