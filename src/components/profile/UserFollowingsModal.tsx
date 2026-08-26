import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToggleFollow } from "@/hooks/use-toggle-follow";
import { useUserFollowings } from "@/hooks/use-user-followings";
import { getUsernameFromEmail } from "@/lib/utils";
import { useSessionStore } from "@/stores/session.store";
import { useQueryClient } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface UserFollowingsModalProps {
  userId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserListSkeleton = () => (
  <div className="space-y-4 pt-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-16 shrink-0 rounded-md" />
      </div>
    ))}
  </div>
);

export const UserFollowingsModal = ({
  userId,
  isOpen,
  onClose,
}: UserFollowingsModalProps) => {
  const queryClient = useQueryClient();
  const { session } = useSessionStore();
  const { data: followings, isLoading } = useUserFollowings(userId);
  const {
    mutate: toggleFollow,
    isPending: isFollowPending,
    variables: pendingUserId,
  } = useToggleFollow();

  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (followings) {
      const initialMap: Record<string, boolean> = {};
      followings.forEach((item: any) => {
        const targetUser = item.following || item;
        const isFollowing =
          item.isFollowing ??
          targetUser.isFollowing ??
          targetUser.followers?.some(
            (f: any) => f.followerId === session?.user.id
          ) ??
          true;
        initialMap[targetUser.id] = Boolean(isFollowing);
      });
      setFollowingMap(initialMap);
    }
  }, [followings, session?.user.id]);

  const handleToggleFollow = (targetId: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [targetId]: !prev[targetId],
    }));

    toggleFollow(targetId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-followers"] });
        queryClient.invalidateQueries({ queryKey: ["user-followings"] });
        queryClient.invalidateQueries({ queryKey: ["sidebar-profile"] });
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      },
      onError: () => {
        setFollowingMap((prev) => ({
          ...prev,
          [targetId]: !prev[targetId],
        }));
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[450px] flex-col p-6 sm:max-w-[425px]">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-lg font-bold">Following</DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 pt-2">
          {isLoading ? (
            <UserListSkeleton />
          ) : followings && followings.length > 0 ? (
            <ScrollArea className="h-full pr-3">
              <div className="space-y-4">
                {followings.map((item: any) => {
                  const targetUser = item.following || item;
                  const username = targetUser.email
                    ? getUsernameFromEmail(targetUser.email)
                    : "";
                  const isMe = session?.user.id === targetUser.id;
                  const isFollowing = followingMap[targetUser.id] ?? true;
                  const isThisUserPending =
                    isFollowPending && pendingUserId === targetUser.id;

                  return (
                    <div
                      key={targetUser.id || item.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <Link
                        to={`/profile/${username}`}
                        onClick={onClose}
                        className="flex min-w-0 items-center gap-3 transition hover:opacity-80"
                      >
                        <Avatar className="size-9 shrink-0">
                          <AvatarImage
                            src={targetUser.image || "/user_profile.svg"}
                          />
                          <AvatarFallback>
                            {targetUser.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate">
                          <span className="truncate text-sm font-semibold leading-tight">
                            {targetUser.name || username || "User"}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {username ? `@${username}` : targetUser.email}
                          </span>
                        </div>
                      </Link>

                      {!isMe && (
                        <Button
                          size="sm"
                          variant={isFollowing ? "outline" : "default"}
                          disabled={isThisUserPending}
                          onClick={() => handleToggleFollow(targetUser.id)}
                          className="h-8 w-20 shrink-0 cursor-pointer text-xs font-medium"
                        >
                          {isThisUserPending ? (
                            <LucideLoader2 className="size-4 animate-spin" />
                          ) : isFollowing ? (
                            "Unfollow"
                          ) : (
                            "Follow"
                          )}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No followings found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};