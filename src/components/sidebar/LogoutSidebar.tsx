import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export const LogoutSidebar = () => {
  return (
    <aside className="hidden md:block w-[294px] p-6 bg-card border border-border rounded-[12px] shadow-sm space-y-6 shrink-0 h-fit">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold tracking-tight text-card-foreground">
          Welcome Back!
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Login to access your profile and connect with others.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          to="/sign-in"
          className={buttonVariants({
            variant: "default",
            className: "w-full rounded-xl text-center font-medium",
          })}
        >
          Log In
        </Link>
        <Link
          to="/sign-up"
          className={buttonVariants({
            variant: "outline",
            className: "w-full rounded-xl text-center font-medium",
          })}
        >
          Sign Up
        </Link>
      </div>
    </aside>
  );
};
