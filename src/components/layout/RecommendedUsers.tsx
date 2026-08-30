import { useRecommendedUsers } from "@/hooks/use-recommended-users";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import RecommendedUserCard from "./RecommendedUserCard";

const RecommendedUserSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <Skeleton className="h-9 w-16" />
    </div>
  );
};

const RecommendedUsers = () => {
  const { data, isLoading } = useRecommendedUsers();

  return (
    <Card className="shadow-muted shadow-md hidden lg:block lg:col-span-4 sticky top-24">
      <CardContent className="px-6">
        <h2 className="mb-7 font-semibold text-lg">Recommended users</h2>

        <div className="flex flex-col gap-5">
          {isLoading
            ? [1, 2, 3].map((_, i) => <RecommendedUserSkeleton key={i} />)
            : data?.data.map((user) => (
                <RecommendedUserCard user={user} key={user.id} />
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedUsers;
