import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Heart, UserPlus } from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "follow",
    user: "کیومرث",
    avatar: "/user_profile.svg",
    action: "started following you",
    time: "36 minutes ago",
    isUnread: true,
  },
  {
    id: 2,
    type: "comment",
    user: "کیومرث",
    avatar: "/user_profile.svg",
    action: "liked your post",
    postContent: "helloooo",
    time: "38 minutes ago",
    isUnread: true,
  },
  {
    id: 3,
    type: "like",
    user: "naem-bm",
    avatar: "/user_profile.svg",
    action: "liked your post",
    postContent: "helloooo",
    time: "about 1 hour ago",
    isUnread: true,
  },
  {
    id: 4,
    type: "like",
    user: "salar",
    avatar: "/user_profile.svg",
    action: "liked your post",
    postContent: "helloooo",
    time: "about 1 hour ago",
    isUnread: true,
  },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false }))
    );
  };

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between shrink-0">
        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{unreadCount} unread</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer"
            >
              Mark as read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96 px-6">
          <div className="space-y-3 pb-6">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  item.isUnread
                    ? "bg-secondary border-border"
                    : "bg-transparent border-transparent"
                }`}
              >
                <img
                  src={item.avatar}
                  alt="Avatar"
                  className="size-10 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 space-y-2 text-sm">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.type === "follow" && (
                      <UserPlus className="size-4 text-green-500 shrink-0" />
                    )}
                    {item.type === "comment" && (
                      <MessageSquare className="size-4 text-blue-500 shrink-0" />
                    )}
                    {item.type === "like" && (
                      <Heart className="size-4 text-rose-500 shrink-0" />
                    )}

                    <span className="font-semibold">{item.user}</span>
                    <span className="text-muted-foreground">
                      {item.action}
                    </span>
                  </div>

                  {item.postContent && (
                    <div className="p-2.5 rounded-lg bg-muted text-xs text-muted-foreground">
                      {item.postContent}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>

                {item.isUnread && (
                  <span className="size-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;