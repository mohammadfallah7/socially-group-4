import NotificationCard from "@/components/notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarkAsRead } from "@/hooks/use-mark-as-read";
import { useNotifications } from "@/hooks/use-notifications";
import { LucideLoader2 } from "lucide-react";

export const NotificationPage = () => {
  const { data, isLoading } = useNotifications();
  const { mutate: markAsRead, isPending } = useMarkAsRead();

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length > 0) {
      markAsRead(unreadIds);
    }
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
              disabled={isPending}
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer"
            >
              {isPending && (
                <LucideLoader2 className="size-4 animate-spin mr-1" />
              )}
              Mark as read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96 px-6">
          {isLoading ? (
            <div className="space-y-3 py-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                >
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              You have no notifications
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {notifications.map((item) => (
                <div key={item.id}>
                  <NotificationCard notification={item} />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationPage;
