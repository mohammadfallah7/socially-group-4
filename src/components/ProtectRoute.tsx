import { useSessionStore } from "@/stores/session.store";
import { LucideLoader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { session, isLoading } = useSessionStore();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LucideLoader2 className="size-4 animate-spin" />
      </div>
    );
  if (!session) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default ProtectRoute;
