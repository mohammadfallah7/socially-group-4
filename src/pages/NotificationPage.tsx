import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/axios";
import type { NotificationItem } from "@/types/notification.type";
import type { ErrorResponse, Response } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Heart, LucideLoader2, MessageSquare, UserPlus } from "lucide-react";

export const Notifications = () => {
  const { data, isLoading, isError, error } = useQuery<
    Response<NotificationItem[]>,
    AxiosError<ErrorResponse<string>>
  >({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response =
        await axiosInstance.get<Response<NotificationItem[]>>(
          "/api/notifications",
        );
      return response.data;
    },
  });

  useEffect(() => {
    if (isError && error) {
      if (error.response?.status === 401) {
        toast.add({
          type: "error",
          description: "Please login first to view notifications",
        });
      } else {
        toast.add({
          type: "error",
          description:
            error.response?.data?.error || "Failed to load notifications",
        });
      }
    }
  }, [isError, error]);

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {};

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
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <LucideLoader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="text-center py-10 text-sm text-muted-foreground">
              {error.response?.status === 401
                ? "Please login to view notifications."
                : "Failed to load notifications."}
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                    !item.read
                      ? "bg-secondary border-border"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <img
                    src="/user_profile.svg"
                    alt="Avatar"
                    className="size-10 rounded-full object-cover shrink-0"
                  />

                  <div className="flex-1 space-y-2 text-sm">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.type === "FOLLOW" && (
                        <UserPlus className="size-4 text-green-500 shrink-0" />
                      )}
                      {item.type === "COMMENT" && (
                        <MessageSquare className="size-4 text-blue-500 shrink-0" />
                      )}
                      {item.type === "LIKE" && (
                        <Heart className="size-4 text-rose-500 shrink-0" />
                      )}

                      <span className="font-semibold">{item.creator.name}</span>
                      <span className="text-muted-foreground">
                        {item.type === "FOLLOW" && "started following you"}
                        {item.type === "LIKE" && "liked your post"}
                        {item.type === "COMMENT" && "commented on your post"}
                      </span>
                    </div>

                    {(item.post?.content || item.comment?.content) && (
                      <div className="p-2.5 rounded-lg bg-muted text-xs text-muted-foreground">
                        {item.post?.content || item.comment?.content}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {!item.read && (
                    <span className="size-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;
