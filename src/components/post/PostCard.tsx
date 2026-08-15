import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const PostCard = () => {
  const [addComment, setAddComment] = useState(false);

  return (
    <Card className="shadow-muted shadow-md">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-8 rounded-full object-cover"
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-col gap-4 lg:flex-row">
              <h2 className="text-lg font-medium">naem-brm</h2>
              <span className="text-muted-foreground">@naem-brm</span>
            </div>

            <span className="text-muted-foreground">about 13 hours ago</span>
          </div>
        </div>

        <p>hellooooo</p>

        <div className="flex gap-6 text-muted-foreground">
          <Button variant="ghost" className="cursor-pointer">
            <Heart />1
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setAddComment(!addComment)}
          >
            <MessageCircle />0
          </Button>
        </div>

        {addComment && (
          <div className="border-t pt-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <img
                src="/user_profile.svg"
                alt="Avatar"
                className="size-8 rounded-full object-cover"
              />

              <textarea
                placeholder="Write a comment..."
                className="min-h-[65px] flex-1 resize-none rounded-lg border p-3 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex justify-end">
              <Button className="cursor-pointer bg-black text-white hover:bg-black/90">
                <Send />
                Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
