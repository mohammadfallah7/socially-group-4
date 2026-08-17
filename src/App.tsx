import RecommendedUsers from "./components/layout/RecommendedUsers";
import CreatePostForm from "./components/post/CreatePostForm";
import PostCard from "./components/post/PostCard";

const App = () => {
  return (
    <div className="grid lg:grid-cols-9 gap-5">
      <div className="lg:col-span-6 space-y-5">
        <CreatePostForm />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default App;
