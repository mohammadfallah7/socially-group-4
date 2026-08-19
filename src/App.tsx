import RecommendedUsers from "./components/layout/RecommendedUsers";
import PostList from "./components/post/PostList";

const App = () => {
  return (
    <div className="grid lg:grid-cols-9 gap-5">
      <div className="lg:col-span-6 space-y-5">
        <PostList />
      </div>

      <div className="hidden lg:block lg:col-span-3">
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default App;
