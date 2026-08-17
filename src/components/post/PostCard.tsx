import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const PostCard = () => {
  const [addComment, setAddComment] = useState(false);

  return (
    <Card className="shadow-md shadow-muted">
      <CardContent className="flex flex-col gap-5">
        {/* Post Header */}
        <div className="flex items-center gap-3">
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-8 rounded-full object-cover"
          />

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
              <h2 className="text-lg font-medium">naem-brm</h2>
              <span className="text-muted-foreground">@naem-brm</span>
            </div>

            <span className="text-muted-foreground">about 13 hours ago</span>
          </div>
        </div>

        {/* Post */}
        <p>hellooooo</p>

        {/* Actions */}
        <div className="flex gap-6 text-muted-foreground">
          <Button variant="ghost" className="cursor-pointer">
            <Heart />1
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setAddComment((prev) => !prev)}
          >
            <MessageCircle />3
          </Button>
        </div>

        {/* Comments */}
        {addComment && (
          <div className="border-t pt-5 flex flex-col gap-5">
            {/* Comment 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/user_profile.svg"
                  alt="Avatar"
                  className="size-8 rounded-full object-cover"
                />

                <div className="flex items-center gap-3">
                  <h3 className="font-medium">sepehr</h3>
                  <span className="text-sm text-muted-foreground">
                    @sepehrtaale
                  </span>
                  <span className="text-sm text-muted-foreground">
                    1 day ago
                  </span>
                </div>
              </div>

              <p className="text-sm">hello</p>
            </div>

            {/* Comment 2 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/user_profile.svg"
                  alt="Avatar"
                  className="size-8 rounded-full object-cover"
                />

                <div className="flex items-center gap-3">
                  <h3 className="font-medium">sepehr</h3>
                  <span className="text-sm text-muted-foreground">
                    @sepehrtaale
                  </span>
                  <span className="text-sm text-muted-foreground">
                    about 17 hours ago
                  </span>
                </div>
              </div>

              <p className="text-sm">hhhhhhhhhhhh</p>
            </div>

            {/* Comment 3 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/user_profile.svg"
                  alt="Avatar"
                  className="size-8 rounded-full object-cover"
                />

                <div className="flex items-center gap-3">
                  <h3 className="font-medium">sepehr</h3>
                  <span className="text-sm text-muted-foreground">
                    @sepehrtaale
                  </span>
                  <span className="text-sm text-muted-foreground">
                    about 17 hours ago
                  </span>
                </div>
              </div>

              <p className="text-sm">hhhhhh</p>
            </div>

            {/* Add Comment */}
            <div className="flex items-start gap-3 border-t pt-5">
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
