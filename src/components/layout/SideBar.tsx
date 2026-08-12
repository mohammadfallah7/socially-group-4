import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideLink, LucideMapPin } from "lucide-react";

const SignInSidebar = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <a
          className="flex flex-col items-center justify-center gap-3"
          href="/@mohammadfallah"
        >
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-12 rounded-full object-cover"
          />
          <div className="flex flex-col items-center justify-center text-center gap-1.5">
            <h2 className="font-semibold text-lg">Mohammad Fallah</h2>
            <p className="text-sm text-gray-500">@mohammadfallah</p>
          </div>
          <p className="text-sm text-gray-500 text-center">Bio</p>
        </a>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="w-full h-px bg-gray-300/50" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-semibold">3</h3>
              <p className="text-sm text-gray-500">Followings</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-semibold">4</h3>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300/50" />
        </div>

        <div className="gap-3 flex flex-col items-start">
          <div className="flex items-center gap-1.5 text-gray-500">
            <LucideMapPin className="size-4" />
            <p className="text-sm">No Location</p>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <LucideLink className="size-4" />
            <p className="text-sm">No Website</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SignOutSidebar = () => {
  return (
    <Card className="border-border rounded-xl shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to access your profile and connect with others.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-col flex gap-3">
        <Button render={<a href="/sing-in" />} variant="outline">
          Sign in
        </Button>
        <Button render={<a href="/sign-up" />}>Sign up</Button>
      </CardContent>
    </Card>
  );
};

export const Sidebar = () => {
  const isLoggedIn = true;

  return (
    <aside className="hidden lg:block col-span-3 shrink-0">
      {isLoggedIn ? <SignInSidebar /> : <SignOutSidebar />}
    </aside>
  );
};
