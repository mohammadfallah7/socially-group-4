import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { axiosInstance } from "@/lib/axios";
import type { Response } from "@/types/response.type";
import type { RecommendedUser } from "@/types/user.type";

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

  if (isPending) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <Card className="shadow-muted shadow-md hidden lg:block lg:col-span-4 sticky top-24">
      <CardContent className="px-6">
        <h2 className="mb-7 font-semibold text-lg">Recommended users</h2>

<div className="flex flex-col gap-5">
  {data.data.map((user) => (
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

      <Button variant="outline" className="cursor-pointer">
        Follow
      </Button>
    </div>
  ))}
</div>
      </CardContent>
    </Card>
  );
};

export default RecommendedUsers;
