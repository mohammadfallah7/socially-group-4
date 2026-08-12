import { Routes, Route } from "react-router";
import RootLayout from "./components/layout/RootLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} />
    </Routes>
  );
};

export default App;