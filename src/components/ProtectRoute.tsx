import { useSessionStore } from "@/stores/session.store";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { session } = useSessionStore();

  if (!session) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default ProtectRoute;
