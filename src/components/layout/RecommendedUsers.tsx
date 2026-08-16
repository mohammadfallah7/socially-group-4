import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const RecommendedUsers = () => {
  return (
    <Card className="shadow-muted shadow-md hidden lg:block lg:col-span-4 sticky top-24">
      <CardContent className="px-6">
        <h2 className="mb-7 font-semibold text-lg">Recommended users</h2>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/user_profile.svg"
                alt="Avatar"
                className="size-8 rounded-full object-cover"
              />

              <div>
                <p className="text-md font-medium">sepehr</p>
                <p className="text-sm text-muted-foreground">0 followers</p>
              </div>
            </div>

            <Button variant="outline" className="cursor-pointer">
              Follow
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/user_profile.svg"
                alt="Avatar"
                className="size-8 rounded-full object-cover"
              />

              <div>
                <p className="text-md font-medium">Sephr</p>
                <p className="text-sm text-muted-foreground">0 followers</p>
              </div>
            </div>

            <Button variant="outline" className="cursor-pointer">
              Follow
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/user_profile.svg"
                alt="Avatar"
                className="size-8 rounded-full object-cover"
              />

              <div>
                <p className="text-md font-medium">alireza</p>
                <p className="text-sm text-muted-foreground">2 followers</p>
              </div>
            </div>

            <Button variant="outline" className="cursor-pointer">
              Follow
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedUsers;
