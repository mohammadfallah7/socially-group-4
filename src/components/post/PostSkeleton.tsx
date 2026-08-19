import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-12" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;
