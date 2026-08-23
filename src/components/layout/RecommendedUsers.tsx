import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { axiosInstance } from "@/lib/axios";
import type { Response } from "@/types/response.type";
import type { RecommendedUser } from "@/types/user.type";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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
  const { data, isPending, isError } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<RecommendedUser[]>>(
        "/api/users/recommend",
      );

      return response.data;
    },
  });

  const queryClient = useQueryClient();

  const [followingUserId, setFollowingUserId] = useState<string | null>(null);
  const followMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosInstance.patch(`/api/users/${userId}`);

      return response.data;
    },

    onMutate: (userId) => {
      setFollowingUserId(userId);
    },

    onSuccess: (_, userId) => {
      queryClient.setQueryData(
        ["recommended-users"],
        (oldData: Response<RecommendedUser[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((user) => user.id !== userId),
          };
        },
      );

      setFollowingUserId(null);
    },


  });
  if (isError) {
    return null;
  }

  return (
    <Card className="shadow-muted shadow-md hidden lg:block lg:col-span-4 sticky top-24">
      <CardContent className="px-6">
        <h2 className="mb-7 font-semibold text-lg">Recommended users</h2>

        <div className="flex flex-col gap-5">
          {isPending
            ? [1, 2, 3].map((_, i) => <RecommendedUserSkeleton key={i} />)
            : data.data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
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
                  </div>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => followMutation.mutate(user.id)}
                    disabled={followingUserId === user.id}
                  >
                    {followingUserId === user.id ? (
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
