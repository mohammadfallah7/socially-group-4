import { Button } from "../ui/button";
import { Sun, Moon, Home, User, Bell } from "lucide-react";

type HeaderProps = {
  isLoggedIn: boolean;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const Header = ({ isLoggedIn, isDark, setIsDark }: HeaderProps) => {
  return (
    <div className="w-full flex justify-center px-4 border-b bg-background text-foreground">
      <header className="w-full max-w-[80%] flex items-center justify-between p-2">
        <h1 className="font-bold text-xl">socially</h1>

        <div className="flex items-center gap-3">
          {/* Theme */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </Button>

          {/* Home */}
          <Button variant="ghost" size="lg">
            <Home className="size-5" />
            Home
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="lg">
                <Bell className="size-5" />
                Notification
              </Button>

              <Button variant="ghost" size="lg">
                <User className="size-5" />
                Profile
              </Button>
            </div>
          ) : (
            <Button size="lg">Sign in</Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
