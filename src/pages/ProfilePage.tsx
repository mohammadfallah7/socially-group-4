import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/session.store";
import type { ProfilePageValues } from "@/types/auth.type";
import type { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const PostSkeleton = () => {
  return (
    <Card className="shadow-md shadow-muted">
      <CardContent className="flex flex-col gap-5">
        {/* Post Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Post Content */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Actions */}
        <div className="flex gap-6">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

const ProfilePage = () => {
  const { username } = useParams<{
    username: string;
  }>();

  const { session } = useSessionStore();

  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  // Profile

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", username],

    queryFn: async () => {
      const response = await axiosInstance.get<{
        message: string;
        success: boolean;
        data: ProfilePageValues;
      }>(`/api/users/${username}/profile`);

      return response.data.data;
    },

    enabled: !!username,
  });

  // Posts

  const { data: posts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ["user-posts", profile?.id],

    queryFn: async () => {
      const response = await axiosInstance.get<{
        message: string;
        success: boolean;
        data: Post[];
      }>(`/api/users/${profile!.id}/posts`);

      return response.data.data;
    },

    enabled: !!profile?.id && activeTab === "posts",
  });

  // Likes

  const { data: likedPosts = [], isLoading: isLikesLoading } = useQuery({
    queryKey: ["user-likes", profile?.id],

    queryFn: async () => {
      const response = await axiosInstance.get<{
        message: string;
        success: boolean;
        data: {
          post: Post;
        }[];
      }>(`/api/users/${profile!.id}/likes`);

      return response.data.data.map((like) => like.post);
    },

    enabled: !!profile?.id && activeTab === "likes",
  });

  // Profile Loading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader className="flex flex-col items-center gap-3">
            <Skeleton className="size-18 rounded-full" />

            <div className="flex w-full flex-col items-center gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-5 w-6" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-5 w-6" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-5 w-6" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <Skeleton className="h-9 w-full" />

            {/* Details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-28" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex h-9 w-full rounded-lg bg-muted p-1">
          <Skeleton className="h-full flex-1" />
          <Skeleton className="h-full flex-1" />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    );
  }

  // Profile Error

  if (isError || !profile) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load profile.</p>
      </div>
    );
  }

  // Own Profile

  const isOwnProfile = session?.user.id === profile.id;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="mx-auto w-full max-w-lg shadow-md shadow-muted">
        <CardHeader className="flex flex-col items-center gap-3">
          <img
            src={profile.image || "/user_profile.svg"}
            alt={profile.name}
            className="size-18 rounded-full object-cover"
          />

          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-xl font-semibold">{profile.name}</h1>

            <p className="text-sm text-muted-foreground">{username}</p>

            {profile.bio && (
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.bio}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold">{profile._count.followings}</h3>

              <p className="text-sm text-muted-foreground">Following</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold">{profile._count.followers}</h3>

              <p className="text-sm text-muted-foreground">Followers</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold">{profile._count.posts}</h3>

              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
          </div>

          {/* Edit Profile / Follow */}
          {isOwnProfile ? (
            <Button className="w-full cursor-pointer">Edit Profile</Button>
          ) : (
            <Button className="w-full cursor-pointer">Follow</Button>
          )}

          {/* User Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />

              <p className="text-sm">{profile.location || "No Location"}</p>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LinkIcon className="size-4" />

              <p className="text-sm">{profile.website || "No Website"}</p>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-4" />

              <p className="text-sm">
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Unknown"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts / Likes */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex h-9 w-full rounded-lg bg-muted p-1">
          <button
            type="button"
            onClick={() => setActiveTab("posts")}
            className={`flex-1 cursor-pointer rounded-md text-sm font-semibold text-foreground transition-all ${
              activeTab === "posts" ? "bg-background shadow-sm" : ""
            }`}
          >
            Posts
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("likes")}
            className={`flex-1 cursor-pointer rounded-md text-sm font-semibold text-foreground transition-all ${
              activeTab === "likes" ? "bg-background shadow-sm" : ""
            }`}
          >
            Likes
          </button>
        </div>

        {/* Posts */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {isPostsLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No posts yet.
              </p>
            )}
          </div>
        )}

        {/* Likes */}
        {activeTab === "likes" && (
          <div className="space-y-4">
            {isLikesLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <PostCard key={post.id} post={post} isLiked />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No liked posts yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
