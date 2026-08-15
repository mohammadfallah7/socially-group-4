import { Routes, Route } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import PostList from "./components/post/PostList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<PostList />} />
      </Route>
    </Routes>
  );
};

export default App;
