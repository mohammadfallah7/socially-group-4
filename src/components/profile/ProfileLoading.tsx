import PostSkeleton from "../post/PostSkeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="space-y-6">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="flex flex-col items-center gap-3">
          <Skeleton className="size-18 rounded-full" />

          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <Skeleton className="h-9 w-full" />

          {/* Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex h-9 w-full rounded-lg bg-muted p-1">
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full flex-1" />
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
};

export default ProfileLoading;
