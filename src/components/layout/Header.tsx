import { Button } from "../ui/button";
import { Sun, Moon, Home, User, Bell } from "lucide-react";
import Container from "./Container";

const Header = () => {
  const isLoggedIn = false;

  return (
    <header className="py-5 border-b">
      <Container className="flex items-center justify-between">
        <a href="/" className="font-bold text-xl font-mono">
          Socially
        </a>

        <nav className="flex items-center gap-3">
          {/* Theme */}
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Moon className="size-4 hidden dark:block" />
            <Sun className="size-4 dark:hidden" />
          </Button>

          {/* Home */}
          <Button variant="ghost" size="lg">
            <Home className="size-4" />
            Home
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="lg">
                <Bell className="size-4" />
                Notification
              </Button>

              <Button variant="ghost" size="lg">
                <User className="size-4" />
                Profile
              </Button>
            </div>
          ) : (
            <Button size="lg">Sign in</Button>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
