import { Link } from "react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideLink, LucideMapPin } from "lucide-react";
import { useSessionStore } from "@/stores/session.store";
import type { Session } from "@/types/session.type";
import type { ProfilePageValues } from "@/types/auth.type";
import { getUsernameFromEmail } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Response } from "@/types/response.type";
import { UserFollowersModal } from "@/components/profile/UserFollowersModal";
import { UserFollowingsModal } from "@/components/profile/UserFollowingsModal";

const SignInSidebarSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-3">
        <Skeleton className="size-12 rounded-full" />

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-4 w-32" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="h-px w-full bg-gray-300/50" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="h-px w-full bg-gray-300/50" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SignInSidebar = ({ session }: { session: Session }) => {
  const username = getUsernameFromEmail(session.user.email);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingsOpen, setIsFollowingsOpen] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sidebar-profile"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<ProfilePageValues>>(
        `/api/users/${username}/profile`,
      );
      return response.data.data;
    },
  });

  if (isLoading) {
    return <SignInSidebarSkeleton />;
  }

  if (isError || !profile) {
    return null;
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <Link
            to={`/profile/${username}`}
            className="flex flex-col items-center justify-center gap-3"
          >
            <img
              src={profile.image || "/user_profile.svg"}
              alt={profile.name}
              className="size-12 rounded-full object-cover"
            />

            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
            {profile.bio && (
              <p className="text-center text-sm text-muted-foreground">
                {profile.bio}
              </p>
            )}
          </Link>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="h-px w-full bg-gray-300/50" />

            <div className="flex items-center justify-between">
              <div
                className="flex flex-col items-center cursor-pointer hover:opacity-80 transition"
                onClick={() => setIsFollowingsOpen(true)}
              >
                <h3 className="font-semibold">{profile._count.followings}</h3>

                <p className="text-sm text-muted-foreground">Followings</p>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer hover:opacity-80 transition"
                onClick={() => setIsFollowersOpen(true)}
              >
                <h3 className="font-semibold">{profile._count.followers}</h3>

                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-300/50" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LucideMapPin className="size-4" />

              <p className="text-sm">{profile.location || "No Location"}</p>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LucideLink className="size-4" />

              <p className="text-sm">{profile.website || "No Website"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserFollowersModal
        userId={profile.id}
        isOpen={isFollowersOpen}
        onClose={() => setIsFollowersOpen(false)}
      />

      <UserFollowingsModal
        userId={profile.id}
        isOpen={isFollowingsOpen}
        onClose={() => setIsFollowingsOpen(false)}
      />
    </>
  );
};

const SignOutSidebar = () => {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome Back!</CardTitle>

        <CardDescription>
          Sign in to access your profile and connect with others.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Button render={<Link to="/sign-in" />} variant="outline">
          Sign in
        </Button>

        <Button render={<Link to="/sign-up" />}>Sign up</Button>
      </CardContent>
    </Card>
  );
};

export const Sidebar = () => {
  const { session, isLoading } = useSessionStore();

  return (
    <aside className="col-span-3 hidden lg:block">
      <div className="sticky top-24">
        {isLoading ? (
          <SignInSidebarSkeleton />
        ) : session ? (
          <SignInSidebar session={session} />
        ) : (
          <SignOutSidebar />
        )}
      </div>
    </aside>
  );
};