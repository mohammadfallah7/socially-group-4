import Header from "./Header";
import Container from "./Container";
import { Sidebar } from "./SideBar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="space-y-5">
      <Header />
      <Container className="grid grid-cols-12">
        <Sidebar />
        <div className="col-span-9">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default RootLayout;
