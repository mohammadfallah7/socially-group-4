import React from "react";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { FollowUser } from "@/types/follow.type";
import { getUsernameFromEmail } from "@/lib/utils";

export interface FollowListItem {
  user: FollowUser;
  createdAt: string;
}

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: "Followers" | "Following";
  items: FollowListItem[];
  isLoading: boolean;
}

export const FollowListModal: React.FC<FollowListModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  isLoading,
}) => {
  const navigate = useNavigate();

  const handleUserClick = (user: FollowUser) => {
    onClose();
    navigate(`/profile/${getUsernameFromEmail(user.email)}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[500px] max-h-[85vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="shrink-0 pb-2">
          <DialogTitle className="text-center text-lg font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 w-full min-h-0 pr-3">
          {isLoading ? (
            <div className="space-y-3 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-[350px] items-center justify-center">
              <p className="text-center text-sm text-muted-foreground">
                No users found.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const timeAgo = formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                });

                return (
                  <div
                    key={item.user.id}
                    onClick={() => handleUserClick(item.user)}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar image={item.user.image} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">
                          {item.user.name}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          {item.user.email}
                        </span>
                        <span className="mt-1 text-[11px] text-muted-foreground/70">
                          {title === "Followers"
                            ? `Followed you ${timeAgo}`
                            : `You followed ${timeAgo}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
