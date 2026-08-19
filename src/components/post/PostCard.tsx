import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { Post } from "@/types/post.type";
import { formatDistanceToNow } from "date-fns";
import { getUsernameFromEmail } from "@/lib/utils";
type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <h2 className="text-lg font-medium">{post.author.name}</h2>
              <span className="text-muted-foreground">@{getUsernameFromEmail(post.author.email)}</span>
            </div>

            <span className="text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        {/* Post */}
        <p>{post.content}</p>

        {/* Actions */}
        <div className="flex gap-6 text-muted-foreground">
          <Button variant="ghost" className="cursor-pointer">
            <Heart />
            {post._count.likes}
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setAddComment((prev) => !prev)}
          >
            <MessageCircle />
            {post._count.comments}
          </Button>
        </div>

        {/* Comments */}
        {addComment && (
          <div className="border-t pt-5 flex flex-col gap-5">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comment.author.image || "/user_profile.svg"}
                    alt="Avatar"
                    className="size-8 rounded-full object-cover"
                  />

                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{comment.author.name}</h3>

                    <span className="text-sm text-muted-foreground">
                      {comment.author.email}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {comment.createdAt}
                    </span>
                  </div>
                </div>

                <p className="text-sm">{comment.content}</p>
              </div>
            ))}

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
