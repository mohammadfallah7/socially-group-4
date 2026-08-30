import { useState } from "react";
import { useLogout } from "@/hooks/use-logout";
import { getUsernameFromEmail } from "@/lib/utils";
import { useSessionStore } from "@/stores/session.store";
import { Bell, Home, LogOut, Menu, User } from "lucide-react";
import { Link } from "react-router";

import SearchUsers from "./SearchUsers";
import Container from "./Container";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const { session } = useSessionStore();

  const { mutate: logout, isPending } = useLogout();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 py-5 backdrop-blur-xl">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-mono text-xl font-bold">
          Socially
        </Link>

        {/* Desktop Search */}
        <div className="hidden flex-1 justify-center px-6 md:ml-7 md:flex">
          <div className="w-full max-w-md">
            <SearchUsers />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <ModeToggle />

          {/* Home */}
          <Button render={<Link to="/" />} variant="ghost" size="lg">
            <Home className="size-4" />
            Home
          </Button>

          {session ? (
            <>
              {/* Notifications */}
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
              <Button
                variant="ghost"
                size="lg"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button render={<Link to="/sign-in" />} size="lg">
              Sign in
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mt-4 flex justify-center px-4">
                <div className="w-full max-w-sm">
                  <SearchUsers onSelectUser={() => setSheetOpen(false)} />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="mt-5 flex flex-col gap-3 px-4">
                {/* Home */}
                <Button
                  render={<Link to="/" />}
                  variant="ghost"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => setSheetOpen(false)}
                >
                  <Home className="size-4" />
                  Home
                </Button>

                {session ? (
                  <>
                    {/* Notifications */}
                    <Button
                      render={<Link to="/notifications" />}
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => setSheetOpen(false)}
                    >
                      <Bell className="size-4" />
                      Notification
                    </Button>

                    {/* Profile */}
                    <Button
                      render={
                        <Link
                          to={`/profile/${getUsernameFromEmail(
                            session.user.email,
                          )}`}
                        />
                      }
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => setSheetOpen(false)}
                    >
                      <User className="size-4" />
                      Profile
                    </Button>

                    {/* Logout */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => {
                        handleLogout();
                        setSheetOpen(false);
                      }}
                      disabled={isPending}
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    render={<Link to="/sign-in" />}
                    size="lg"
                    className="w-full"
                    onClick={() => setSheetOpen(false)}
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