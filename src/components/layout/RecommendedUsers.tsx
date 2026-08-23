import { useRecommendedUsers } from "@/hooks/use-recommended-users";
import { useToggleFollow } from "@/hooks/use-toggle-follow";
import { getUsernameFromEmail } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

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
  const { mutate, isPending } = useToggleFollow();

  return (
    <Card className="shadow-muted shadow-md hidden lg:block lg:col-span-4 sticky top-24">
      <CardContent className="px-6">
        <h2 className="mb-7 font-semibold text-lg">Recommended users</h2>

        <div className="flex flex-col gap-5">
          {isLoading
            ? [1, 2, 3].map((_, i) => <RecommendedUserSkeleton key={i} />)
            : data?.data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={`/profile/${getUsernameFromEmail(user.email)}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={user.image || "/user_profile.svg"}
                      alt="Avatar"
                      className="size-8 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-md font-medium">{user.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {user._count.followers} followers
                      </p>
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => mutate(user.id)}
                  >
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Follow"
                    )}
                  </Button>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedUsers;
