import { Routes, Route } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import PostList from "./components/post/PostList";
import RecommendedUsers from "./components/layout/RecommendedUsers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <div className="grid grid-cols-12 gap-6">
              <PostList />
              <RecommendedUsers />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;