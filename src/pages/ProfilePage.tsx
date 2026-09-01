import { useState } from "react";
import { useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Link as LinkIcon, MapPin, Loader2 } from "lucide-react";

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
import { useToggleFollow } from "@/hooks/use-toggle-follow";
import { useGetFollowers } from "@/hooks/use-get-followers";
import { useGetFollowings } from "@/hooks/use-get-followings";
import {
  FollowListModal,
  type FollowListItem,
} from "@/components/profile/FollowListModal";
import { getImageUrl } from "@/lib/utils";

const ProfilePage = () => {
  const { username } = useParams();
  const { session } = useSessionStore();

  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");
  const [activeModal, setActiveModal] = useState<
    "Followers" | "Following" | null
  >(null);

  const { data: profile, isLoading, isError } = useUsrProfile(username);

  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetFollowers(profile?.id, activeModal === "Followers");

  const { data: followingsData, isLoading: isLoadingFollowings } =
    useGetFollowings(profile?.id, activeModal === "Following");

  const {
    data: posts,
    isLoading: isPostsLoading,
    refetch: refetchUserPosts,
  } = useUserPosts(profile?.id);

  const {
    data: likedPosts,
    isLoading: isLikesLoading,
    refetch: refetchUserLikes,
  } = useUserLikes(profile?.id);

  const { mutate: toggleFollow, isPending: isFollowPending } =
    useToggleFollow();

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (isError || !profile) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load profile.</p>
      </div>
    );
  }

  const isOwnProfile = session?.user.id === profile.id;
  const alreadyFollowed =
    profile.followers?.some((f) => f.followerId === session?.user.id) ?? false;

  const rawFollowers = Array.isArray(followersData)
    ? followersData
    : followersData?.data;

  const rawFollowings = Array.isArray(followingsData)
    ? followingsData
    : followingsData?.data;

  const followerItems: FollowListItem[] =
    rawFollowers?.map((item) => ({
      user: item.follower,
      createdAt: item.createdAt,
    })) || [];

  const followingItems: FollowListItem[] =
    rawFollowings?.map((item) => ({
      user: item.following,
      createdAt: item.createdAt,
    })) || [];

  return (
    <div className="space-y-6">
      <Card className="mx-auto w-full max-w-lg shadow-md shadow-muted">
        <CardHeader className="flex flex-col items-center gap-3">
          <img
            src={getImageUrl(profile.image)}
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
          <div className="flex items-center justify-between">
            <div
              className="flex cursor-pointer flex-col items-center transition-opacity hover:opacity-80"
              onClick={() => setActiveModal("Following")}
            >
              <h3 className="font-semibold">{profile._count.followings}</h3>

              <p className="text-sm text-muted-foreground">Following</p>
            </div>

            <div
              className="flex cursor-pointer flex-col items-center transition-opacity hover:opacity-80"
              onClick={() => setActiveModal("Followers")}
            >
              <h3 className="font-semibold">{profile._count.followers}</h3>

              <p className="text-sm text-muted-foreground">Followers</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold">{profile._count.posts}</h3>

              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
          </div>

          {isOwnProfile ? (
            <EditProfileModal user={profile} />
          ) : (
            <Button
              className="w-full cursor-pointer"
              onClick={() => toggleFollow(profile.id)}
              disabled={isFollowPending}
            >
              {isFollowPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : alreadyFollowed ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </Button>
          )}

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

      <div className="space-y-6">
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

        {activeTab === "posts" && (
          <div className="space-y-4">
            {isPostsLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (posts?.length ?? 0) > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  refetch={refetchUserPosts}
                />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No posts yet.
              </p>
            )}
          </div>
        )}

        {activeTab === "likes" && (
          <div className="space-y-4">
            {isLikesLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (likedPosts?.length ?? 0) > 0 ? (
              likedPosts?.map((like) => (
                <PostCard
                  key={like.id}
                  post={like.post}
                  refetch={refetchUserLikes}
                />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No liked posts yet.
              </p>
            )}
          </div>
        )}
      </div>

      <FollowListModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal || "Followers"}
        items={activeModal === "Followers" ? followerItems : followingItems}
        isLoading={
          activeModal === "Followers" ? isLoadingFollowers : isLoadingFollowings
        }
      />
    </div>
  );
};

export default ProfilePage;
