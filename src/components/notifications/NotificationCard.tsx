import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/types/notification.type";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

const NotificationCard = ({
  notification,
}: {
  notification: NotificationItem;
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3.5 rounded-xl transition-all",
        notification.read ? "bg-transparent" : "bg-secondary",
      )}
    >
      <img
        src="/user_profile.svg"
        alt="Avatar"
        className="size-8 rounded-full object-cover shrink-0"
      />

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          {notification.type === "FOLLOW" && (
            <UserPlus className="size-4 text-green-500 shrink-0" />
          )}
          {notification.type === "COMMENT" && (
            <MessageCircle className="size-4 text-blue-500 shrink-0" />
          )}
          {notification.type === "LIKE" && (
            <Heart className="size-4 text-rose-500 shrink-0" />
          )}

          <span className="font-semibold text-base">
            {notification.creator.name}
          </span>
          <span className="text-muted-foreground">
            {notification.type === "FOLLOW" && "started following you"}
            {notification.type === "LIKE" && "liked your post"}
            {notification.type === "COMMENT" && "commented on your post"}
          </span>
        </div>

        {notification.post?.content && (
          <div className="p-2.5 rounded-lg bg-muted text-sm text-muted-foreground w-fit">
            {notification.post?.content}
          </div>
        )}

        {notification.comment?.content && (
          <div className="p-2.5 rounded-lg bg-muted text-sm text-muted-foreground w-fit">
            {notification.comment?.content}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      {!notification.read && (
        <span className="size-2 rounded-full bg-blue-500 shrink-0 mt-2" />
      )}
    </div>
  );
};

export default NotificationCard;
