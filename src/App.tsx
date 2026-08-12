import Header from "./components/layout/Header";
import { Sidebar } from "./components/layout/SideBar";

const App = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-xl mt-5">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
