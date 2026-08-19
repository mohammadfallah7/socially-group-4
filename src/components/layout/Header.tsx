import { getUsernameFromEmail } from "@/lib/utils";
import { useSessionStore } from "@/stores/session.store";
import { Bell, Home, LogOut, Menu, User } from "lucide-react";
import { Link } from "react-router";
import { ModeToggle } from "../ModeToggle";
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
  const { session } = useSessionStore();

  const handleLogout = () => {};

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
          <ModeToggle />

          {/* Home */}
          <Button render={<Link to="/" />} variant="ghost" size="lg">
            <Home className="size-4" />
            Home
          </Button>

          {session ? (
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
              <Button
                render={
                  <Link
                    to={`/profile/${getUsernameFromEmail(session.user.email)}`}
                  />
                }
                variant="ghost"
                size="lg"
              >
                <User className="size-4" />
                Profile
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="lg" onClick={handleLogout}>
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button size="lg" render={<Link to="/sign-in" />}>
              Sign in
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme */}
          <ModeToggle />

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
                  render={<Link to="/" />}
                  variant="ghost"
                  size="lg"
                  className="w-full justify-center"
                >
                  <Home className="size-4" />
                  Home
                </Button>

                {session ? (
                  <>
                    {/* Notification */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      render={<Link to="/notifications" />}
                    >
                      <Bell className="size-4" />
                      Notification
                    </Button>

                    {/* Profile */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      render={
                        <Link
                          to={`/profile/${getUsernameFromEmail(session.user.email)}`}
                        />
                      }
                    >
                      <User className="size-4" />
                      Profile
                    </Button>

                    {/* Logout */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    render={<Link to="/sign-in" />}
                    size="lg"
                    className="w-full"
                  >
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
