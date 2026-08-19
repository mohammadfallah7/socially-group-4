import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/session.store";
import type { Response } from "@/types/response.type";
import type { Session } from "@/types/session.type";
import { useEffect } from "react";
import { Outlet } from "react-router";
import Container from "./Container";
import Header from "./Header";
import { Sidebar } from "./SideBar";

const RootLayout = () => {
  const { setSession, setIsLoading } = useSessionStore();

  useEffect(() => {
    async function getSession() {
      try {
        const res = await axiosInstance.get<Response<Session>>(
          "/api/authentication/session",
        );
        setSession(res.data.data);
      } catch (error) {
        console.log(error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }

    getSession();
  }, [setSession, setIsLoading]);

  return (
    <div className="space-y-5">
      <Header />

      <Container className="grid lg:grid-cols-12 gap-6">
        <Sidebar />

        <div className="lg:col-span-9">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default RootLayout;
