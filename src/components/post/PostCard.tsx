import { Heart, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const PostCard = () => {
  return (
    <Card className="shadow-gray-100 shadow-md">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-8 rounded-full object-cover"
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-col gap-4 lg:flex-row">
              <h2 className="font-medium text-lg">naem-brm</h2>
              <span className="text-muted-foreground">@naem-brm</span>
            </div>
            <span className="text-muted-foreground">about 13 hours ago</span>
          </div>
        </div>

        <p>hellooooo</p>

        <div className="flex gap-6 text-muted-foreground">
          <Button variant="ghost" className="cursor-pointer">
            <Heart /> 1
          </Button>

          <Button variant="ghost" className="cursor-pointer">
            <MessageCircle /> 0
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
