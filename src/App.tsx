import { Routes, Route } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import PostCard from "./components/post/PostCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<PostCard />} />
      </Route>
    </Routes>
  );
};

export default App;
