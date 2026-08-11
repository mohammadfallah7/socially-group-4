import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

// تایپ داده‌های کاربر
interface UserData {
  name: string;
  username: string;
  followingCount: number;
  followersCount: number;
  avatarSvgPath?: string;
}

// کامپوننت حالت ورود (IsLoggedIn)
const IsLoggedIn = ({
  name,
  username,
  followingCount,
  followersCount,
  avatarSvgPath = "/user_profile.svg",
}: UserData) => {
  return (
    <Card className="p-5 border-border rounded-xl shadow-sm space-y-4">
      <CardContent className="p-0 space-y-4">
        <a
          href="/profile"
          className="flex flex-col items-center text-center space-y-3 group block"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-accent/50 border-2 border-primary/20 group-hover:border-primary transition-colors">
            <img
              src={avatarSvgPath}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground">@{username}</p>
          </div>
        </a>

        <div className="flex items-center justify-center gap-6 w-full pt-3 border-t border-border/60 text-xs">
          <div className="flex flex-col items-center">
            <span className="font-bold text-foreground">{followingCount}</span>
            <span className="text-muted-foreground">Following</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-bold text-foreground">{followersCount}</span>
            <span className="text-muted-foreground">Followers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// کامپوننت حالت خروج (IsLoggedOut)
const IsLoggedOut = () => {
  return (
    <Card className="p-6 border-border rounded-xl shadow-sm space-y-6">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold tracking-tight text-card-foreground">
            Welcome Back!
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Login to access your profile and connect with others.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="/sign-in"
            className={buttonVariants({
              variant: "default",
              className: "w-full rounded-xl text-center font-medium",
            })}
          >
            Log In
          </a>
          <a
            href="/sign-up"
            className={buttonVariants({
              variant: "outline",
              className: "w-full rounded-xl text-center font-medium",
            })}
          >
            Sign Up
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// تایپ پراپ‌های کامپوننت اصلی
interface SidebarProps {
  isLoggedIn: boolean;
  user?: UserData;
}

// کامپوننت اصلی سایدبار
export const Sidebar = ({ isLoggedIn, user }: SidebarProps) => {
  const defaultUser: UserData = {
    name: "Mohammad Amin",
    username: "m_amin",
    followingCount: 0,
    followersCount: 0,
  };

  const currentUser = user || defaultUser;

  return (
    <aside className="hidden lg:block w-72 shrink-0 h-fit">
      {isLoggedIn ? <IsLoggedIn {...currentUser} /> : <IsLoggedOut />}
    </aside>
  );
};
