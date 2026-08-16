import { Bell, Home, LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Container from "./Container";

const Header = () => {
  const isLoggedIn = true;

  return (
    <header className="border-b py-5 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-mono text-xl font-bold">
          Socially
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          {/* Theme */}
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Moon className="hidden size-4 dark:block" />
            <Sun className="size-4 dark:hidden" />
          </Button>

          {/* Home */}
          <Button render={<Link to="/" />} variant="ghost" size="lg">
            <Home className="size-4" />
            Home
          </Button>

          {isLoggedIn ? (
            <>
              {/* Notification */}
              <Button
                render={<Link to="/notifications" />}
                variant="ghost"
                size="lg"
              >
                <Bell className="size-4" />
                Notification
              </Button>

              {/* Profile */}
              <Button render={<Link to="/profile" />} variant="ghost" size="lg">
                <User className="size-4" />
                Profile
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="lg">
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button size="lg">Sign in</Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme */}
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Moon className="hidden size-4 dark:block" />
            <Sun className="size-4 dark:hidden" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger>
              <Button size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-5 flex flex-col gap-3 px-4">
                {/* Home */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full justify-center"
                >
                  <Home className="size-4" />
                  Home
                </Button>

                {isLoggedIn ? (
                  <>
                    {/* Notification */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <Bell className="size-4" />
                      Notification
                    </Button>

                    {/* Profile */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <User className="size-4" />
                      Profile
                    </Button>

                    {/* Logout */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <LogOut className="size-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="lg" className="w-full">
                    Sign in
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};

export default Header;
