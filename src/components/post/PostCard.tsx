import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, MessageCircle } from "lucide-react";

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

          <div className="flex gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <span>naem-brm</span>
              <span className="opacity-60">@naem-brm</span>
            </div>
            <span className="opacity-60">about 13 hours ago</span>
          </div>
        </div>

        <p>hellooooo</p>

        <div className="flex gap-6">
          <Button variant="ghost">
            <Heart /> 1
          </Button>

          <Button variant="ghost">
            <MessageCircle /> 0
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
