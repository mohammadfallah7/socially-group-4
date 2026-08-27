import EditProfileModal from "@/components/profile/EditProfileModal";
import PostCard from "@/components/post/PostCard";
import PostSkeleton from "@/components/post/PostSkeleton";
import ProfileLoading from "@/components/profile/ProfileLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserLikes } from "@/hooks/use-user-likes";
import { useUserPosts } from "@/hooks/use-user-posts";
import { useUsrProfile } from "@/hooks/use-user-profile";
import { useSessionStore } from "@/stores/session.store";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const ProfilePage = () => {
  const { username } = useParams();
  const { session } = useSessionStore();
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  const { data: profile, isLoading, isError } = useUsrProfile(username);

  const { data: posts, isLoading: isPostsLoading } = useUserPosts(profile?.id);
  const { data: likedPosts, isLoading: isLikesLoading } = useUserLikes(
    profile?.id,
  );

  console.log(likedPosts);

  // Profile Loading
  if (isLoading) {
    return <ProfileLoading />;
  }

  // Profile Error
  if (isError || !profile) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load profile.</p>
      </div>
    );
  }

  const isOwnProfile = session?.user.id === profile.id;
  const alreadyFollowed = profile.followers.some(
    (f) => f.followerId === session?.user.id,
  );

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
            <EditProfileModal user={profile} />
          ) : (
            <Button className="w-full cursor-pointer">
              {alreadyFollowed ? "Unfollow" : "Follow"}
            </Button>
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
                {formatDistanceToNow(new Date(profile.createdAt), {
                  addSuffix: true,
                })}
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
            ) : posts!.length > 0 ? (
              posts?.map((post) => <PostCard key={post.id} post={post} />)
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
            ) : likedPosts!.length > 0 ? (
              likedPosts?.map((like) => (
                <PostCard key={like.id} post={like.post} />
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
