import NotificationCard from "@/components/notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
              {isPending && <LucideLoader2 className="size-4 animate-spin" />}
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
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              You have no notifications
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {notifications.map((item) => (
                <div key={item.id} className="cursor-pointer">
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
// end
