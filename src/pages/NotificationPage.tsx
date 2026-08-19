import NotificationCard from "@/components/notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
import { useNotifications } from "@/hooks/use-notifications";
import { LucideLoader2 } from "lucide-react";
import { useEffect } from "react";

export const Notifications = () => {
  const { data, isLoading, isError, error } = useNotifications();

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
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;
